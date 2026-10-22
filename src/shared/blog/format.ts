/**
 * Blog format helpers. Pure on purpose (no `astro:content`, no
 * `import.meta.glob`), so Vitest and every blog route can import them.
 */

const WORDS_PER_MINUTE = 200;

/**
 * The Tag slug: lowercase, with each run of non-alphanumerics collapsed to
 * `-`. It is the URL segment and the identity of a Tag.
 */
export function normalizeTag(tag: string): string {
  return tag
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Minutes to read a Post body (raw Markdown or MDX): 200 words per minute,
 * rounded up, never below 1. MDX `import`/`export` lines, images, JSX/HTML
 * tags, link URLs and Markdown symbols do not count as words.
 */
export function readingMinutes(body: string): number {
  const text = body
    .replace(/^\s*(import|export)\s.*$/gm, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/<[^>]*>/g, " ");
  const words = text.split(/\s+/).filter((word) => /[\p{L}\p{N}]/u.test(word));
  return Math.max(1, Math.ceil(words.length / WORDS_PER_MINUTE));
}

/** The text between two names in a Post-page byline. */
export function bylineSeparator(index: number, total: number): string {
  if (index === 0) {
    return "";
  }
  return index === total - 1 ? " and " : ", ";
}

/** Post-page byline: "A", "A and B", "A, B and C". Every Author is named. */
export function postByline(names: readonly string[]): string {
  return names
    .map((name, index) => bylineSeparator(index, names.length) + name)
    .join("");
}

/** Card byline: "A", "A and B", or "A and N others" for three or more. */
export function cardByline(names: readonly string[]): string {
  if (names.length <= 2) {
    return postByline(names);
  }
  return `${names[0]} and ${names.length - 1} others`;
}

/** "March 10, 2026". Dates are UTC calendar days. */
export function formatPostDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    dateStyle: "long",
    timeZone: "UTC",
  });
}
