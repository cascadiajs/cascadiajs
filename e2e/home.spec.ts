import { test, expect } from "@playwright/test";
import {
  expectPastSponsorsMatchFeaturedEvent,
  expectSiteChrome,
} from "./helpers";

test.describe("home page", () => {
  test.beforeEach(async ({ page }) => {
    // Block X's widgets.js so the fallback DOM stays deterministic and the
    // suite does not depend on a third party.
    await page.route(
      /^https:\/\/(platform\.twitter\.com|.*\.twimg\.com)\//,
      (route) => route.abort(),
    );
    await page.goto("/");
  });

  test("shows the SiteHeader with its logo linked home, and the footer", async ({
    page,
  }) => {
    await expectSiteChrome(page);
  });

  test("Past Sponsors grid hides Sponsors whose only Event is the Featured Event", async ({
    page,
  }) => {
    await expectPastSponsorsMatchFeaturedEvent(page);
  });

  test("testimonials stay readable when the X widget script does not load", async ({
    page,
  }) => {
    const blockquotes = page.locator("#testimonials blockquote.twitter-tweet");
    expect(await blockquotes.count()).toBeGreaterThan(0);
    for (const blockquote of await blockquotes.all()) {
      await expect(blockquote).toBeVisible();
      expect(
        ((await blockquote.textContent()) ?? "").trim().length,
      ).toBeGreaterThan(0);
      await expect(blockquote.getByRole("link").first()).toBeVisible();
    }
  });
});
