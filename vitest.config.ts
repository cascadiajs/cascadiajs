/// <reference types="vitest/config" />
import { getViteConfig } from "astro/config";
import { playwright } from "@vitest/browser-playwright";
import { renderAstro } from "./vitest.commands.ts";

// Two Vitest projects. `unit` runs `src/**/*.test.ts` in Node. `browser` runs
// `src/**/*.browser.test.ts` in headless Chromium. Playwright specs live in
// `e2e/`, so neither runner picks up the other's files.
export default getViteConfig({
  test: {
    projects: [
      {
        extends: true,
        test: {
          name: "unit",
          include: ["src/**/*.test.ts"],
          exclude: ["src/**/*.browser.test.ts"],
        },
      },
      {
        extends: true,
        test: {
          name: "browser",
          include: ["src/**/*.browser.test.ts"],
          browser: {
            enabled: true,
            headless: true,
            provider: playwright(),
            commands: { renderAstro },
            instances: [{ browser: "chromium" }],
          },
        },
      },
    ],
  },
});
