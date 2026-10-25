import { test, expect, type Page } from "@playwright/test";
import { DESKTOP, EVENT_ROOTS, MOBILE } from "./helpers";

/**
 * Component behavior checks. Each check finds its component by class name
 * and runs once, on the first match on the first page that has it. Pages
 * come from the built Event roots, so no spec names a year. A check skips
 * when no page has its component, so removing a section or data entry does
 * not fail the suite. No check reads copy, counts or computed colors and
 * sizes.
 */

const candidatePages = EVENT_ROOTS.flatMap((root) => [
  root,
  `${root}/schedule`,
]);

/**
 * Go to the first candidate page with at least `min` matches of `selector`.
 * Skip the test when no page has them.
 */
async function gotoPageWith(page: Page, selector: string, min = 1) {
  for (const path of candidatePages) {
    const response = await page.goto(path);
    if (response?.ok() && (await page.locator(selector).count()) >= min) {
      return;
    }
  }
  test.skip(true, `no page has ${min} match(es) of ${selector}`);
}
/** True when the link's ::after generates the external-link glyph. */
const hasIndicator = (link: ReturnType<Page["locator"]>) =>
  link.evaluate((el) => getComputedStyle(el, "::after").content !== "none");

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
    await gotoPageWith(page, ".cjs-image-mosaic img", 2);
    await expectSideBySideThenStacked(page, ".cjs-image-mosaic img");
  });

  test("ticket cards sit side by side at desktop width and stack at mobile width", async ({
    page,
  }) => {
    await gotoPageWith(page, ".cjs-ticket-grid .cjs-ticket-card", 2);
    await expectSideBySideThenStacked(
      page,
      ".cjs-ticket-grid .cjs-ticket-card",
    );
  });
});

test.describe("speaker card overlay", () => {
  test("shows only at desktop width", async ({ page }) => {
    await gotoPageWith(page, ".cjs-talk-card-overlay");
    const overlay = page.locator(".cjs-talk-card-overlay").first();

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
  test("headline can wrap and the hero stays inside the viewport at desktop and mobile width", async ({
    page,
  }) => {
    await gotoPageWith(page, ".cjs-video-hero h2");
    const hero = page.locator(".cjs-video-hero").first();
    const headline = page.locator(".cjs-video-hero h2").first();

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

      // The headline may wrap, and none of its text runs past its box.
      const { whiteSpace, overflows } = await headline.evaluate((el) => ({
        whiteSpace: getComputedStyle(el).whiteSpace,
        overflows: el.scrollWidth > el.clientWidth,
      }));
      expect(
        whiteSpace,
        `headline cannot wrap at ${viewport.width}px`,
      ).not.toMatch(/^(nowrap|pre)$/);
      expect(overflows, `headline overflows at ${viewport.width}px`).toBe(
        false,
      );
    }
  });
});

test.describe("schedule", () => {
  test("Tracks sit side by side at desktop width and stack at mobile width", async ({
    page,
  }) => {
    await gotoPageWith(page, ".cjs-day-content .cjs-track", 2);
    await expectSideBySideThenStacked(page, ".cjs-day-content .cjs-track");
  });
});

test.describe("external links", () => {
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

test.describe("tiered Sponsors grid", () => {
  test("a target=_blank logo outside .mark-external-links shows no external-link icon", async ({
    page,
  }) => {
    const logo =
      '.cjs-sponsors-grid a[target="_blank"]:not(.mark-external-links *)';
    await gotoPageWith(page, logo);
    expect(await hasIndicator(page.locator(logo).first())).toBe(false);
  });
});

test.describe("schedule rows", () => {
  test("every row in a Track keeps the time column at the same position and width", async ({
    page,
  }) => {
    await page.setViewportSize(DESKTOP);
    await gotoPageWith(page, ".cjs-track .cjs-time-cell", 2);
    const tracks = page.locator(".cjs-track");
    const index = await tracks.evaluateAll((all) =>
      all.findIndex((t) => t.querySelectorAll(".cjs-time-cell").length >= 2),
    );
    test.skip(index === -1, "no Track has two rows");
    const boxes = await tracks
      .nth(index)
      .locator(".cjs-time-cell")
      .evaluateAll((cells) =>
        cells.map((c) => {
          const { x, width } = c.getBoundingClientRect();
          return { x, width };
        }),
      );
    for (const box of boxes) {
      expect(box.x).toBeCloseTo(boxes[0].x, 0);
      expect(box.width).toBeCloseTo(boxes[0].width, 0);
    }
  });
});
