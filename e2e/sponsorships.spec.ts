import { test, expect, type Page, type Locator } from "@playwright/test";

/**
 * Sponsorship brochure page (issue #73): a standalone marketing page at
 * /2026/sponsorships with its own compact nav bar (displayNav={false} on
 * Layout suppresses the SiteHeader nav) and a mint-tinted hero/pitch/pricing
 * flow. The page has no section ids to hang off of beyond
 * #event-at-a-glance, #book-call, #testimonials, and #sponsors, so the hero
 * and add-ons sections are located structurally by the heading each one
 * wraps.
 */

const SPONSORSHIPS_URL = "/2026/sponsorships";

function heroSection(page: Page): Locator {
  return page.locator("section", {
    has: page.getByRole("heading", {
      level: 1,
      name: "CascadiaJS 2026 Sponsorship Brochure",
    }),
  });
}

function addOnsSection(page: Page): Locator {
  return page.locator("section", {
    has: page.getByRole("heading", { level: 2, name: "Sponsorship Add-Ons" }),
  });
}

test.describe("Sponsorships brochure page", () => {
  test.beforeEach(async ({ page }) => {
    // The Testimonials section (shared, unmodified by this page) loads X's
    // widget script. Block it at the network layer, same as the 2026 event
    // page spec, so the fallback DOM stays deterministic.
    await page.route(
      /^https:\/\/(platform\.twitter\.com|.*\.twimg\.com)\//,
      (route) => route.abort(),
    );
    await page.goto(SPONSORSHIPS_URL);
  });

  test("renders at /2026/sponsorships", async ({ page }) => {
    await expect(page.locator("body")).toBeVisible();
  });

  // -- Custom nav bar --------------------------------------------------------

  test("custom nav bar shows the event dates", async ({ page }) => {
    await expect(page.getByText("June 1-2, 2026")).toBeVisible();
  });

  // -- Hero ------------------------------------------------------------------

  test("hero shows the headline", async ({ page }) => {
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "CascadiaJS 2026 Sponsorship Brochure",
      }),
    ).toBeVisible();
  });

  test("hero shows both CTAs with the correct destinations", async ({
    page,
  }) => {
    const hero = heroSection(page);

    const bookCta = hero.getByRole("link", { name: "Book a time to talk" });
    await expect(bookCta).toBeVisible();
    await expect(bookCta).toHaveAttribute(
      "href",
      "https://calendly.com/elise-worthy",
    );

    const learnMoreCta = hero.getByRole("link", {
      name: "Learn more",
      exact: false,
    });
    await expect(learnMoreCta).toBeVisible();
    await expect(learnMoreCta).toHaveAttribute("href", "#event-at-a-glance");
  });

  test("hero image is visible", async ({ page }) => {
    await expect(
      page.getByRole("img", { name: "CascadiaJS 2026 sponsorship brochure" }),
    ).toBeVisible();
  });

  // -- Event-at-a-glance headings --------------------------------------------

  test("What It Is heading is visible", async ({ page }) => {
    await expect(
      page.getByRole("heading", { level: 2, name: "What It Is" }),
    ).toBeVisible();
  });

  test("Who Attends heading is visible", async ({ page }) => {
    await expect(
      page.getByRole("heading", { level: 2, name: "Who Attends" }),
    ).toBeVisible();
  });

  test("Why Sponsor heading is visible with all four subsections", async ({
    page,
  }) => {
    await expect(
      page.getByRole("heading", { level: 2, name: "Why Sponsor" }),
    ).toBeVisible();
    for (const heading of [
      "For Developer Tools & Platforms",
      "For Recruiting & Employer Brand",
      "For AI, Cloud & Infrastructure",
      "To Give Back",
    ]) {
      await expect(
        page.getByRole("heading", { level: 3, name: heading }),
      ).toBeVisible();
    }
  });

  // -- Pricing table -----------------------------------------------------

  test("pricing table lists all six tier names", async ({ page }) => {
    const table = page.locator("table");
    for (const tier of [
      "Diamond",
      "Platinum",
      "Gold",
      "Silver",
      "Bronze",
      "Community",
    ]) {
      await expect(
        table.getByRole("columnheader", { name: tier }),
      ).toBeVisible();
    }
  });

  test("pricing table shows all six prices", async ({ page }) => {
    const table = page.locator("table");
    for (const price of ["$40k", "$30k", "$20k", "$8k", "$5k", "$2500"]) {
      await expect(table.getByText(price, { exact: true })).toBeVisible();
    }
  });

  test("pricing table shows Diamond and Platinum sold out, Gold with one left", async ({
    page,
  }) => {
    const quantityRow = page.locator("table tr", { hasText: "Quantity" });
    await expect(
      quantityRow.getByText("Sold out!", { exact: true }),
    ).toHaveCount(2);
    await expect(quantityRow).toContainText("1 left!");
  });

  // -- Add-ons -------------------------------------------------------------

  test("add-ons section lists all twelve add-ons", async ({ page }) => {
    const addOns = addOnsSection(page);
    for (const item of [
      "Workshop",
      "Welcome Reception",
      "Networking Mixer",
      "Karaoke",
      "Coffee",
      "Lanyards",
      "Tote Bags",
      "Videos",
      "Photo Booth",
      "Child Care",
      "ASL Interpretation",
      "Scholarships",
    ]) {
      await expect(
        addOns.getByRole("heading", { level: 3, name: item, exact: false }),
      ).toBeVisible();
    }
  });

  test("closing CTA links to Calendly", async ({ page }) => {
    const cta = addOnsSection(page).getByRole("link", {
      name: "Book a time to talk",
    });
    await expect(cta).toBeVisible();
    await expect(cta).toHaveAttribute(
      "href",
      "https://calendly.com/elise-worthy",
    );
  });

  // -- Testimonials and sponsors ---------------------------------------------

  test("testimonials section is present", async ({ page }) => {
    await expect(page.locator("#testimonials")).toBeVisible();
  });

  // -- Fidelity spot-checks (ADR-0015) ---------------------------------------

  test("hero section uses the mint background", async ({ page }) => {
    const bg = await heroSection(page).evaluate(
      (el) => getComputedStyle(el).backgroundColor,
    );
    expect(bg).toBe("rgb(204, 241, 219)");
  });

  test("add-ons section uses the mint background", async ({ page }) => {
    const bg = await addOnsSection(page).evaluate(
      (el) => getComputedStyle(el).backgroundColor,
    );
    expect(bg).toBe("rgb(204, 241, 219)");
  });

  test("nav bar uses the emerald-city-green background", async ({ page }) => {
    const nav = page.locator("nav", { hasText: "June 1-2, 2026" });
    const bg = await nav.evaluate((el) => getComputedStyle(el).backgroundColor);
    expect(bg).toBe("rgb(23, 195, 123)");
  });
});
