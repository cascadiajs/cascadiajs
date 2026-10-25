import type { BrowserCommand } from "vitest/node";

/**
 * Render an Astro component to an HTML string on the Node side.
 *
 * The Astro Container API cannot render inside Vitest browser mode: the
 * `.astro` module is compiled for the client there, so the Container finds no
 * component to render. This command loads the component through the project's
 * Vite server in SSR mode, renders it with the Container API, and returns the
 * HTML to the browser test.
 *
 * `component` is a path relative to the repo root, for example
 * `src/components/blog/ShareBar.astro`. `props` must be serializable.
 */
export const renderAstro: BrowserCommand<
  [component: string, props?: Record<string, unknown>, url?: string],
  string
> = async (
  { project },
  component,
  props = {},
  url = "https://example.test/",
) => {
  const { vite } = project;
  const [{ experimental_AstroContainer: AstroContainer }, module] =
    await Promise.all([
      vite.ssrLoadModule("astro/container"),
      vite.ssrLoadModule(`/${component}`),
    ]);
  const container = await AstroContainer.create({
    site: "https://example.test",
  });
  return container.renderToString(module.default, {
    props,
    request: new Request(url),
  });
};
