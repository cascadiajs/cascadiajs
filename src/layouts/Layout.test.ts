import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { expect, test } from "vitest";
import Layout from "./Layout.astro";

async function metaTags(props: Record<string, unknown>) {
  const container = await AstroContainer.create();
  const html = await container.renderToString(Layout, {
    props,
    request: new Request("https://example.test/blog/post/hello"),
  });
  return [
    ...html.matchAll(
      /<meta\s+(?:property|name)="([^"]+)"\s+content="([^"]*)"/g,
    ),
  ].map((match) => [match[1], match[2]]);
}

function values(tags: string[][], key: string) {
  return tags.filter(([name]) => name === key).map(([, value]) => value);
}

const article = {
  publishedTime: new Date("2026-03-10T00:00:00Z"),
  authors: ["Ada Lovelace", "Grace Hopper"],
  tags: ["css", "web-perf"],
};

test("a Post has one article:author per Author", async () => {
  const tags = await metaTags({ article });
  expect(values(tags, "article:author")).toEqual([
    "Ada Lovelace",
    "Grace Hopper",
  ]);
  expect(values(tags, "og:type")).toEqual(["article"]);
  expect(values(tags, "article:published_time")).toEqual([
    "2026-03-10T00:00:00.000Z",
  ]);
  expect(values(tags, "article:tag")).toEqual(["css", "web-perf"]);
});

test("article:modified_time appears only with an updated date", async () => {
  expect(values(await metaTags({ article }), "article:modified_time")).toEqual(
    [],
  );
  const updated = {
    ...article,
    modifiedTime: new Date("2026-04-02T00:00:00Z"),
  };
  expect(
    values(await metaTags({ article: updated }), "article:modified_time"),
  ).toEqual(["2026-04-02T00:00:00.000Z"]);
});

test("the share image URL is absolute", async () => {
  const tags = await metaTags({ article, ogImage: "/images/share/post.jpg" });
  expect(values(tags, "og:image")).toEqual([
    "https://example.test/images/share/post.jpg",
  ]);
  expect(values(tags, "twitter:image")).toEqual([
    "https://example.test/images/share/post.jpg",
  ]);
});

test("a Post with no share image gets the site default image", async () => {
  const tags = await metaTags({ article });
  expect(values(tags, "og:image")).toEqual([
    "https://example.test/images/2026/share/social-sharing-general.png",
  ]);
});

test("a page that is not a Post has no article meta tags", async () => {
  const tags = await metaTags({});
  expect(values(tags, "og:type")).toEqual(["website"]);
  expect(values(tags, "article:author")).toEqual([]);
});
