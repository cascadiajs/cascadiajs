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

const root = fileURLToPath(new URL("..", import.meta.url));
const bin = fileURLToPath(
  new URL("../node_modules/.bin/netlify", import.meta.url),
);

const child = spawn(
  bin,
  ["serve", "--cwd", root, "--offline", "--port", process.env.PORT ?? "4321"],
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
