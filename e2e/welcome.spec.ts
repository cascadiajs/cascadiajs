import { test, expect } from "@playwright/test";
import { rootMarkdownPagePath } from "./helpers";

test.describe("root markdown page", () => {
  test("shows the title bar heading and the markdown body", async ({
    page,
  }) => {
    await page.goto(rootMarkdownPagePath());
    await expect(
      page.locator(".page-title").getByRole("heading", { level: 1 }),
    ).toBeVisible();
    await expect(page.locator(".page-body")).toBeVisible();
  });
});
