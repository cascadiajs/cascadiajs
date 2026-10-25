import { test, expect } from "@playwright/test";
import { EVENT_ROOTS } from "./helpers";

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
    const logo = banner.locator("#logo");
    await expect(logo).toBeVisible();
    await expect(logo).toHaveAttribute("href", "/");
    const navHrefs = await banner
      .getByRole("navigation")
      .getByRole("link")
      .evaluateAll((links) => links.map((link) => link.getAttribute("href")));
    expect(navHrefs.some((href) => EVENT_ROOTS.includes(href!))).toBe(true);
    await expect(page.getByRole("contentinfo")).toBeVisible();
  });

  test("the alert banner, when shown, holds a link", async ({ page }) => {
    const alert = page.getByRole("banner").locator(".cjs-alert-banner");
    test.skip((await alert.count()) === 0, "the alert banner is off");
    await expect(alert).toBeVisible();
    await expect(alert.getByRole("link")).not.toHaveCount(0);
  });

  test("testimonials stay readable when the X widget script does not load", async ({
    page,
  }) => {
    const blockquotes = page.locator("#testimonials blockquote.twitter-tweet");
    test.skip(
      (await blockquotes.count()) === 0,
      "the homepage has no Testimonials",
    );
    for (const blockquote of await blockquotes.all()) {
      await expect(blockquote).toBeVisible();
      expect(
        ((await blockquote.textContent()) ?? "").trim().length,
      ).toBeGreaterThan(0);
      await expect(blockquote.getByRole("link").first()).toBeVisible();
    }
  });
});
