import { expect, test } from "@playwright/test";
import { postWithImage } from "./blog-helpers";

/** Blog Post progress bar: CSS scroll timeline, no JS, hidden for reduced motion. */
const POST = `/blog/post/${postWithImage().slug}`;

const fillWidth = async (page: import("@playwright/test").Page) =>
  (await page.locator(".cjs-progress-bar-fill").boundingBox())!.width;

test.describe("Blog progress bar", () => {
  test("is present on a Post page and its fill grows as the page scrolls", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 400 });
    await page.goto(POST);
    const bar = page.locator(".cjs-progress-bar");
    await expect(bar).toBeVisible();
    const start = await fillWidth(page);
    const scrollable = await page.evaluate(
      () => document.documentElement.scrollHeight - window.innerHeight,
    );
    expect(scrollable).toBeGreaterThan(200);
    await page.evaluate((y) => window.scrollTo(0, y), scrollable / 2);
    await expect.poll(() => fillWidth(page)).toBeGreaterThan(start);
    const middle = await fillWidth(page);
    await page.evaluate((y) => window.scrollTo(0, y), scrollable);
    await expect.poll(() => fillWidth(page)).toBeGreaterThan(middle);
  });

  test("stays at the top after the header scrolls away", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 400 });
    await page.goto(POST);
    const bar = page.locator(".cjs-progress-bar");
    const initialTop = (await bar.boundingBox())!.y;
    expect(initialTop).toBeGreaterThan(0);
    await page.evaluate(() => window.scrollTo(0, 300));
    await expect.poll(async () => (await bar.boundingBox())!.y).toBe(0);
  });

  test("is hidden under reduced motion", async ({ browser }) => {
    const context = await browser.newContext({ reducedMotion: "reduce" });
    const page = await context.newPage();
    await page.goto(POST);
    await expect(page.locator(".cjs-progress-bar")).toBeHidden();
    await context.close();
  });

  test("does not appear on non-Post pages", async ({ page }) => {
    for (const path of ["/", "/code-of-conduct"]) {
      await page.goto(path);
      await expect(page.locator(".cjs-progress-bar")).toHaveCount(0);
    }
  });

  test("ships no script for the bar", async ({ page }) => {
    await page.goto(POST);
    await expect(page.locator(".cjs-progress-bar script")).toHaveCount(0);
  });
});
