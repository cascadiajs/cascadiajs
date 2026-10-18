import { test, expect, type Page } from "@playwright/test";
import { existsSync } from "node:fs";
import {
  ALL_TALKS,
  DESKTOP,
  distPath,
  EVENT_ROOTS,
  EVENTS_WITH_PAGES,
  MOBILE,
} from "./helpers";
import sponsorData from "@shared/data/sponsors.json" with { type: "json" };
import type { EventYear, Sponsor } from "@shared/data/types";

/**
 * Component behavior checks. Each check finds its component by class name
 * and runs once, on the first match on the first page that has it. Pages
 * come from the built Event roots, so no spec names a year. A check skips
 * when no page has its component, so removing a section or data entry does
 * not fail the suite. No check reads copy, counts or computed colors and
 * sizes.
 */

const sponsors = sponsorData as Sponsor[];
const hasSlugTalk = ALL_TALKS.some((t) => t.slug);
const hasSluglessTalk = ALL_TALKS.some((t) => !t.slug);

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
  const LINKED_TIERS = ["diamond", "platinum", "gold", "silver"];
  const SPONSOR_PAGE = /^\/\d{4}\/sponsors\/(.+)$/;
  const logoStem = (sponsor: Sponsor) => sponsor.logo.replace(/\.[^.]+$/, "");

  test("a logo in the top four tiers links to the Sponsor page or the Sponsor's site", async ({
    page,
  }) => {
    await gotoPageWith(page, ".cjs-sponsors-grid a");
    const { href, target } = await page
      .locator(".cjs-sponsors-grid a")
      .first()
      .evaluate((a) => ({
        href: a.getAttribute("href")!,
        target: a.getAttribute("target"),
      }));
    const pageId = href.match(SPONSOR_PAGE)?.[1];
    const sponsor = sponsors.find((s) =>
      pageId ? s.id === pageId : s.url === href,
    );
    expect(sponsor, `${href} matches no Sponsor`).toBeDefined();
    expect(LINKED_TIERS, href).toContain(sponsor!.tier);
    if (pageId) {
      expect(sponsor!.description, `${href} needs a description`).toBeTruthy();
    } else {
      expect(sponsor!.description, `${href} has a description`).toBeFalsy();
      expect(target, href).toBe("_blank");
    }
  });

  test("a logo in any other tier does not link", async ({ page }) => {
    const logo = sponsors
      .filter((s) => s.tier && !LINKED_TIERS.includes(s.tier))
      .map((s) => `.cjs-sponsors-grid:has(a) img[src*="/${logoStem(s)}."]`)
      .join(", ");
    await gotoPageWith(page, logo);
    const link = await page
      .locator(logo)
      .first()
      .evaluate((img) => img.closest("a"));
    expect(link).toBeNull();
  });

  test("a target=_blank logo outside .mark-external-links shows no external-link icon", async ({
    page,
  }) => {
    const logo =
      '.cjs-sponsors-grid a[target="_blank"]:not(.mark-external-links *)';
    await gotoPageWith(page, logo);
    expect(await hasIndicator(page.locator(logo).first())).toBe(false);
  });
});

test.describe("flat Sponsors grid", () => {
  test("logos are not links", async ({ page }) => {
    await page.goto("/");
    const grid = page.locator(".cjs-sponsors-grid");
    test.skip((await grid.count()) === 0, "homepage has no Sponsors grid");
    expect(await grid.locator("img").count()).toBeGreaterThan(0);
    expect(await grid.locator("a").count()).toBe(0);
  });
});

