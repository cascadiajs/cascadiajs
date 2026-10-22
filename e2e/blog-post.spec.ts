import { existsSync } from "node:fs";
import { expect, test } from "@playwright/test";
import {
  FIXTURE_POST_LIST,
  longDate,
  publishedFixturePosts,
} from "./blog-helpers";
import { distPath } from "./helpers";

/**
 * Blog Post page. The fixture Posts load only in a test build (Playwright
 * sets the flag), so each spec reads the fixtures' frontmatter as its source
 * of truth.
 */
const post = (slug: string) => FIXTURE_POST_LIST.find((p) => p.slug === slug)!;
const meta = (page: import("@playwright/test").Page, selector: string) =>
  page.locator(`head meta[${selector}]`);

test.describe("Blog Post page", () => {
  for (const fixture of publishedFixturePosts()) {
    test(`${fixture.slug} shows title, dates, reading estimate, Tags and byline`, async ({
      page,
    }) => {
      await page.goto(`/blog/post/${fixture.slug}`);
      await expect(page.locator("h1")).toHaveText(fixture.title);
      await expect(page.locator(".cjs-post-date")).toHaveText(
        longDate(fixture.pubDate),
      );
      if (fixture.updatedDate) {
        await expect(page.locator(".cjs-post-updated")).toHaveText(
          longDate(fixture.updatedDate),
        );
      } else {
        await expect(page.locator(".cjs-post-updated")).toHaveCount(0);
      }
      await expect(page.locator(".cjs-post-reading-time")).toHaveText(
        /^\d+ min read$/,
      );

      const chips = page.locator(".cjs-tag-chips a");
      await expect(chips).toHaveText(fixture.tags);
      for (const [i, tag] of fixture.tags.entries()) {
        await expect(chips.nth(i)).toHaveAttribute("href", `/blog/tags/${tag}`);
      }

      const names = page.locator(".cjs-post-byline a");
      await expect(names).toHaveText(fixture.authors.map((a) => a.name));
      for (const [i, a] of fixture.authors.entries()) {
        await expect(names.nth(i)).toHaveAttribute(
          "href",
          `/blog/authors/${a.id}`,
        );
      }
      await expect(page.locator(".cjs-post-byline img")).toHaveCount(
        fixture.authors.length,
      );
    });
  }

  test("a Post with three Authors reads 'A, B and C' in byline order", async ({
    page,
  }) => {
    const [a, b, c] = post("three-authors").authors;
    await page.goto("/blog/post/three-authors");
    await expect(page.locator(".cjs-post-byline p")).toHaveText(
      `${a.name}, ${b.name} and ${c.name}`,
    );
  });

  test("the Markdown Post's relative images are optimized and load", async ({
    page,
  }) => {
    await page.goto("/blog/post/md-post");
    const body = page.locator(".cjs-post-body img").first();
    await expect(body).toHaveAttribute("src", /_astro(\/|%2F)/);
    await body.scrollIntoViewIfNeeded();
    await expect(async () => {
      expect(
        await body.evaluate((img: HTMLImageElement) => img.naturalWidth),
      ).toBeGreaterThan(0);
    }).toPass();
    await expect(page.locator(".cjs-post img").first()).toHaveAttribute(
      "src",
      /_astro(\/|%2F)/,
    );
  });

  test("the MDX Post renders Callout, VideoEmbed, CtaButton and a highlighted code block", async ({
    page,
  }) => {
    await page.goto("/blog/post/mdx-post");
    const body = page.locator(".cjs-post-body");
    await expect(body.locator(".cjs-callout")).toContainText(
      "A fixture callout.",
    );
    await expect(body.locator(".cjs-video-embed iframe")).toHaveAttribute(
      "title",
      "Fixture video",
    );
    await expect(body.locator(".cjs-cta-button")).toContainText(
      "Fixture call to action",
    );
    const code = body.locator("pre.astro-code");
    await expect(code).toContainText("const answer = 42;");
    // Night Owl background, not the site's other code theme.
    await expect(code).toHaveCSS("background-color", "rgb(1, 22, 39)");
  });

  test("a draft has no page in the production build", async ({ page }) => {
    expect(existsSync(distPath("blog/post/draft-post.html"))).toBe(false);
    const response = await page.goto("/blog/post/draft-post");
    expect(response?.status()).toBe(404);
  });

  test("the Sponsors section renders and Testimonials do not", async ({
    page,
  }) => {
    await page.goto("/blog/post/md-post");
    await expect(page.locator("#sponsors")).toBeVisible();
    await expect(page.locator(".cjs-testimonials")).toHaveCount(0);
  });
});

test.describe("Blog Post meta", () => {
  test("article meta lists one author per Author in byline order, one tag per Tag", async ({
    page,
  }) => {
    const fixture = post("updated-post");
    await page.goto(`/blog/post/${fixture.slug}`);
    await expect(meta(page, 'property="og:type"')).toHaveAttribute(
      "content",
      "article",
    );
    await expect(
      meta(page, 'property="article:published_time"'),
    ).toHaveAttribute("content", /^2026-03-05/);
    await expect(
      meta(page, 'property="article:modified_time"'),
    ).toHaveAttribute("content", /^2026-03-20/);
    const authors = meta(page, 'property="article:author"');
    await expect(authors).toHaveCount(fixture.authors.length);
    for (const [i, a] of fixture.authors.entries()) {
      await expect(authors.nth(i)).toHaveAttribute("content", a.name);
    }
    const tags = meta(page, 'property="article:tag"');
    await expect(tags).toHaveCount(fixture.tags.length);
  });

  test("a Post without updatedDate has no modified_time", async ({ page }) => {
    await page.goto("/blog/post/md-post");
    await expect(meta(page, 'property="article:modified_time"')).toHaveCount(0);
  });

  test("ogImage becomes an absolute 1200-wide JPEG URL", async ({
    page,
    request,
  }) => {
    await page.goto("/blog/post/og-image-post");
    const content = await meta(page, 'property="og:image"').getAttribute(
      "content",
    );
    // A JPEG variant 1200 wide, as an absolute URL.
    expect(content).toMatch(/^https?:\/\/.+(\.jpe?g$|fm=jpg)/);
    expect(content).toMatch(/(\.jpe?g$|w=1200)/);
    const url = new URL(content!);
    const response = await request.get(url.pathname + url.search);
    expect(response.ok()).toBe(true);
    const bytes = await response.body();
    // JPEG SOF0/SOF2 marker carries the image width.
    const sof = bytes.findIndex(
      (byte, i) =>
        byte === 0xff && (bytes[i + 1] === 0xc0 || bytes[i + 1] === 0xc2),
    );
    expect(bytes.readUInt16BE(sof + 7)).toBe(1200);
  });

  test("a Post without ogImage uses the site default share image", async ({
    page,
  }) => {
    await page.goto("/blog/post/md-post");
    await expect(meta(page, 'property="og:image"')).toHaveAttribute(
      "content",
      /\/images\/2026\/share\/social-sharing-general\.png$/,
    );
  });
});
