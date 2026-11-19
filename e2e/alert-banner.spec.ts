import { test, expect, type Page } from "@playwright/test";

// The alert banner counts down to the price increase at midnight Pacific at
// the end of Nov 22, 2026 (PRICE_INCREASE_AT). Each test pins the clock, so
// the results don't depend on the day the suite runs.
const at = (time: string) => async (page: Page) =>
  page.clock.setFixedTime(new Date(time));

const banner = (page: Page) => page.locator(".cjs-alert-banner");

test.describe("the alert banner", () => {
  test("counts the days until prices go up, and links to /tickets", async ({
    page,
  }) => {
    await at("2026-11-19T10:00:00-08:00")(page);
    await page.goto("/about");
    await expect(banner(page)).toHaveText(
      "Last chance for Blind Bird tickets! Prices go up in 4 days. Save $100",
      { useInnerText: true },
    );
    await expect(
      banner(page).getByRole("link", { name: "Save $100" }),
    ).toHaveAttribute("href", "/tickets");
  });

  test("says tonight on the last day", async ({ page }) => {
    await at("2026-11-22T09:00:00-08:00")(page);
    await page.goto("/about");
    await expect(banner(page)).toContainText("Prices go up tonight.");
  });

  test("is gone once prices have gone up", async ({ page }) => {
    await at("2026-11-23T00:00:00-08:00")(page);
    await page.goto("/about");
    await expect(banner(page)).toBeHidden();
  });

  for (const path of ["/", "/about", "/travel", "/blog"]) {
    test(`shows on ${path}`, async ({ page }) => {
      await at("2026-11-19T10:00:00-08:00")(page);
      await page.goto(path);
      await expect(banner(page)).toBeVisible();
    });
  }

  for (const path of [
    "/tickets",
    "/buy-tickets",
    "/sponsor",
    "/sponsorships",
  ]) {
    test(`isn't on ${path}`, async ({ page }) => {
      await at("2026-11-19T10:00:00-08:00")(page);
      await page.goto(path);
      await expect(banner(page)).toHaveCount(0);
    });
  }

  test("sits above the sticky nav, which moves up as it scrolls away", async ({
    page,
  }) => {
    await at("2026-11-19T10:00:00-08:00")(page);
    await page.goto("/about");
    const nav = page.getByRole("navigation", { name: "Main" });
    const bannerBottom = async () =>
      (await banner(page).boundingBox())!.y +
      (await banner(page).boundingBox())!.height;

    expect((await nav.boundingBox())!.y).toBeCloseTo(await bannerBottom(), 0);

    await page.evaluate(() => scrollTo(0, 20));
    await expect
      .poll(async () => (await nav.boundingBox())!.y)
      .toBeCloseTo(await bannerBottom(), 0);

    await page.evaluate(() => scrollTo(0, 600));
    await expect.poll(async () => (await nav.boundingBox())!.y).toBe(0);
  });

  test("fits a phone without scrolling sideways", async ({ page }) => {
    await at("2026-11-19T10:00:00-08:00")(page);
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/about");
    await expect(banner(page)).toBeVisible();
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - innerWidth,
    );
    expect(overflow).toBeLessThanOrEqual(0);
  });
});
