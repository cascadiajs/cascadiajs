import { existsSync } from "node:fs";
import { expect, test } from "@playwright/test";
import {
  draftPost,
  longDate,
  mdxPost,
  notUpdatedPost,
  postWithAuthors,
  postWithImage,
  postWithBodyImage,
  postWithOgImage,
  postWithoutOgImage,
  publishedFixturePosts,
  updatedPost,
} from "./blog-helpers";
import { DESKTOP, MOBILE, distPath } from "./helpers";

/**
 * Blog Post page, meta, share bar and progress bar. The fixture Posts load only in a test build (Playwright
 * sets the flag), so each spec reads the fixtures' frontmatter as its source
 * of truth.
 */
const postPath = (post: { slug: string }) => `/blog/post/${post.slug}`;
const SHARE_POST = publishedFixturePosts()[0];
const SHARE_PATH = postPath(SHARE_POST);
const SHARE_BAR = ".cjs-share-bar";
const PROGRESS_PATH = postPath(postWithImage());
const meta = (page: import("@playwright/test").Page, selector: string) =>
  page.locator(`head meta[${selector}]`);

test.describe("Blog Post page", () => {
  for (const [n, fixture] of publishedFixturePosts()
    .filter((p) => !p.generated)
    .entries()) {
    test(`fixture Post ${n + 1} shows title, dates, reading estimate, Tags and byline`, async ({
      page,
    }) => {
      await page.goto(postPath(fixture));
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
    const three = postWithAuthors(3);
    const [a, b, c] = three.authors;
    await page.goto(postPath(three));
    await expect(page.locator(".cjs-post-byline p")).toHaveText(
      `${a.name}, ${b.name} and ${c.name}`,
    );
  });

  test("the Markdown Post's relative images are optimized and load", async ({
    page,
  }) => {
    await page.goto(postPath(postWithBodyImage()));
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
    const mdx = mdxPost();
    const videoTitle = mdx.body.match(/<VideoEmbed[^>]*?title="([^"]+)"/s)![1];
    await page.goto(postPath(mdx));
    const body = page.locator(".cjs-post-body");
    await expect(body.locator(".cjs-callout")).toBeVisible();
    await expect(body.locator(".cjs-video-embed iframe")).toHaveAttribute(
      "title",
      videoTitle,
    );
    await expect(body.locator(".cjs-cta-button")).toBeVisible();
    const code = body.locator("pre.astro-code");
    await expect(code).toBeVisible();
    // Night Owl background, not the site's other code theme.
    await expect(code).toHaveCSS("background-color", "rgb(1, 22, 39)");
  });

  test("a draft has no page in the production build", async ({ page }) => {
    const draft = draftPost();
    expect(existsSync(distPath(`blog/post/${draft.slug}.html`))).toBe(false);
    const response = await page.goto(postPath(draft));
    expect(response?.status()).toBe(404);
  });

  test("the Sponsors section renders and Testimonials do not", async ({
    page,
  }) => {
    await page.goto(postPath(publishedFixturePosts()[0]));
    await expect(page.locator("#sponsors")).toBeVisible();
    await expect(page.locator(".cjs-testimonials")).toHaveCount(0);
  });
});

test.describe("Blog Post meta", () => {
  test("article meta lists one author per Author in byline order, one tag per Tag", async ({
    page,
  }) => {
    const fixture = updatedPost();
    await page.goto(postPath(fixture));
    await expect(meta(page, 'property="og:type"')).toHaveAttribute(
      "content",
      "article",
    );
    await expect(
      meta(page, 'property="article:published_time"'),
    ).toHaveAttribute("content", new RegExp(`^${fixture.pubDate}`));
    await expect(
      meta(page, 'property="article:modified_time"'),
    ).toHaveAttribute("content", new RegExp(`^${fixture.updatedDate}`));
    const authors = meta(page, 'property="article:author"');
    await expect(authors).toHaveCount(fixture.authors.length);
    for (const [i, a] of fixture.authors.entries()) {
      await expect(authors.nth(i)).toHaveAttribute("content", a.name);
    }
    const tags = meta(page, 'property="article:tag"');
    await expect(tags).toHaveCount(fixture.tags.length);
  });

  test("a Post without updatedDate has no modified_time", async ({ page }) => {
    await page.goto(postPath(notUpdatedPost()));
    await expect(meta(page, 'property="article:modified_time"')).toHaveCount(0);
  });

  test("ogImage becomes an absolute 1200-wide JPEG URL", async ({
    page,
    request,
  }) => {
    await page.goto(postPath(postWithOgImage()));
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
    // The Layout default is what every page without its own image emits.
    await page.goto("/");
    const defaultImage = await meta(page, 'property="og:image"').getAttribute(
      "content",
    );
    await page.goto(postPath(postWithoutOgImage()));
    await expect(meta(page, 'property="og:image"')).toHaveAttribute(
      "content",
      defaultImage!,
    );
  });
});

