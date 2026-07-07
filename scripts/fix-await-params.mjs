import fs from "node:fs";
import path from "node:path";

function fixRoutes(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      fixRoutes(full);
      continue;
    }
    if (entry.name !== "route.ts") continue;

    const parts = fs.readFileSync(full, "utf8").split("export async function");
    if (!parts[0].includes("Promise<{ id: string }>") && !parts.slice(1).some((p) => p.includes("Promise<{ id: string }>"))) {
      continue;
    }

    const next = parts.map((chunk, index) => {
      if (index === 0) return chunk;
      if (!chunk.includes("Promise<{ id: string }>")) return `export async function${chunk}`;
      if (chunk.includes("const { id } = await params")) return `export async function${chunk}`;
      return `export async function${chunk.replace(/\{\r?\n/, "{\n  const { id } = await params;\n")}`;
    }).join("");

    if (next !== parts.join("export async function")) {
      fs.writeFileSync(full, next);
      console.log("route:", full);
    }
  }
}

function fixSlugPages(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      fixSlugPages(full);
      continue;
    }
    if (entry.name !== "page.tsx" && !entry.name.endsWith("opengraph-image.tsx")) continue;

    let src = fs.readFileSync(full, "utf8");
    if (!src.includes("params: Promise<{ slug: string }>")) continue;

    const parts = src.split(/(?=export async function generateMetadata|export default async function)/);
    let changed = false;
    const next = parts.map((part) => {
      if (!part.startsWith("export async function")) return part;
      if (!part.includes("params: Promise<{ slug: string }>") && !part.includes("{ params }: Props")) return part;
      if (part.includes("const { slug } = await params")) return part;
      changed = true;
      return part.replace(/\{\r?\n/, "{\n  const { slug } = await params;\n");
    }).join("");

    if (changed) {
      fs.writeFileSync(full, next);
      console.log("page:", full);
    }
  }
}

fixRoutes(path.join(process.cwd(), "app", "api"));
fixSlugPages(path.join(process.cwd(), "app"));
