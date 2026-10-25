import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { expect, test } from "vitest";
import PostByline from "./PostByline.astro";

// A path that resolves to an image in `src/assets`; the component needs a
// real image to render.
const image = "/events/sample/images/test-photo.png";
const ada = { id: "ada", name: "Ada Lovelace", image };
const grace = { id: "grace", name: "Grace Hopper", image };
const linus = { id: "linus", name: "Linus Torvalds", image };

async function names(authors: (typeof ada)[]) {
  const container = await AstroContainer.create();
  const html = await container.renderToString(PostByline, {
    props: { authors },
  });
  const paragraph = html.match(/<p[^>]*>([\s\S]*?)<\/p>/)?.[1] ?? "";
  return {
    text: paragraph.replace(/<[^>]*>/g, ""),
    hrefs: [...paragraph.matchAll(/href="([^"]*)"/g)].map((m) => m[1]),
  };
}

test("one Author", async () => {
  expect(await names([ada])).toEqual({
    text: "Ada Lovelace",
    hrefs: ["/blog/authors/ada"],
  });
});

test("two Authors", async () => {
  expect(await names([ada, grace])).toEqual({
    text: "Ada Lovelace and Grace Hopper",
    hrefs: ["/blog/authors/ada", "/blog/authors/grace"],
  });
});

async function dates(props: Record<string, unknown>) {
  const container = await AstroContainer.create();
  const html = await container.renderToString(PostByline, {
    props: { authors: [ada], ...props },
  });
  return html.match(/<p[^>]*>([\s\S]*?)<\/p>/g)?.[1] ?? "";
}

test("shows the published date and reading time", async () => {
  const line = await dates({
    pubDate: new Date("2026-03-10T00:00:00Z"),
    minutes: 4,
  });
  expect(
    line
      .replace(/<[^>]*>/g, "")
      .replace(/\s+/g, " ")
      .trim(),
  ).toBe("March 10, 2026 · 4 min read");
  expect(line).toContain('datetime="2026-03-10T00:00:00.000Z"');
  expect(line).not.toContain("Updated");
});

test("shows the updated date when the Post has one", async () => {
  const line = await dates({
    pubDate: new Date("2026-03-10T00:00:00Z"),
    updatedDate: new Date("2026-04-02T00:00:00Z"),
    minutes: 4,
  });
  expect(
    line
      .replace(/<[^>]*>/g, "")
      .replace(/\s+/g, " ")
      .trim(),
  ).toBe("March 10, 2026 · Updated April 2, 2026 · 4 min read");
  expect(line).toContain('datetime="2026-04-02T00:00:00.000Z"');
});

test("three Authors name every Author", async () => {
  expect(await names([ada, grace, linus])).toEqual({
    text: "Ada Lovelace, Grace Hopper and Linus Torvalds",
    hrefs: ["/blog/authors/ada", "/blog/authors/grace", "/blog/authors/linus"],
  });
});
