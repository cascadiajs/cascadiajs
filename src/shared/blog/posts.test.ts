import { describe, expect, it } from "vitest";
import { duplicateIds, unknownAuthors, visiblePosts } from "./posts";

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
