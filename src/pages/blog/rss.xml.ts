import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getVisiblePosts } from "@shared/blog/get-posts";

export async function GET(context: APIContext) {
  const posts = await getVisiblePosts();
  return rss({
    title: "CascadiaJS Blog",
    description: "News and writing from the CascadiaJS community.",
    site: context.site ?? context.url.origin,
    trailingSlash: false,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      link: `/blog/post/${post.id}`,
      pubDate: post.data.pubDate,
    })),
  });
}
