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
    command: "pnpm run build && pnpm run preview --ignore-lock",
    port: 4321,
    reuseExistingServer: true,
  },
});
