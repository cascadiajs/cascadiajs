import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { expect, it } from "vitest";
import HallwayTrack from "./HallwayTrack.astro";
import type { Sponsor } from "@shared/data/types";

// `logo` is the file name of an image in src/assets/images/sponsors.
const sponsor = (
  id: string,
  tier: Sponsor["tier"],
  events: Sponsor["events"] = ["2026"],
): Sponsor => ({
  id,
  tier,
  name: id,
  logo: "test-logo.svg",
  url: `https://${id}.example.com`,
  events,
});

it("shows the platinum Sponsors, then the gold Sponsors, of one Event, each linking to its site in a new tab", async () => {
  const container = await AstroContainer.create();
  const html = await container.renderToString(HallwayTrack, {
    props: {
      year: "2026",
      sponsors: [
        sponsor("gold-a", "gold"),
        sponsor("silver-a", "silver"),
        sponsor("plat-other-event", "platinum", ["2025"]),
        sponsor("plat-a", "platinum"),
      ],
    },
  });
  const wall = [...html.matchAll(/<a\b[^>]*target="_new"[^>]*>/g)].map(
    (m) => m[0].match(/href="([^"]+)"/)![1],
  );
  expect(wall).toEqual([
    "https://plat-a.example.com",
    "https://gold-a.example.com",
  ]);
});
