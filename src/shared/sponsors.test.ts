import { describe, expect, it } from "vitest";
import {
  hallwayWall,
  selectSponsors,
  tierBands,
  type Sponsor,
} from "@shared/sponsors";

const sponsor = (
  id: string,
  tier: Sponsor["tier"],
  events: Sponsor["events"],
): Sponsor => ({ id, tier, name: id, logo: `${id}.svg`, events });

const ids = (list: Sponsor[]) => list.map((s) => s.id);

describe("selectSponsors", () => {
  const all = [
    sponsor("a", "gold", ["2026"]),
    sponsor("b", "gold", ["2025"]),
    sponsor("c", "gold", ["2025", "2026"]),
    sponsor("d", "gold", ["previous"]),
  ];

  it("keeps every Sponsor when no Event Key is given", () => {
    expect(ids(selectSponsors(all))).toEqual(["a", "b", "c", "d"]);
  });

  it("keeps only the Sponsors of the included Event Key", () => {
    expect(ids(selectSponsors(all, { year: "2025" }))).toEqual(["b", "c"]);
  });

  it("hides a Sponsor whose only Event is the excluded Event Key", () => {
    expect(ids(selectSponsors(all, { exclude: "2026" }))).toEqual([
      "b",
      "c",
      "d",
    ]);
  });

  it("hides a Sponsor whose Events are all in a list of excluded Event Keys", () => {
    expect(ids(selectSponsors(all, { exclude: ["2026", "2025"] }))).toEqual([
      "d",
    ]);
  });

  it("keeps a Sponsor that is in an excluded and a not-excluded Event", () => {
    expect(ids(selectSponsors(all, { exclude: "2026" }))).toContain("c");
  });

  it("sorts by tier order, diamond first and media last", () => {
    const mixed = [
      sponsor("media", "media", ["2026"]),
      sponsor("bronze", "bronze", ["2026"]),
      sponsor("diamond", "diamond", ["2026"]),
      sponsor("community", "community", ["2026"]),
      sponsor("gold", "gold", ["2026"]),
      sponsor("silver", "silver", ["2026"]),
      sponsor("platinum", "platinum", ["2026"]),
    ];
    expect(ids(selectSponsors(mixed))).toEqual([
      "diamond",
      "platinum",
      "gold",
      "silver",
      "bronze",
      "community",
      "media",
    ]);
  });
});

describe("tierBands", () => {
  const bands = tierBands([
    sponsor("g1", "gold", ["2026"]),
    sponsor("br", "bronze", ["2026"]),
    sponsor("d1", "diamond", ["2026"]),
    sponsor("g2", "gold", ["2026"]),
    sponsor("none", undefined, ["2026"]),
  ]);

  it("groups Sponsors by tier in tier order and skips empty tiers", () => {
    expect(bands.map((b) => [b.tier, ids(b.sponsors)])).toEqual([
      ["diamond", ["d1"]],
      ["gold", ["g1", "g2"]],
      ["bronze", ["br"]],
    ]);
  });

  it("links only the diamond, platinum, gold and silver tiers", () => {
    const every = tierBands(
      (
        [
          "diamond",
          "platinum",
          "gold",
          "silver",
          "bronze",
          "community",
          "media",
        ] as const
      ).map((t) => sponsor(t, t, ["2026"])),
    );
    expect(every.map((b) => [b.tier, b.linked])).toEqual([
      ["diamond", true],
      ["platinum", true],
      ["gold", true],
      ["silver", true],
      ["bronze", false],
      ["community", false],
      ["media", false],
    ]);
  });
});

describe("hallwayWall", () => {
  it("lists the platinum Sponsors, then the gold Sponsors, of one Event", () => {
    const wall = hallwayWall(
      [
        sponsor("gold-a", "gold", ["2026"]),
        sponsor("silver-a", "silver", ["2026"]),
        sponsor("plat-other-event", "platinum", ["2025"]),
        sponsor("plat-a", "platinum", ["2026"]),
        sponsor("gold-b", "gold", ["2025", "2026"]),
        sponsor("plat-b", "platinum", ["2026"]),
      ],
      "2026",
    );
    expect(ids(wall)).toEqual(["plat-a", "plat-b", "gold-a", "gold-b"]);
  });
});
