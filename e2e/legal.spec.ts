import { test, expect } from "@playwright/test";

const legalPaths = ["/privacy", "/tos", "/cookies"];

for (const path of legalPaths) {
  test.describe(`legal page ${path}`, () => {
    test.beforeEach(async ({ page }) => {
      await page.route("https://app.termly.io/**", (route) => route.abort());
      await page.goto(path);
    });

    test("Termly mount keeps name=termly-embed for the third-party loader", async ({
      page,
    }) => {
      const mount = page.locator("div[name='termly-embed']");
      await expect(mount).toHaveCount(1);
      await expect(mount).toHaveAttribute("data-id", /.+/);
    });

    test("Termly loader script is present", async ({ page }) => {
      await expect(page.locator("script#termly-jssdk")).toHaveAttribute(
        "src",
        /^https:\/\/app\.termly\.io\//,
      );
    });
  });
}
