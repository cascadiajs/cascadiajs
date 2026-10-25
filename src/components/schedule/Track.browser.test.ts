import { afterEach, expect, test } from "vitest";
import { page } from "vitest/browser";
import "../../styles/global.css";
import { mountAstro, unmountAll } from "@shared/test/mount-astro";

const DAY_CONTENT = "src/components/schedule/DayContent.astro";
const TRACK = "src/components/schedule/Track.astro";
const TALK_ROW = "src/components/schedule/TalkRow.astro";

afterEach(unmountAll);

const talk = (title: string) => ({
  id: title,
  slug: null,
  title,
  type: "main",
  speaker: { name: "A Speaker", image: "/x.jpg", roles: ["speaker"] },
});

/** Mount a Track in `parent`, with one TalkRow per `[title, when]` pair. */
async function mountTrack(
  parent: Element,
  kind: "main" | "workshop",
  title: string,
  rows: [string, string?][],
) {
  const track = (await mountAstro(TRACK, { kind, title })).firstElementChild!;
  for (const [rowTitle, when] of rows) {
    const row = await mountAstro(TALK_ROW, {
      talk: talk(rowTitle),
      when,
      talksBase: "/test-base/talks",
    });
    track.append(...row.children);
  }
  parent.append(track);
}

async function mountDay() {
  const day = (await mountAstro(DAY_CONTENT)).firstElementChild!;
  await mountTrack(day, "main", "Main Track", [["First", "9:00am"]]);
  await mountTrack(day, "workshop", "Workshop Track", [["Second", "9:00am"]]);
}

const box = (name: string) =>
  page.getByText(name, { exact: true }).element().getBoundingClientRect();

test("Tracks sit side by side at desktop width", async () => {
  await page.viewport(1280, 800);
  await mountDay();

  expect(box("Workshop Track").top).toBeCloseTo(box("Main Track").top, 0);
  expect(box("Workshop Track").left).toBeGreaterThanOrEqual(
    box("Main Track").right,
  );
});

test("Tracks stack at phone width", async () => {
  await page.viewport(390, 844);
  await mountDay();

  expect(box("Workshop Track").top).toBeGreaterThanOrEqual(
    box("Main Track").bottom,
  );
  expect(box("Workshop Track").left).toBeCloseTo(box("Main Track").left, 0);
});

test("every row in a Track keeps the time column at the same position and width", async () => {
  await page.viewport(1280, 800);
  const host = document.createElement("div");
  document.body.append(host);
  await mountTrack(host, "main", "Main Track", [
    ["First", "9:00am"],
    ["Second", "10:30am"],
    ["Third", undefined],
  ]);

  const cells = [...host.querySelectorAll(".cjs-time-cell")].map((cell) => {
    const { left, width } = cell.getBoundingClientRect();
    return { left, width };
  });

  expect(cells).toHaveLength(3);
  expect(cells[1]).toEqual(cells[0]);
  expect(cells[2]).toEqual(cells[0]);
});
