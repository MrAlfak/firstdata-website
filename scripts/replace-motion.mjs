import fs from "node:fs";
import path from "node:path";

const roots = ["components", "app", "motion", "i18n"];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "node_modules" || entry.name === ".next") continue;
      walk(full);
      continue;
    }
    if (!/\.tsx?$/.test(entry.name)) continue;
    let content = fs.readFileSync(full, "utf8");
    if (!content.includes("framer-motion")) continue;
    content = content
      .replaceAll('from "framer-motion"', 'from "motion/react"')
      .replaceAll("from 'framer-motion'", "from 'motion/react'");
    fs.writeFileSync(full, content);
    console.log("updated:", full);
  }
}

for (const root of roots) {
  walk(path.join(process.cwd(), root));
}
