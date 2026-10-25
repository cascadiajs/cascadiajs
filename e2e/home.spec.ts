import { test, expect } from "@playwright/test";
import { FEATURED_EVENT } from "@shared/site-defaults";

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
    expect(navHrefs).toContain(`/${FEATURED_EVENT}`);
    await expect(page.getByRole("contentinfo")).toBeVisible();
  });
});
