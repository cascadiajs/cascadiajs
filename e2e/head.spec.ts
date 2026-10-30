import { expect, test } from "@playwright/test";
import {
  DEFAULT_DESCRIPTION,
  GA4_ID,
  META_PIXEL_ID,
} from "@shared/site-defaults";
import { FROZEN_SNAPSHOT_PAGES } from "./helpers";

/**
 * Head checks fetch the page over HTTP. Sitewide checks run on one page per
 * layout, plus the Frozen Snapshots, which Layout does not render.
 */

const LAYOUT_PAGES = [
  { layout: "Layout", path: "/blog" },
  { layout: "EventLayout", path: "/" },
  { layout: "MarkdownLayout", path: "/code-of-conduct" },
];
const FROZEN = FROZEN_SNAPSHOT_PAGES.map((file) => ({
  layout: `Frozen Snapshot ${file.replace(/\.html$/, "")}`,
  path: `/${file.replace(/\.html$/, "")}`,
}));

test.describe("Sitewide head", () => {
  for (const { layout, path } of [...LAYOUT_PAGES, ...FROZEN]) {
    test(`${layout} is indexable, declares UTF-8 first, and loads GA4 and the Meta Pixel`, async ({
      request,
    }) => {
      const response = await request.get(path);
      expect(response.status()).toBe(200);
      const html = await response.text();
      expect(html).not.toMatch(/<meta[^>]+name="?robots"?[^>]*noindex/i);
      expect(html).toMatch(/<head[^>]*>\s*<meta charset="utf-8"/i);
      for (const trace of [
        `googletagmanager.com/gtag/js?id=${GA4_ID}`,
        `gtag('config', '${GA4_ID}')`,
        "connect.facebook.net/en_US/fbevents.js",
        `fbq('init', '${META_PIXEL_ID}')`,
        `facebook.com/tr?id=${META_PIXEL_ID}`,
      ]) {
        expect(html, `missing ${trace}`).toContain(trace);
      }
    });
  }

  for (const { layout, path } of LAYOUT_PAGES) {
    test(`${layout} declares a viewport`, async ({ request }) => {
      const html = await (await request.get(path)).text();
      expect(html).toContain(
        '<meta name="viewport" content="width=device-width, initial-scale=1"',
      );
    });
  }
});

test.describe("Head metadata", () => {
  for (const { layout, path } of LAYOUT_PAGES) {
    test(`${layout} emits a title, a description and share tags`, async ({
      page,
    }) => {
      await page.goto(path);
      await expect(page).toHaveTitle(/\S/);
      for (const selector of [
        'meta[name="description"]',
        'meta[property="og:title"]',
        'meta[property="og:description"]',
        'meta[property="og:image"]',
        'meta[name="twitter:card"]',
        'meta[name="twitter:title"]',
        'meta[name="twitter:image"]',
      ]) {
        await expect(page.locator(selector), selector).toHaveAttribute(
          "content",
          /\S/,
        );
      }
    });
  }

  test("a page without a description of its own gets the sitewide default", async ({
    page,
  }) => {
    // /privacy has no description of its own; it passes the sitewide default.
    await page.goto("/privacy");
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      DEFAULT_DESCRIPTION,
    );
  });

  test("a share image loads", async ({ page, request }) => {
    await page.goto("/");
    const src = await page
      .locator('meta[property="og:image"]')
      .getAttribute("content");
    const response = await request.get(new URL(src!).pathname);
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toMatch(/^image\//);
  });
});
