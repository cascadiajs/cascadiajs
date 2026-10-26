import { describe, expect, it } from "vitest";
import {
  collectTags,
  parseSearchInput,
  searchPosts,
  type SearchablePost,
} from "./search";

const item = (
  id: string,
  title: string,
  authors: string[],
  tags: string[],
  pubDate: string,
): SearchablePost & { id: string } => ({
  id,
  title,
  authorNames: authors,
  tags,
  pubDate: new Date(pubDate),
});

const posts = [
  item(
    "a",
    "Hello Astro",
    ["Ada Lovelace"],
    ["JavaScript", "astro"],
    "2026-01-01",
  ),
  item(
    "b",
    "Speaker recap",
    ["Grace Hopper", "Linus Torvalds"],
    ["recap"],
    "2026-03-01",
  ),
  item("c", "Astro recap", ["Hedy Lamarr"], ["Java-Script"], "2026-02-01"),
];
const ids = (list: { id: string }[]) => list.map((p) => p.id);

describe("searchPosts", () => {
  it("matches a term in the title, case-insensitively", () => {
    expect(ids(searchPosts(posts, { q: "HELLO" }))).toEqual(["a"]);
  });

  it("matches a substring of an Author name, on any Author", () => {
    expect(ids(searchPosts(posts, { q: "torvalds" }))).toEqual(["b"]);
    expect(ids(searchPosts(posts, { q: "grace" }))).toEqual(["b"]);
  });

  it("matches a term in a Tag", () => {
    expect(ids(searchPosts(posts, { q: "javascript" }))).toEqual(["a"]);
  });

  it("requires every term to match somewhere", () => {
    expect(ids(searchPosts(posts, { q: "astro recap" }))).toEqual(["c"]);
    expect(ids(searchPosts(posts, { q: "astro  ada" }))).toEqual(["a"]);
    expect(searchPosts(posts, { q: "astro nothing" })).toEqual([]);
  });

  it("returns newest first", () => {
    expect(ids(searchPosts(posts, { q: "recap" }))).toEqual(["b", "c"]);
  });

  it("narrows by an exact normalized Tag", () => {
    expect(ids(searchPosts(posts, { tag: "recap" }))).toEqual(["b"]);
    expect(ids(searchPosts(posts, { tag: "javascript" }))).toEqual(["a"]);
    expect(ids(searchPosts(posts, { tag: "java" }))).toEqual([]);
  });

  it("applies q and tag together", () => {
    expect(ids(searchPosts(posts, { q: "astro", tag: "astro" }))).toEqual([
      "a",
    ]);
    expect(searchPosts(posts, { q: "recap", tag: "astro" })).toEqual([]);
  });
});

describe("collectTags", () => {
  it("returns the sorted, de-duplicated normalized Tags", () => {
    expect(collectTags(posts)).toEqual([
      "astro",
      "java-script",
      "javascript",
      "recap",
    ]);
  });
});

describe("parseSearchInput", () => {
  const known = new Set(["astro", "recap"]);

  it("redirects when q and tag are both missing or blank", () => {
    expect(parseSearchInput({ q: null, tag: null }, known)).toEqual({
      kind: "redirect",
    });
    expect(parseSearchInput({ q: "   ", tag: "" }, known)).toEqual({
      kind: "redirect",
    });
  });

  it("accepts a trimmed q, a known tag, or both", () => {
    expect(parseSearchInput({ q: " hi ", tag: null }, known)).toEqual({
      kind: "ok",
      q: "hi",
      tag: undefined,
    });
    expect(parseSearchInput({ q: null, tag: "astro" }, known)).toEqual({
      kind: "ok",
      q: "",
      tag: "astro",
    });
    expect(parseSearchInput({ q: "x", tag: "recap" }, known)).toEqual({
      kind: "ok",
      q: "x",
      tag: "recap",
    });
  });

  it("rejects a q over 100 characters, but allows exactly 100", () => {
    expect(
      parseSearchInput({ q: "a".repeat(100), tag: null }, known).kind,
    ).toBe("ok");
    expect(parseSearchInput({ q: "a".repeat(101), tag: null }, known)).toEqual({
      kind: "invalid",
      reason: "q-too-long",
    });
  });

  it("rejects a tag that is not an existing normalized Tag", () => {
    expect(parseSearchInput({ q: null, tag: "nope" }, known)).toEqual({
      kind: "invalid",
      reason: "unknown-tag",
    });
    expect(parseSearchInput({ q: null, tag: "Astro" }, known)).toEqual({
      kind: "invalid",
      reason: "unknown-tag",
    });
  });
});
