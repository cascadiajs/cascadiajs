import { test, expect, type Page } from "@playwright/test";
import { FEATURED_EVENT } from "@shared/site-defaults";
import { DESKTOP, MOBILE } from "./helpers";

/**
 * Event chrome: the Featured Event root shows the EventNav, and the EventNav
 * is sticky at desktop width. That EventLayout shows the EventNav and not the
 * SiteHeader is a Container test in `src/layouts/EventLayout.test.ts`.
 */

async function scrollDown(page: Page) {
  await page.evaluate(() => window.scrollTo(0, 2500));
  await expect
    .poll(() => page.evaluate(() => window.scrollY))
    .toBeGreaterThan(0);
}

test.describe("Featured Event root", () => {
  const root = `/${FEATURED_EVENT}`;

  test("shows the EventNav with the logo linked to the Event root", async ({
    page,
  }) => {
    await page.goto(root);
    const nav = page.getByRole("navigation");
    await expect(nav).toBeVisible();
    await expect(nav.getByRole("link").first()).toHaveAttribute("href", root);
  });

  test("EventNav stays at the top after a scroll at desktop width", async ({
    page,
  }) => {
    await page.setViewportSize(DESKTOP);
    await page.goto(root);
    await scrollDown(page);
    const nav = page.getByRole("navigation");
    await expect.poll(async () => (await nav.boundingBox())?.y).toBe(0);
  });

  test("EventNav scrolls away at mobile width", async ({ page }) => {
    await page.setViewportSize(MOBILE);
    await page.goto(root);
    await scrollDown(page);
    const nav = page.getByRole("navigation");
    await expect.poll(async () => (await nav.boundingBox())?.y).toBeLessThan(0);
  });
});
