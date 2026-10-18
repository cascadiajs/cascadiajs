import { expect, test, type Page } from "@playwright/test";
import { readdirSync } from "node:fs";
import { join } from "node:path";
import sponsors from "@shared/data/sponsors.json" with { type: "json" };
import { FEATURED_EVENT } from "@shared/site-defaults";

/** Every file under `dir` (recursively) matching `pattern`, as `dir`-relative paths. */
export function filesUnder(dir: string, pattern: RegExp): string[] {
  return (readdirSync(dir, { recursive: true, encoding: "utf8" }) as string[])
    .filter((file) => pattern.test(file))
    .sort();
}

/**
 * Every built page's `dist/`-relative path. The preview webServer builds
 * first, so `dist/` always reflects the site.
 */
export function builtPages(): string[] {
  return filesUnder("dist", /\.html$/);
}

/**
 * Event Keys of the Events with pages: one per `events/*.config.ts`. Read from
 * disk because the Event registry uses Vite-only imports.
 */
export function eventsWithPages(): string[] {
  return filesUnder("src/shared/data/events", /\.config\.ts$/).map((f) =>
    f.replace(/\.config\.ts$/, ""),
  );
}

export const distPath = (file: string) => join("dist", file);

/**
 * Built pages (`dist/`-relative) that are Frozen Snapshots: exact legacy
 * captures (ADR-0008), not Layout-rendered. Sitewide checks of Layout's
 * output exclude or relax them.
 */
export const FROZEN_SNAPSHOT_PAGES = ["2024.html", "2025.html"];

/**
 * Names of the Sponsors the Past Sponsors grid shows: a Sponsor is hidden only
 * when every one of its Events is the Featured Event.
 */
export function pastSponsorNames(): string[] {
  return sponsors
    .filter((s) => s.events.some((e) => e !== FEATURED_EVENT))
    .map((s) => s.name)
    .sort();
}

/**
 * Assert the Past Sponsors section of the current page shows exactly the
 * past-sponsor set and that its CTA targets the Featured Event's sponsor page.
 */
export async function expectPastSponsorsMatchFeaturedEvent(page: Page) {
  const section = page.locator("#sponsors");
  const alts = await section
    .getByRole("img")
    .evaluateAll((imgs) => imgs.map((img) => img.getAttribute("alt") ?? ""));
  expect(alts.map((a) => a.replace(/ logo$/, "")).sort()).toEqual(
    pastSponsorNames(),
  );
  await expect(
    section.getByRole("link", { name: "Sponsor Our Event" }),
  ).toHaveAttribute("href", `/${FEATURED_EVENT}/sponsor`);
}

/** Assert the site header's Event link points at the Featured Event. */
export async function expectHeaderEventLinkIsFeaturedEvent(page: Page) {
  // The Event link is the first link after the logo in the header nav.
  const nav = page.getByRole("banner").getByRole("navigation");
  await expect(nav.getByRole("link").nth(1)).toHaveAttribute(
    "href",
    `/${FEATURED_EVENT}`,
  );
}

/** Assert the page renders the Event nav (#nav) with the logo linking to the Event home. */
export async function expectEventNav(page: Page, eventHref = "/2026") {
  const nav = page.locator("#nav").getByRole("navigation");
  await expect(nav).toBeVisible();
  await expect(
    nav.getByRole("link", { name: "CascadiaJS logo" }),
  ).toHaveAttribute("href", eventHref);
}

/**
 * Shared checks for a Frozen Snapshot page (ADR-0008): a legacy page captured
 * as its exact rendered HTML. The page is not rebuilt, so these assert only
 * what the capture must guarantee: it is served at its legacy URL, it decodes
 * as UTF-8, and every same-origin link and asset resolves inside this site.
 * Third-party requests are aborted so the suite never waits on them.
 */
export function describeFrozenSnapshot({
  year,
  title,
  sampleText,
  deadAssets = [],
}: {
  year: string;
  title: string;
  /** Visible text containing non-ASCII characters, to catch mis-decoding. */
  sampleText: string;
  /** Same-origin assets that were already broken on the legacy page. */
  deadAssets?: string[];
}) {
  test.describe(`${year} Frozen Snapshot`, () => {
    test.beforeEach(async ({ page, baseURL }) => {
      const origin = new URL(baseURL!).origin;
      await page.route(
        (url) => url.origin !== origin,
        (route) => route.abort(),
      );
    });

    test("is served at the legacy URL with the legacy title", async ({
      page,
    }) => {
      const response = await page.goto(`/${year}`);
      expect(response?.status()).toBe(200);
      await expect(page).toHaveTitle(title);
    });

    test("decodes as UTF-8", async ({ page }) => {
      await page.goto(`/${year}`);
      await expect(page.getByText(sampleText).first()).toBeVisible();
    });

    test("references no legacy asset paths", async ({ page }) => {
      await page.goto(`/${year}`);
      expect(await page.content()).not.toContain("/_public/");
    });

    test("every same-origin link resolves", async ({ page }) => {
      await page.goto(`/${year}`);
      const hrefs = await page
        .locator('a[href^="/"]')
        .evaluateAll((as) => as.map((a) => a.getAttribute("href")!));
      const paths = [...new Set(hrefs.map((h) => h.split("#")[0]))];
      expect(paths.length).toBeGreaterThan(0);
      for (const path of paths) {
        const response = await page.request.get(path);
        expect(response.status(), path).toBe(200);
      }
    });

    test("every same-origin asset resolves", async ({ page }) => {
      await page.goto(`/${year}`);
      const urls = await page.evaluate(() => [
        ...[...document.querySelectorAll("img[src], source[src]")].map(
          (e) => e.getAttribute("src")!,
        ),
        ...[...document.querySelectorAll("link[href]")].map(
          (e) => e.getAttribute("href")!,
        ),
        ...[
          ...document.querySelectorAll(
            'meta[content^="https://cascadiajs.com/"]',
          ),
        ].map((e) => e.getAttribute("content")!),
      ]);
      const assets = [
        ...new Set(
          urls
            .map((u) => u.replace(/^https:\/\/cascadiajs\.com(?=\/)/, ""))
            .filter(
              (u) =>
                u.startsWith(`/images/events/${year}/`) ||
                u.startsWith(`/events/${year}/`),
            ),
        ),
      ];
      expect(assets.length).toBeGreaterThan(0);
      for (const asset of assets) {
        const response = await page.request.get(asset);
        expect(response.status(), asset).toBe(
          deadAssets.includes(asset) ? 404 : 200,
        );
      }
    });
  });
}
