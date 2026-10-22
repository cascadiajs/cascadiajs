// Finds a TCP port that is free on IPv4 and IPv6. The probe binds a real
// socket on each address. A port that only one address family reports as taken
// still counts as taken, which the Netlify CLI's own check can miss on macOS.
import { createServer } from "node:net";

const HOSTS = ["127.0.0.1", "::1", "0.0.0.0", "::"];

function bind(port, host) {
  return new Promise((resolve) => {
    const server = createServer();
    server.once("error", (error) =>
      // A host this machine lacks (no IPv6) cannot hold the port: no clash.
      resolve(
        error.code === "EADDRNOTAVAIL" || error.code === "EAFNOSUPPORT"
          ? { port: 0 }
          : null,
      ),
    );
    server.listen({ port, host, exclusive: true }, () => {
      const bound = server.address().port;
      server.close(() => resolve({ port: bound }));
    });
  });
}

export async function freePort() {
  for (let attempt = 0; attempt < 50; attempt++) {
    const first = await bind(0, "127.0.0.1");
    if (!first) {
      continue;
    }
    const results = await Promise.all(
      HOSTS.map((host) => bind(first.port, host)),
    );
    if (results.every(Boolean)) {
      return first.port;
    }
  }
  throw new Error("Could not find a free port");
}
