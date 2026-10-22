import { getCollection } from "astro:content";
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
