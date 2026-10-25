import { expect, test } from "vitest";
import { rssItems } from "./rss";

const site = "https://example.test";

const older = {
  id: "older",
  body: "The older body.",
  data: {
    title: "Older",
    description: "The older post.",
    pubDate: new Date("2026-01-05T00:00:00Z"),
    authors: [{ id: "ada" }],
  },
};
const newer = {
  id: "newer",
  body: "The newer body.",
  data: {
    title: "Newer",
    description: "The newer post.",
    pubDate: new Date("2026-03-10T00:00:00Z"),
    authors: [{ id: "grace" }],
  },
};

test("maps Posts to items, newest first, with absolute links", () => {
  expect(rssItems([older, newer], site)).toEqual([
    {
      title: "Newer",
      description: "The newer post.",
      link: "https://example.test/blog/post/newer",
      pubDate: new Date("2026-03-10T00:00:00Z"),
    },
    {
      title: "Older",
      description: "The older post.",
      link: "https://example.test/blog/post/older",
      pubDate: new Date("2026-01-05T00:00:00Z"),
    },
  ]);
});

test("items carry no body and no Author", () => {
  const [item] = rssItems([newer], site);
  expect(Object.keys(item).sort()).toEqual([
    "description",
    "link",
    "pubDate",
    "title",
  ]);
});

test("a feed with no Posts has no items", () => {
  expect(rssItems([], site)).toEqual([]);
});

test("does not change the input order", () => {
  const posts = [older, newer];
  rssItems(posts, site);
  expect(posts).toEqual([older, newer]);
});
