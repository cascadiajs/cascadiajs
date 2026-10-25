/**
 * Sponsor selection: which Sponsors a grid or wall shows, in which order, and
 * which tiers link. Pure functions, so the rules test with literal Sponsors.
 */

import type { Sponsor } from "./data/types";

export type { Sponsor };

type EventKey = Sponsor["events"][number];
type Tier = NonNullable<Sponsor["tier"]>;

/** Fixed tier order, diamond first, media last. */
export const TIER_ORDER: readonly Tier[] = [
  "diamond",
  "platinum",
  "gold",
  "silver",
  "bronze",
  "community",
  "media",
];

/** Only the top four tiers link out. */
const LINKED_TIERS: ReadonlySet<Tier> = new Set([
  "diamond",
  "platinum",
  "gold",
  "silver",
]);

/** The Hallway Track wall shows these tiers, in this order. */
const HALLWAY_TIERS: readonly Tier[] = ["platinum", "gold"];

const tierRank = (sponsor: Sponsor) =>
  sponsor.tier ? TIER_ORDER.indexOf(sponsor.tier) : TIER_ORDER.length;

/**
 * Select Sponsors, sorted by tier order (stable within a tier).
 *
 * - `year`: Event Key to include; omit to consider every Sponsor.
 * - `exclude`: Event Key(s) to exclude. A Sponsor is hidden only when every
 *   one of its Events is excluded, so a Sponsor in 2025 and 2026 still shows
 *   under `exclude: "2026"`.
 */
export function selectSponsors(
  sponsors: readonly Sponsor[],
  options: { year?: EventKey; exclude?: EventKey | EventKey[] } = {},
): Sponsor[] {
  const { year, exclude } = options;
  const excluded =
    exclude === undefined ? [] : Array.isArray(exclude) ? exclude : [exclude];
  return sponsors
    .filter((sponsor) => !year || sponsor.events.includes(year))
    .filter(
      (sponsor) =>
        excluded.length === 0 ||
        !sponsor.events.every((event) => excluded.includes(event)),
    )
    .map((sponsor, index) => ({ sponsor, index }))
    .sort(
      (a, b) => tierRank(a.sponsor) - tierRank(b.sponsor) || a.index - b.index,
    )
    .map(({ sponsor }) => sponsor);
}

/** Group Sponsors into tier bands in tier order; skips empty tiers and Sponsors with no tier. */
export function tierBands(
  sponsors: readonly Sponsor[],
): { tier: Tier; linked: boolean; sponsors: Sponsor[] }[] {
  return TIER_ORDER.map((tier) => ({
    tier,
    linked: LINKED_TIERS.has(tier),
    sponsors: sponsors.filter((sponsor) => sponsor.tier === tier),
  })).filter((band) => band.sponsors.length > 0);
}

/** The Hallway Track wall: the platinum Sponsors, then the gold Sponsors, of one Event. */
export function hallwayWall(
  sponsors: readonly Sponsor[],
  year: EventKey,
): Sponsor[] {
  return HALLWAY_TIERS.flatMap((tier) =>
    sponsors.filter(
      (sponsor) => sponsor.tier === tier && sponsor.events.includes(year),
    ),
  );
}
