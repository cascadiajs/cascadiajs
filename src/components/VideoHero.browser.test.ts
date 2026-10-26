import { afterEach, expect, test } from "vitest";
import { page } from "vitest/browser";
import "../styles/global.css";
import { mountAstro, unmountAll } from "@shared/test/mount-astro";

const VIDEO_HERO = "src/components/VideoHero.astro";
const HEADLINE =
  "A long literal headline that has to wrap onto more than one line on a phone";

afterEach(unmountAll);

/** A hero with a headline in its slot. */
async function mountHero() {
  const host = await mountAstro(VIDEO_HERO, { videoSrc: "/none.mp4" });
  const headline = document.createElement("h2");
  headline.textContent = HEADLINE;
  host.querySelector(".cjs-video-hero > div:last-child")!.append(headline);
  return {
    hero: host.querySelector(".cjs-video-hero")!.getBoundingClientRect(),
    headline,
  };
}

test("the hero stays inside the viewport and the headline does not overflow at desktop width", async () => {
  await page.viewport(1280, 800);
  const { hero, headline } = await mountHero();

  expect(hero.right).toBeLessThanOrEqual(1280);
  expect(headline.getBoundingClientRect().right).toBeLessThanOrEqual(1280);
  expect(headline.scrollWidth).toBeLessThanOrEqual(headline.clientWidth);
});

test("the hero stays inside the viewport and the headline wraps without overflow at phone width", async () => {
  await page.viewport(390, 844);
  const { hero, headline } = await mountHero();
  const box = headline.getBoundingClientRect();
  const lineHeight = parseFloat(getComputedStyle(headline).lineHeight);

  expect(hero.right).toBeLessThanOrEqual(390);
  expect(box.right).toBeLessThanOrEqual(390);
  expect(headline.scrollWidth).toBeLessThanOrEqual(headline.clientWidth);
  expect(box.height).toBeGreaterThan(lineHeight * 1.5);
});
