import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { normalizeTag } from "@shared/blog/format";
import { FIXTURE_PEOPLE_FILE, FIXTURE_POSTS_DIR } from "@shared/test-fixtures";
import { PEOPLE } from "./helpers";

/** A fixture Post, read from its frontmatter. */
export interface FixturePost {
  slug: string;
  title: string;
  description: string;
  pubDate: string;
  updatedDate?: string;
  published: boolean;
  ogImage?: string;
  authors: { id: string; name: string }[];
  /** Normalized Tags. */
  tags: string[];
}

const FIXTURE_AUTHORS: { id: string; name: string }[] = JSON.parse(
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
  const data = frontmatter(readFileSync(join(dir, file), "utf8"));
  return [
    {
      slug,
      title: data.title as string,
      description: data.description as string,
      pubDate: data.pubDate as string,
      updatedDate: data.updatedDate as string | undefined,
      published: data.published !== "false",
      ogImage: data.ogImage as string | undefined,
      authors: (data.authors as string[]).map((id) => ({
        id,
        name: author(id).name,
      })),
      tags: [...new Set((data.tags as string[]).map(normalizeTag))],
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
