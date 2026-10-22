// @ts-check
import process from "node:process";
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";

import sitemap from "@astrojs/sitemap";
import netlify from "@astrojs/netlify";

// Netlify sets these at build time: URL is the site's main address,
// DEPLOY_PRIME_URL the stable URL for a deploy preview or branch deploy, and
// CONTEXT which of those this build is. Outside Netlify (local builds, tests)
// fall back to https://cascadiajs.com.
const productionSite = process.env.URL ?? "https://cascadiajs.com";
const site =
  process.env.CONTEXT === "production"
    ? productionSite
    : (process.env.DEPLOY_PRIME_URL ?? productionSite);

// https://astro.build/config
export default defineConfig({
  // Canonical/OG URLs resolve against `site`, so previews share their own
  // images and production consolidates on its main address.
  site,
  // Static by default. A route opts into on-demand rendering with
  // `export const prerender = false` (ADR-0016). The adapter keeps its default
  // `imageCDN` (every astro:assets image is served by the Netlify Image CDN),
  // and `cacheOnDemandPages` stays off.
  output: "static",
  adapter: netlify(),
  // The site uses no sessions; this stops the adapter from setting up Netlify
  // Blobs and bundling the session runtime.
  session: false,
  // Legacy URLs never end in a slash (the slashed form 404s), so routes and
  // canonical URLs must match. The root stays "/".
  trailingSlash: "never",
  // Build `2026/attend.html`, not `2026/attend/index.html`. Netlify's Pretty
  // URLs 301-redirects a directory index to its slashed form, which legacy
  // never served. Layouts read the route path via `routePath`, since
  // `Astro.url.pathname` carries `.html` in this format.
  build: { format: "file" },
  // Astro 7 defaults to JSX-style whitespace stripping ("jsx"), which drops
  // spaces between inline elements and breaks legacy fidelity. Keep v6 behavior.
  compressHTML: true,
  image: {
    layout: "constrained",
  },
  // Code blocks keep their existing look (github-dark) everywhere. Shiki also
  // emits Night Owl as CSS variables (`--shiki-blog`), which only Post bodies
  // read (see PostBody.astro), so no existing Markdown page changes.
  markdown: {
    shikiConfig: {
      themes: { default: "github-dark", blog: "night-owl" },
      defaultColor: "default",
    },
  },
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !page.includes("/admin"),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