test.describe("Hallway Track", () => {
  const logoLink = ".cjs-hallway-track a:has(img)";

  test("a Sponsor logo opens in target=_new and shows no external-link icon", async ({
    page,
  }) => {
    await gotoPageWith(page, logoLink);
    const link = page.locator(logoLink).first();
    expect(await link.getAttribute("target")).toBe("_new");
    expect(await hasIndicator(link)).toBe(false);
  });

  test("the wall shows the platinum, then the gold Sponsors of one Event", async ({
    page,
  }) => {
    await gotoPageWith(page, logoLink);
    const wall = await page
      .locator(".cjs-hallway-track")
      .first()
      .locator("a:has(img)")
      .evaluateAll((as) => as.map((a) => a.getAttribute("href")));
    // A copied page can pass another Event's key, so match any Event's wall.
    const expectedWalls = EVENTS_WITH_PAGES.map(({ year }) =>
      ["platinum", "gold"].flatMap((tier) =>
        sponsors
          .filter(
            (s) => s.tier === tier && s.events.includes(year as EventYear),
          )
          .map((s) => s.url),
      ),
    );
    expect(expectedWalls).toContainEqual(wall);
  });
});

test.describe("schedule rows", () => {
  const TALK_PAGE = /^\/(\d{4})\/talks\/([^/]+)$/;
  const keynoteRow = ALL_TALKS.filter((t) => t.slug && t.type === "keynote")
    .map((t) => `.cjs-talk-item:has(a[href$="/talks/${t.slug}"])`)
    .join(", ");

  test("a Talk with a slug links to its Talk page and a Talk without one is plain text", async ({
    page,
  }) => {
    test.skip(!hasSlugTalk, "no Talk has a slug");
    await gotoPageWith(page, ".cjs-talk-item");
    const link = page.locator(".cjs-talk-item a").first();
    await expect(link).toBeAttached();
    const [, year, slug] =
      (await link.getAttribute("href"))!.match(TALK_PAGE) ?? [];
    expect(
      ALL_TALKS.some((t) => t.slug === slug),
      `${slug} is no Talk`,
    ).toBe(true);
    expect(existsSync(distPath(`${year}/talks/${slug}.html`))).toBe(true);

    // A row without a link stands for a Talk without a slug.
    if ((await page.locator(".cjs-talk-item:not(:has(a))").count()) > 0) {
      expect(hasSluglessTalk).toBe(true);
    }
  });

  test("only keynote Talks show the keynote badge", async ({ page }) => {
    test.skip(!keynoteRow, "no keynote Talk has a slug");
    await gotoPageWith(page, keynoteRow);
    await expect(
      page.locator(keynoteRow).first().locator(".cjs-keynote-badge"),
    ).toBeAttached();
    const other = page
      .locator(`.cjs-talk-item:has(a):not(${keynoteRow})`)
      .first();
    await expect(other.locator(".cjs-keynote-badge")).toHaveCount(0);
  });

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

test.describe("TalkCard", () => {
  test("links a Talk with a slug to its Talk page and a Talk without one to the Event root", async ({
    page,
  }) => {
    test.skip(!hasSlugTalk, "no Talk has a slug");
    await gotoPageWith(page, ".cjs-talk-card");
    const root = `/${new URL(page.url()).pathname.split("/")[1]}`;
    const link = page.locator(`.cjs-talk-card[href^="${root}/talks/"]`).first();
    await expect(link).toBeAttached();
    const slug = (await link.getAttribute("href"))!.slice(
      `${root}/talks/`.length,
    );
    expect(
      ALL_TALKS.some((t) => t.slug === slug),
      `${slug} is no Talk`,
    ).toBe(true);

    // A card linking to the root stands for a Talk without a slug.
    const rootCard = page.locator(`.cjs-talk-card[href="${root}"]`);
    if ((await rootCard.count()) > 0) {
      expect(hasSluglessTalk).toBe(true);
    }
  });
});

test.describe("VideoHero", () => {
  test("the video is muted, autoplays, loops and plays inline", async ({
    page,
  }) => {
    await gotoPageWith(page, ".cjs-video-hero video");
    const props = await page
      .locator(".cjs-video-hero video")
      .first()
      .evaluate((video: HTMLVideoElement) => ({
        muted: video.muted,
        autoplay: video.autoplay,
        loop: video.loop,
        playsInline: video.playsInline,
      }));
    expect(props).toEqual({
      muted: true,
      autoplay: true,
      loop: true,
      playsInline: true,
    });
  });
});
