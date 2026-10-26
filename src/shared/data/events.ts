import peopleJson from "./people.json";
import { parsePeople, resolvePerson, type PersonRef } from "../people";
import type { Activity, EventConfig, EventYear, Person, Ticket } from "./types";

const configs = import.meta.glob<{ default: EventConfig }>(
  "@shared/data/events/*.config.ts",
  { eager: true },
);

/**
 * Events whose pages use the shared Event chrome (ADR-0010). Previous
 * years' content is deferred, so today this is just 2026. The dynamic
 * Event routes build their static paths from this list.
 *
 * Must not be imported by the Event configs (they are globbed here).
 */
export const EVENTS_WITH_PAGES: readonly EventConfig[] = Object.values(
  configs,
).map((mod) => mod.default);

/**
 * Find the Event with pages for an arbitrary Event Key (e.g. a route param or
 * a Sponsor's Event Key), or undefined when it has none.
 */
export function findEventWithPages(key: string): EventConfig | undefined {
  return EVENTS_WITH_PAGES.find((event) => event.year === key);
}

/**
 * Look up an Event's config by Event Key. Throws when the Event has no
 * config so a typo on a hand-written Event page fails the build.
 */
export function getEventConfig(year: EventYear): EventConfig {
  const config = findEventWithPages(year);
  if (!config) {
    throw new Error(`getEventConfig: no event config found for year "${year}"`);
  }
  return config;
}

const organizerFiles = import.meta.glob<PersonRef[]>(
  "@shared/data/*/organizers.json",
  { eager: true, import: "default" },
);
const registry = parsePeople(JSON.stringify(peopleJson));
const ticketFiles = import.meta.glob<Ticket[]>("@shared/data/*/tickets.json", {
  eager: true,
  import: "default",
});
const activityFiles = import.meta.glob<Activity[]>(
  "@shared/data/*/activities.json",
  { eager: true, import: "default" },
);

/**
 * Read one Event's file of a dataset from an eager glob. Throws for an Event
 * Key with no Event pages; an Event with pages but no such file gets [].
 */
function readDataset<T>(
  files: Record<string, T[]>,
  year: EventYear,
  file: string,
): T[] {
  getEventConfig(year);
  const path = Object.keys(files).find((p) => p.endsWith(`/${year}/${file}`));
  return path ? files[path] : [];
}

/**
 * An Event's Organizers, resolved from the Person registry with the Event's
 * overrides applied. [] when it has no Organizers file.
 */
export function getOrganizers(year: EventYear): Person[] {
  const refs = readDataset(organizerFiles, year, "organizers.json");
  return refs.map((ref) => resolvePerson(registry, ref));
}

/** An Event's Tickets, or [] when it has no Tickets file. */
export function getTickets(year: EventYear): Ticket[] {
  return readDataset(ticketFiles, year, "tickets.json");
}

/** An Event's Activities, or [] when it has no Activities file. */
export function getActivities(year: EventYear): Activity[] {
  return readDataset(activityFiles, year, "activities.json");
}

/**
 * Look up one Activity by id. Throws when it is not found so a typo'd id
 * fails the build rather than rendering a blank row.
 */
export function getActivity(year: EventYear, id: string): Activity {
  const found = getActivities(year).find((a) => a.id === id);
  if (!found) {
    throw new Error(
      `getActivity: no Activity found for year "${year}" with id "${id}"`,
    );
  }
  return found;
}
