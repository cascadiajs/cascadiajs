import { defineConfig, devices } from "@playwright/test";
import { freePort } from "./scripts/free-port.mjs";

// Each run picks its own free port, so concurrent runs (one per worktree) never
// meet. Workers load this file again and inherit the env var, so all agree. Set
// PORT to choose one.
process.env.PORT ??= String(await freePort());
const port = Number(process.env.PORT);

export default defineConfig({
  testDir: "e2e",
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        // Every page loads GA4 and the Meta Pixel; make those hosts
        // unresolvable so tests never send real hits.
        launchOptions: {
          args: [
            `--host-rules=${[
              "googletagmanager.com",
              "google-analytics.com",
              "connect.facebook.net",
              "facebook.com",
            ]
              .flatMap((host) => [host, `*.${host}`])
              .map((host) => `MAP ${host} ~NOTFOUND`)
              .join(", ")}`,
          ],
        },
      },
    },
  ],
  use: {
    baseURL: `http://localhost:${port}`,
  },
  webServer: {
    // `astro preview` does not support the Netlify adapter, so tests run
    // against `netlify serve`: it runs the build from netlify.toml, then serves
    // `dist/` and the on-demand routes' function, as Netlify does. Offline mode
    // needs no login or linked site.
    command: "pnpm run serve",
    port,
    timeout: 240_000,
    // Never test a server this run did not start. Set REUSE_SERVER=1 to reuse.
    reuseExistingServer: Boolean(process.env.REUSE_SERVER),
  },
});
