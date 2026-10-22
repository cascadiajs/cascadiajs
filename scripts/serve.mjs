// Runs `netlify serve` for this checkout only.
//
// The Netlify CLI finds the repository root by searching upward from the
// process directory for a `.git` directory. In a worktree `.git` is a file, so
// the search reaches the main checkout. The CLI then builds there and edits its
// .gitignore. This script starts the CLI from the system temp directory, which
// has no `.git` ancestor, and passes this checkout through `--cwd`. The CLI then
// uses this checkout as the root. It works in a normal clone too.
import { spawn } from "node:child_process";
import { tmpdir } from "node:os";
import process from "node:process";
import { fileURLToPath, URL } from "node:url";
import { freePort } from "./free-port.mjs";

const root = fileURLToPath(new URL("..", import.meta.url));
const bin = fileURLToPath(
  new URL("../node_modules/.bin/netlify", import.meta.url),
);

// Concurrent runs (one per worktree) must not share ports. The site port comes
// from PORT, else any free port. The CLI picks its internal static-server port
// with get-port, which can miss a port that another process holds on macOS
// (EADDRINUSE), so this script picks that port too and passes it by flag.
const port = process.env.PORT ?? String(await freePort());
const staticServerPort = String(await freePort());

const child = spawn(
  bin,
  [
    "serve",
    "--cwd",
    root,
    "--offline",
    "--port",
    port,
    "--staticServerPort",
    staticServerPort,
  ],
  {
    cwd: tmpdir(),
    // `netlify serve` opens the default browser unless BROWSER is "none".
    env: { ...process.env, BROWSER: "none" },
    stdio: "inherit",
  },
);
for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => child.kill(signal));
}
child.on("exit", (code, signal) => process.exit(code ?? (signal ? 1 : 0)));
