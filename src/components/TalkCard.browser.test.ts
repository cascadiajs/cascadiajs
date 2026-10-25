import { afterEach, expect, test } from "vitest";
import { page } from "vitest/browser";
import "../styles/global.css";
import { mountAstro, unmountAll } from "@shared/test/mount-astro";

const TALK_CARD = "src/components/TalkCard.astro";
const PROPS = {
  href: "/2026/talks/a-talk",
  talk: {
    id: "a-talk",
    slug: "a-talk",
    title: "A literal title",
    type: "main",
    speaker: {
      name: "A Speaker",
      image: "/events/2026/images/adam-argyle.jpg",
      roles: ["speaker"],
    },
  },
};

afterEach(unmountAll);

test("the title overlay is visible at desktop width", async () => {
  await page.viewport(1280, 800);
  await mountAstro(TALK_CARD, PROPS);

  await expect
    .element(page.getByText("A literal title", { exact: true }))
    .toBeVisible();
});

test("the title overlay is not visible at phone width", async () => {
  await page.viewport(390, 844);
  await mountAstro(TALK_CARD, PROPS);

  await expect
    .element(page.getByText("A literal title", { exact: true }))
    .not.toBeVisible();
});
