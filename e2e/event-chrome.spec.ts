import { test, expect, type Page } from "@playwright/test";
import { FEATURED_EVENT } from "@shared/site-defaults";
import { DESKTOP, MOBILE } from "./helpers";

/**
 * Event chrome: the Featured Event root shows the EventNav, and the EventNav
 * is sticky at desktop width. That EventLayout shows the EventNav and not the
 * SiteHeader is a Container test in `src/layouts/EventLayout.test.ts`.
 */

async function expectEventNavPosition(page: Page) {
  const nav = page.locator(".cjs-event-nav");
  await page.setViewportSize(DESKTOP);
  expect(await nav.evaluate((el) => getComputedStyle(el).position)).toBe(
    "sticky",
  );
  await page.setViewportSize(MOBILE);
  expect(await nav.evaluate((el) => getComputedStyle(el).position)).toBe(
    "static",
  );
}

test.describe("Featured Event root", () => {
  const root = `/${FEATURED_EVENT}`;

  test("shows the EventNav with the logo linked to the Event root", async ({
    page,
  }) => {
    await page.goto(root);
    const nav = page.locator(".cjs-event-nav").getByRole("navigation");
    await expect(nav).toBeVisible();
    await expect(nav.getByRole("link").first()).toHaveAttribute("href", root);
  });

  test("EventNav is sticky at desktop width and static at mobile width", async ({
    page,
  }) => {
    await page.goto(root);
    await expectEventNavPosition(page);
  });
});
