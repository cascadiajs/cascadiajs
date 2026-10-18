import { test, expect } from "@playwright/test";
import { existsSync, readFileSync } from "node:fs";
import { EVENTS_WITH_PAGES } from "./helpers";
import type { Talk } from "@shared/data/types";

/**
 * Talk route: data to page, one direction only. Each Talk with a slug in an
 * Event's data has a page. An Event with no Talk data skips.
 */
for (const { year } of EVENTS_WITH_PAGES) {
  const file = `src/shared/data/${year}/talks.json`;
  test.describe(`Talk pages for an Event with pages (${year})`, () => {
    test.skip(!existsSync(file), "Event has no Talk data");
    const talks: Talk[] = existsSync(file)
      ? JSON.parse(readFileSync(file, "utf8"))
      : [];
    for (const { slug } of talks.filter((t) => t.slug)) {
      test(`Talk ${slug} has a page`, async ({ request }) => {
        const response = await request.get(`/${year}/talks/${slug}`);
        expect(response.status()).toBe(200);
      });
    }
  });
}

test("an unknown Talk slug returns 404", async ({ request }) => {
  const [{ year }] = EVENTS_WITH_PAGES;
  const response = await request.get(`/${year}/talks/no-such-talk-slug`);
  expect(response.status()).toBe(404);
});
