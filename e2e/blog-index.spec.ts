import { readFileSync } from "node:fs";
import { expect, test, type Page } from "@playwright/test";
import {
  FIXTURE_POST_LIST,
  PAGE_SIZE,
  featuredPosts,
  flaggedPosts,
  listedPosts,
  longDate,
} from "./blog-helpers";
import { distPath } from "./helpers";

/**
 * Blog index, pagination and Featured band. The fixture Posts' frontmatter
 * is the source of truth.
 */
const gridSlugs = async (page: Page) =>
  (
    await page
      .locator(".cjs-post-card a.cjs-post-card-link")
      .evaluateAll((links) => links.map((a) => a.getAttribute("href")))
  ).map((href) => href!.split("/").at(-1));
const canonical = (page: Page) => page.locator('head link[rel="canonical"]');
const pageCount = Math.ceil(listedPosts().length / PAGE_SIZE);
const pagePath = (slug: string) => {
  const n = Math.floor(
    listedPosts().findIndex((p) => p.slug === slug) / PAGE_SIZE,
  );
  return n === 0 ? "/blog" : `/blog/${n + 1}`;
};
const columns = (page: Page) =>
  page
    .locator(".cjs-post-grid")
    .evaluate(
      (el) => getComputedStyle(el).gridTemplateColumns.split(" ").length,
    );

test.describe("Blog index", () => {
  test("fixtures reach a second page and flag more than three Posts", () => {
    expect(pageCount).toBeGreaterThan(1);
    expect(flaggedPosts().length).toBeGreaterThan(3);
  });

  test("page 1 shows the newest three Featured Posts in the band, not in the grid", async ({
    page,
  }) => {
    await page.goto("/blog");
    const featured = featuredPosts();
    const band = page.locator(".cjs-featured-band .cjs-featured-card");
    await expect(band).toHaveCount(3);
    await expect(band.locator("h2")).toHaveText(
      featured.map((post) => post.title),
    );
    for (const [i, post] of featured.entries()) {
      await expect(band.nth(i)).toHaveAttribute(
        "href",
        `/blog/post/${post.slug}`,
      );
    }
    const grid = await gridSlugs(page);
    for (const post of featured) {
      expect(grid).not.toContain(post.slug);
    }
  });

  test("the fourth flagged Post is in the list as a normal Post", async ({
    page,
  }) => {
    await page.goto("/blog");
    expect(await gridSlugs(page)).toContain(flaggedPosts()[3].slug);
  });

  test("page 1 holds 12 Posts, newest first, in 3 columns", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/blog");
    expect(await gridSlugs(page)).toEqual(
      listedPosts()
        .slice(0, PAGE_SIZE)
        .map((post) => post.slug),
    );
    expect(await columns(page)).toBe(3);
  });

  test("the grid collapses to one column on a phone", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 800 });
    await page.goto("/blog");
    expect(await columns(page)).toBe(1);
  });

  test("page 1 canonical points to /blog", async ({ page }) => {
    await page.goto("/blog");
    await expect(canonical(page)).toHaveAttribute(
      "href",
      /^https?:\/\/[^/]+\/blog$/,
    );
  });

  test("links the feed for autodiscovery", async ({ page }) => {
    await page.goto("/blog");
    await expect(page.locator("head link.cjs-rss-link")).toHaveCount(1);
  });

  test("numbered pagination links to the other pages", async ({ page }) => {
    await page.goto("/blog");
    const nav = page.locator(".cjs-pagination");
    await expect(nav.locator('[aria-current="page"]')).toHaveText("1");
    await expect(nav.locator('a[href="/blog/2"]').first()).toBeVisible();
    await expect(nav.locator('a[href="/blog/1"]')).toHaveCount(0);
  });
});

