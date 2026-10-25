import { afterEach, describe, expect, test } from "vitest";
import { commands, page } from "vitest/browser";
import "../../styles/global.css";
import "./progress-bar.css";
import "./share-bar.css";
import { mountAstro, unmountAll } from "@shared/test/mount-astro";

const PROGRESS_BAR = "src/components/blog/ProgressBar.astro";
const SHARE_BAR = "src/components/blog/ShareBar.astro";

afterEach(async () => {
  unmountAll();
  window.scrollTo(0, 0);
  await commands.emulateReducedMotion("no-preference");
});

/** The progress bar inside a tall Post, with a header above it. */
async function mountInPost() {
  await mountAstro(
    PROGRESS_BAR,
    {},
    `<header style="height:80px">Header</header><div>%s<div style="height:2000px">Body</div></div>`,
  );
}

const bar = () => document.querySelector(".cjs-progress-bar")!;
const fillWidth = () =>
  document.querySelector(".cjs-progress-bar-fill")!.getBoundingClientRect()
    .width;

describe("progress bar", () => {
  test("the fill grows as the page scrolls", async () => {
    await page.viewport(1280, 400);
    await mountInPost();
    const scrollable = document.documentElement.scrollHeight - 400;

    const start = fillWidth();
    window.scrollTo(0, scrollable / 2);
    await expect.poll(fillWidth).toBeGreaterThan(start);
    const middle = fillWidth();
    window.scrollTo(0, scrollable);
    await expect.poll(fillWidth).toBeGreaterThan(middle);
  });

  test("the bar stays at the top after the header scrolls away", async () => {
    await page.viewport(1280, 400);
    await mountInPost();

    expect(bar().getBoundingClientRect().top).toBe(80);
    window.scrollTo(0, 300);
    await expect.poll(() => bar().getBoundingClientRect().top).toBe(0);
  });

  test("the bar is hidden under reduced motion", async () => {
    await page.viewport(1280, 400);
    await commands.emulateReducedMotion("reduce");
    await mountInPost();

    expect(getComputedStyle(bar()).display).toBe("none");
  });
});

describe("share bar hover under reduced motion", () => {
  test("changes colour at once", async () => {
    await page.viewport(1280, 800);
    await commands.emulateReducedMotion("reduce");
    await mountAstro(SHARE_BAR, { title: "A literal title" });
    const link = page.getByRole("link", { name: "Bluesky" }).element();
    const before = getComputedStyle(link).backgroundColor;

    await page.getByRole("link", { name: "Bluesky" }).hover();

    expect(getComputedStyle(link).backgroundColor).not.toBe(before);
    expect(link.getAnimations()).toEqual([]);
  });
});
