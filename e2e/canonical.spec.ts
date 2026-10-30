import { expect, test, type Page } from "@playwright/test";

/**
 * Canonical URLs. The sitewide rules (no internal link with a trailing slash,
 * no `.html` in a URL) are checked on every page in link-crawl.spec.ts.
 */

// The Featured Event lives at "/", so check a past Event root.
const eventRoot = "/2026";

const canonical = (page: Page) => page.locator('link[rel="canonical"]');

test.describe("Canonical URLs", () => {
  test("homepage canonical keeps its root slash", async ({ page }) => {
    await page.goto("/");
    await expect(canonical(page)).toHaveAttribute(
      "href",
      "https://cascadiajs.com/",
    );
  });

  test("event root canonical has no trailing slash", async ({ page }) => {
    await page.goto(eventRoot);
    await expect(canonical(page)).toHaveAttribute(
      "href",
      `https://cascadiajs.com${eventRoot}`,
    );
  });

  test("a markdown page canonical has no trailing slash and no .html", async ({
    page,
  }) => {
    await page.goto("/code-of-conduct");
    await expect(canonical(page)).toHaveAttribute(
      "href",
      "https://cascadiajs.com/code-of-conduct",
    );
  });
});
