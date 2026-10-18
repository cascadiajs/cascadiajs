import { test, expect } from "@playwright/test";
import sponsors from "@shared/data/sponsors.json" with { type: "json" };
import { FEATURED_EVENT } from "@shared/site-defaults";
import { EVENTS_WITH_PAGES } from "./helpers";

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
    const banner = page.getByRole("banner");
    const alert = banner.locator(".cjs-alert-banner");
    await expect(alert).toBeVisible();
    await expect(alert.getByRole("link")).not.toHaveCount(0);
    const logo = banner.locator("#logo");
    await expect(logo).toBeVisible();
    await expect(logo).toHaveAttribute("href", "/");
    const eventLink = banner.getByRole("navigation").getByRole("link").nth(1);
    const href = await eventLink.getAttribute("href");
    expect(EVENTS_WITH_PAGES.map((e) => `/${e.year}`)).toContain(href);
    await expect(page.getByRole("contentinfo")).toBeVisible();
  });

  test("Past Sponsors grid hides Sponsors whose only Event is the Featured Event", async ({
    page,
  }) => {
    // Same rule as the component: a Sponsor is hidden only when every one of
    // its Events is the Featured Event.
    const expected = sponsors
      .filter((s) => s.events.some((e) => e !== FEATURED_EVENT))
      .map((s) => s.id)
      .sort();
    const ids = await page
      .locator("#sponsors .cjs-sponsors-grid > [id^='sponsor-']")
      .evaluateAll((items) =>
        items.map((item) => item.id.slice("sponsor-".length)),
      );
    expect(ids.sort()).toEqual(expected);
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
