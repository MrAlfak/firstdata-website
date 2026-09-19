/**
 * Guard production build: refuse to run while a Next dev server is listening.
 * Concurrent dev + build corrupts .next and breaks both processes.
 * Skipped in CI/Docker where other services may legitimately bind common ports.
 */
import { execSync, spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const PORTS = [3000, 4000];

function shouldSkipPortGuard() {
  if (process.env.CI === "true" || process.env.CI === "1") return true;
  if (process.env.SKIP_DEV_PORT_GUARD === "1") return true;
  if (fs.existsSync("/.dockerenv")) return true;
  return false;
}

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

const busy = shouldSkipPortGuard() ? [] : PORTS.filter(isPortListening);

if (busy.length > 0) {
  console.error(
    `[build] Refusing to build: dev server appears to be running on port(s) ${busy.join(", ")}.`,
  );
  console.error("[build] Stop dev first (Ctrl+C), then run npm run build again.");
  process.exit(1);
}

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const stt = spawnSync(process.execPath, [path.join(root, "scripts", "fetch-stt-model.mjs")], {
  cwd: root,
  stdio: "inherit",
  env: process.env,
});
if (stt.status !== 0) {
  console.error("[build] Persian speech model is required for assistant voice input.");
  process.exit(1);
}
