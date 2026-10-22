/**
 * Blog query module, pure core. Takes plain Post entries. Every blog route
 * gets its Posts through here, so the draft rule lives in one place. Do not
 * import `astro:content` here; `get-posts.ts` does that.
 */

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
