import { afterEach, expect, test } from "vitest";
import { page } from "vitest/browser";
import "../styles/global.css";
import { mountAstro, unmountAll } from "@shared/test/mount-astro";

const TICKET_CARD = "src/components/TicketCard.astro";

// The Event page wraps its cards in this grid, so the test uses a copy of it.
const GRID = `<div class="cjs-ticket-grid text-left md:mx-auto md:my-4 md:flex md:justify-center">%s</div>`;

afterEach(unmountAll);

const ticket = (name: string) => ({
  ticket: { name, includes: ["One thing"], footnotes: [] },
});

async function mountTwoCards() {
  const host = await mountAstro(TICKET_CARD, ticket("First"), GRID);
  const second = await mountAstro(TICKET_CARD, ticket("Second"));
  host.firstElementChild!.append(...second.children);
}

const box = (name: string) =>
  page.getByText(name, { exact: true }).element().getBoundingClientRect();

test("cards sit side by side at desktop width", async () => {
  await page.viewport(1280, 800);
  await mountTwoCards();

  expect(box("Second").top).toBeCloseTo(box("First").top, 0);
  expect(box("Second").left).toBeGreaterThan(box("First").right);
});

test("cards stack at phone width", async () => {
  await page.viewport(390, 844);
  await mountTwoCards();

  expect(box("Second").top).toBeGreaterThan(box("First").bottom);
  expect(box("Second").left).toBeCloseTo(box("First").left, 0);
});
