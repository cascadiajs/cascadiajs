import { describe, expect, it } from "vitest";
import {
  duplicateIds,
  splitFeatured,
  tagIndex,
  unknownAuthors,
  visiblePosts,
} from "./posts";

describe("unknownAuthors", () => {
  it("lists Author ids missing from the registry, per Post", () => {
    const entries = [
      { id: "a", data: { authors: [{ id: "x" }, { id: "nope" }] } },
      { id: "b", data: { authors: [{ id: "x" }] } },
    ];
    expect(unknownAuthors(entries, new Set(["x"]))).toEqual([
      { post: "a", author: "nope" },
    ]);
  });
});

describe("duplicateIds", () => {
  it("finds repeated ids", () => {
    expect(duplicateIds(["a", "b", "a"])).toEqual(["a"]);
    expect(duplicateIds(["a", "b"])).toEqual([]);
  });
});

const post = (id: string, pubDate: string, published = true) => ({
  id,
  data: { pubDate: new Date(pubDate), published },
});
const posts = [
  post("old", "2026-01-01"),
  post("draft", "2026-03-01", false),
  post("new", "2026-02-01"),
];

describe("visiblePosts", () => {
  it("hides drafts in production", () => {
    expect(visiblePosts(posts, { dev: false }).map((p) => p.id)).toEqual([
      "new",
      "old",
    ]);
  });
  it("shows drafts in dev, newest first", () => {
    expect(visiblePosts(posts, { dev: true }).map((p) => p.id)).toEqual([
      "draft",
      "new",
      "old",
    ]);
  });
});

describe("splitFeatured", () => {
  const entry = (id: string, day: number, featured: boolean) => ({
    id,
    data: { pubDate: new Date(2026, 0, day), published: true, featured },
  });
  // Newest first, as `visiblePosts` returns them.
  const list = [
    entry("a", 9, true),
    entry("b", 8, false),
    entry("c", 7, true),
    entry("d", 6, true),
    entry("e", 5, true),
    entry("f", 4, false),
  ];

  it("takes the newest three flagged Posts as Featured", () => {
    expect(splitFeatured(list).featured.map((p) => p.id)).toEqual([
      "a",
      "c",
      "d",
    ]);
  });
  it("keeps every other Post, including older flagged ones, in order", () => {
    expect(splitFeatured(list).rest.map((p) => p.id)).toEqual(["b", "e", "f"]);
  });
  it("returns fewer than three Featured when fewer are flagged", () => {
    const split = splitFeatured([entry("x", 1, true), entry("y", 2, false)]);
    expect(split.featured.map((p) => p.id)).toEqual(["x"]);
    expect(split.rest.map((p) => p.id)).toEqual(["y"]);
  });
  it("handles no Posts", () => {
    expect(splitFeatured([])).toEqual({ featured: [], rest: [] });
  });
});

describe("tagIndex", () => {
  const tagged = (id: string, pubDate: string, tags: string[]) => ({
    id,
    data: { pubDate: new Date(pubDate), tags },
  });

  it("groups Posts by normalized Tag, newest first, merging case variants", () => {
    const index = tagIndex([
      tagged("old", "2026-01-01", ["JavaScript"]),
      tagged("new", "2026-03-01", ["javascript", "Web Components"]),
    ]);
    expect([...index.keys()].sort()).toEqual(["javascript", "web-components"]);
    expect(index.get("javascript")!.map((p) => p.id)).toEqual(["new", "old"]);
  });

  it("lists a Post once when it repeats a Tag in different cases", () => {
    const index = tagIndex([tagged("a", "2026-01-01", ["JS", "js"])]);
    expect(index.get("js")!.map((p) => p.id)).toEqual(["a"]);
  });
});
