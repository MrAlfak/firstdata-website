const fs = require("fs");
const path = require("path");

const cssPath = path.join(__dirname, "../public/vendors/keenicons/_plugins.bundle.css");
const outDir = path.join(__dirname, "../public/vendors/keenicons");
const css = fs.readFileSync(cssPath, "utf8");

const styles = ["duotone", "outline", "solid", "filled"];

function fixUrls(block) {
  return block
    .replace(/url\("fonts\/keenicons\//g, 'url("./fonts/')
    .replace(/url\('fonts\/keenicons\//g, "url('./fonts/")
    .replace(/url\(fonts\/keenicons\//g, "url(./fonts/");
}

for (const style of styles) {
  const needle = `font-family: "keenicons-${style}"`;
  const idx = css.indexOf(needle);
  if (idx < 0) {
    console.error("missing", style);
    continue;
  }
  const start = css.lastIndexOf("@font-face", idx);
  // Find subsequent @font-face starts; take until the next keenicons-* different style
  // or until we leave .ki- rule territory for too long.
  let searchFrom = start + 10;
  let end = css.length;
  while (true) {
    const next = css.indexOf("@font-face", searchFrom);
    if (next < 0) break;
    const window = css.slice(next, next + 120);
    if (/keenicons-(duotone|outline|solid|filled)/.test(window) && !window.includes(`keenicons-${style}`)) {
      end = next;
      break;
    }
    // Non-keenicons font-face ends the icon block if we've already collected ki rules
    if (!window.includes("keenicons-")) {
      const between = css.slice(start, next);
      if (between.includes(".ki-")) {
        end = next;
        break;
      }
    }
    searchFrom = next + 10;
  }

  let block = css.slice(start, end).trim();
  block = fixUrls(block);

  // Ensure base style class exists
  if (!block.includes(`.ki-${style}`)) {
    console.warn(style, "missing base class?");
  }

  const out = path.join(outDir, `${style}.css`);
  fs.writeFileSync(out, `/* Keenicons ${style} — extracted for First Data */\n${block}\n`);
  console.log(style, Math.round(block.length / 1024) + "kb", "rules≈", (block.match(/\.ki-/g) || []).length);
}
