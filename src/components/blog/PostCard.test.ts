import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { expect, test } from "vitest";
import PostCard from "./PostCard.astro";

// A path that resolves to an image in `src/assets`; the component needs a
// real image to render.
const avatar = "/events/sample/images/test-photo.png";
const ada = { id: "ada", name: "Ada Lovelace", image: avatar };
const grace = { id: "grace", name: "Grace Hopper", image: avatar };
const linus = { id: "linus", name: "Linus Torvalds", image: avatar };

const post = {
  id: "hello-world",
  // 401 words: 3 minutes at 200 words per minute.
  body: Array.from({ length: 401 }, () => "word").join(" "),
  data: {
    title: "Hello World",
    description: "A first post.",
    pubDate: new Date("2026-03-10T00:00:00Z"),
    tags: ["Web Perf", "css"],
    authors: [],
  },
};

async function render(
  authors: (typeof ada)[],
  data: Record<string, unknown> = {},
) {
  const container = await AstroContainer.create();
  return container.renderToString(PostCard, {
    props: {
      post: { ...post, data: { ...post.data, ...data } },
      authors,
    },
  });
}

function byline(html: string) {
  const span = html.match(/cjs-post-card-names[^>]*>([\s\S]*?)<\/span>/)?.[1];
  return {
    text: (span ?? "").replace(/<[^>]*>/g, ""),
    hrefs: [...(span ?? "").matchAll(/href="([^"]*)"/g)].map((m) => m[1]),
  };
}

test("shows the title as a link to the Post", async () => {
  const html = await render([ada]);
  expect(html).toMatch(/<a href="\/blog\/post\/hello-world"[^>]*>Hello World</);
});

test("shows the date and reading time", async () => {
  const html = await render([ada]);
  expect(html).toContain('datetime="2026-03-10T00:00:00.000Z"');
  expect(html).toContain("March 10, 2026");
  expect(html).toContain("3 min read");
});

test("links each Tag to its Tag page", async () => {
  const html = await render([ada]);
  expect(html).toContain('href="/blog/tags/web-perf"');
  expect(html).toContain('href="/blog/tags/css"');
});

test("shows the image, and no placeholder, when the Post has one", async () => {
  const html = await render([ada], {
    image: { src: "/cover.jpg", width: 1200, height: 750, format: "jpg" },
  });
  expect(html).toMatch(/<img[^>]*cover\.jpg/);
  expect(html).not.toContain("data-post-placeholder");
});

test("gives the image its alt text when the Post has one", async () => {
  const html = await render([ada], {
    image: { src: "/cover.jpg", width: 1200, height: 750, format: "jpg" },
    imageAlt: "A sunset over Puget Sound",
  });
  expect(html).toMatch(
    /<img[^>]*cover\.jpg[^>]*alt="A sunset over Puget Sound"/,
  );
});

test("leaves the image decorative when the Post has no alt text", async () => {
  const html = await render([ada], {
    image: { src: "/cover.jpg", width: 1200, height: 750, format: "jpg" },
  });
  // Astro renders an empty alt as a bare `alt` attribute.
  expect(html).toMatch(/<img[^>]*cover\.jpg[^>]*\salt[\s>]/);
});

test("shows the title in a placeholder when the Post has no image", async () => {
  const html = await render([ada]);
  expect(html).toMatch(/data-post-placeholder[^>]*>\s*Hello World\s*</);
});

test("byline of one Author", async () => {
  expect(byline(await render([ada]))).toEqual({
    text: "Ada Lovelace",
    hrefs: ["/blog/authors/ada"],
  });
});

test("byline of two Authors", async () => {
  expect(byline(await render([ada, grace]))).toEqual({
    text: "Ada Lovelace and Grace Hopper",
    hrefs: ["/blog/authors/ada", "/blog/authors/grace"],
  });
});

test("byline of three Authors names the first and counts the rest", async () => {
  expect(byline(await render([ada, grace, linus]))).toEqual({
    text: "Ada Lovelace and 2 others",
    hrefs: ["/blog/authors/ada"],
  });
});
