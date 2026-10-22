import { readFileSync } from "node:fs";
import { expect, test, type Page } from "@playwright/test";
import {
  FIXTURE_POST_LIST,
  publishedFixturePosts,
  type FixturePost,
} from "./blog-helpers";
import { distPath } from "./helpers";

/**
 * Blog search (`/blog/search`, on-demand). The fixture Posts' frontmatter is
 * the source of truth for what each query must find.
 */
const newestFirst = (posts: FixturePost[]) =>
  posts.toSorted((a, b) => Date.parse(b.pubDate) - Date.parse(a.pubDate));
const slugs = async (page: Page) =>
  (
    await page
      .locator(".cjs-post-card a.cjs-post-card-link")
      .evaluateAll((links) => links.map((a) => a.getAttribute("href")))
  ).map((href) => href!.split("/").at(-1));
const search = (query: Record<string, string>) =>
  `/blog/search?${new URLSearchParams(query)}`;

const published = publishedFixturePosts();
const threeAuthors = published.find((post) => post.authors.length >= 3)!;
const withTag = (tag: string) =>
  published.filter((post) => post.tags.includes(tag));
const byAuthor = (name: string) =>
  published.filter((post) =>
    post.authors.some((author) => author.name.includes(name)),
  );

test.describe("Blog search form", () => {
  test.use({ javaScriptEnabled: false });

  test("submitting from /blog without JavaScript reaches results, with the form prefilled", async ({
    page,
  }) => {
    await page.goto("/blog");
    const tag = withTag("filler").length ? "filler" : published[0].tags[0];
    await page.locator(".cjs-search-form input[name=q]").fill("Fixture Hedy");
    await page.locator(".cjs-search-form select[name=tag]").selectOption(tag);
    await page.locator(".cjs-search-form button[type=submit]").click();

    await expect(page).toHaveURL(
      new RegExp(`/blog/search\\?q=Fixture\\+Hedy&tag=${tag}$`),
    );
    await expect(page.locator(".cjs-search-form input[name=q]")).toHaveValue(
      "Fixture Hedy",
    );
    await expect(page.locator(".cjs-search-form select[name=tag]")).toHaveValue(
      tag,
    );
    const expected = byAuthor("Fixture Hedy").filter((post) =>
      post.tags.includes(tag),
    );
    expect(await slugs(page)).toEqual(newestFirst(expected).map((p) => p.slug));
  });

  test("every /blog index page has the form", async ({ page }) => {
    for (const path of ["/blog", "/blog/2"]) {
      await page.goto(path);
      await expect(page.locator(".cjs-search-form")).toHaveCount(1);
    }
  });

  test("the Tag select lists every Tag of a visible Post and none from a draft", async ({
    page,
  }) => {
    await page.goto("/blog");
    const options = await page
      .locator(".cjs-search-form select[name=tag] option")
      .evaluateAll((all) => all.map((o) => (o as HTMLOptionElement).value));
    const tags = [...new Set(published.flatMap((post) => post.tags))].sort();
    expect(options).toEqual(["", ...tags]);
  });
});