test.describe("Blog later pages", () => {
  for (let n = 2; n <= pageCount; n++) {
    test(`/blog/${n} holds the next Posts, has no Featured band and points its canonical at itself`, async ({
      page,
    }) => {
      await page.goto(`/blog/${n}`);
      expect(await gridSlugs(page)).toEqual(
        listedPosts()
          .slice((n - 1) * PAGE_SIZE, n * PAGE_SIZE)
          .map((post) => post.slug),
      );
      await expect(page.locator(".cjs-featured-band")).toHaveCount(0);
      await expect(canonical(page)).toHaveAttribute(
        "href",
        new RegExp(`^https?://[^/]+/blog/${n}$`),
      );
      await expect(page.locator(".cjs-pagination [aria-current]")).toHaveText(
        String(n),
      );
    });
  }

  test("page 2 links back to /blog, not /blog/1", async ({ page }) => {
    await page.goto("/blog/2");
    await expect(
      page.locator('.cjs-pagination a[href="/blog"]').first(),
    ).toBeVisible();
    await expect(page.locator('.cjs-pagination a[href="/blog/1"]')).toHaveCount(
      0,
    );
  });

  test("/blog/1 does not exist", async ({ request }) => {
    expect((await request.get("/blog/1")).status()).toBe(404);
  });

  test("a page past the last does not exist", async ({ request }) => {
    expect((await request.get(`/blog/${pageCount + 1}`)).status()).toBe(404);
  });
});

test.describe("Post card", () => {
  const fixture = (slug: string) =>
    FIXTURE_POST_LIST.find((post) => post.slug === slug)!;

  test("shows image, title, description, date, reading estimate and Tags", async ({
    page,
  }) => {
    const post = fixture("md-post");
    await page.goto(pagePath(post.slug));
    const card = page.locator(".cjs-post-card", { hasText: post.title });
    await expect(card.locator("img").first()).toBeVisible();
    await expect(card.locator("h3")).toHaveText(post.title);
    await expect(card).toContainText(post.description);
    await expect(card.locator("time")).toHaveText(longDate(post.pubDate));
    await expect(card).toContainText(/\d+ min read/);
    await expect(card.locator(".cjs-tag-chips a")).toHaveText(post.tags);
  });

  const cases = [
    { slug: "md-post", names: "Fixture Ada", avatars: 1 },
    {
      slug: "two-authors",
      names: "Fixture Ada and Fixture Grace",
      avatars: 2,
    },
    { slug: "three-authors", names: "Fixture Linus and 2 others", avatars: 3 },
  ];
  for (const { slug, names, avatars } of cases) {
    test(`${slug} byline reads "${names}" with ${avatars} avatar(s)`, async ({
      page,
    }) => {
      await page.goto(pagePath(slug));
      const card = page.locator(".cjs-post-card", {
        hasText: fixture(slug).title,
      });
      await expect(card.locator(".cjs-post-card-names")).toHaveText(names);
      await expect(card.locator(".cjs-post-card-avatars img")).toHaveCount(
        avatars,
      );
    });
  }
});

test.describe("Blog links in site chrome", () => {
  for (const path of ["/", "/code-of-conduct", "/blog"]) {
    test(`${path} header and footer link to /blog`, async ({ page }) => {
      await page.goto(path);
      await expect(page.locator('.cjs-site-header a[href="/blog"]')).toHaveText(
        "Blog",
      );
      await expect(page.locator('.cjs-site-footer a[href="/blog"]')).toHaveText(
        "Blog",
      );
    });
  }

  test("an Event header has no Blog link", async ({ page }) => {
    await page.goto("/2026");
    await expect(page.locator('.cjs-event-nav a[href="/blog"]')).toHaveCount(0);
  });
});

test.describe("Blog in the sitemap", () => {
  const urls = () => readFileSync(distPath("sitemap-0.xml"), "utf8");

  test("lists the blog pages and Posts", () => {
    expect(urls()).toMatch(/<loc>[^<]+\/blog<\/loc>/);
    expect(urls()).toMatch(/<loc>[^<]+\/blog\/2<\/loc>/);
    expect(urls()).toContain("/blog/post/md-post<");
  });

  test("lists no draft and no /blog/1", () => {
    for (const draft of FIXTURE_POST_LIST.filter((p) => !p.published)) {
      expect(urls()).not.toContain(draft.slug);
    }
    expect(urls()).not.toMatch(/\/blog\/1</);
  });
});
