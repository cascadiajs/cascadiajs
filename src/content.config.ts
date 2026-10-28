import { defineCollection, reference } from "astro:content";
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
import { duplicateIds, unknownAuthors } from "./shared/blog/posts";

export { personSchema };

const PEOPLE_FILE = "./src/shared/data/people.json";

function readPeople() {
  return parsePeople(readFileSync(PEOPLE_FILE, "utf8"));
}
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
    /** Show the site-wide alert banner above the header. */
    displayAlert: z.boolean().default(true),
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
      const records = readPeople();
      store.clear();
      for (const record of records) {
        const data = await parseData({ id: record.id, data: record });
        store.set({ id: record.id, data, digest: generateDigest(data) });
      }
    },
  } satisfies Loader,
  schema: personRecordSchema,
});

const blogGlob = glob({
  base: "./src/content",
  pattern: "blog/**/index.{md,mdx}",
  // The Post id is its folder name, which is the URL slug.
  generateId: ({ entry }) => entry.split("/").at(-2)!,
});

const blog = defineCollection({
  loader: {
    name: "blog-loader",
    load: async (context) => {
      await blogGlob.load(context);
      // Astro only logs a `reference()` to a missing Person. Fail the build.
      const personIds = new Set(readPeople().map((p) => p.id));
      const unknown = unknownAuthors(
        context.store.values() as never,
        personIds,
      );
      if (unknown.length > 0) {
        throw new Error(
          `Posts list unknown Authors: ${unknown
            .map(({ post, author }) => `${post} -> "${author}"`)
            .join(", ")}`,
        );
      }
    },
  } satisfies Loader,
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      /** Person ids in byline order. The first is the lead Author. */
      authors: z
        .array(reference("people"))
        .min(1)
        .refine(
          (authors) => duplicateIds(authors.map((a) => a.id)).length === 0,
          {
            message: "authors must not repeat a Person",
          },
        ),
      tags: z.array(z.string()),
      featured: z.boolean().default(false),
      image: image().optional(),
      /** Alt text for `image`. Without it the image is decorative. */
      imageAlt: z.string().optional(),
      ogImage: image().optional(),
      published: z.boolean().default(true),
    }),
});

const talkFileSchema = talkSchema.extend({ speaker: personRefSchema });

const talks2026 = defineCollection({
  loader: {
    name: "talks2026-loader",
    load: async ({ store, parseData, generateDigest }) => {
      const registry = readPeople();
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

export const collections = { markdown, blog, people, talks2026, sponsors };