test.describe("Blog search matching", () => {
  test("ignores case and matches a term in an Author name", async ({
    page,
  }) => {
    await page.goto(search({ q: "FIXTURE ADA" }));
    expect(await slugs(page)).toEqual(
      newestFirst(byAuthor("Fixture Ada")).map((p) => p.slug),
    );
  });

  test("matches any Author of a multi-Author Post", async ({ page }) => {
    for (const author of threeAuthors.authors) {
      await page.goto(search({ q: author.name }));
      expect(await slugs(page)).toContain(threeAuthors.slug);
    }
  });

  test("matches a Post title", async ({ page }) => {
    await page.goto(search({ q: threeAuthors.title.toLowerCase() }));
    expect(await slugs(page)).toEqual([threeAuthors.slug]);
  });

  test("requires every term: more words narrow the results", async ({
    page,
  }) => {
    await page.goto(search({ q: "fixture" }));
    const broad = await slugs(page);
    await page.goto(search({ q: `fixture ${threeAuthors.authors[0].name}` }));
    const narrow = await slugs(page);
    expect(narrow.length).toBeLessThan(broad.length);
    for (const slug of narrow) {
      expect(broad).toContain(slug);
    }
    expect(narrow).toContain(threeAuthors.slug);
    await page.goto(search({ q: "fixture zzzznomatch" }));
    expect(await slugs(page)).toEqual([]);
  });

  test("matches a term in a Tag", async ({ page }) => {
    const tag = threeAuthors.tags[0];
    await page.goto(search({ q: tag.toUpperCase() }));
    expect(await slugs(page)).toContain(threeAuthors.slug);
  });

  test("the tag parameter is an exact Tag match and narrows q", async ({
    page,
  }) => {
    const tag = threeAuthors.tags[0];
    await page.goto(search({ tag }));
    expect(await slugs(page)).toEqual(
      newestFirst(withTag(tag)).map((p) => p.slug),
    );
    await page.goto(search({ tag, q: threeAuthors.authors[0].name }));
    expect(await slugs(page)).toEqual(
      newestFirst(
        withTag(tag).filter((post) =>
          post.authors.some((a) => a.name === threeAuthors.authors[0].name),
        ),
      ).map((p) => p.slug),
    );
  });

  test("a draft never matches", async ({ page }) => {
    const draft = FIXTURE_POST_LIST.find((post) => !post.published)!;
    await page.goto(search({ q: draft.title }));
    expect(await slugs(page)).not.toContain(draft.slug);
    await expect(page.locator(".cjs-search-empty")).toHaveCount(1);
  });

  test("lists results newest first in one unpaginated list", async ({
    page,
  }) => {
    await page.goto(search({ q: "fixture" }));
    expect(await slugs(page)).toEqual(
      newestFirst(published).map((p) => p.slug),
    );
    await expect(page.locator(".cjs-pagination")).toHaveCount(0);
  });
});

test.describe("Blog search input rules", () => {
  test("no q and no tag redirects to /blog", async ({ page, request }) => {
    for (const query of [{}, { q: "" }, { q: "   ", tag: "" }] as Record<
      string,
      string
    >[]) {
      const response = await request.get(search(query), { maxRedirects: 0 });
      expect(response.status()).toBe(302);
      expect(new URL(response.headers().location, "http://x").pathname).toBe(
        "/blog",
      );
    }
    await page.goto("/blog/search");
    await expect(page).toHaveURL(/\/blog$/);
  });

  test("a q over 100 characters is a 400 with no results page", async ({
    request,
  }) => {
    const long = await request.get(search({ q: "a".repeat(101) }));
    expect(long.status()).toBe(400);
    expect(await long.text()).not.toContain("cjs-search-form");
    const edge = await request.get(search({ q: "a".repeat(100) }));
    expect(edge.status()).toBe(200);
  });

  test("a tag that is not an existing normalized Tag is a 400", async ({
    request,
  }) => {
    for (const tag of [
      "no-such-tag",
      published[0].tags[0].toUpperCase() + "x",
    ]) {
      const response = await request.get(search({ tag }));
      expect(response.status()).toBe(400);
    }
  });

  test("zero matches shows the no-results message with the CTA back to /blog", async ({
    page,
  }) => {
    await page.goto(search({ q: "zzzznomatch" }));
    const empty = page.locator(".cjs-search-empty");
    await expect(empty).toBeVisible();
    await expect(empty.locator("a[href='/blog']")).toHaveCount(1);
    await expect(page.locator(".cjs-post-card")).toHaveCount(0);
  });
});

test.describe("Blog search delivery", () => {
  test("only this route sends the Netlify cache headers", async ({
    request,
  }) => {
    const response = await request.get(search({ q: "fixture" }));
    const headers = response.headers();
    expect(headers["netlify-cdn-cache-control"]).toMatch(
      /public.*max-age=\d+.*durable/,
    );
    expect(headers["netlify-vary"]).toBe("query=q|tag");
    for (const path of ["/blog", "/blog/2", "/blog/rss.xml"]) {
      const other = await request.get(path);
      expect(other.headers()["netlify-cdn-cache-control"]).toBeUndefined();
      expect(other.headers()["netlify-vary"]).toBeUndefined();
    }
  });

  test("canonical points to /blog, with no noindex", async ({ page }) => {
    await page.goto(search({ q: "fixture" }));
    const href = await page
      .locator('head link[rel="canonical"]')
      .getAttribute("href");
    expect(new URL(href!).pathname).toBe("/blog");
    await expect(page.locator('head meta[name="robots"]')).toHaveCount(0);
  });

  test("is not in the sitemap", () => {
    const sitemap = readFileSync(distPath("sitemap-0.xml"), "utf8");
    expect(sitemap).not.toContain("/blog/search");
  });
});
