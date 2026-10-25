import { commands } from "vitest/browser";

declare module "vitest/browser" {
  interface BrowserCommands {
    renderAstro: (
      component: string,
      props?: Record<string, unknown>,
      url?: string,
    ) => Promise<string>;
  }
}

/**
 * Browser-mode helper: render an Astro component with literal props, and put
 * its HTML in the page. The HTML comes from the `renderAstro` command
 * (`vitest.commands.ts`), because the Astro Container API cannot run inside
 * the browser. The test imports the CSS it needs, for example
 * `../../styles/global.css`.
 *
 * `component` is a path from the repo root. `around` wraps the HTML in a
 * literal host, with `%s` marking where the component goes.
 */
export async function mountAstro(
  component: string,
  props: Record<string, unknown> = {},
  around = "%s",
): Promise<HTMLElement> {
  const html = await commands.renderAstro(component, props);
  const host = document.createElement("div");
  host.innerHTML = around.replace("%s", () => html);
  document.body.append(host);
  return host;
}

/** Remove everything that `mountAstro` added. Call it in `afterEach`. */
export function unmountAll(): void {
  document.body.replaceChildren();
}
