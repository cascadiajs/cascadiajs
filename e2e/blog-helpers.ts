import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { normalizeTag } from "@shared/blog/format";
import { FIXTURE_PEOPLE_FILE, FIXTURE_POSTS_DIR } from "@shared/test-fixtures";
import type { PersonRecord } from "@shared/people";
import type { Page } from "@playwright/test";
import { PEOPLE } from "./helpers";

/** A fixture Post, read from its frontmatter. */
export interface FixturePost {
  slug: string;
  title: string;
  description: string;
  pubDate: string;
  updatedDate?: string;
  published: boolean;
  featured: boolean;
  ogImage?: string;
  /** Hero image frontmatter, when set. */
  image?: string;
  /** The file's extension, "md" or "mdx". */
  ext: "md" | "mdx";
  /** The source below the frontmatter. */
  body: string;
  /** Tags as written. */
  rawTags: string[];
  authors: { id: string; name: string }[];
  /** Normalized Tags. */
  tags: string[];
  /** True for a Post the fixture loader generates, not a hand-written one. */
  generated: boolean;
}

const FIXTURE_AUTHORS: PersonRecord[] = JSON.parse(
  readFileSync(FIXTURE_PEOPLE_FILE, "utf8"),
);
const author = (id: string) =>
  [...FIXTURE_AUTHORS, ...PEOPLE].find((p) => p.id === id)!;

/**
 * Read the flat YAML frontmatter the fixtures use: `key: value` scalars and
 * `key:` followed by `  - item` lists.
 */
function frontmatter(source: string): Record<string, string | string[]> {
  const block = source.split("---")[1];
  const data: Record<string, string | string[]> = {};
  let list: string[] | undefined;
  for (const line of block.split("\n")) {
    const item = line.match(/^\s+-\s+(.*)$/);
    const pair = line.match(/^(\w+):\s*(.*)$/);
    if (item && list) {
      list.push(item[1]);
    } else if (pair) {
      list = pair[2] === "" ? [] : undefined;
      data[pair[1]] = list ?? pair[2];
    }
  }
  return data;
}

export const FIXTURE_POST_LIST: FixturePost[] = readdirSync(
  join("src/content", FIXTURE_POSTS_DIR),
).flatMap((slug) => {
  const dir = join("src/content", FIXTURE_POSTS_DIR, slug);
  const file = readdirSync(dir).find((f) => /^index\.mdx?$/.test(f));
  if (!file) {
    return [];
  }
  const source = readFileSync(join(dir, file), "utf8");
  const data = frontmatter(source);
  return [
    {
      slug,
      title: data.title as string,
      description: data.description as string,
      pubDate: data.pubDate as string,
      updatedDate: data.updatedDate as string | undefined,
      published: data.published !== "false",
      featured: data.featured === "true",
      ogImage: data.ogImage as string | undefined,
      image: data.image as string | undefined,
      ext: file.endsWith(".mdx") ? "mdx" : "md",
      body: source.split("---").slice(2).join("---"),
      rawTags: data.tags as string[],
      authors: (data.authors as string[]).map((id) => ({
        id,
        name: author(id).name,
      })),
      tags: [...new Set((data.tags as string[]).map(normalizeTag))],
      generated: false,
    },
  ];
});

export const publishedFixturePosts = () =>
  FIXTURE_POST_LIST.filter((post) => post.published);

/** "March 10, 2026" from "2026-03-10". */
export const longDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    dateStyle: "long",
    timeZone: "UTC",
  });

/** Posts per index page. */
export const PAGE_SIZE = 12;

export const newestFirst = (a: FixturePost, b: FixturePost) =>
  Date.parse(b.pubDate) - Date.parse(a.pubDate);

/** Every visible flagged Post, newest first. */
export const flaggedPosts = () =>
  publishedFixturePosts()
    .filter((post) => post.featured)
    .sort(newestFirst);

/** The Featured band: the newest three visible flagged Posts. */
export const featuredPosts = () => flaggedPosts().slice(0, 3);

