import { afterEach, expect, test } from "vitest";
import "../styles/global.css";
import { mountAstro, unmountAll } from "@shared/test/mount-astro";

const CTA_BUTTON = "src/components/CtaButton.astro";
const HALLWAY_TRACK = "src/components/schedule/HallwayTrack.astro";
const SPONSORS_GRID = "src/components/SponsorsGrid.astro";

afterEach(unmountAll);

// The external-link icon is a `::after` glyph with no other observable form,
// so this is the one test file that reads a computed style.
const hasIcon = (link: Element) =>
  getComputedStyle(link, "::after").content !== "none";

const SPONSOR = {
  id: "a-sponsor",
  tier: "platinum",
  name: "A Sponsor",
  logo: "test-logo.svg",
  url: "https://sponsor.example.com",
  events: ["2026"],
};

test("an external link inside .mark-external-links shows the icon and an internal link does not", async () => {
  const host = await mountAstro(
    CTA_BUTTON,
    { href: "https://example.org", target: "_blank" },
    `<div class="mark-external-links">%s</div>`,
  );
  const internal = await mountAstro(CTA_BUTTON, { href: "/2026/attend" });
  host.firstElementChild!.append(...internal.children);

  expect(hasIcon(host.querySelector('a[href^="https"]')!)).toBe(true);
  expect(hasIcon(host.querySelector('a[href^="/"]')!)).toBe(false);
});

test("a Hallway Track Sponsor logo link shows no icon inside .mark-external-links", async () => {
  const host = await mountAstro(
    HALLWAY_TRACK,
    { year: "2026", sponsors: [SPONSOR] },
    `<div class="mark-external-links">%s</div>`,
  );

  const link = host.querySelector('a[href="https://sponsor.example.com"]')!;
  expect(link.querySelector("img")).not.toBeNull();
  expect(hasIcon(link)).toBe(false);
});

test("a Sponsors grid logo link that opens a new tab shows no icon outside .mark-external-links", async () => {
  const host = await mountAstro(SPONSORS_GRID, {
    tiered: true,
    year: "2026",
    sponsors: [SPONSOR],
  });

  const link = host.querySelector('a[target="_blank"]')!;
  expect(link.querySelector("img")).not.toBeNull();
  expect(hasIcon(link)).toBe(false);
});
