const fs = require("fs");
const path = require("path");

const dir = path.join(__dirname, "..", "public", "vendors", "keenicons");

for (const style of ["outline", "solid", "filled", "duotone"]) {
  const file = path.join(dir, `${style}.css`);
  let css = fs.readFileSync(file, "utf8");

  // Absolute public URLs (Next serves /vendors/* from public/)
  css = css.replace(/url\("\.\/fonts\//g, 'url("/vendors/keenicons/fonts/');

  // Drop missing .eot / .svg faces
  css = css.replace(/url\("[^"]+\.eot[^"]*"\)[^,]*,\s*/g, "");
  css = css.replace(/url\("[^"]+\.eot[^"]*"\)\s*format\("embedded-opentype"\),\s*/g, "");
  css = css.replace(/,\s*url\("[^"]+\.svg[^"]*"\)\s*format\("svg"\)/g, "");

  fs.writeFileSync(file, css);
  console.log("fixed", style);
}
