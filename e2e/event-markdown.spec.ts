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
    // One nav, and its logo links to the site root, not to an Event root.
    const nav = page.getByRole("navigation");
    await expect(nav).toHaveCount(1);
    await expect(
      nav.getByRole("link", { name: "CascadiaJS logo" }),
    ).toHaveAttribute("href", "/");
    // The Featured Event's landing page is the site root too.
    await expect(
      nav.getByRole("link", { name: /^CascadiaJS \d{4}$/ }),
    ).toHaveAttribute("href", "/");
  });
});
