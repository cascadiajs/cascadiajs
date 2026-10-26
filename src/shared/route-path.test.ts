import { describe, expect, it } from "vitest";
import { routePath } from "@shared/route-path";

const path = (pathname: string) =>
  routePath(new URL(pathname, "https://example.com"));

describe("routePath", () => {
  it("removes the .html suffix", () => {
    expect(path("/a/attend.html")).toBe("/a/attend");
  });

  it("turns /index.html into the root", () => {
    expect(path("/index.html")).toBe("/");
  });

  it("turns a nested /index.html into its directory path", () => {
    expect(path("/a/index.html")).toBe("/a");
  });

  it("removes a trailing slash", () => {
    expect(path("/a/b/")).toBe("/a/b");
  });

  it("keeps the root as /", () => {
    expect(path("/")).toBe("/");
  });
});
