import { defineConfig, devices } from "@playwright/test";
import { createServer } from "node:net";
import process from "node:process";

// Test-build flag: the build under test includes the test-only fixtures
// (fixture Posts and Authors, an Event override). Set here so the webServer
// build and the test workers agree. Production builds never set it.
process.env.CJS_TEST_FIXTURES = "1";

// A free port, so a busy 4321 never fails the run. `PORT` wins when set. The
// choice goes back into `PORT`, so the test workers, which load this config
// again, use the same port.
const port =
  Number(process.env.PORT) ||
  (await new Promise<number>((resolve, reject) => {
    const probe = createServer();
    probe.once("error", reject);
    probe.listen(0, () => {
      const { port } = probe.address() as { port: number };
      probe.close(() => resolve(port));
    });
  }));
process.env.PORT = String(port);

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
    command: `pnpm exec netlify serve --offline --port ${port}`,
    port,
    env: { BROWSER: "none", CJS_TEST_FIXTURES: "1" },
    timeout: 240_000,
    // Always build and serve fresh, on a port nothing else uses.
    reuseExistingServer: false,
  },
});
