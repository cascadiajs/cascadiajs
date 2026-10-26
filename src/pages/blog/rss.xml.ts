import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getVisiblePosts } from "@shared/blog/get-posts";
import { rssItems } from "@shared/blog/rss";

export async function GET(context: APIContext) {
  const posts = await getVisiblePosts();
  const site = context.site ?? context.url.origin;
  return rss({
    title: "CascadiaJS Blog",
    description: "News and writing from the CascadiaJS community.",
    site,
    trailingSlash: false,
    items: rssItems(posts, site),
  });
}
