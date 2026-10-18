import { test, expect } from "@playwright/test";

/**
 * MDX pages resolve images through src/assets (ticket #78). Copy, CTA and
 * color checks were removed: the suite checks neither copy nor computed
 * styles.
 */

test.describe("MDX page image", () => {
  test("speaker image is visible and loaded", async ({ page }) => {
    await page.goto("/2026/trainings/ai-for-typescript-developers");
    const image = page.getByRole("img", { name: "Eve Porcello" });
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
