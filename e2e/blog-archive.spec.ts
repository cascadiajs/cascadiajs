import { existsSync } from "node:fs";
import { expect, test } from "@playwright/test";
import { normalizeTag } from "@shared/blog/format";
import {
  FIXTURE_POST_LIST,
  authorWithoutPosts,
  bareAuthor,
  busiestAuthor,
  draftPost,
  featuredPosts,
  fullAuthor,
  newestFirst,
  postCardSlugs,
  postWithAuthors,
  postWithTags,
  postsBy,
  publishedFixturePosts,
} from "./blog-helpers";
import { distPath, PEOPLE } from "./helpers";

/** Tag and Author pages. The fixture Posts' and Authors' data is the source of truth. */
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
const slugs = postCardSlugs;

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

test.describe("Blog Author page", () => {
  test("shows every profile field that is set", async ({ page }) => {
    const ada = fullAuthor();
    await page.goto(`/blog/authors/${ada.id}`);
    await expect(page.locator("h1")).toHaveText(ada.name);
    await expect(page.locator(".cjs-author-header img")).toBeVisible();
    await expect(page.locator(".cjs-author-pronouns")).toHaveText(
      ada.pronouns!,
    );
    await expect(page.locator(".cjs-author-role")).toHaveText(
      `${ada.title} @ ${ada.company}`,
    );
    await expect(page.locator(".cjs-author-location")).toContainText(
      ada.location!,
    );
    await expect(page.locator(".cjs-author-bio")).toHaveText(ada.bio!);
    await expect(page.locator(".cjs-author-website")).toHaveAttribute(
      "href",
      ada.url!,
    );
    await expect(page.locator(".cjs-author-social")).toHaveAttribute(
      "href",
      ada.social![0].url,
    );
  });

  test("hides every profile field that is not set", async ({ page }) => {
    const grace = bareAuthor();
    await page.goto(`/blog/authors/${grace.id}`);
    await expect(page.locator("h1")).toHaveText(grace.name);
    for (const field of [
      "pronouns",
      "role",
      "location",
      "bio",
      "website",
      "social",
    ]) {
      await expect(page.locator(`.cjs-author-${field}`)).toHaveCount(0);
    }
  });

  test("lists the Author's visible Posts, newest first", async ({ page }) => {
    const author = busiestAuthor();
    await page.goto(`/blog/authors/${author.id}`);
    const expected = postsBy(author.id).map((p) => p.slug);
    expect(expected.length).toBeGreaterThan(0);
    expect(await slugs(page)).toEqual(expected);
    await expect(page.locator(".cjs-featured-band")).toHaveCount(0);
    await expect(page.locator(".cjs-pagination")).toHaveCount(0);
    await expect(page.locator('input[type="search"]')).toHaveCount(0);
  });

  test("a co-written Post appears on the page of every Author in its list", async ({
    page,
  }) => {
    const shared = publishedFixturePosts().filter((p) => p.authors.length > 1);
    expect(shared.length).toBeGreaterThan(0);
    for (const post of shared) {
      for (const { id } of post.authors) {
        await page.goto(`/blog/authors/${id}`);
        expect(await slugs(page)).toContain(post.slug);
      }
    }
  });

  test("a draft is not listed", async ({ page }) => {
    const drafts = FIXTURE_POST_LIST.filter((p) => !p.published);
    expect(drafts.length).toBeGreaterThan(0);
    for (const draft of drafts) {
      for (const { id } of draft.authors) {
        await page.goto(`/blog/authors/${id}`);
        expect(await slugs(page)).not.toContain(draft.slug);
      }
    }
  });

  test("an Author with no Posts gets a page with the empty state", async ({
    page,
  }) => {
    const none = authorWithoutPosts();
    expect(postsBy(none.id)).toEqual([]);
    await page.goto(`/blog/authors/${none.id}`);
    await expect(page.locator("h1")).toHaveText(none.name);
    await expect(page.locator(".cjs-blog-empty")).toBeVisible();
    await expect(page.locator(".cjs-post-card")).toHaveCount(0);
  });

  test("a Person without the author role has no Author page", async () => {
    const speaker = PEOPLE.find((p) => !p.roles.includes("author"))!;
    expect(speaker).toBeDefined();
    expect(existsSync(distPath(`blog/authors/${speaker.id}/index.html`))).toBe(
      false,
    );
  });

  test("card byline links reach the right Author pages", async ({ page }) => {
    const post = postWithAuthors(2);
    await page.goto(`/blog/authors/${post.authors[0].id}`);
    const card = page.locator(".cjs-post-card", {
      has: page.locator(`a[href$="/blog/post/${post.slug}"]`),
    });
    for (const author of post.authors) {
      await expect(
        card.locator(
          `.cjs-post-card-names a[href$="/blog/authors/${author.id}"]`,
        ),
      ).toHaveCount(1);
    }
  });
});
