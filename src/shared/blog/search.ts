/**
 * Blog search, pure core. Takes plain data, so Vitest reaches it without
 * Astro. The `/blog/search` route reads its input through
 * `parseSearchInput` and its results through `searchPosts`.
 */
import { normalizeTag } from "./format";

/** The longest `q` the route accepts. */
export const MAX_QUERY_LENGTH = 100;

/** What search sees of a Post. Tags are raw or normalized; both match. */
export interface SearchablePost {
  title: string;
  authorNames: string[];
  tags: string[];
  pubDate: Date;
}

/** Every normalized Tag on the given Posts, sorted, with no repeats. */
export function collectTags(posts: readonly { tags: string[] }[]): string[] {
  return [
    ...new Set(posts.flatMap((post) => post.tags.map(normalizeTag))),
  ].sort();
}

export type SearchInput =
  | { kind: "redirect" }
  | { kind: "invalid"; reason: "q-too-long" | "unknown-tag" }
  | { kind: "ok"; q: string; tag: string | undefined };

/**
 * Validate the raw query-string values. No `q` and no `tag` redirects to
 * `/blog`. A `q` over 100 characters or a `tag` that is not an existing
 * normalized Tag is invalid (the route answers 400).
 */
export function parseSearchInput(
  raw: { q: string | null; tag: string | null },
  knownTags: ReadonlySet<string>,
): SearchInput {
  const q = (raw.q ?? "").trim();
  const tag = raw.tag ? raw.tag : undefined;
  if (!q && !tag) {
    return { kind: "redirect" };
  }
  if (q.length > MAX_QUERY_LENGTH) {
    return { kind: "invalid", reason: "q-too-long" };
  }
  if (tag !== undefined && !knownTags.has(tag)) {
    return { kind: "invalid", reason: "unknown-tag" };
  }
  return { kind: "ok", q, tag };
}

/**
 * Posts that match, newest first. Each whitespace-separated term of `q` must
 * be a case-insensitive substring of the title, an Author name or a Tag.
 * `tag` is an exact normalized-Tag match. Both apply together.
 */
export function searchPosts<T extends SearchablePost>(
  posts: readonly T[],
  { q = "", tag }: { q?: string; tag?: string },
): T[] {
  const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
  return posts
    .filter((post) => {
      if (
        tag !== undefined &&
        !post.tags.some((t) => normalizeTag(t) === tag)
      ) {
        return false;
      }
      const haystack = [
        post.title,
        ...post.authorNames,
        ...post.tags,
        ...post.tags.map(normalizeTag),
      ].map((text) => text.toLowerCase());
      return terms.every((term) =>
        haystack.some((text) => text.includes(term)),
      );
    })
    .sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());
}
