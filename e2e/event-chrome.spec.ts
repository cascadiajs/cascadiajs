import { test, expect, type Page } from "@playwright/test";
import {
  DESKTOP,
  eventMarkdownPagePath,
  filesUnder,
  MOBILE,
  EVENT_ROOTS,
} from "./helpers";

/**
 * Event chrome: each Event root shows the EventNav, and an Event markdown
 * page, a nested Event markdown page, a Talk page and a Sponsor page show the
 * EventNav instead of the SiteHeader. Roots come from the Events with pages
 * whose root is built, so a new Event is covered with no edit, and a new
 * Event config without a root page yet is skipped. Other pages are the first
 * of their type; a type with no page is skipped.
 */

const firstBuilt = (dir: RegExp) =>
  filesUnder("dist", dir)[0]?.replace(/\.html$/, "");
const nestedMarkdown = filesUnder(
  "src/content/markdown",
  /^\d{4}\/[^/\\]+\/.+\.mdx?$/,
)[0]?.replace(/\.mdx?$/, "");

async function expectEventNavPosition(page: Page) {
  const nav = page.locator(".cjs-event-nav");
  await page.setViewportSize(DESKTOP);
  expect(await nav.evaluate((el) => getComputedStyle(el).position)).toBe(
    "sticky",
  );
  await page.setViewportSize(MOBILE);
  expect(await nav.evaluate((el) => getComputedStyle(el).position)).toBe(
    "static",
  );
}

test.describe("Event roots", () => {
  for (const root of EVENT_ROOTS) {
    test(`${root} shows the EventNav with the logo linked to the Event root`, async ({
      page,
    }) => {
      await page.goto(root);
      const nav = page.locator(".cjs-event-nav").getByRole("navigation");
      await expect(nav).toBeVisible();
      await expect(nav.getByRole("link").first()).toHaveAttribute("href", root);
    });

    test(`${root} EventNav is sticky at desktop width and static at mobile width`, async ({
      page,
    }) => {
      await page.goto(root);
      await expectEventNavPosition(page);
    });
  }
});

test.describe("Event markdown page", () => {
  const path = eventMarkdownPagePath();
  test.skip(!path, "no Event has a markdown page");

  test.beforeEach(async ({ page }) => {
    await page.goto(path!);
  });

  test("shows the EventNav and not the SiteHeader", async ({ page }) => {
    await expect(page.locator(".cjs-event-nav")).toBeVisible();
    await expect(page.getByRole("banner").getByRole("navigation")).toHaveCount(
      0,
    );
  });

  test("EventNav is sticky at desktop width and static at mobile width", async ({
    page,
  }) => {
    await expectEventNavPosition(page);
  });
});

test.describe("Event pages by type", () => {
  const pages = {
    "Talk page": firstBuilt(/^\d{4}\/talks\/[^/]+\.html$/),
    "Sponsor page": firstBuilt(/^\d{4}\/sponsors\/[^/]+\.html$/),
    "nested Event markdown page": nestedMarkdown,
  };
  for (const [type, path] of Object.entries(pages)) {
    test(`${type} shows the EventNav and not the SiteHeader`, async ({
      page,
    }) => {
      test.skip(!path, `no ${type}`);
      await page.goto(`/${path}`);
      await expect(page.locator(".cjs-event-nav")).toBeVisible();
      await expect(
        page.getByRole("banner").getByRole("navigation"),
      ).toHaveCount(0);
    });
  }
});
