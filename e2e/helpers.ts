import { expect, test } from "@playwright/test";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import type { Talk } from "@shared/data/types";
import {
  parsePeople,
  resolvePerson,
  type PersonRef,
  type PersonRecord,
} from "@shared/people";

/** Every file under `dir` (recursively) matching `pattern`, as `dir`-relative paths. */
export function filesUnder(dir: string, pattern: RegExp): string[] {
  return (readdirSync(dir, { recursive: true, encoding: "utf8" }) as string[])
    .filter((file) => pattern.test(file))
    .sort();
}

/**
 * Events with pages: one per `src/shared/data/events/<key>.config.ts`. The
 * list comes from the filenames, because the Event registry uses Vite-only
 * imports and a config can import what Node cannot load.
 */
export const EVENTS_WITH_PAGES: readonly { year: string }[] = filesUnder(
  "src/shared/data/events",
  /^\d{4}\.config\.ts$/,
).map((file) => ({ year: file.replace(/\.config\.ts$/, "") }));

/**
 * Every built page's `dist/`-relative path. The preview webServer builds
 * first, so `dist/` always reflects the site.
 */
export function builtPages(): string[] {
  return filesUnder("dist", /\.html$/);
}

export const distPath = (file: string) => join("dist", file);

/**
 * Roots (`/<key>`) of the Events with pages whose hand-written root page is
 * built. A new Event config can land before its root page exists.
 */
export const EVENT_ROOTS: readonly string[] = EVENTS_WITH_PAGES.map(
  ({ year }) => `/${year}`,
).filter((root) => existsSync(distPath(`${root.slice(1)}.html`)));

/**
 * Built pages (`dist/`-relative) that are Frozen Snapshots: exact legacy
 * captures (ADR-0008), not Layout-rendered. Sitewide checks of Layout's
 * output exclude or relax them.
 */
export const FROZEN_SNAPSHOT_PAGES = ["2024.html", "2025.html"];

/**
 * The URL path of one Event markdown page, chosen by type: the first
 * top-level page of the first Event that has any. Undefined when no Event
 * has one.
 */
export function eventMarkdownPagePath(): string | undefined {
  for (const { year: key } of EVENTS_WITH_PAGES) {
    const dir = join("src/content/markdown", key);
    const files = filesUnder(dir, /^[^/\\]+\.mdx?$/);
    if (files.length > 0) {
      return `/${key}/${files[0].replace(/\.mdx?$/, "")}`;
    }
  }
  return undefined;
}

/** The Person registry, `src/shared/data/people.json`. */
export const PEOPLE: readonly PersonRecord[] = parsePeople(
  readFileSync("src/shared/data/people.json", "utf8"),
);

/** A Talk as stored in an Event's talks.json: its Speaker is a reference. */
type StoredTalk = Omit<Talk, "speaker"> & { speaker: PersonRef };

/** An Event's Talks as stored, with Speaker references unresolved. */
export function storedTalks(year: string): StoredTalk[] {
  const file = `src/shared/data/${year}/talks.json`;
  return existsSync(file) ? JSON.parse(readFileSync(file, "utf8")) : [];
}

/** An Event's Organizers as stored: Person references with overrides. */
export function storedOrganizers(year: string): PersonRef[] {
  const file = `src/shared/data/${year}/organizers.json`;
  return existsSync(file) ? JSON.parse(readFileSync(file, "utf8")) : [];
}

/**
 * Every Event's Talks, each Speaker resolved through the Person registry. An
 * Event without Talk JSON adds none, though its pages can still render
 * another Event's Talks, so checks match a rendered Talk against all of them.
 */
export const ALL_TALKS: readonly Talk[] = EVENTS_WITH_PAGES.flatMap(
  ({ year }) =>
    storedTalks(year).map((talk) => ({
      ...talk,
      speaker: resolvePerson(PEOPLE, talk.speaker),
    })),
);

export const DESKTOP = { width: 1280, height: 900 };
export const MOBILE = { width: 390, height: 844 };

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
