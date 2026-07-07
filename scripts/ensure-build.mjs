/**
 * Guard production build: refuse to run while a Next dev server is listening.
 * Concurrent dev + build corrupts .next and breaks both processes.
 */
import { execSync } from "node:child_process";

const PORTS = [3000, 4000];

function isPortListening(port) {
  try {
    if (process.platform === "win32") {
      const out = execSync(`netstat -ano -p tcp | findstr :${port}`, {
        encoding: "utf8",
        stdio: ["pipe", "pipe", "pipe"],
      });
      return /LISTENING/i.test(out);
    }
    const out = execSync(`lsof -iTCP:${port} -sTCP:LISTEN`, {
      encoding: "utf8",
      stdio: ["pipe", "pipe", "pipe"],
    });
    return out.trim().length > 0;
  } catch {
    return false;
  }
}

const busy = PORTS.filter(isPortListening);

if (busy.length > 0) {
  console.error(
    `[build] Refusing to build: dev server appears to be running on port(s) ${busy.join(", ")}.`,
  );
  console.error("[build] Stop dev first (Ctrl+C), then run npm run build again.");
  process.exit(1);
}