test.describe("Blog share bar without JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("links Bluesky, LinkedIn and X with encoded URLs", async ({ page }) => {
    await page.goto(SHARE_PATH);
    const canonical = await page
      .locator('link[rel="canonical"]')
      .getAttribute("href");
    const url = encodeURIComponent(canonical!);
    const title = encodeURIComponent(SHARE_POST.title);
    const links = page.locator(`${SHARE_BAR} .cjs-share-link`);
    await expect(links).toHaveCount(3);
    const hrefs = await links.evaluateAll((els) =>
      els.map((el) => el.getAttribute("href")),
    );
    expect(hrefs[0]).toContain("https://bsky.app/intent/compose?text=");
    expect(hrefs[0]).toContain(`${title}%20`);
    expect(hrefs[0]).toContain(url);
    expect(hrefs[1]).toBe(
      `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    );
    expect(hrefs[2]).toBe(
      `https://x.com/intent/tweet?text=${title}&url=${url}`,
    );
  });

  test("hides the copy and Web Share buttons", async ({ page }) => {
    await page.goto(SHARE_PATH);
    await expect(page.locator(".cjs-share-copy")).toBeHidden();
    await expect(page.locator(".cjs-share-native")).toBeHidden();
  });
});

test.describe("Blog share bar with JavaScript", () => {
  test("copy link writes the Post URL, swaps to Copied and announces it", async ({
    page,
    context,
  }) => {
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await page.goto(SHARE_PATH);
    const copy = page.locator(".cjs-share-copy");
    await expect(copy).toBeVisible();
    await expect(copy).toContainText("Copy link");
    await copy.click();
    await expect(copy).toContainText("Copied");
    await expect(page.locator(".cjs-share-status")).toHaveText("Link copied");
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
      (await page.locator('link[rel="canonical"]').getAttribute("href"))!,
    );
  });

  test("announces a failed copy and keeps the label", async ({ page }) => {
    await page.addInitScript(() => {
      Object.defineProperty(navigator, "clipboard", {
        value: { writeText: () => Promise.reject(new Error("denied")) },
        configurable: true,
      });
    });
    await page.goto(SHARE_PATH);
    const copy = page.locator(".cjs-share-copy");
    await copy.click();
    await expect(page.locator(".cjs-share-status")).toHaveText(
      "Couldn't copy link",
    );
    await expect(copy).toContainText("Copy link");
  });

  test("hides Web Share where navigator.share is missing", async ({ page }) => {
    await page.addInitScript(() => {
      Object.defineProperty(navigator, "share", {
        value: undefined,
        configurable: true,
      });
    });
    await page.goto(SHARE_PATH);
    await expect(page.locator(".cjs-share-native")).toBeHidden();
  });

  test("shows Web Share where stubbed in, and ignores a cancelled share", async ({
    page,
  }) => {
    await page.addInitScript(() => {
      Object.defineProperty(navigator, "share", {
        value: () =>
          Promise.reject(new DOMException("cancelled", "AbortError")),
        configurable: true,
      });
    });
    const errors: Error[] = [];
    page.on("pageerror", (error) => errors.push(error));
    await page.goto(SHARE_PATH);
    const share = page.locator(".cjs-share-native");
    await expect(share).toBeVisible();
    await share.click();
    await page.waitForTimeout(100);
    expect(errors).toEqual([]);
  });
});

test.describe("Blog share bar layout", () => {
  test("is a rail beside the Post at desktop width", async ({ page }) => {
    await page.setViewportSize(DESKTOP);
    await page.goto(SHARE_PATH);
    const links = page.locator(`${SHARE_BAR} .cjs-share-link`);
    const first = (await links.first().boundingBox())!;
    const last = (await links.last().boundingBox())!;
    const body = (await page.locator(".cjs-post-body").boundingBox())!;
    expect(first.x + first.width).toBeLessThanOrEqual(body.x);
    expect(last.y).toBeGreaterThan(first.y);
    expect(last.x).toBeCloseTo(first.x, 0);
  });

  test("is a bar at the bottom of the screen at phone width", async ({
    page,
  }) => {
    await page.setViewportSize(MOBILE);
    await page.goto(SHARE_PATH);
    const links = page.locator(`${SHARE_BAR} .cjs-share-link`);
    const first = (await links.first().boundingBox())!;
    const last = (await links.last().boundingBox())!;
    expect(first.y + first.height).toBeGreaterThan(MOBILE.height - 80);
    expect(last.y).toBeCloseTo(first.y, 0);
    expect(last.x).toBeGreaterThan(first.x);
  });
});

test.describe("Blog share bar on a phone", () => {
  test.use({ viewport: MOBILE });

  test("does not cover the end of the footer", async ({ page }) => {
    await page.goto(SHARE_PATH);
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    const last = page.locator(".cjs-site-footer").locator("*").last();
    await expect
      .poll(async () => {
        const bar = (await page.locator(".cjs-share-bar > div").boundingBox())!;
        const box = (await last.boundingBox())!;
        return box.y + box.height <= bar.y;
      })
      .toBe(true);
  });
});

test.describe("Blog progress bar", () => {
  test("is present on a Post page", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 400 });
    await page.goto(PROGRESS_PATH);
    await expect(page.locator(".cjs-progress-bar")).toBeVisible();
  });

  test("does not appear on non-Post pages", async ({ page }) => {
    for (const path of ["/", "/code-of-conduct"]) {
      await page.goto(path);
      await expect(page.locator(".cjs-progress-bar")).toHaveCount(0);
    }
  });
});
