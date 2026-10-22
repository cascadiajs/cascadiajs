/// <reference types="vitest/config" />
import { getViteConfig } from "astro/config";

// Unit tests live beside the code as `src/**/*.test.ts`. Playwright specs
// live in `e2e/`, so neither runner picks up the other's files.
export default getViteConfig({
  test: {
    include: ["src/**/*.test.ts"],
  },
});
