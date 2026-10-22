import { readFileSync } from "node:fs";
import { expect, test, type Page } from "@playwright/test";
import {
  FIXTURE_POST_LIST,
  featuredPosts,
  publishedFixturePosts,
} from "./blog-helpers";

/** Tag pages. The fixture Posts' frontmatter is the source of truth. */
const newestFirst = (a: { pubDate: string }, b: { pubDate: string }) =>
  Date.parse(b.pubDate) - Date.parse(a.pubDate);
const postsWithTag = (tag: string) =>
  publishedFixturePosts()
    .filter((post) => post.tags.includes(tag))
    .sort(newestFirst);
const slugs = async (page: Page) =>
  (
    await page
      .locator(".cjs-post-card a.cjs-post-card-link")
      .evaluateAll((links) => links.map((a) => a.getAttribute("href")))
  ).map((href) => href!.split("/").at(-1));

test.describe("Tag pages", () => {
  test("fixtures write one Tag in different cases", () => {
    const spellings = new Set(
      ["md-post", "mdx-post"].flatMap((slug) => {
        const dir = `src/content/blog-fixtures/${slug}`;
        const file = FIXTURE_POST_LIST.find((p) => p.slug === slug)!;
        expect(file).toBeDefined();
        const src = readFileSync(
          `${dir}/index.${slug === "mdx-post" ? "mdx" : "md"}`,
          "utf8",
        );
        return [...src.matchAll(/^\s+-\s+(javascript)\s*$/gim)].map(
          (m) => m[1],
        );
      }),
    );
    expect(spellings.size).toBeGreaterThan(1);
  });

  test("a mixed-case Tag has one page at the lowercase slug listing every Post, newest first", async ({
    page,
  }) => {
    const response = await page.goto("/blog/tags/javascript");
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveText("#javascript");
    const expected = postsWithTag("javascript");
    expect(expected.length).toBeGreaterThan(1);
    expect(await slugs(page)).toEqual(expected.map((p) => p.slug));
  });

  test("a Featured Post is a normal card, with no Featured band and no search form", async ({
    page,
  }) => {
    await page.goto("/blog/tags/featured");
    const featured = featuredPosts();
    expect(await slugs(page)).toEqual(
      postsWithTag("featured").map((p) => p.slug),
    );
    expect(await slugs(page)).toContain(featured[0].slug);
    await expect(page.locator(".cjs-featured-band")).toHaveCount(0);
    await expect(page.locator(".cjs-featured-card")).toHaveCount(0);
    await expect(page.locator("form")).toHaveCount(0);
    await expect(page.locator('input[type="search"]')).toHaveCount(0);
  });

  test("a Tag used only by a draft has no page in the production build", async ({
    request,
  }) => {
    const draft = FIXTURE_POST_LIST.find((p) => !p.published)!;
    for (const tag of draft.tags) {
      if (postsWithTag(tag).length === 0) {
        expect((await request.get(`/blog/tags/${tag}`)).status()).toBe(404);
      }
    }
    expect(draft.tags.some((tag) => postsWithTag(tag).length === 0)).toBe(true);
  });

  test("Tag chips on cards and Post pages link to the right Tag page", async ({
    page,
  }) => {
    await page.goto("/blog/tags/teamwork");
    const chip = page
      .locator(".cjs-post-card")
      .first()
      .locator(".cjs-tag-chips a");
    await chip.first().click();
    await expect(page).toHaveURL(/\/blog\/tags\/teamwork$/);
    await page.goto("/blog/post/md-post");
    await page
      .locator(".cjs-tag-chips a", { hasText: "web-components" })
      .click();
    await expect(page).toHaveURL(/\/blog\/tags\/web-components$/);
    expect(await slugs(page)).toEqual(["md-post"]);
  });
});
