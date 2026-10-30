import { expect, test } from "@playwright/test";

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
  // The blog is the one section that keeps the SiteHeader nav. Only
  // SiteHeader links to the blog; SiteFooter's slot links to the Code of
  // Conduct instead.
  test("/blog renders SiteHeader, whose links go to the site root and /blog", async ({
    page,
  }) => {
    await page.goto("/blog");
    await expect(page.getByRole("banner")).toBeVisible();
    // One nav, and its logo links to the site root, not to an Event root.
    const nav = page.getByRole("navigation");
    await expect(nav).toHaveCount(1);
    await expect(
      nav.getByRole("link", { name: "CascadiaJS logo" }),
    ).toHaveAttribute("href", "/");
    // The Featured Event's landing page is the site root too.
    await expect(
      nav.getByRole("link", { name: /^CascadiaJS \d{4}$/ }),
    ).toHaveAttribute("href", "/");
    await expect(nav.getByRole("link", { name: "Blog" })).toHaveAttribute(
      "href",
      "/blog",
    );
  });

  test("an Event header has no Blog link", async ({ page }) => {
    await page.goto("/");
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
