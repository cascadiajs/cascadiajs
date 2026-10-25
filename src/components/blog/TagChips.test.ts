import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { expect, test } from "vitest";
import TagChips from "./TagChips.astro";

test("renders one link per Tag to its Tag page", async () => {
  const container = await AstroContainer.create();
  const html = await container.renderToString(TagChips, {
    props: { tags: ["Web Perf", "css"] },
  });
  expect(html).toContain('href="/blog/tags/web-perf"');
  expect(html).toContain('href="/blog/tags/css"');
  expect(html.match(/<a /g)).toHaveLength(2);
});

test("renders Tags that differ only in case as one link", async () => {
  const container = await AstroContainer.create();
  const html = await container.renderToString(TagChips, {
    props: { tags: ["CSS", "css"] },
  });
  expect(html.match(/<a /g)).toHaveLength(1);
});
