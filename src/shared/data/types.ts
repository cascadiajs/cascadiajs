/**
 * Shared record shapes for per-Event datasets, consumed by multiple
 * Schedule components -- unlike single-consumer shapes declared locally
 * elsewhere (e.g. `SponsorsGrid.astro`).
 */

import z from "astro/zod";
import { talkSchema, sponsorSchema } from "../../content.config";
import type { Person as ResolvedPerson } from "../people";
/**
 * A presentation delivered by a Speaker at an Event.
 *
 * Derived from the `talks` content collection's Zod schema, which is
 * the single source of truth for this shape -- see `content.config.ts`.
 */
export type Talk = z.infer<typeof talkSchema>;
/** A Speaker or Organizer profile, shared across Talks and roster pages.
 * Derived from the `person` content collection's Zod schema, which is
 * the single source of truth for this shape -- see `content.config.ts`.
 */
export type Person = ResolvedPerson;

/** A Sponsor for an Event, with tier, logo, and other metadata.
 * Derived from the `sponsor` content collection's Zod schema, which is
 * the single source of truth for this shape -- see `content.config.ts`.
 */
export type Sponsor = z.infer<typeof sponsorSchema>;

/**
 * A non-Talk happening at an Event, occurring at a stated time -- see
 * GLOSSARY.md's Activity glossary entry. Renders in fixed order: icon ->
 * title (linked if `url`) -> titleSuffix -> image -> body -> slot -> cta.
 */
export type Activity = {
  id: string;
  /** Free text, never parsed (e.g. "5:30pm - 8:30pm"). */
  when: string;
  icon?: string;
  title: string;
  /** Renders as a link when present. */
  url?: string;
  target?: "_blank";
  titleSuffix?: string;
  /** `src` is a sponsor-logo filename relative to src/assets/images/sponsors (like sponsors.json `logo`). */
  image?: { src: string; alt: string };
  /** One string per paragraph. */
  body?: string[];
  cta?: {
    label: string;
    href: string;
    target?: "_blank" | "_discord";
    display: "inline" | "block";
    variant?: "secondary";
  };
};

/** A purchasable Ticket tier for an Event. */
export interface Ticket {
  name: string;
  subLabel?: string;
  price?: string;
  retail?: string;
  sale?: string;
  includes: string[];
  footnotes: string[];
}

/** One entry in an Event's primary navigation. */
export interface EventNavItem {
  label: string;
  href: string;
  isCta?: boolean;
}

/**
 * An Event Key that names a real Event (every Sponsor Event Key except
 * `previous`, which groups years that have no Event pages). Always a
 * four-digit year.
 */
export type EventYear = Exclude<Sponsor["events"][number], "previous">;

/** Per-Event site configuration (branding, dates, nav). */
export interface EventConfig {
  name: string;
  year: EventYear;
  dates: string;
  venue: string;
  location: string;
  logo: string;
  ogImage: string;
  ogDescription: string;
  nav: EventNavItem[];
  cta?: { label: string; href: string };
}
