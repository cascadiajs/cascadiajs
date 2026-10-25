import { test, expect } from "@playwright/test";

/**
 * Event markdown pages get the EventNav instead of the SiteHeader nav; that
 * check lives in event-chrome.spec.ts. Root-level markdown pages keep the
 * normal SiteHeader nav.
 */

test.describe("root-level markdown pages keep the normal SiteHeader nav", () => {
  test("renders SiteHeader, not EventNav", async ({ page }) => {
    await page.goto("/code-of-conduct");
    await expect(page.getByRole("banner")).toBeVisible();
    await expect(page.getByRole("navigation", { name: "Event" })).toHaveCount(
      0,
    );
  });
});
