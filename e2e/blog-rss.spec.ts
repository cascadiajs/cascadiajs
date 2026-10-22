import { expect, test } from "@playwright/test";
import { publishedFixturePosts, FIXTURE_POST_LIST } from "./blog-helpers";

/** Blog RSS feed. The fixture Posts' frontmatter is the source of truth. */
const feed = async (request: import("@playwright/test").APIRequestContext) => {
  const response = await request.get("/blog/rss.xml");
  expect(response.status()).toBe(200);
  return response.text();
};
const items = (xml: string) => xml.match(/<item>[\s\S]*?<\/item>/g) ?? [];
const tag = (xml: string, name: string) =>
  xml.match(new RegExp(`<${name}>([\\s\\S]*?)</${name}>`))?.[1] ?? "";
const text = (value: string) =>
  value.replace(/^<!\[CDATA\[|\]\]>$/g, "").replaceAll("&amp;", "&");

test.describe("Blog RSS feed", () => {
  test("is valid RSS with one item per visible Post, newest first, with absolute links", async ({
    request,
  }) => {
    const xml = await feed(request);
    expect(xml).toMatch(/<rss [^>]*version="2\.0"/);
    expect(tag(xml, "channel")).not.toBe("");

    const expected = publishedFixturePosts().toSorted(
      (a, b) => Date.parse(b.pubDate) - Date.parse(a.pubDate),
    );
    const found = items(xml);
    expect(found).toHaveLength(expected.length);
    for (const [i, post] of expected.entries()) {
      const item = found[i];
      expect(text(tag(item, "title"))).toBe(post.title);
      expect(text(tag(item, "description"))).toBe(post.description);
      expect(tag(item, "link")).toMatch(
        new RegExp(`^https?://[^/]+/blog/post/${post.slug}$`),
      );
      expect(new Date(tag(item, "pubDate")).toISOString().slice(0, 10)).toBe(
        post.pubDate.slice(0, 10),
      );
    }
  });

  test("items carry no body content and no author", async ({ request }) => {
    for (const item of items(await feed(request))) {
      expect(item).not.toContain("<content:encoded");
      expect(item).not.toContain("<author");
      expect(item).not.toContain("<dc:creator");
    }
  });

  test("leaves out drafts", async ({ request }) => {
    const xml = await feed(request);
    const drafts = FIXTURE_POST_LIST.filter((p) => !p.published);
    expect(drafts.length).toBeGreaterThan(0);
    for (const draft of drafts) {
      expect(xml).not.toContain(`/blog/post/${draft.slug}`);
    }
  });

  test("Post pages link the feed for autodiscovery", async ({ page }) => {
    await page.goto(`/blog/post/${publishedFixturePosts()[0].slug}`);
    const link = page.locator(
      'head link[rel="alternate"][type="application/rss+xml"]',
    );
    await expect(link).toHaveAttribute("href", "/blog/rss.xml");
  });
});
