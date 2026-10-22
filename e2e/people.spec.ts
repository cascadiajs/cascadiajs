import { test, expect, type Page } from "@playwright/test";
import {
  EVENTS_WITH_PAGES,
  PEOPLE,
  storedOrganizers,
  storedTalks,
} from "./helpers";

/**
 * Person registry (ADR-0017). An Event dataset refers to a Person by id. A
 * reference with `overrides` shows the override on that Event's page. A
 * reference without one shows the registry value.
 */
const registry = (id: string) => PEOPLE.find((p) => p.id === id)!;
/** The Person card whose photo is of `name`. */
const cardOf = (page: Page, name: string) =>
  page.locator(".cjs-person-card").filter({
    has: page.getByRole("img", { name: `photo of ${name}`, exact: true }),
  });

const overriddenOrganizers = EVENTS_WITH_PAGES.flatMap(({ year }) =>
  storedOrganizers(year)
    .filter((ref) => ref.overrides?.title)
    .map((ref) => ({ year, ref })),
);

test.describe("Person registry", () => {
  for (const { year } of EVENTS_WITH_PAGES) {
    test(`every Organizer of the ${year} Event page shows their registry name`, async ({
      page,
    }) => {
      const refs = storedOrganizers(year);
      test.skip(refs.length === 0, "Event has no Organizers");
      await page.goto(`/${year}`);
      for (const ref of refs.filter((r) => !r.overrides?.title)) {
        const { name, title } = registry(ref.id);
        const card = cardOf(page, name);
        await expect(card).toHaveCount(1);
        if (title) {
          await expect(card).toContainText(title);
        }
      }
    });

    test(`every Speaker with a Talk page on the ${year} Event shows their registry company`, async ({
      page,
    }) => {
      const talks = storedTalks(year).filter(
        (t) => t.slug && !t.speaker.overrides?.company,
      );
      test.skip(talks.length === 0, "Event has no Talk pages");
      const { slug, speaker } = talks.find(
        (t) => registry(t.speaker.id).company,
      ) ?? { slug: undefined, speaker: undefined };
      test.skip(!slug, "no Speaker has a company");
      await page.goto(`/${year}/talks/${slug}`);
      await expect(page.locator("main")).toContainText(
        registry(speaker!.id).company!,
      );
    });
  }

  test("an Organizer override shows on that Event's page", async ({ page }) => {
    test.skip(
      overriddenOrganizers.length === 0,
      "no Organizer entry has a title override",
    );
    for (const { year, ref } of overriddenOrganizers) {
      await page.goto(`/${year}`);
      const card = cardOf(page, registry(ref.id).name);
      await expect(card).toContainText(ref.overrides!.title!);
    }
  });
});
