import { test, expect } from "@playwright/test";
import { EVENTS_WITH_PAGES } from "./helpers";
import sponsors from "@shared/data/sponsors.json" with { type: "json" };

/**
 * Sponsor route: data to page, one direction only. Each Sponsor of an Event
 * with a description has a page. An Event with no such Sponsor skips.
 */
for (const { year } of EVENTS_WITH_PAGES) {
  const withPages = sponsors.filter(
    (s) => s.events.includes(year) && s.description,
  );
  test.describe(`Sponsor pages for an Event with pages (${year})`, () => {
    test.skip(withPages.length === 0, "Event has no Sponsor data");
    for (const { id } of withPages) {
      test(`Sponsor ${id} has a page`, async ({ request }) => {
        const response = await request.get(`/${year}/sponsors/${id}`);
        expect(response.status()).toBe(200);
      });
    }
  });
}

test("an unknown Sponsor slug returns 404", async ({ request }) => {
  const [{ year }] = EVENTS_WITH_PAGES;
  const response = await request.get(`/${year}/sponsors/no-such-sponsor`);
  expect(response.status()).toBe(404);
});
