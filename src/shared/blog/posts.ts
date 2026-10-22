/**
 * Blog query module, pure core. Takes plain Post entries. Every blog route
 * gets its Posts through here, so the draft rule lives in one place. Do not
 * import `astro:content` here; `get-posts.ts` does that.
 */

import { normalizeTag } from "./format";

export interface PostLike {
  id: string;
  data: { pubDate: Date; published: boolean };
}

/** Ids that occur more than once. */
export function duplicateIds(ids: readonly string[]): string[] {
  const seen = new Set<string>();
  const dupes = new Set<string>();
  for (const id of ids) {
    if (seen.has(id)) {
      dupes.add(id);
    }
    seen.add(id);
  }
  return [...dupes];
}

/**
 * Author references that name no Person. Astro only logs a dangling
 * `reference()`; the Collection loader uses this to fail the build.
 */
export function unknownAuthors(
  posts: readonly {
    id: string;
    data: { authors: readonly { id: string }[] };
  }[],
  personIds: ReadonlySet<string>,
): { post: string; author: string }[] {
  return posts.flatMap((post) =>
    post.data.authors
      .filter((author) => !personIds.has(author.id))
      .map((author) => ({ post: post.id, author: author.id })),
  );
}

/**
 * The visible Posts, newest first. A draft (`published: false`) is visible
 * only in dev (`pnpm dev`).
 */
export function visiblePosts<T extends PostLike>(
  posts: readonly T[],
  { dev }: { dev: boolean },
): T[] {
  return posts
    .filter((post) => dev || post.data.published)
    .sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());
}

/** The most Posts the Featured band holds. */
export const FEATURED_LIMIT = 3;

/**
 * Split newest-first Posts into the Featured band and the rest. Featured is
 * the newest three with `featured: true`. Older flagged Posts stay in `rest`
 * as normal Posts, in their original order.
 */
export function splitFeatured<T extends { data: { featured: boolean } }>(
  posts: readonly T[],
): { featured: T[]; rest: T[] } {
  const featured = posts
    .filter((post) => post.data.featured)
    .slice(0, FEATURED_LIMIT);
  const chosen = new Set(featured);
  return { featured, rest: posts.filter((post) => !chosen.has(post)) };
}

/** The Posts that list `authorId` in `authors`, in the input order. */
export function postsByAuthor<
  T extends { data: { authors: readonly { id: string }[] } },
>(posts: readonly T[], authorId: string): T[] {
  return posts.filter((post) =>
    post.data.authors.some((author) => author.id === authorId),
  );
}

/**
 * Tag index: normalized Tag to its Posts, newest first. Tags that differ only in case are one Tag. A Post that repeats a
 * Tag in different cases is listed once.
 */
export function tagIndex<
  T extends { data: { pubDate: Date; tags: readonly string[] } },
>(posts: readonly T[]): Map<string, T[]> {
  const index = new Map<string, T[]>();
  const newestFirst = [...posts].sort(
    (a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime(),
  );
  for (const post of newestFirst) {
    for (const tag of new Set(post.data.tags.map(normalizeTag))) {
      index.set(tag, [...(index.get(tag) ?? []), post]);
    }
  }
  return index;
}
