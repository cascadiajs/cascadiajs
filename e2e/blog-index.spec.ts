import { expect, test } from "@playwright/test";
import { FEATURED_EVENT } from "@shared/site-defaults";

/** Blog routes that need no Post: page 404s, site-chrome links, sitemap. */
test.describe("Blog pages", () => {
  test("/blog/1 does not exist", async ({ request }) => {
    expect((await request.get("/blog/1")).status()).toBe(404);
  });

  test("a page past the last does not exist", async ({ request }) => {
    expect((await request.get("/blog/9999")).status()).toBe(404);
  });
});

test.describe("Blog links in site chrome", () => {
  for (const path of ["/", "/code-of-conduct", "/blog"]) {
    test(`${path} header and footer link to /blog`, async ({ page }) => {
      await page.goto(path);
      await expect(
        page.getByRole("banner").getByRole("link", { name: "Blog" }),
      ).toHaveAttribute("href", "/blog");
      await expect(
        page.getByRole("contentinfo").getByRole("link", { name: "Blog" }),
      ).toHaveAttribute("href", "/blog");
    });
  }

  test("an Event header has no Blog link", async ({ page }) => {
    await page.goto(`/${FEATURED_EVENT}`);
    await expect(
      page.getByRole("navigation").getByRole("link", { name: "Blog" }),
    ).toHaveCount(0);
  });
});

test.describe("Blog in the sitemap", () => {
  test("lists /blog and no /blog/1", async ({ request }) => {
    const sitemap = await (await request.get("/sitemap-0.xml")).text();
    expect(sitemap).toMatch(/<loc>[^<]+\/blog<\/loc>/);
    expect(sitemap).not.toMatch(/\/blog\/1</);
  });
});
