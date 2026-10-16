import { defineCollection } from "astro:content";
import { file, glob } from "astro/loaders";
import { z } from "astro/zod";

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

/** A Speaker or Organizer profile, shared across Talks and roster pages. */
export const personSchema = z.object({
  name: z.string(),
  image: z.string(),
  roles: z.array(z.enum(["speaker", "organizer"])),
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

const talks2026 = defineCollection({
  loader: file("./src/shared/data/2026/talks.json", {
    parser: (text) =>
      (JSON.parse(text) as object[]).map((talk, order) => ({ ...talk, order })),
  }),
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

export const collections = { markdown, talks2026, sponsors };
