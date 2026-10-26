/**
 * Test helpers for rendering an Astro component to HTML in Node with the
 * Container API (seam 2 of the test strategy). Tests pass literal props and
 * assert the HTML. Import only from `*.test.ts` files.
 */
import { experimental_AstroContainer as AstroContainer } from "astro/container";

type Component = Parameters<AstroContainer["renderToString"]>[0];
type Options = Parameters<AstroContainer["renderToString"]>[1];

/** An opening tag of the rendered HTML. A boolean attribute has the value "". */
export interface Tag {
  name: string;
  attrs: Record<string, string>;
}

/** Render a component with literal props. Dev-only `data-astro-source-*` attributes are dropped. */
export async function render(
  component: Component,
  options?: Options,
): Promise<string> {
  const container = await AstroContainer.create();
  const html = await container.renderToString(component, options);
  return html.replace(/ data-astro-source-(?:file|loc)="[^"]*"/g, "");
}

/** Every opening tag named `name`, in document order. */
export function tags(html: string, name: string): Tag[] {
  const found: Tag[] = [];
  for (const [, source] of html.matchAll(
    new RegExp(`<${name}(?=[\\s>/])([^>]*)>`, "g"),
  )) {
    const attrs: Record<string, string> = {};
    for (const [, key, value] of source.matchAll(
      /([^\s=/]+)(?:="([^"]*)")?/g,
    )) {
      attrs[key] = value ?? "";
    }
    found.push({ name, attrs });
  }
  return found;
}

/** The visible text of the HTML, with tags dropped and whitespace collapsed. */
export function text(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/g, "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<[^>]*>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&mdash;/g, "—")
    .replace(/\s+/g, " ")
    .trim();
}
