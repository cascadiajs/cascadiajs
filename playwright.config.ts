import { defineConfig, devices } from "@playwright/test";
import { createServer } from "node:net";
import process from "node:process";

// Free ports, so a busy port never fails the run and parallel runs (one per
// worktree) never collide. `netlify serve` binds two ports: the one tests hit,
// and its internal static server, which defaults to a fixed 3999. `PORT` and
// `STATIC_PORT` win when set. The choices go back into the environment, so the
// test workers, which load this config again, use the same ports.
const freePort = () =>
  new Promise<number>((resolve, reject) => {
    const probe = createServer();
    probe.once("error", reject);
    probe.listen(0, () => {
      const { port } = probe.address() as { port: number };
      probe.close(() => resolve(port));
    });
  });
const port = Number(process.env.PORT) || (await freePort());
const staticPort = Number(process.env.STATIC_PORT) || (await freePort());
process.env.PORT = String(port);
process.env.STATIC_PORT = String(staticPort);

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
    command: `pnpm exec netlify serve --offline --port ${port} --staticServerPort ${staticPort}`,
    port,
    env: { BROWSER: "none" },
    // `netlify serve` logs function errors to stdout. Show them in CI, where
    // they are the only record of why an on-demand route failed.
    stdout: process.env.CI ? "pipe" : "ignore",
    timeout: 240_000,
    // Always build and serve fresh, on a port nothing else uses.
    reuseExistingServer: false,
  },
});
