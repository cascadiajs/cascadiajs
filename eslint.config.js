import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import eslintPluginAstro from "eslint-plugin-astro";
import * as mdx from "eslint-plugin-mdx";
import tseslint from "typescript-eslint";

export default defineConfig(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  {
    ...mdx.flat,
    files: ["**/*.mdx"],
  },
  {
    rules: {
      curly: ["error", "all"],
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              // Any depth of `../` that lands directly on a top-level alias
              // directory (`../components/X`, `../../shared/Y`). Same-dir
              // climbs like `../types`, `../CtaButton.astro`,
              // `../../content.config` or `../styles/global.css` don't name
              // one of these directories first, so they pass.
              regex: "^(\\.\\./)+(components|layouts|shared|assets)(/|$)",
              message:
                "Use a path alias (@components, @layouts, @shared, @assets) instead of a relative `../` import.",
            },
            {
              // Paths from outside src/ (e.g. e2e/), such as
              // `../src/components/Foo.astro`.
              regex: "^(\\.\\./)+src/(components|layouts|shared|assets)(/|$)",
              message:
                "Use a path alias (@components, @layouts, @shared, @assets) instead of reaching into src/ with a relative path.",
            },
          ],
        },
      ],
    },
  },
  {
    ignores: ["dist/**", ".astro/**", ".agents/**", ".claude/**"],
  },
);