/** The paginated list: every visible Post except the Featured band, newest first. */
export const listedPosts = () => {
  const featured = new Set(featuredPosts().map((post) => post.slug));
  return publishedFixturePosts()
    .filter((post) => !featured.has(post.slug))
    .sort(newestFirst);
};

/** The first visible Post matching `predicate`, or fail the test. */
function findPost(
  description: string,
  predicate: (post: FixturePost) => boolean,
): FixturePost {
  const found = publishedFixturePosts().find(predicate);
  if (!found) {
    throw new Error(`No fixture Post: ${description}`);
  }
  return found;
}

/** A visible Post with exactly `count` Authors. */
export const postWithAuthors = (count: number) =>
  findPost(`${count} Authors`, (p) => p.authors.length === count);

/** A draft Post. */
export const draftPost = () => {
  const draft = FIXTURE_POST_LIST.find((p) => !p.published);
  if (!draft) {
    throw new Error("No fixture draft Post");
  }
  return draft;
};

/** A visible Post with a hero image. */
export const postWithImage = () => findPost("a hero image", (p) => !!p.image);

/** A visible Markdown Post with an image in its body. */
export const postWithBodyImage = () =>
  findPost("an image in its body", (p) => p.ext === "md" && /!\[/.test(p.body));

/** A visible MDX Post. */
export const mdxPost = () => findPost("MDX", (p) => p.ext === "mdx");

/** A visible Post with a last-updated date. */
export const updatedPost = () =>
  findPost("an updated date", (p) => !!p.updatedDate);

/** A visible Post with no last-updated date. */
export const notUpdatedPost = () =>
  findPost("no updated date", (p) => !p.updatedDate);

/** A visible Post with its own share image. */
export const postWithOgImage = () => findPost("an ogImage", (p) => !!p.ogImage);

/** A visible Post with no share image. */
export const postWithoutOgImage = () =>
  findPost("no ogImage", (p) => !p.ogImage);

/** A visible Post with at least two Tags. */
export const postWithTags = () =>
  findPost("two Tags", (p) => p.tags.length >= 2);

/** Visible Posts by one Author, newest first. */
export const postsBy = (id: string) =>
  publishedFixturePosts()
    .filter((p) => p.authors.some((a) => a.id === id))
    .sort(newestFirst);

/** A fixture Author with every optional profile field set. */
export const fullAuthor = () => {
  const found = FIXTURE_AUTHORS.find(
    (a) =>
      a.pronouns &&
      a.title &&
      a.company &&
      a.location &&
      a.bio &&
      a.url &&
      a.social?.length,
  );
  if (!found) {
    throw new Error("No fixture Author with every profile field");
  }
  return found;
};

/** A fixture Author with no optional profile field set. */
export const bareAuthor = () => {
  const found = FIXTURE_AUTHORS.find(
    (a) =>
      !a.pronouns &&
      !a.title &&
      !a.company &&
      !a.location &&
      !a.bio &&
      !a.url &&
      !a.social?.length &&
      postsBy(a.id).length > 0,
  );
  if (!found) {
    throw new Error("No bare fixture Author");
  }
  return found;
};

/** A fixture Author with no visible Posts. */
export const authorWithoutPosts = () => {
  const found = FIXTURE_AUTHORS.find((a) => postsBy(a.id).length === 0);
  if (!found) {
    throw new Error("No fixture Author without Posts");
  }
  return found;
};

/** The fixture Author with the most visible Posts. */
export const busiestAuthor = () =>
  [...FIXTURE_AUTHORS].sort(
    (a, b) => postsBy(b.id).length - postsBy(a.id).length,
  )[0];

/** The Post slugs that the page's Post cards link to, in page order. */
export const postCardSlugs = async (page: Page) =>
  (
    await page
      .locator(".cjs-post-card a.cjs-post-card-link")
      .evaluateAll((links) => links.map((a) => a.getAttribute("href")))
  ).map((href) => href!.split("/").at(-1));
