import { expect, test } from "@playwright/test";

test.describe("robots.txt", () => {
  test("allows everything", async ({ request }) => {
    const response = await request.get("/robots.txt");
    expect(response.status()).toBe(200);
    const robots = await response.text();
    expect(robots).toContain("User-agent: *\nAllow: /");
    expect(robots).not.toContain("Disallow");
  });

  test("points at the sitemap index", async ({ request }) => {
    const robots = await (await request.get("/robots.txt")).text();
    expect(robots).toMatch(/^Sitemap: \S+sitemap-index\.xml$/m);
  });
});

test.describe("Sitemap", () => {
  test("index lists the sitemap", async ({ request }) => {
    const response = await request.get("/sitemap-index.xml");
    expect(response.status()).toBe(200);
    expect(await response.text()).toContain("sitemap-0.xml");
  });

  test("lists URLs and filters /admin pages out", async ({ request }) => {
    const response = await request.get("/sitemap-0.xml");
    expect(response.status()).toBe(200);
    const urls = await response.text();
    expect(urls).toContain("<loc>");
    expect(urls).not.toContain("/admin");
  });
});
