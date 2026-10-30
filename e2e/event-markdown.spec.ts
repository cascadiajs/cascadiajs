import { test, expect } from "@playwright/test";

/**
 * Event markdown pages get the EventNav instead of the SiteHeader nav; that
 * check lives in event-chrome.spec.ts. Root-level markdown pages get the
 * Featured Event's EventNav when their frontmatter sets `featuredEventNav`,
 * which every one currently does. The SiteHeader check lives in
 * blog-index.spec.ts.
 */

test.describe("featuredEventNav markdown pages get the home page's EventNav", () => {
  for (const path of [
    "/code-of-conduct",
    "/mailing-list",
    "/media-kit",
    "/welcome",
    "/unsubscribed",
    "/mailing-list-thanks",
  ]) {
    test(`${path} renders EventNav, not the SiteHeader nav`, async ({
      page,
    }) => {
      await page.goto(path);
      const nav = page.getByRole("navigation");
      await expect(nav).toHaveCount(1);
      // The Featured Event's root is `/`, and only EventNav has Tickets.
      await expect(
        nav.getByRole("link", { name: "CascadiaJS logo" }),
      ).toHaveAttribute("href", "/");
      await expect(nav.getByRole("link", { name: "Tickets" })).toBeVisible();
    });
  }
});
