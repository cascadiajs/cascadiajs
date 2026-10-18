import { test, expect } from "@playwright/test";
import { markdownPageWithImagePath } from "./helpers";

/**
 * MDX pages resolve images through src/assets (ticket #78). The page is
 * chosen by type: the first Event markdown page that embeds an image.
 */

test.describe("MDX page image", () => {
  test("image is visible and loaded", async ({ page }) => {
    await page.goto(markdownPageWithImagePath());
    const image = page.locator(".prose-content img").first();
    await expect(image).toBeVisible();

    await image.scrollIntoViewIfNeeded();
    await expect(async () => {
      const naturalWidth = await image.evaluate(
        (img: HTMLImageElement) => img.naturalWidth,
      );
      expect(naturalWidth).toBeGreaterThan(0);
    }).toPass();
  });
});
