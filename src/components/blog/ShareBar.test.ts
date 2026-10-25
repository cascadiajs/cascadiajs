import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { expect, test } from "vitest";
import ShareBar from "./ShareBar.astro";

async function render() {
  const container = await AstroContainer.create();
  return container.renderToString(ShareBar, {
    props: { title: "Hello World" },
    request: new Request("https://example.test/blog/post/hello"),
  });
}

test("links to Bluesky, LinkedIn and X without JS", async () => {
  const html = await render();
  const links = [
    ...html.matchAll(/<a [^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/g),
  ].map((match) => ({
    text: match[2].replace(/<[^>]*>/g, "").trim(),
    href: match[1].replaceAll("&#38;", "&").replaceAll("&amp;", "&"),
  }));
  expect(links).toEqual([
    {
      text: "Bluesky",
      href: "https://bsky.app/intent/compose?text=Hello%20World%20https%3A%2F%2Fexample.test%2Fblog%2Fpost%2Fhello",
    },
    {
      text: "LinkedIn",
      href: "https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fexample.test%2Fblog%2Fpost%2Fhello",
    },
    {
      text: "X",
      href: "https://x.com/intent/tweet?text=Hello%20World&url=https%3A%2F%2Fexample.test%2Fblog%2Fpost%2Fhello",
    },
  ]);
});

test("hides the copy and Web Share buttons until JS shows them", async () => {
  const html = await render();
  const buttons = [
    ...html.matchAll(/<button([^>]*)>([\s\S]*?)<\/button>/g),
  ].map((match) => ({
    text: match[2].replace(/<[^>]*>/g, "").trim(),
    hidden: /\shidden[\s>=]/.test(`${match[1]}>`),
  }));
  expect(buttons).toEqual([
    { text: "Copy link", hidden: true },
    { text: "Share", hidden: true },
  ]);
});
