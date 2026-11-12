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

/**
 * The legal pages and the Code of Conduct are on the 2027 interior
 * template: the sticky green nav and HomeFooter, with no section bar.
 */
for (const [path, title] of [
  ["/privacy", "Privacy Policy"],
  ["/tos", "Terms of Service"],
  ["/cookies", "Cookie Policy"],
  ["/code-of-conduct", "Code of Conduct"],
]) {
  test(`${path} has the interior chrome and its h1`, async ({ page }) => {
    await page.route("https://app.termly.io/**", (route) => route.abort());
    await page.goto(path);
    await expect(page).toHaveTitle(new RegExp(`^${title} \\| CascadiaJS`));
    await expect(page.locator(".cjs-home-nav[data-sticky]")).toHaveCount(1);
    await expect(page.locator(".cjs-home-footer")).toHaveCount(1);
    await expect(page.locator(".cjs-event-nav")).toHaveCount(0);
    await expect(page.locator(".cjs-page-subnav")).toHaveCount(0);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(
      page.getByRole("heading", { level: 1, name: title }),
    ).toHaveCount(1);
  });
}

test("the Code of Conduct keeps its markdown content", async ({ page }) => {
  await page.goto("/code-of-conduct");
  for (const name of [
    "Purpose",
    "Expected Behavior",
    "If You Witness or Are Subject to Unacceptable Behavior",
    "License and Attribution",
  ]) {
    await expect(page.getByRole("heading", { level: 2, name })).toBeVisible();
  }
  await expect(page.getByAltText("pronoun stickers")).toBeVisible();
});
