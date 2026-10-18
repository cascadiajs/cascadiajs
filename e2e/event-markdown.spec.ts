import { test, expect } from "@playwright/test";
import { filesUnder } from "./helpers";

/**
 * Event markdown pages get the EventNav instead of the SiteHeader nav; that
 * check lives in event-chrome.spec.ts and runs once on one page chosen by
 * type. Root-level markdown pages keep the normal SiteHeader nav.
 */

test.describe("root-level markdown pages keep the normal SiteHeader nav", () => {
  test("renders SiteHeader, not EventNav", async ({ page }) => {
    // The page is chosen by type: the first root-level markdown file.
    const [file] = filesUnder("src/content/markdown", /^[^/\\]+\.mdx?$/);
    await page.goto(`/${file.replace(/\.mdx?$/, "")}`);
    await expect(page.locator("#logo")).toBeVisible();
    await expect(page.locator(".cjs-event-nav")).toHaveCount(0);
  });
});
