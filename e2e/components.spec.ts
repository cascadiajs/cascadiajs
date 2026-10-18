import { test, expect, type Page } from "@playwright/test";
import { DESKTOP, EVENTS_WITH_PAGES, MOBILE } from "./helpers";

/**
 * Component behavior checks. Each check finds its component by class name
 * and runs once, on the first match on the first page that has it. Pages
 * come from the Events with pages, so no spec names a year. No check reads
 * copy, counts or computed colors and sizes.
 */

const candidatePages = EVENTS_WITH_PAGES.flatMap(({ year }) => [
  `/${year}`,
  `/${year}/schedule`,
]);

/** Go to the first candidate page with at least `min` matches of `selector`. */
async function gotoPageWith(page: Page, selector: string, min = 1) {
  for (const path of candidatePages) {
    const response = await page.goto(path);
    if (response?.ok() && (await page.locator(selector).count()) >= min) {
      return;
    }
  }
  throw new Error(`no page has ${min} match(es) of ${selector}`);
}

/** Assert that the second box sits beside the first at desktop and below it at mobile. */
async function expectSideBySideThenStacked(
  page: Page,
  selector: string,
  tolerance = 2,
) {
  const first = page.locator(selector).nth(0);
  const second = page.locator(selector).nth(1);

  await page.setViewportSize(DESKTOP);
  const desktopFirst = (await first.boundingBox())!;
  const desktopSecond = (await second.boundingBox())!;
  expect(Math.abs(desktopFirst.y - desktopSecond.y)).toBeLessThan(tolerance);
  expect(desktopSecond.x).toBeGreaterThan(desktopFirst.x);

  await page.setViewportSize(MOBILE);
  const mobileFirst = (await first.boundingBox())!;
  const mobileSecond = (await second.boundingBox())!;
  expect(mobileSecond.y).toBeGreaterThanOrEqual(
    mobileFirst.y + mobileFirst.height - tolerance,
  );
}

test.describe("card grids", () => {
  test("image mosaic items sit side by side at desktop width and stack at mobile width", async ({
    page,
  }) => {
    await gotoPageWith(page, ".image-mosaic img", 2);
    await expectSideBySideThenStacked(page, ".image-mosaic img");
  });

  test("ticket cards sit side by side at desktop width and stack at mobile width", async ({
    page,
  }) => {
    await gotoPageWith(page, ".ticket-grid .ticket-card", 2);
    await expectSideBySideThenStacked(page, ".ticket-grid .ticket-card");
  });
});

test.describe("speaker card overlay", () => {
  test("shows only at desktop width", async ({ page }) => {
    await gotoPageWith(page, ".talk-card-overlay");
    const overlay = page.locator(".talk-card-overlay").first();

    await page.setViewportSize(DESKTOP);
    expect(
      await overlay.evaluate((el) => getComputedStyle(el).display),
    ).not.toBe("none");

    await page.setViewportSize(MOBILE);
    expect(await overlay.evaluate((el) => getComputedStyle(el).display)).toBe(
      "none",
    );
  });
});

test.describe("hero", () => {
  test("headline wraps and the hero stays inside the viewport at desktop and mobile width", async ({
    page,
  }) => {
    await gotoPageWith(page, ".video-hero h2");
    const hero = page.locator(".video-hero").first();
    const headline = page.locator(".video-hero h2").first();

    for (const viewport of [DESKTOP, MOBILE]) {
      await page.setViewportSize(viewport);
      const heroBox = (await hero.boundingBox())!;
      expect(
        heroBox.width,
        `hero wider than viewport at ${viewport.width}px`,
      ).toBeLessThanOrEqual(viewport.width);

      const headlineBox = (await headline.boundingBox())!;
      expect(
        headlineBox.x + headlineBox.width,
        `headline past viewport at ${viewport.width}px`,
      ).toBeLessThanOrEqual(viewport.width);

      // A single line is about one line-height tall; wrapped text is taller.
      const lineHeight = await headline.evaluate((el) => {
        const cs = getComputedStyle(el);
        const parsed = parseFloat(cs.lineHeight);
        return Number.isNaN(parsed) ? parseFloat(cs.fontSize) * 1.5 : parsed;
      });
      expect(
        headlineBox.height,
        `headline on one line at ${viewport.width}px`,
      ).toBeGreaterThan(lineHeight * 1.5);
    }
  });
});

test.describe("schedule", () => {
  test("Tracks sit side by side at desktop width and stack at mobile width", async ({
    page,
  }) => {
    await gotoPageWith(page, ".day-content .track", 2);
    await expectSideBySideThenStacked(page, ".day-content .track");
  });
});

test.describe("external links", () => {
  /** True when the link's ::after generates the external-link glyph. */
  const hasIndicator = (link: ReturnType<Page["locator"]>) =>
    link.evaluate((el) => getComputedStyle(el, "::after").content !== "none");

  test("external links show the external-link icon and internal links do not", async ({
    page,
  }) => {
    await gotoPageWith(
      page,
      '.mark-external-links a[target="_blank"], .mark-external-links a[href^="/"]:not([target="_blank"])',
    );
    const external = page
      .locator('.mark-external-links a[target="_blank"]')
      .first();
    const internal = page
      .locator('.mark-external-links a[href^="/"]:not([target="_blank"])')
      .first();
    await expect(external).toBeAttached();
    await expect(internal).toBeAttached();
    expect(await hasIndicator(external)).toBe(true);
    expect(await hasIndicator(internal)).toBe(false);
  });
});
