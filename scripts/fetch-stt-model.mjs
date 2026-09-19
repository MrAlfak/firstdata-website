/**
 * Fetch the on-device Persian STT model and copy vosk-browser into public/stt.
 * Zip is gitignored (~53MB). Run from ensure-dev / ensure-build so local and
 * Dokploy images get the file without committing it.
 */
import fs from "node:fs";
import path from "node:path";
import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const destDir = path.join(root, "public", "stt");
const zipName = "vosk-model-small-fa-0.42.zip";
const destZip = path.join(destDir, zipName);
const minZipBytes = 20 * 1024 * 1024;
const voskSrc = path.join(root, "node_modules", "vosk-browser", "dist", "vosk.js");
const voskDest = path.join(destDir, "vosk.js");

const MODEL_URLS = [
  "https://alphacephei.com/vosk/models/vosk-model-small-fa-0.42.zip",
  "https://huggingface.co/localstack/vosk-models/resolve/main/vosk-model-small-fa-0.42.zip",
];

fs.mkdirSync(destDir, { recursive: true });

if (!fs.existsSync(voskSrc)) {
  console.error("[stt] vosk-browser is not installed. Run npm install.");
  process.exit(1);
}

const srcStat = fs.statSync(voskSrc);
if (!fs.existsSync(voskDest) || fs.statSync(voskDest).size !== srcStat.size) {
  fs.copyFileSync(voskSrc, voskDest);
  console.log(`[stt] copied vosk.js (${srcStat.size} bytes)`);
}

function zipLooksValid() {
  if (!fs.existsSync(destZip)) return false;
  const size = fs.statSync(destZip).size;
  if (size < minZipBytes) return false;
  const fd = fs.openSync(destZip, "r");
  const magic = Buffer.alloc(4);
  fs.readSync(fd, magic, 0, 4, 0);
  fs.closeSync(fd);
  return magic[0] === 0x50 && magic[1] === 0x4b;
}

async function downloadFrom(url) {
  console.log(`[stt] downloading ${url}`);
  const res = await fetch(url, { redirect: "follow" });
  if (!res.ok || !res.body) {
    throw new Error(`HTTP ${res.status} ${res.statusText}`);
  }
  const tmp = `${destZip}.part`;
  try {
    await pipeline(Readable.fromWeb(res.body), fs.createWriteStream(tmp));
  } catch (err) {
    fs.rmSync(tmp, { force: true });
    throw err;
  }
  fs.renameSync(tmp, destZip);
  if (!zipLooksValid()) {
    const size = fs.existsSync(destZip) ? fs.statSync(destZip).size : 0;
    fs.rmSync(destZip, { force: true });
    throw new Error(`downloaded file is not a valid zip (${size} bytes)`);
  }
  console.log(`[stt] saved ${zipName} (${fs.statSync(destZip).size} bytes)`);
}

if (zipLooksValid()) {
  console.log(`[stt] ${zipName} already present`);
} else {
  fs.rmSync(destZip, { force: true });
  fs.rmSync(`${destZip}.part`, { force: true });
  let lastErr = new Error("no URLs");
  for (const url of MODEL_URLS) {
    try {
      await downloadFrom(url);
      lastErr = null;
      break;
    } catch (err) {
      lastErr = err instanceof Error ? err : new Error(String(err));
      console.warn(`[stt] failed ${url}: ${lastErr.message}`);
    }
  }
  if (lastErr) {
    console.error("[stt] could not download the Persian speech model.");
    process.exit(1);
  }
}
