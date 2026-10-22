import { test, expect } from "@playwright/test";
import { FROZEN_SNAPSHOT_PAGES } from "./helpers";

/**
 * Link crawl: starting at `/`, follow every same-origin link. Each internal
 * link and each asset (images, scripts, stylesheets) on each reachable page
 * must return 200. Share images are not crawled: a visitor does not see
 * them, and head.spec.ts checks that one loads. Frozen Snapshot pages are
 * checked for 200 but not crawled into; they have their own checks.
 */

const ORIGIN = "https://cascadiajs.com";
const FROZEN = new Set(
  FROZEN_SNAPSHOT_PAGES.map((p) => "/" + p.replace(/\.html$/, "")),
);

/**
 * Pages linked from the blog but not built yet. #69 (Tag pages) and #70
 * (Author pages) build them and remove this.
 */
const NOT_BUILT_YET = /^\/blog\/tags\//;

/** Same-origin path of `ref`, or null for external, mailto, tel, data and fragment-only refs. */
function internalPath(ref: string): string | null {
  const url = ref.trim().replace(/&amp;/g, "&");
  if (/^(mailto:|tel:|data:|javascript:|#)/i.test(url)) {
    return null;
  }
  if (url.startsWith("//")) {
    return null;
  }
  if (/^https?:/i.test(url)) {
    if (!url.startsWith(ORIGIN)) {
      return null;
    }
    return new URL(url).pathname;
  }
  if (!url.startsWith("/")) {
    return null;
  }
  // The Netlify Image CDN names its source image and size in the query, so
  // the query is part of the asset's identity there.
  if (url.startsWith("/.netlify/images?")) {
    return url.split("#")[0];
  }
  return url.split(/[#?]/)[0] || "/";
}

function attrs(html: string, tag: string, attr: string): string[] {
  const re = new RegExp(`<${tag}\\b[^>]*?\\s${attr}="([^"]*)"`, "g");
  return [...html.matchAll(re)].map((m) => m[1]);
}

test("every internal link and asset reachable from / returns 200", async ({
  request,
}) => {
  test.setTimeout(180_000);
  const queue = ["/"];
  const seenPages = new Set(queue);
  const broken: string[] = [];
  const checked = new Map<string, number>();

  const status = async (path: string) => {
    if (!checked.has(path)) {
      checked.set(path, (await request.get(path)).status());
    }
    return checked.get(path)!;
  };

  while (queue.length) {
    const path = queue.shift()!;
    const res = await request.get(path);
    if (res.status() !== 200) {
      broken.push(`link ${path} -> ${res.status()}`);
      continue;
    }
    if (
      FROZEN.has(path) ||
      !res.headers()["content-type"]?.includes("text/html")
    ) {
      continue;
    }
    const html = await res.text();

    for (const href of attrs(html, "a", "href")) {
      const target = internalPath(href);
      if (target && !seenPages.has(target)) {
        seenPages.add(target);
        queue.push(target);
      }
    }

    const assets = [
      ...attrs(html, "img", "src"),
      ...attrs(html, "source", "src"),
      ...attrs(html, "script", "src"),
      ...attrs(html, "link", "href"),
    ];
    for (const set of [
      ...attrs(html, "img", "srcset"),
      ...attrs(html, "source", "srcset"),
    ]) {
      for (const candidate of set.split(",")) {
        assets.push(candidate.trim().split(/\s+/)[0]);
      }
    }
    for (const asset of assets) {
      const target = internalPath(asset);
      if (target) {
        const code = await status(target);
        if (code !== 200) {
          broken.push(`${path} -> ${target} (${code})`);
        }
      }
    }
  }
  expect(
    broken.filter((entry) => !NOT_BUILT_YET.test(entry.split(" ")[1])),
  ).toEqual([]);
  expect(seenPages.size).toBeGreaterThan(1);
});
