import { afterEach, expect, test } from "vitest";
import { page } from "vitest/browser";
import "../styles/global.css";
import { mountAstro, unmountAll } from "@shared/test/mount-astro";

const IMAGE_MOSAIC = "src/components/ImageMosaic.astro";
const IMAGES = [
  { src: "/events/2026/images/adam-argyle.jpg", alt: "First" },
  { src: "/events/2026/images/alex-hinson.jpg", alt: "Second" },
];

afterEach(unmountAll);

const box = (alt: string) =>
  page.getByAltText(alt).element().getBoundingClientRect();

test("items sit side by side at desktop width", async () => {
  await page.viewport(1280, 800);
  await mountAstro(IMAGE_MOSAIC, { images: IMAGES });

  expect(box("Second").top).toBeCloseTo(box("First").top, 0);
  expect(box("Second").left).toBeGreaterThanOrEqual(box("First").right);
});

test("items stack at phone width", async () => {
  await page.viewport(390, 844);
  await mountAstro(IMAGE_MOSAIC, { images: IMAGES });

  expect(box("Second").top).toBeGreaterThanOrEqual(box("First").bottom);
  expect(box("Second").left).toBeCloseTo(box("First").left, 0);
});
