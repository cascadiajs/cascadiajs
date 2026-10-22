import { defineConfig, devices } from "@playwright/test";

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
    baseURL: "http://localhost:4321",
  },
  webServer: {
    // `astro preview` does not support the Netlify adapter, so tests run
    // against `netlify serve`: it runs the build from netlify.toml, then serves
    // `dist/` and the on-demand routes' function, as Netlify does. Offline mode
    // needs no login or linked site.
    command: "pnpm run serve",
    port: 4321,
    timeout: 240_000,
    reuseExistingServer: true,
  },
});
