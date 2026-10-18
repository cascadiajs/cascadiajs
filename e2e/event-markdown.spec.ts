import { test, expect } from "@playwright/test";
import { rootMarkdownPagePath } from "./helpers";

/**
 * Event markdown pages get the EventNav instead of the SiteHeader nav; that
 * check lives in event-chrome.spec.ts and runs once on one page chosen by
 * type. Root-level markdown pages keep the normal SiteHeader nav.
 */

test.describe("root-level markdown pages keep the normal SiteHeader nav", () => {
  test("renders SiteHeader, not EventNav", async ({ page }) => {
    await page.goto(rootMarkdownPagePath());
    await expect(page.locator("#logo")).toBeVisible();
    await expect(page.locator(".event-nav")).toHaveCount(0);
  });
});
