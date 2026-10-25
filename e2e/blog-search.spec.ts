import { expect, test } from "@playwright/test";

/** Blog search (`/blog/search`, on-demand): input rules and delivery. */
const search = (query: Record<string, string>) =>
  `/blog/search?${new URLSearchParams(query)}`;

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

  test("a tag that is not an existing Tag is a 400", async ({ request }) => {
    const response = await request.get(search({ tag: "no-such-tag" }));
    expect(response.status()).toBe(400);
  });
});

test.describe("Blog search delivery", () => {
  test("only this route sends the Netlify cache headers", async ({
    request,
  }) => {
    const response = await request.get(search({ q: "cascadia" }));
    const headers = response.headers();
    expect(headers["netlify-cdn-cache-control"]).toMatch(
      /public.*max-age=\d+.*durable/,
    );
    expect(headers["netlify-vary"]).toBe("query=q|tag");
    for (const path of ["/blog", "/blog/rss.xml"]) {
      const other = await request.get(path);
      expect(other.headers()["netlify-cdn-cache-control"]).toBeUndefined();
      expect(other.headers()["netlify-vary"]).toBeUndefined();
    }
  });

  test("canonical points to /blog, with no noindex", async ({ page }) => {
    await page.goto(search({ q: "cascadia" }));
    const href = await page
      .locator('head link[rel="canonical"]')
      .getAttribute("href");
    expect(new URL(href!).pathname).toBe("/blog");
    await expect(page.locator('head meta[name="robots"]')).toHaveCount(0);
  });

  test("is not in the sitemap", async ({ request }) => {
    const sitemap = await (await request.get("/sitemap-0.xml")).text();
    expect(sitemap).not.toContain("/blog/search");
  });
});
