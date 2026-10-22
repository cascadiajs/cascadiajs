import { existsSync, readFileSync } from "node:fs";
import { expect, test } from "@playwright/test";
import { FIXTURE_POST_LIST, publishedFixturePosts } from "./blog-helpers";
import { distPath, PEOPLE } from "./helpers";
import { FIXTURE_PEOPLE_FILE } from "@shared/test-fixtures";
import type { PersonRecord } from "@shared/people";

/**
 * Blog Author pages. The fixture Authors and Posts are the source of truth.
 */
const FIXTURE_AUTHORS: PersonRecord[] = JSON.parse(
  readFileSync(FIXTURE_PEOPLE_FILE, "utf8"),
);
const fixtureAuthor = (id: string) => FIXTURE_AUTHORS.find((a) => a.id === id)!;
const newestFirst = (a: { pubDate: string }, b: { pubDate: string }) =>
  Date.parse(b.pubDate) - Date.parse(a.pubDate);
const postsBy = (id: string) =>
  publishedFixturePosts()
    .filter((p) => p.authors.some((a) => a.id === id))
    .sort(newestFirst);
const cardSlugs = async (page: import("@playwright/test").Page) =>
  (
    await page
      .locator(".cjs-post-card a.cjs-post-card-link")
      .evaluateAll((links) => links.map((a) => a.getAttribute("href")))
  ).map((href) => href!.split("/").at(-1));

test.describe("Blog Author page", () => {
  test("shows every profile field that is set", async ({ page }) => {
    const ada = fixtureAuthor("fixture-ada");
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
    const grace = fixtureAuthor("fixture-grace");
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
    await page.goto("/blog/authors/fixture-ada");
    const expected = postsBy("fixture-ada").map((p) => p.slug);
    expect(expected.length).toBeGreaterThan(0);
    expect(await cardSlugs(page)).toEqual(expected);
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
        expect(await cardSlugs(page)).toContain(post.slug);
      }
    }
  });

  test("a draft is not listed", async ({ page }) => {
    const drafts = FIXTURE_POST_LIST.filter((p) => !p.published);
    expect(drafts.length).toBeGreaterThan(0);
    for (const draft of drafts) {
      for (const { id } of draft.authors) {
        await page.goto(`/blog/authors/${id}`);
        expect(await cardSlugs(page)).not.toContain(draft.slug);
      }
    }
  });

  test("an Author with no Posts gets a page with the empty state", async ({
    page,
  }) => {
    const none = fixtureAuthor("fixture-no-posts");
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

  test("byline links on a Post page and on cards reach the Author page", async ({
    page,
  }) => {
    const post = publishedFixturePosts().find((p) => p.authors.length > 1)!;
    await page.goto(`/blog/post/${post.slug}`);
    const lead = post.authors[0];
    await page.locator(".cjs-post-byline a", { hasText: lead.name }).click();
    await expect(page).toHaveURL(new RegExp(`/blog/authors/${lead.id}/?$`));
    await expect(page.locator("h1")).toHaveText(lead.name);
  });

  test("byline links on a card reach the right Author page", async ({
    page,
  }) => {
    const post = publishedFixturePosts().find((p) => p.authors.length === 2)!;
    await page.goto(`/blog/authors/${post.authors[0].id}`);
    const card = page.locator(".cjs-post-card", {
      has: page.locator(`a[href$="/blog/post/${post.slug}"]`),
    });
    for (const author of post.authors) {
      await expect(
        card.locator(".cjs-post-card-names a", { hasText: author.name }),
      ).toHaveAttribute("href", `/blog/authors/${author.id}`);
    }
  });
});
