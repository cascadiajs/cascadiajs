import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { describe, expect, it } from "vitest";
import SponsorsGrid from "./SponsorsGrid.astro";
import type { Sponsor } from "@shared/data/types";

// `logo` is the file name of an image in src/assets/images/sponsors.
const sponsor = (
  id: string,
  tier: Sponsor["tier"],
  extra: Partial<Sponsor> = {},
): Sponsor => ({
  id,
  tier,
  name: id,
  logo: "ai-portland.svg",
  url: `https://${id}.example.com`,
  events: ["2026"],
  ...extra,
});

async function render(props: Record<string, unknown>) {
  const container = await AstroContainer.create();
  return container.renderToString(SponsorsGrid, { props });
}

/** The inner HTML of the tier cell for a tier. */
const cell = (html: string, tier: string) =>
  html.split(`cjs-sponsor-tier-${tier} `)[1]?.split("</div>")[0] ?? "";
const anchors = (html: string) =>
  [...html.matchAll(/<a\b[^>]*>/g)].map((m) => m[0]);
const count = (html: string, tag: RegExp) => [...html.matchAll(tag)].length;

describe("tiered SponsorsGrid", () => {
  const sponsors = [
    sponsor("with-page", "gold", { description: "About us" }),
    sponsor("no-page", "platinum"),
    sponsor("bronze-co", "bronze"),
    sponsor("media-co", "media"),
  ];

  it("links a top-tier logo to the Sponsor page when it has a description", async () => {
    const html = await render({ tiered: true, year: "2026", sponsors });
    const links = anchors(cell(html, "gold"));
    expect(links).toHaveLength(1);
    expect(links[0]).toContain('href="/2026/sponsors/with-page"');
    expect(links[0]).not.toContain("target=");
  });

  it("links a top-tier logo to the Sponsor's site when it has no description", async () => {
    const html = await render({ tiered: true, year: "2026", sponsors });
    const links = anchors(cell(html, "platinum"));
    expect(links).toHaveLength(1);
    expect(links[0]).toContain('href="https://no-page.example.com"');
    expect(links[0]).toContain('target="_blank"');
  });

  it("does not link a logo in the other tiers", async () => {
    const html = await render({ tiered: true, year: "2026", sponsors });
    for (const tier of ["bronze", "media"]) {
      expect(count(cell(html, tier), /<img\b/g)).toBe(1);
      expect(anchors(cell(html, tier))).toHaveLength(0);
    }
  });

  it("renders the tiers in tier order", async () => {
    const html = await render({ tiered: true, year: "2026", sponsors });
    const order = [...html.matchAll(/cjs-sponsor-tier-(\w+)/g)].map(
      (m) => m[1],
    );
    expect(order).toEqual(["platinum", "gold", "bronze", "media"]);
  });
});

describe("flat SponsorsGrid", () => {
  it("shows the Sponsors that are not only in the excluded Event, with no links", async () => {
    const html = await render({
      exclude: "2026",
      sponsors: [
        sponsor("new-only", "gold", { description: "x" }),
        sponsor("returning", "gold", {
          description: "x",
          events: ["2025", "2026"],
        }),
        sponsor("old", "silver", { events: ["previous"] }),
      ],
    });
    const ids = [...html.matchAll(/id="(sponsor-[^"]+)"/g)].map((m) => m[1]);
    expect(ids).toEqual(["sponsor-old", "sponsor-returning"]);
    expect(count(html, /<img\b/g)).toBe(2);
    expect(anchors(html)).toHaveLength(0);
  });
});
