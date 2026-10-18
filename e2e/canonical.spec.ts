import { readFileSync } from "node:fs";
import { expect, test, type Page } from "@playwright/test";
import {
  builtPages,
  distPath,
  eventMarkdownPagePath,
  EVENT_ROOTS,
} from "./helpers";

const [eventRoot] = EVENT_ROOTS;
const nested = eventMarkdownPagePath();

const canonical = (page: Page) => page.locator('link[rel="canonical"]');

test.describe("Canonical URLs", () => {
  test("homepage canonical keeps its root slash", async ({ page }) => {
    await page.goto("/");
    await expect(canonical(page)).toHaveAttribute(
      "href",
      "https://cascadiajs.com/",
    );
  });

  test("event root canonical has no trailing slash", async ({ page }) => {
    test.skip(!eventRoot, "no Event root is built");
    await page.goto(eventRoot);
    await expect(canonical(page)).toHaveAttribute(
      "href",
      `https://cascadiajs.com${eventRoot}`,
    );
  });

  test("nested route canonical has no trailing slash", async ({ page }) => {
    test.skip(!nested, "no Event has a markdown page");
    const response = await page.goto(nested!);
    expect(response?.status()).toBe(200);
    await expect(canonical(page)).toHaveAttribute(
      "href",
      `https://cascadiajs.com${nested}`,
    );
  });

  test("no built page has an internal link with a trailing slash", () => {
    const pages = builtPages();
    expect(pages.length).toBeGreaterThan(50);

    const slashed: string[] = [];
    for (const file of pages) {
      const html = readFileSync(distPath(file), "utf8");
      for (const [, href] of html.matchAll(/\shref="(\/[^"]*)"/g)) {
        const path = href.split(/[?#]/)[0];
        if (path !== "/" && path.endsWith("/")) {
          slashed.push(`${file}: ${href}`);
        }
      }
    }
    expect(slashed).toEqual([]);
  });
});

test.describe("Build format", () => {
  test("no canonical, og:url or internal href exposes .html", () => {
    const leaks: string[] = [];
    for (const file of builtPages()) {
      const html = readFileSync(distPath(file), "utf8");
      const urls = [
        ...html.matchAll(/<link rel="canonical" href="([^"]*)"/g),
        ...html.matchAll(/<meta property="og:url" content="([^"]*)"/g),
        ...html.matchAll(/\shref="(\/[^"]*)"/g),
      ].map((m) => m[1]);
      for (const url of urls) {
        if (/\.html([?#]|$)/.test(url)) {
          leaks.push(`${file}: ${url}`);
        }
      }
    }
    expect(leaks).toEqual([]);
  });

  test("pages build as files, not directory indexes", () => {
    const pages = builtPages();
    if (nested) {
      expect(pages).toContain(`${nested.slice(1)}.html`);
    }
    expect(pages.filter((file) => file.endsWith("/index.html"))).toEqual([]);
  });
});
