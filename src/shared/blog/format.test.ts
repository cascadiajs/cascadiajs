import { describe, expect, it } from "vitest";
import {
  blueskyShareUrl,
  linkedinShareUrl,
  normalizeTag,
  postByline,
  readingMinutes,
  xShareUrl,
} from "./format";

describe("share URL builders", () => {
  const url = "https://cascadiajs.com/blog/post/a-b";
  const encodedUrl = "https%3A%2F%2Fcascadiajs.com%2Fblog%2Fpost%2Fa-b";
  it("builds a Bluesky compose link with title and URL as encoded text", () => {
    expect(blueskyShareUrl("Hi & bye?", url)).toBe(
      `https://bsky.app/intent/compose?text=Hi%20%26%20bye%3F%20${encodedUrl}`,
    );
  });
  it("builds a LinkedIn link with the encoded URL", () => {
    expect(linkedinShareUrl(url)).toBe(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    );
  });
  it("builds an X link with encoded title and URL", () => {
    expect(xShareUrl('C++ #1 "best" 日本', url)).toBe(
      `https://x.com/intent/tweet?text=C%2B%2B%20%231%20%22best%22%20%E6%97%A5%E6%9C%AC&url=${encodedUrl}`,
    );
  });
});

describe("normalizeTag", () => {
  it("lowercases", () => {
    expect(normalizeTag("JavaScript")).toBe("javascript");
  });
  it("collapses runs of non-alphanumerics to one dash", () => {
    expect(normalizeTag("Web  Components & CSS")).toBe("web-components-css");
  });
  it("trims leading and trailing dashes", () => {
    expect(normalizeTag("  --Node.js!  ")).toBe("node-js");
  });
});

describe("readingMinutes", () => {
  const words = (n: number) => Array(n).fill("word").join(" ");
  it("is 1 for an empty body", () => {
    expect(readingMinutes("")).toBe(1);
  });
  it("counts 200 words per minute", () => {
    expect(readingMinutes(words(400))).toBe(2);
  });
  it("rounds up", () => {
    expect(readingMinutes(words(401))).toBe(3);
  });
  it("ignores MDX import and export lines", () => {
    const body = `import Callout from "@components/Callout.astro";\nexport const a = 1;\n\n${words(200)}`;
    expect(readingMinutes(body)).toBe(1);
  });
  it("ignores markup", () => {
    const body = `<Callout variant="info" class="a b c d e f g h">\n\n${words(200)}\n\n</Callout>\n\n![alt text here](./a.png)`;
    expect(readingMinutes(body)).toBe(1);
  });
  it("counts link text but not the URL", () => {
    const body = `[${words(200)}](https://example.com/${words(300).replace(/ /g, "/")})`;
    expect(readingMinutes(body)).toBe(1);
  });
});

describe("postByline", () => {
  it("names one Author", () => {
    expect(postByline(["A"])).toBe("A");
  });
  it("joins two with and", () => {
    expect(postByline(["A", "B"])).toBe("A and B");
  });
  it("joins three with a comma and and", () => {
    expect(postByline(["A", "B", "C"])).toBe("A, B and C");
  });
  it("names every one of four Authors", () => {
    expect(postByline(["A", "B", "C", "D"])).toBe("A, B, C and D");
  });
});
