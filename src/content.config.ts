import { defineCollection } from "astro:content";
import { readFileSync } from "node:fs";
import { file, glob, type Loader } from "astro/loaders";
import { z } from "astro/zod";
import {
  parsePeople,
  personRecordSchema,
  personRefSchema,
  personSchema,
  resolvePerson,
} from "./shared/people";

export { personSchema };

const PEOPLE_FILE = "./src/shared/data/people.json";
const TALKS_2026_FILE = "./src/shared/data/2026/talks.json";

const markdown = defineCollection({
  loader: glob({ base: "./src/content/markdown", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    /** Description fallback when no explicit `description` is set (legacy). */
    width: z.enum(["narrow", "wide"]).default("narrow"),
    image: z.string().optional(),
    /** Share image path under `public/`; defaults to the general image. */
    ogImage: z.string().optional(),
    showSponsors: z.boolean().default(true),
    showTestimonials: z.boolean().default(true),
    published: z.boolean().default(true),
  }),
});

export const talkSchema = z.object({
  id: z.string(),
  /** null renders the title as plain text, not a link. */
  slug: z.string().nullable(),
  title: z.string(),
  type: z.enum(["keynote", "main", "lightning", "workshop"]),
  abstract: z.string().optional(),
  /** Site-relative path (not an absolute URL) to a Workshop's registration page. */
  registrationUrl: z.string().optional(),
  tags: z.array(z.string()).optional(),
  yt: z.string().optional(),
  /** No separate slug -- lookups key on the Talk's id instead. */
  speaker: personSchema,
});

export const sponsorSchema = z.object({
  id: z.string(),
  tier: z
    .enum([
      "platinum",
      "diamond",
      "gold",
      "silver",
      "bronze",
      "community",
      "media",
    ])
    .optional(),
  logo: z.string(),
  name: z.string(),
  url: z.string().optional(),
  video: z.string().optional(),
  description: z.string().optional(),
  events: z.array(z.enum(["previous", "2025", "2026", "2027"])),
});

// Custom loaders instead of `file()`: a parser that throws inside `file()` is
// logged and swallowed, so the build would still pass. A throw in `load()`
// fails the build.
const people = defineCollection({
  loader: {
    name: "people-loader",
    load: async ({ store, parseData, generateDigest }) => {
      const records = parsePeople(readFileSync(PEOPLE_FILE, "utf8"));
      store.clear();
      for (const record of records) {
        const data = await parseData({ id: record.id, data: record });
        store.set({ id: record.id, data, digest: generateDigest(data) });
      }
    },
  } satisfies Loader,
  schema: personRecordSchema,
});

const talkFileSchema = talkSchema.extend({ speaker: personRefSchema });

const talks2026 = defineCollection({
  loader: {
    name: "talks2026-loader",
    load: async ({ store, parseData, generateDigest }) => {
      const registry = parsePeople(readFileSync(PEOPLE_FILE, "utf8"));
      const talks = z
        .array(talkFileSchema)
        .parse(JSON.parse(readFileSync(TALKS_2026_FILE, "utf8")));
      store.clear();
      for (const [order, talk] of talks.entries()) {
        // The Talk stores a Person reference; the Collection holds the
        // resolved Person, so consumers still read `talk.speaker` whole.
        const speaker = resolvePerson(registry, talk.speaker);
        const data = await parseData({
          id: talk.id,
          data: { ...talk, speaker, order },
        });
        store.set({ id: talk.id, data, digest: generateDigest(data) });
      }
    },
  } satisfies Loader,
  // The collection store sorts entries by id, so `order` records each Talk's
  // position in talks.json for pages that list Talks. It stays off the shared
  // Talk type.
  schema: talkSchema.extend({ order: z.number() }),
});
const sponsors = defineCollection({
  loader: file("./src/shared/data/sponsors.json", {
    parser: (text) =>
      (JSON.parse(text) as object[]).map((sponsor, order) => ({
        ...sponsor,
        order,
      })),
  }),
  // The collection store sorts entries by id, so `order` records each
  // Sponsor's position in sponsors.json for pages that list Sponsors. It
  // stays off the shared Sponsor type.
  schema: sponsorSchema.extend({ order: z.number() }),
});

export const collections = { markdown, people, talks2026, sponsors };
