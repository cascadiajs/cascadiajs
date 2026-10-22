import { getCollection, getEntries, type CollectionEntry } from "astro:content";
import { visiblePosts } from "./posts";

/**
 * The visible Posts, newest first. Every blog route uses this; none filters
 * drafts itself.
 */
export async function getVisiblePosts() {
  return visiblePosts(await getCollection("blog"), {
    dev: import.meta.env.DEV,
  });
}

/** A Post's Authors in byline order, as the Post card and byline take them. */
export async function getPostAuthors(post: CollectionEntry<"blog">) {
  const entries = await getEntries(post.data.authors);
  return entries.map((entry) => ({
    id: entry.id,
    name: entry.data.name,
    image: entry.data.image,
  }));
}
