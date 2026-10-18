import { readFileSync } from "node:fs";
import { expect, test, type Page } from "@playwright/test";
import {
  DEFAULT_DESCRIPTION,
  GA4_ID,
  META_PIXEL_ID,
} from "@shared/site-defaults";
import {
  builtPages,
  EVENT_ROOTS,
  distPath,
  filesUnder,
  FROZEN_SNAPSHOT_PAGES,
} from "./helpers";

/**
 * Build checks read every built page out of `dist/` (the webServer builds
 * before the suite runs). Head checks run on one page per layout and test
 * presence only: no value is compared to a fixed string.
 */

test.describe("Sitewide head (every built page)", () => {
  const pages = builtPages();

  test("finds built pages", () => {
    expect(pages.length).toBeGreaterThan(0);
  });

  test("no page tells crawlers not to index it", () => {
    for (const file of pages) {
      const html = readFileSync(distPath(file), "utf8");
      expect(html, file).not.toMatch(/<meta[^>]+name="?robots"?[^>]*noindex/i);
    }
  });

  test("every page declares UTF-8 first in the head, and a viewport unless it is a Frozen Snapshot", () => {
    for (const file of pages) {
      const html = readFileSync(distPath(file), "utf8");
      expect(html, `${file}: charset`).toMatch(
        /<head[^>]*>\s*<meta charset="utf-8"/i,
      );
      if (FROZEN_SNAPSHOT_PAGES.includes(file)) {
        continue;
      }
      expect(html, `${file}: viewport`).toContain(
        '<meta name="viewport" content="width=device-width, initial-scale=1"',
      );
    }
  });

  test("every page loads GA4 and the Meta Pixel, Frozen Snapshots included", () => {
    expect(pages).toEqual(expect.arrayContaining(FROZEN_SNAPSHOT_PAGES));
    for (const file of pages) {
      const html = readFileSync(distPath(file), "utf8");
      for (const trace of [
        `googletagmanager.com/gtag/js?id=${GA4_ID}`,
        `gtag('config', '${GA4_ID}')`,
        "connect.facebook.net/en_US/fbevents.js",
        `fbq('init', '${META_PIXEL_ID}')`,
        `facebook.com/tr?id=${META_PIXEL_ID}`,
      ]) {
        expect(html, `${file} is missing ${trace}`).toContain(trace);
      }
    }
  });
});

/** One page for each layout, picked by type, never by slug or title. */
const homepage = "/";
const [eventRoot] = EVENT_ROOTS;
const [markdownFile] = filesUnder("src/content/markdown", /\.mdx?$/).filter(
  (file) => !/^\d{4}\//.test(file),
);
const markdownPage = markdownFile && `/${markdownFile.replace(/\.mdx?$/, "")}`;

// A layout with no page yet is left out.
const LAYOUT_PAGES = [
  { layout: "Layout", path: homepage },
  { layout: "EventLayout", path: eventRoot },
  { layout: "MarkdownLayout", path: markdownPage },
].filter((entry): entry is { layout: string; path: string } => !!entry.path);

const content = (page: Page, selector: string) =>
  page.locator(selector).getAttribute("content");

test.describe("Head metadata", () => {
  for (const { layout, path } of LAYOUT_PAGES) {
    test(`${layout} emits a title, a description and share tags`, async ({
      page,
    }) => {
      await page.goto(path);
      expect((await page.title()).trim()).not.toBe("");
      for (const selector of [
        'meta[name="description"]',
        'meta[property="og:title"]',
        'meta[property="og:description"]',
        'meta[property="og:image"]',
        'meta[name="twitter:card"]',
        'meta[name="twitter:title"]',
        'meta[name="twitter:image"]',
      ]) {
        expect(
          (await content(page, selector))?.trim(),
          `${layout}: ${selector}`,
        ).toBeTruthy();
      }
    });
  }

  test("a page without a description of its own gets the sitewide default", async ({
    page,
  }) => {
    // The homepage passes no description to Layout.
    await page.goto(homepage);
    expect(await content(page, 'meta[name="description"]')).toBe(
      DEFAULT_DESCRIPTION,
    );
  });

  test("a share image loads", async ({ page, request }) => {
    await page.goto(homepage);
    const src = await content(page, 'meta[property="og:image"]');
    const response = await request.get(new URL(src!).pathname);
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toMatch(/^image\//);
  });
});
