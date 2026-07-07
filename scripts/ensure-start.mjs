/**
 * Start production server for output: "standalone" builds.
 * `next start` does NOT serve static assets correctly with standalone — use this instead.
 */
import { execSync, spawn } from "node:child_process";
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
const standaloneDir = path.join(root, ".next", "standalone");
const serverJs = path.join(standaloneDir, "server.js");

function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.cpSync(src, dest, { recursive: true });
}

if (!fs.existsSync(serverJs)) {
  console.error("[start] Standalone server not found. Run `npm run build` first.");
  process.exit(1);
}

copyDir(path.join(root, "public"), path.join(standaloneDir, "public"));
copyDir(path.join(root, ".next", "static"), path.join(standaloneDir, ".next", "static"));

const portArg = process.argv.find((arg) => arg.startsWith("--port="));
const port = portArg?.split("=")[1] ?? process.env.PORT ?? "3000";

if (isPortListening(port)) {
  console.error(
    `[start] Port ${port} is already in use. Stop the other server first (Ctrl+C).`,
  );
  console.error("[start] Do not run `next dev` and `npm run start` on the same port.");
  process.exit(1);
}

console.log(`[start] Running standalone server on http://localhost:${port}`);

const child = spawn(process.execPath, [serverJs], {
  cwd: standaloneDir,
  stdio: "inherit",
  env: {
    ...process.env,
    PORT: String(port),
    HOSTNAME: process.env.HOSTNAME ?? "0.0.0.0",
  },
});

child.on("exit", (code) => process.exit(code ?? 0));
