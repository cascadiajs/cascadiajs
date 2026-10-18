import { readFileSync } from "node:fs";
import { join } from "node:path";
import { test, expect } from "@playwright/test";
import { EVENTS_WITH_PAGES, filesUnder } from "./helpers";

/**
 * MDX pages resolve images through src/assets (ticket #78). The page is
 * chosen by type: the first Event markdown page that embeds an image.
 */

/** The first Event markdown page that references `@assets/`. */
function markdownPageWithImagePath(): string {
  for (const { year: key } of EVENTS_WITH_PAGES) {
    const dir = join("src/content/markdown", key);
    for (const file of filesUnder(dir, /\.mdx?$/)) {
      if (readFileSync(join(dir, file), "utf8").includes("](@assets/")) {
        return `/${key}/${file.replace(/\.mdx?$/, "")}`;
      }
    }
  }
  throw new Error("no Event markdown page embeds an image");
}

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
