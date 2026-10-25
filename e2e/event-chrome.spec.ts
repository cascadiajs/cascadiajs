import { test, expect, type Page } from "@playwright/test";
import { DESKTOP, eventMarkdownPagePath, MOBILE, EVENT_ROOTS } from "./helpers";

/**
 * Event chrome: each Event root shows the EventNav, and the EventNav is
 * sticky at desktop width. Roots come from the Events with pages whose root
 * is built, so a new Event is covered with no edit, and a new Event config
 * without a root page yet is skipped. That EventLayout shows the EventNav and
 * not the SiteHeader is a Container test in `src/layouts/EventLayout.test.ts`.
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

test.describe("Event roots", () => {
  for (const root of EVENT_ROOTS) {
    test(`${root} shows the EventNav with the logo linked to the Event root`, async ({
      page,
    }) => {
      await page.goto(root);
      const nav = page.locator(".cjs-event-nav").getByRole("navigation");
      await expect(nav).toBeVisible();
      await expect(nav.getByRole("link").first()).toHaveAttribute("href", root);
    });

    test(`${root} EventNav is sticky at desktop width and static at mobile width`, async ({
      page,
    }) => {
      await page.goto(root);
      await expectEventNavPosition(page);
    });
  }
});

test.describe("Event markdown page", () => {
  const path = eventMarkdownPagePath();
  test.skip(!path, "no Event has a markdown page");

  test.beforeEach(async ({ page }) => {
    await page.goto(path!);
  });

  test("EventNav is sticky at desktop width and static at mobile width", async ({
    page,
  }) => {
    await expectEventNavPosition(page);
  });
});
