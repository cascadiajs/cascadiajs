/**
 * RSS item mapping, pure core. Takes plain Posts, so Vitest can pass literal
 * data. Do not import `astro:content` here; the feed route does that.
 */

export interface RssPost {
  id: string;
  data: { title: string; description: string; pubDate: Date };
}

export interface RssItem {
  title: string;
  description: string;
  link: string;
  pubDate: Date;
}

/**
 * Feed items for Posts, newest first. Each link is absolute. An item holds no
 * body and no Author.
 */
export function rssItems(posts: readonly RssPost[], site: string | URL) {
  return [...posts]
    .sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime())
    .map(
      (post): RssItem => ({
        title: post.data.title,
        description: post.data.description,
        link: new URL(`/blog/post/${post.id}`, site).href,
        pubDate: post.data.pubDate,
      }),
    );
}
