import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { expect, test } from "vitest";
import AuthorHeader from "./AuthorHeader.astro";

// A path that resolves to an image in `src/assets`; the component needs a
// real image to render.
const image = "/events/sample/images/test-photo.png";

async function render(author: Record<string, unknown>) {
  const container = await AstroContainer.create();
  return container.renderToString(AuthorHeader, {
    props: {
      author: { id: "ada", name: "Ada Lovelace", image, roles: [], ...author },
    },
  });
}

test("shows every profile field that is set", async () => {
  const html = await render({
    pronouns: "she/her",
    title: "Analyst",
    company: "Analytical Engines",
    location: "London, UK",
    bio: "Wrote the first program.",
    url: "https://ada.example/",
    social: [{ type: "github", url: "https://github.com/ada" }],
  });
  expect(html).toContain("<h1");
  expect(html).toContain("Ada Lovelace");
  expect(html).toContain("she/her");
  expect(html).toContain("Analyst @ Analytical Engines");
  expect(html).toContain("London, UK");
  expect(html).toContain("Wrote the first program.");
  expect(html).toContain('href="https://ada.example/"');
  expect(html).toContain('href="https://github.com/ada"');
  expect(html).toContain('aria-label="github"');
});

test("hides every profile field that is not set", async () => {
  const html = await render({});
  expect(html).toContain("Ada Lovelace");
  expect(html).not.toContain("she/her");
  expect(html).not.toContain(" @ ");
  expect(html).not.toContain("fa-location-dot");
  expect(html).not.toContain("Website");
  expect(html).not.toContain("aria-label=");
  expect(html).not.toContain("<p");
});

test("shows the role from the title alone and the company alone", async () => {
  expect(await render({ title: "Analyst" })).toContain("Analyst");
  expect(await render({ title: "Analyst" })).not.toContain(" @ ");
  expect(await render({ company: "Analytical Engines" })).toContain(
    "Analytical Engines",
  );
});
