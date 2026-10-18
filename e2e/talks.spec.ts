import { test, expect, type Page } from "@playwright/test";
import { existsSync, readFileSync } from "node:fs";
import { ALL_TALKS, EVENTS_WITH_PAGES, filesUnder } from "./helpers";
import type { Talk } from "@shared/data/types";

/**
 * Talk route: data to page, one direction only. Each Talk with a slug in an
 * Event's data has a page. An Event with no Talk data skips.
 */
for (const { year } of EVENTS_WITH_PAGES) {
  const file = `src/shared/data/${year}/talks.json`;
  test.describe(`Talk pages for an Event with pages (${year})`, () => {
    test.skip(!existsSync(file), "Event has no Talk data");
    const talks: Talk[] = existsSync(file)
      ? JSON.parse(readFileSync(file, "utf8"))
      : [];
    for (const { slug } of talks.filter((t) => t.slug)) {
      test(`Talk ${slug} has a page`, async ({ request }) => {
        const response = await request.get(`/${year}/talks/${slug}`);
        expect(response.status()).toBe(200);
      });
    }
  });
}

test("an unknown Talk slug returns 404", async ({ request }) => {
  const year = EVENTS_WITH_PAGES.find((e) =>
    existsSync(`src/shared/data/${e.year}/talks.json`),
  )?.year;
  test.skip(!year, "no Event has Talk data");
  const response = await request.get(`/${year}/talks/no-such-talk-slug`);
  expect(response.status()).toBe(404);
});

/**
 * Talk page content. Pages come from the built Talk pages (`dist/<key>/talks/`)
 * and each page's Talk from the Event Talk JSON by slug, because a newer
 * Event's route can publish another Event's Talks. A check skips when no
 * built page has a Talk with the data it needs.
 */
const talkPages = filesUnder("dist", /^\d{4}\/talks\/[^/]+\.html$/).flatMap(
  (file) => {
    const slug = file.replace(/^\d{4}\/talks\/|\.html$/g, "");
    const talk = ALL_TALKS.find((t) => t.slug === slug);
    return talk
      ? [
          {
            path: `/${file.replace(/\.html$/, "")}`,
            year: file.slice(0, 4),
            talk,
          },
        ]
      : [];
  },
);

test.describe("Talk page share image", () => {
  const speakerSlug = (name: string) =>
    name
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  /**
   * URL paths of the Speaker's card files the page reads: the folder its
   * source globs, which can differ from the page's own Event.
   */
  const cardsOf = ({ year, talk }: (typeof talkPages)[number]) => {
    const folder = readFileSync(
      `src/pages/${year}/talks/[slug].astro`,
      "utf8",
    ).match(/glob\("\/public(\/images\/[^"]+\/)speaker-\*\.png"/)?.[1];
    expect(folder, "Talk page source has no Speaker card glob").toBeTruthy();
    const card = `${folder}speaker-${speakerSlug(talk.speaker.name)}.png`;
    return folder && existsSync(`public${card}`) ? [card] : [];
  };

  const imagePaths = async (page: Page) => {
    const paths = [];
    for (const selector of [
      'meta[property="og:image"]',
      'meta[name="twitter:image"]',
    ]) {
      const content = await page.locator(selector).getAttribute("content");
      paths.push(new URL(content!).pathname);
    }
    return paths;
  };

  test("uses the Speaker's card when the file exists", async ({ page }) => {
    const talkPage = talkPages.find((p) => cardsOf(p).length > 0);
    test.skip(!talkPage, "no Talk page has a Speaker card");
    await page.goto(talkPage!.path);
    for (const path of await imagePaths(page)) {
      expect(cardsOf(talkPage!)).toContain(path);
    }
  });

  test("uses the general image when the Speaker has no card", async ({
    page,
    request,
  }) => {
    const talkPage = talkPages.find((p) => cardsOf(p).length === 0);
    test.skip(!talkPage, "every Talk page has a Speaker card");
    await page.goto(talkPage!.path);
    for (const path of await imagePaths(page)) {
      expect(path).not.toMatch(/\/share\/speaker-/);
      expect((await request.get(path)).status()).toBe(200);
    }
  });
});

test.describe("Talk page body", () => {
  test("a Talk with a registration URL shows a link to it", async ({
    page,
  }) => {
    const talkPage = talkPages.find(({ talk }) => talk.registrationUrl);
    test.skip(!talkPage, "no Talk page has a registration URL");
    await page.goto(talkPage!.path);
    const url = talkPage!.talk.registrationUrl!;
    const count = await page
      .locator(".cjs-markdown-content a")
      .evaluateAll(
        (as, href) => as.filter((a) => a.getAttribute("href") === href).length,
        url,
      );
    expect(count).toBeGreaterThan(0);
  });

  test("a multi-block abstract renders more than one block", async ({
    page,
  }) => {
    const blocks = (talk: Talk) =>
      (talk.abstract ?? "").split(/\n\s*\n/).filter((p) => p.trim()).length;
    const talkPage = talkPages.find(({ talk }) => blocks(talk) > 1);
    test.skip(!talkPage, "no Talk page has a multi-block abstract");
    await page.goto(talkPage!.path);
    expect(
      await page.locator(".cjs-markdown-content > :first-child > *").count(),
    ).toBeGreaterThan(1);
  });

  test("the Sponsors grid and Testimonials come after the body", async ({
    page,
  }) => {
    let positions: { selector: string; afterBody: boolean }[] = [];
    for (const { path } of talkPages) {
      await page.goto(path);
      positions = await page.evaluate(() => {
        const body = document.querySelector(".cjs-markdown-content")!;
        return [".cjs-sponsors-grid", ".cjs-testimonials"].flatMap(
          (selector) => {
            const el = document.querySelector(selector);
            return el
              ? [
                  {
                    selector,
                    afterBody: !!(
                      body.compareDocumentPosition(el) &
                      Node.DOCUMENT_POSITION_FOLLOWING
                    ),
                  },
                ]
              : [];
          },
        );
      });
      if (positions.length > 0) {
        break;
      }
    }
    test.skip(positions.length === 0, "no Talk page shows either");
    for (const { selector, afterBody } of positions) {
      expect(afterBody, selector).toBe(true);
    }
  });
});
