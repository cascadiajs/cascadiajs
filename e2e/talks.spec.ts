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
    return talk ? [{ path: `/${file.replace(/\.html$/, "")}`, talk }] : [];
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
  const cards = filesUnder("public/images", /(^|\/)share\/speaker-[^/]+\.png$/);
  /** URL paths of the Speaker's card files on disk. */
  const cardsOf = (talk: Talk) =>
    cards
      .filter((file) =>
        file.endsWith(`/speaker-${speakerSlug(talk.speaker.name)}.png`),
      )
      .map((file) => `/images/${file}`);

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
    const entry = talkPages.find(({ talk }) => cardsOf(talk).length > 0);
    test.skip(!entry, "no Talk page has a Speaker card");
    await page.goto(entry!.path);
    for (const path of await imagePaths(page)) {
      expect(cardsOf(entry!.talk)).toContain(path);
    }
  });

  test("uses the general image when the Speaker has no card", async ({
    page,
    request,
  }) => {
    const entry = talkPages.find(({ talk }) => cardsOf(talk).length === 0);
    test.skip(!entry, "every Talk page has a Speaker card");
    await page.goto(entry!.path);
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
    const entry = talkPages.find(({ talk }) => talk.registrationUrl);
    test.skip(!entry, "no Talk page has a registration URL");
    await page.goto(entry!.path);
    const url = entry!.talk.registrationUrl!;
    const count = await page
      .locator(".cjs-markdown-content a")
      .evaluateAll(
        (as, href) => as.filter((a) => a.getAttribute("href") === href).length,
        url,
      );
    expect(count).toBeGreaterThan(0);
  });

  test("a multi-paragraph abstract renders as more than one paragraph", async ({
    page,
  }) => {
    const paragraphs = (talk: Talk) =>
      (talk.abstract ?? "").split(/\n\s*\n/).filter((p) => p.trim()).length;
    const entry = talkPages.find(({ talk }) => paragraphs(talk) > 1);
    test.skip(!entry, "no Talk page has a multi-paragraph abstract");
    await page.goto(entry!.path);
    const url = entry!.talk.registrationUrl ?? null;
    // The registration link sits in a paragraph of its own.
    const abstractParagraphs = await page
      .locator(".cjs-markdown-content p")
      .evaluateAll(
        (ps, href) =>
          ps.filter((p) => !(href && p.querySelector(`a[href="${href}"]`)))
            .length,
        url,
      );
    expect(abstractParagraphs).toBeGreaterThan(1);
  });

  test("the Sponsors grid and Testimonials come after the body", async ({
    page,
  }) => {
    const entry = talkPages[0];
    test.skip(!entry, "no Talk page found");
    await page.goto(entry.path);
    const follows = (selector: string) =>
      page.evaluate((sel) => {
        const body = document.querySelector(".cjs-markdown-content")!;
        const el = document.querySelector(sel);
        return el
          ? !!(
              body.compareDocumentPosition(el) &
              Node.DOCUMENT_POSITION_FOLLOWING
            )
          : null;
      }, selector);
    const grid = await follows(".cjs-sponsors-grid");
    const testimonials = await follows(".cjs-testimonials");
    test.skip(grid === null && testimonials === null, "page shows neither");
    expect(grid ?? true).toBe(true);
    expect(testimonials ?? true).toBe(true);
  });
});
