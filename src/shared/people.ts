/**
 * The Person registry (ADR-0017): schemas, the registry parser and the
 * resolver. Pure on purpose (no `astro:content`, no `import.meta.glob`), so
 * Vitest, Playwright helpers and the content config can all import it.
 */
import { z } from "astro/zod";

/**
 * A resolved Person: what components take. A Speaker, Organizer or Author
 * with any Event overrides already applied.
 */
export const personSchema = z.object({
  name: z.string(),
  image: z.string(),
  roles: z.array(z.enum(["speaker", "organizer", "author"])),
  /** Descriptive position, e.g. "Lead Organizer", "Co-Emcee". */
  title: z.string().optional(),
  company: z.string().optional(),
  location: z.string().optional(),
  url: z.string().optional(),
  pronouns: z.string().optional(),
  social: z
    .array(
      z.object({
        type: z.enum(["linkedin", "x-twitter", "bluesky", "github"]),
        url: z.string(),
      }),
    )
    .optional(),
});

/** One entry in `people.json`. The `id` is a hand-written kebab-case name. */
export const personRecordSchema = personSchema.extend({
  id: z.string().min(1),
  /** Plain text. Shown on the Author page. */
  bio: z.string().optional(),
});

/** Details true only at one Event. Replace the registry value when set. */
export const personOverridesSchema = z
  .object({
    title: z.string(),
    company: z.string(),
    location: z.string(),
    image: z.string(),
  })
  .partial()
  .strict();

/** How a Talk or organizer entry points at a Person. */
export const personRefSchema = z.object({
  id: z.string(),
  overrides: personOverridesSchema.optional(),
});

export type Person = z.infer<typeof personSchema>;
export type PersonRecord = z.infer<typeof personRecordSchema>;
export type PersonRef = z.infer<typeof personRefSchema>;

/**
 * Parse the registry file. Throws on a bad record or a duplicate `id`:
 * Astro's `file()` loader would only warn and let the later entry win.
 */
export function parsePeople(text: string): PersonRecord[] {
  const people = z.array(personRecordSchema).parse(JSON.parse(text));
  const seen = new Set<string>();
  const duplicates = new Set<string>();
  for (const { id } of people) {
    if (seen.has(id)) {
      duplicates.add(id);
    }
    seen.add(id);
  }
  if (duplicates.size > 0) {
    throw new Error(
      `people.json has duplicate Person ids: ${[...duplicates]
        .map((id) => `"${id}"`)
        .join(", ")}`,
    );
  }
  return people;
}

/**
 * Turn a reference plus its overrides into the resolved Person components
 * take. Throws for an id missing from the registry.
 */
export function resolvePerson(
  registry: readonly PersonRecord[],
  ref: PersonRef,
): Person {
  const record = registry.find((p) => p.id === ref.id);
  if (!record) {
    throw new Error(`No Person with id "${ref.id}" in the registry`);
  }
  const person: Partial<PersonRecord> = { ...record };
  delete person.id;
  delete person.bio;
  return { ...(person as Person), ...ref.overrides };
}
