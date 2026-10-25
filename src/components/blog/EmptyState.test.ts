import { describe, expect, test } from "vitest";
import { render, tags, text } from "@shared/test-render";
import BlogEmpty from "./BlogEmpty.astro";
import SearchEmpty from "./SearchEmpty.astro";

describe("BlogEmpty", () => {
  test("shows the heading and the message it is given", async () => {
    const html = await render(BlogEmpty, {
      props: { message: "Ada Example has not published a Post yet." },
    });
    expect(html).toContain("cjs-blog-empty");
    expect(text(html)).toContain("No Posts yet");
    expect(text(html)).toContain("Ada Example has not published a Post yet.");
  });
});

describe("SearchEmpty", () => {
  test("says no Posts match and links back to the blog", async () => {
    const html = await render(SearchEmpty);
    expect(html).toContain("cjs-search-empty");
    expect(text(html)).toContain("No Posts match");
    expect(tags(html, "a").map((a) => a.attrs.href)).toEqual(["/blog"]);
  });
});
