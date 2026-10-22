import { expect, test } from "@playwright/test";
import { publishedFixturePosts } from "./blog-helpers";
import { DESKTOP, MOBILE } from "./helpers";

/** Share bar on the Post page. */
const fixture = publishedFixturePosts()[0];
const path = `/blog/post/${fixture.slug}`;
const shareBar = ".cjs-share-bar";

test.describe("Share bar without JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("links Bluesky, LinkedIn and X with encoded URLs", async ({ page }) => {
    await page.goto(path);
    const canonical = await page
      .locator('link[rel="canonical"]')
      .getAttribute("href");
    const url = encodeURIComponent(canonical!);
    const title = encodeURIComponent(fixture.title);
    const links = page.locator(`${shareBar} .cjs-share-link`);
    await expect(links).toHaveCount(3);
    const hrefs = await links.evaluateAll((els) =>
      els.map((el) => el.getAttribute("href")),
    );
    expect(hrefs[0]).toContain("https://bsky.app/intent/compose?text=");
    expect(hrefs[0]).toContain(`${title}%20`);
    expect(hrefs[0]).toContain(url);
    expect(hrefs[1]).toBe(
      `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    );
    expect(hrefs[2]).toBe(
      `https://x.com/intent/tweet?text=${title}&url=${url}`,
    );
  });

  test("hides the copy and Web Share buttons", async ({ page }) => {
    await page.goto(path);
    await expect(page.locator(".cjs-share-copy")).toBeHidden();
    await expect(page.locator(".cjs-share-native")).toBeHidden();
  });
});

test.describe("Share bar with JavaScript", () => {
  test("copy link writes the Post URL, swaps to Copied and announces it", async ({
    page,
    context,
  }) => {
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await page.goto(path);
    const copy = page.locator(".cjs-share-copy");
    await expect(copy).toBeVisible();
    await expect(copy).toContainText("Copy link");
    await copy.click();
    await expect(copy).toContainText("Copied");
    await expect(page.locator(".cjs-share-status")).toHaveText("Link copied");
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
      (await page.locator('link[rel="canonical"]').getAttribute("href"))!,
    );
  });

  test("announces a failed copy and keeps the label", async ({ page }) => {
    await page.addInitScript(() => {
      Object.defineProperty(navigator, "clipboard", {
        value: { writeText: () => Promise.reject(new Error("denied")) },
        configurable: true,
      });
    });
    await page.goto(path);
    const copy = page.locator(".cjs-share-copy");
    await copy.click();
    await expect(page.locator(".cjs-share-status")).toHaveText(
      "Couldn't copy link",
    );
    await expect(copy).toContainText("Copy link");
  });

  test("hides Web Share where navigator.share is missing", async ({ page }) => {
    await page.addInitScript(() => {
      Object.defineProperty(navigator, "share", {
        value: undefined,
        configurable: true,
      });
    });
    await page.goto(path);
    await expect(page.locator(".cjs-share-native")).toBeHidden();
  });

  test("shows Web Share where stubbed in, and ignores a cancelled share", async ({
    page,
  }) => {
    await page.addInitScript(() => {
      Object.defineProperty(navigator, "share", {
        value: () =>
          Promise.reject(new DOMException("cancelled", "AbortError")),
        configurable: true,
      });
    });
    const errors: Error[] = [];
    page.on("pageerror", (error) => errors.push(error));
    await page.goto(path);
    const share = page.locator(".cjs-share-native");
    await expect(share).toBeVisible();
    await share.click();
    await page.waitForTimeout(100);
    expect(errors).toEqual([]);
  });

  test("hover changes color at once under reduced motion", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.setViewportSize(DESKTOP);
    await page.goto(path);
    const link = page.locator(".cjs-share-link").first();
    const before = await link.evaluate(
      (el) => getComputedStyle(el).backgroundColor,
    );
    await link.hover();
    expect(
      await link.evaluate((el) => getComputedStyle(el).transitionDuration),
    ).toBe("0s");
    await expect
      .poll(() => link.evaluate((el) => getComputedStyle(el).backgroundColor))
      .not.toBe(before);
  });
});

test.describe("Share bar layout", () => {
  test("is a rail beside the Post at desktop width", async ({ page }) => {
    await page.setViewportSize(DESKTOP);
    await page.goto(path);
    const links = page.locator(`${shareBar} .cjs-share-link`);
    const first = (await links.first().boundingBox())!;
    const last = (await links.last().boundingBox())!;
    const body = (await page.locator(".cjs-post-body").boundingBox())!;
    expect(first.x + first.width).toBeLessThanOrEqual(body.x);
    expect(last.y).toBeGreaterThan(first.y);
    expect(last.x).toBeCloseTo(first.x, 0);
  });

  test("is a bar at the bottom of the screen at phone width", async ({
    page,
  }) => {
    await page.setViewportSize(MOBILE);
    await page.goto(path);
    const links = page.locator(`${shareBar} .cjs-share-link`);
    const first = (await links.first().boundingBox())!;
    const last = (await links.last().boundingBox())!;
    expect(first.y + first.height).toBeGreaterThan(MOBILE.height - 80);
    expect(last.y).toBeCloseTo(first.y, 0);
    expect(last.x).toBeGreaterThan(first.x);
  });
});

test.describe("Share bar on a phone", () => {
  test.use({ viewport: MOBILE });

  test("does not cover the end of the footer", async ({ page }) => {
    await page.goto(path);
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    const last = page.locator(".cjs-site-footer").locator("*").last();
    await expect
      .poll(async () => {
        const bar = (await page.locator(".cjs-share-bar > div").boundingBox())!;
        const box = (await last.boundingBox())!;
        return box.y + box.height <= bar.y;
      })
      .toBe(true);
  });
});
