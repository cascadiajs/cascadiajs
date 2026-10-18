import { test, expect } from "@playwright/test";

/**
 * Event markdown pages get the EventNav instead of the SiteHeader nav; that
 * check lives in event-chrome.spec.ts and runs once on one page chosen by
 * type. Root-level markdown pages keep the normal SiteHeader nav.
 */

test.describe("root-level markdown pages keep the normal SiteHeader nav", () => {
  test("/welcome still renders SiteHeader, not EventNav", async ({ page }) => {
    await page.goto("/welcome");
    await expect(page.locator("#logo")).toBeVisible();
    await expect(page.locator("#nav")).toHaveCount(0);
  });

  test("/code-of-conduct still renders SiteHeader, not EventNav", async ({
    page,
  }) => {
    await page.goto("/code-of-conduct");
    await expect(page.locator("#logo")).toBeVisible();
    await expect(page.locator("#nav")).toHaveCount(0);
  });
});
