import { test, expect, type Page } from "@playwright/test";
import { existsSync, readFileSync } from "node:fs";
import {
  ALL_TALKS,
  DESKTOP,
  distPath,
  EVENT_ROOTS,
  EVENT_TALKS,
  EVENTS_WITH_PAGES,
  MOBILE,
} from "./helpers";

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

test.describe("tiered Sponsors grid", () => {
  const sponsors: {
    id: string;
    url: string;
    tier?: string;
    description?: string;
  }[] = JSON.parse(readFileSync("src/shared/data/sponsors.json", "utf8"));
  const LINKED_TIERS = ["diamond", "platinum", "gold", "silver"];
  const SPONSOR_PAGE = /^\/\d{4}\/sponsors\/(.+)$/;

  test("logos in the top four tiers link to the Sponsor page or the Sponsor's site, and other tiers do not link", async ({
    page,
  }) => {
    await gotoPageWith(page, ".cjs-sponsors-grid a");
    const links = await page.locator(".cjs-sponsors-grid a").evaluateAll((as) =>
      as.map((a) => ({
        href: a.getAttribute("href")!,
        target: a.getAttribute("target"),
      })),
    );
    const sponsorOf = (href: string) => {
      const id = href.match(SPONSOR_PAGE)?.[1];
      return sponsors.find((s) => (id ? s.id === id : s.url === href));
    };

    for (const { href, target } of links) {
      const sponsor = sponsorOf(href);
      expect(sponsor, `${href} matches no Sponsor`).toBeDefined();
      expect(LINKED_TIERS, href).toContain(sponsor!.tier);
      if (SPONSOR_PAGE.test(href)) {
        expect(
          sponsor!.description,
          `${href} needs a description`,
        ).toBeTruthy();
      } else {
        expect(sponsor!.description, `${href} has a description`).toBeFalsy();
        expect(target, href).toBe("_blank");
      }
    }
    // A Sponsor in any other tier never gets a link.
    const hrefs = links.map((l) => l.href);
    for (const sponsor of sponsors.filter(
      (s) => s.tier && !LINKED_TIERS.includes(s.tier),
    )) {
      expect(hrefs, sponsor.id).not.toContain(sponsor.url);
      expect(hrefs.map((h) => h.match(SPONSOR_PAGE)?.[1])).not.toContain(
        sponsor.id,
      );
    }
  });

  test("a target=_blank logo outside .mark-external-links shows no external-link icon", async ({
    page,
  }) => {
    const logo =
      '.cjs-sponsors-grid a[target="_blank"]:not(.mark-external-links *)';
    await gotoPageWith(page, logo);
    const hasIcon = await page
      .locator(logo)
      .first()
      .evaluate((el) => getComputedStyle(el, "::after").content !== "none");
    expect(hasIcon).toBe(false);
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
  const sponsors: { url: string; tier?: string; events: string[] }[] =
    JSON.parse(readFileSync("src/shared/data/sponsors.json", "utf8"));
  const logoLinks = ".cjs-hallway-track a:has(img)";

  test("Sponsor logos open in target=_new and show no external-link icon", async ({
    page,
  }) => {
    await gotoPageWith(page, logoLinks);
    const links = page.locator(logoLinks);
    for (let i = 0; i < (await links.count()); i++) {
      const link = links.nth(i);
      expect(await link.getAttribute("target")).toBe("_new");
      expect(
        await link.evaluate(
          (el) => getComputedStyle(el, "::after").content !== "none",
        ),
      ).toBe(false);
    }
  });

  test("the wall shows the platinum, then the gold Sponsors of one Event", async ({
    page,
  }) => {
    await gotoPageWith(page, logoLinks);
    // Both days repeat the Track, so read the first one.
    const wall = await page
      .locator(".cjs-hallway-track")
      .first()
      .locator("a:has(img)")
      .evaluateAll((as) => as.map((a) => a.getAttribute("href")));
    // The Track takes the Event as a prop, and a copied page can pass another
    // Event's key, so the wall must match the rule for one of the Events.
    const expectedWalls = EVENTS_WITH_PAGES.map(({ year }) =>
      ["platinum", "gold"].flatMap((tier) =>
        sponsors
          .filter((s) => s.tier === tier && s.events.includes(year))
          .map((s) => s.url),
      ),
    );
    expect(expectedWalls).toContainEqual(wall);
  });
});

test.describe("schedule rows", () => {
  const talksWithSlug = new Map(
    ALL_TALKS.filter((t) => t.slug).map((t) => [t.slug!, t]),
  );
  const mostSlugless = Math.max(
    0,
    ...EVENT_TALKS.map((talks) => talks.filter((t) => !t.slug).length),
  );
  const TALK_PAGE = /^\/(\d{4})\/talks\/([^/]+)$/;

  /** Each Talk row's link (null for plain text) and whether it shows the keynote badge. */
  async function talkItems(page: Page) {
    return page.locator(".cjs-talk-item").evaluateAll((items) =>
      items.map((item) => ({
        href: item.querySelector("a")?.getAttribute("href") ?? null,
        badge: item.querySelector(".cjs-keynote-badge") !== null,
      })),
    );
  }

  test("a Talk with a slug links to its Talk page and a Talk without one is plain text", async ({
    page,
  }) => {
    test.skip(ALL_TALKS.length === 0, "no Event has Talk data");
    await gotoPageWith(page, ".cjs-talk-item");
    const items = await talkItems(page);
    const linked = items.filter((i) => i.href);
    for (const { href } of linked) {
      const [, key, slug] = href!.match(TALK_PAGE) ?? [];
      expect(talksWithSlug.has(slug), `${href} is not a Talk with a slug`).toBe(
        true,
      );
      expect(existsSync(distPath(`${key}/talks/${slug}.html`)), href!).toBe(
        true,
      );
    }
    // Rows without a link stand for Talks without a slug.
    expect(items.length - linked.length).toBeLessThanOrEqual(mostSlugless);
  });

  test("only keynote Talks show the keynote badge", async ({ page }) => {
    test.skip(ALL_TALKS.length === 0, "no Event has Talk data");
    await gotoPageWith(page, ".cjs-talk-item");
    const items = await talkItems(page);
    for (const { href, badge } of items.filter((i) => i.href)) {
      const talk = talksWithSlug.get(href!.match(TALK_PAGE)![2])!;
      expect(badge, href!).toBe(talk.type === "keynote");
    }
    const mostKeynotes = Math.max(
      ...EVENT_TALKS.map((t) => t.filter((x) => x.type === "keynote").length),
    );
    expect(items.filter((i) => i.badge).length).toBeLessThanOrEqual(
      mostKeynotes,
    );
  });

  test("every row in a Track keeps the time column at the same position and width", async ({
    page,
  }) => {
    await page.setViewportSize(DESKTOP);
    await gotoPageWith(page, ".cjs-track .cjs-time-cell", 2);
    const tracks = page.locator(".cjs-track");
    // Prefer a Track with a row that has no time.
    let target = -1;
    for (let i = 0; i < (await tracks.count()); i++) {
      const cells = tracks.nth(i).locator(".cjs-time-cell");
      if ((await cells.count()) < 2) {
        continue;
      }
      const texts = await cells.allTextContents();
      if (texts.some((t) => t.trim() === "")) {
        target = i;
        break;
      }
      target = target === -1 ? i : target;
    }
    test.skip(target === -1, "no Track has two rows");

    const cells = tracks.nth(target).locator(".cjs-time-cell");
    const boxes = [];
    for (let i = 0; i < (await cells.count()); i++) {
      boxes.push((await cells.nth(i).boundingBox())!);
    }
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
    test.skip(ALL_TALKS.length === 0, "no Event has Talk data");
    await gotoPageWith(page, ".cjs-talk-card");
    const root = `/${new URL(page.url()).pathname.split("/")[1]}`;
    const slugs = new Set(ALL_TALKS.map((t) => t.slug).filter(Boolean));
    const mostSlugless = Math.max(
      ...EVENT_TALKS.map((talks) => talks.filter((t) => !t.slug).length),
    );
    const hrefs = await page
      .locator(".cjs-talk-card")
      .evaluateAll((cards) => cards.map((c) => c.getAttribute("href")!));

    for (const href of hrefs.filter((h) => h !== root)) {
      expect(href.startsWith(`${root}/talks/`), href).toBe(true);
      expect(slugs.has(href.slice(`${root}/talks/`.length)), href).toBe(true);
    }
    // Cards linking to the root stand for Talks without a slug.
    expect(hrefs.filter((h) => h === root).length).toBeLessThanOrEqual(
      mostSlugless,
    );
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
