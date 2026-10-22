import { expect, test, type Page } from "@playwright/test";
import { normalizeTag } from "@shared/blog/format";
import {
  draftPost,
  featuredPosts,
  postWithTags,
  publishedFixturePosts,
} from "./blog-helpers";

/** Tag pages. The fixture Posts' frontmatter is the source of truth. */
const newestFirst = (a: { pubDate: string }, b: { pubDate: string }) =>
  Date.parse(b.pubDate) - Date.parse(a.pubDate);
const postsWithTag = (tag: string) =>
  publishedFixturePosts()
    .filter((post) => post.tags.includes(tag))
    .sort(newestFirst);
/** The Tags that visible Posts write in more than one case. */
const mixedCaseTags = () => {
  const spellings = new Map<string, Set<string>>();
  for (const post of publishedFixturePosts()) {
    for (const raw of post.rawTags) {
      const tag = normalizeTag(raw);
      spellings.set(tag, (spellings.get(tag) ?? new Set()).add(raw));
    }
  }
  return [...spellings].filter(([, set]) => set.size > 1).map(([tag]) => tag);
};
const slugs = async (page: Page) =>
  (
    await page
      .locator(".cjs-post-card a.cjs-post-card-link")
      .evaluateAll((links) => links.map((a) => a.getAttribute("href")))
  ).map((href) => href!.split("/").at(-1));

test.describe("Tag pages", () => {
  test("fixtures write one Tag in different cases", () => {
    expect(mixedCaseTags().length).toBeGreaterThan(0);
  });

  test("a mixed-case Tag has one page at the lowercase slug listing every Post, newest first", async ({
    page,
  }) => {
    const tag = mixedCaseTags()[0];
    expect(tag).toBe(tag.toLowerCase());
    const response = await page.goto(`/blog/tags/${tag}`);
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveText(`#${tag}`);
    const expected = postsWithTag(tag);
    expect(expected.length).toBeGreaterThan(1);
    expect(await slugs(page)).toEqual(expected.map((p) => p.slug));
  });

  test("a Featured Post is a normal card, with no Featured band and no search form", async ({
    page,
  }) => {
    const featured = featuredPosts()[0];
    const tag = featured.tags[0];
    await page.goto(`/blog/tags/${tag}`);
    expect(await slugs(page)).toEqual(postsWithTag(tag).map((p) => p.slug));
    expect(await slugs(page)).toContain(featured.slug);
    await expect(page.locator(".cjs-featured-band")).toHaveCount(0);
    await expect(page.locator(".cjs-featured-card")).toHaveCount(0);
    await expect(page.locator("form")).toHaveCount(0);
    await expect(page.locator('input[type="search"]')).toHaveCount(0);
  });

  test("a Tag used only by a draft has no page in the production build", async ({
    request,
  }) => {
    const draft = draftPost();
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
    const post = postWithTags();
    const [first, second] = post.tags;
    await page.goto(`/blog/tags/${first}`);
    await page
      .locator(".cjs-post-card", {
        has: page.locator(`a[href$="/blog/post/${post.slug}"]`),
      })
      .locator(`.cjs-tag-chips a[href="/blog/tags/${second}"]`)
      .click();
    await expect(page).toHaveURL(new RegExp(`/blog/tags/${second}$`));
    expect(await slugs(page)).toEqual(postsWithTag(second).map((p) => p.slug));
    await page.goto(`/blog/post/${post.slug}`);
    await page.locator(`.cjs-tag-chips a[href="/blog/tags/${first}"]`).click();
    await expect(page).toHaveURL(new RegExp(`/blog/tags/${first}$`));
  });
});
