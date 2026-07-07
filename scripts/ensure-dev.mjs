/**
 * Guard dev server startup: wipe .next when it contains production build artifacts.
 * Running `next dev` against a post-build .next cache causes 404s on /_next/static/chunks/*.
 */
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

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

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const nextDir = path.join(root, ".next");

const PROD_MARKERS = ["BUILD_ID", "standalone", "export-marker.json"];

function rmDir(dir) {
  if (!fs.existsSync(dir)) return;
  fs.rmSync(dir, { recursive: true, force: true });
}

function hasProdArtifacts() {
  if (!fs.existsSync(nextDir)) return false;
  return PROD_MARKERS.some((name) => fs.existsSync(path.join(nextDir, name)));
}

if (hasProdArtifacts()) {
  console.warn(
    "[dev] Removing stale production .next cache (found BUILD_ID/standalone). " +
      "This prevents 404 errors on _next/static/chunks.",
  );
  rmDir(nextDir);
}

// Mixed mode: `next start` without standalone bootstrap leaves broken static routes.
const standaloneServer = path.join(nextDir, "standalone", "server.js");
const staticDir = path.join(nextDir, "static");
if (fs.existsSync(standaloneServer) && !fs.existsSync(staticDir)) {
  console.warn("[dev] Incomplete .next cache detected. Clearing before dev server...");
  rmDir(nextDir);
}

const portArg = process.argv.find((arg) => arg.startsWith("--port="));
const devPort = portArg?.split("=")[1] ?? process.env.PORT ?? "3000";

if (isPortListening(devPort)) {
  console.error(
    `[dev] Port ${devPort} is already in use. Stop the other server first (Ctrl+C).`,
  );
  console.error("[dev] Do not run `npm run start` and `next dev` on the same port.");
  process.exit(1);
}
