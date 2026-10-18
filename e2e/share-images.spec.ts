import { test, expect } from "@playwright/test";

const ORIGIN = "https://cascadiajs.com";

test.describe("Share images", () => {
  test("every page reachable from / has share images that resolve", async ({
    request,
  }) => {
    const queue = ["/"];
    const seen = new Set(queue);
    const checked = new Set<string>();

    while (queue.length) {
      const path = queue.shift()!;
      const res = await request.get(path);
      if (!res.headers()["content-type"]?.includes("text/html")) {
        continue;
      }
      const html = await res.text();

      for (const pattern of [
        /<meta [^>]*property="og:image" content="([^"]*)"/,
        /<meta name="twitter:image" content="([^"]*)"/,
      ]) {
        const content = html.match(pattern)?.[1];
        expect(content, path).toBeDefined();
        const url = new URL(content!);
        expect(url.origin, path).toBe(ORIGIN);
        if (!checked.has(url.pathname)) {
          const image = await request.get(url.pathname);
          expect(image.status(), `${path} -> ${url.pathname}`).toBe(200);
          checked.add(url.pathname);
        }
      }

      for (const [, href] of html.matchAll(/<a [^>]*href="(\/[^"#?]*)/g)) {
        if (!seen.has(href) && !/\.\w+$/.test(href)) {
          seen.add(href);
          queue.push(href);
        }
      }
    }
    expect(seen.size).toBeGreaterThan(50);
  });
});
