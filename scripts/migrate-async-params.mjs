import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();

/** @param {string} file */
function migratePageFile(file) {
  let src = fs.readFileSync(file, "utf8");
  if (!src.includes("params:") || src.includes("Promise<")) return false;

  src = src.replace(
    /params:\s*\{\s*slug:\s*string\s*\}/g,
    "params: Promise<{ slug: string }>",
  );
  src = src.replace(
    /params:\s*\{\s*id:\s*string\s*\}/g,
    "params: Promise<{ id: string }>",
  );

  src = src.replace(
    /export function generateMetadata\(\{ params \}: Props\): Metadata/g,
    "export async function generateMetadata({ params }: Props): Promise<Metadata>",
  );

  src = src.replace(
    /export default function (\w+)\(\{ params \}: Props\)/g,
    "export default async function $1({ params }: Props)",
  );

  src = src.replace(
    /export default function (\w+)\(\{ params \}: \{ params: Promise<\{ id: string \}> \}\)/g,
    "export default async function $1({ params }: { params: Promise<{ id: string }> })",
  );

  // Insert await params at start of generateMetadata and default export if params.slug/id used
  src = src.replace(
    /(export async function generateMetadata\(\{ params \}: Props\): Promise<Metadata> \{\n)(\s*)(const post)/g,
    "$1$2const { slug } = await params;\n$2$3",
  );
  src = src.replace(
    /(export async function generateMetadata\(\{ params \}: Props\): Promise<Metadata> \{\n)(\s*)(if \(!SERVICES)/g,
    "$1$2const { slug } = await params;\n$2$3",
  );
  src = src.replace(
    /(export async function generateMetadata\(\{ params \}: Props\): Promise<Metadata> \{\n)(\s*)(const pageKey)/g,
    "$1$2const { slug } = await params;\n$2$3",
  );
  src = src.replace(
    /(export async function generateMetadata\(\{ params \}: Props\): Promise<Metadata> \{\n)(\s*)(if \(!PORTFOLIO)/g,
    "$1$2const { slug } = await params;\n$2$3",
  );
  src = src.replace(
    /(export async function generateMetadata\(\{ params \}: Props\): Promise<Metadata> \{\n)(\s*)(if \(!PRODUCT)/g,
    "$1$2const { slug } = await params;\n$2$3",
  );

  src = src.replace(/params\.slug/g, "slug");
  src = src.replace(/params\.id/g, "id");

  // default exports - add await at function start
  src = src.replace(
    /(export default async function \w+\(\{ params \}: Props\) \{\n)(\s*)(const post = getPostBySlug)/g,
    "$1$2const { slug } = await params;\n$2$3",
  );
  src = src.replace(
    /(export default async function \w+\(\{ params \}: Props\) \{\n)(\s*)(if \(!ABOUTUS)/g,
    "$1$2const { slug } = await params;\n$2$3",
  );
  src = src.replace(
    /(export default async function \w+\(\{ params \}: Props\) \{\n)(\s*)(if \(!SERVICES_SLUGS)/g,
    "$1$2const { slug } = await params;\n$2$3",
  );
  src = src.replace(
    /(export default async function \w+\(\{ params \}: Props\) \{\n)(\s*)(if \(!CONTACT)/g,
    "$1$2const { slug } = await params;\n$2$3",
  );
  src = src.replace(
    /(export default async function \w+\(\{ params \}: Props\) \{\n)(\s*)(if \(!PORTFOLIO)/g,
    "$1$2const { slug } = await params;\n$2$3",
  );
  src = src.replace(
    /(export default async function \w+\(\{ params \}: Props\) \{\n)(\s*)(if \(!PRODUCT)/g,
    "$1$2const { slug } = await params;\n$2$3",
  );

  src = src.replace(
    /export default async function (\w+)\(\{ params \}: \{ params: Promise<\{ id: string \}> \}\) \{\n(\s*)return/g,
    "export default async function $1({ params }: { params: Promise<{ id: string }> }) {\n$2const { id } = await params;\n$2return",
  );

  fs.writeFileSync(file, src);
  return true;
}

/** @param {string} file */
function migrateRouteFile(file) {
  let src = fs.readFileSync(file, "utf8");
  if (!src.includes("params:") || src.includes("Promise<")) return false;

  src = src.replace(
    /\{ params \}: \{ params: \{ id: string \} \}/g,
    "{ params }: { params: Promise<{ id: string }> }",
  );

  src = src.replace(
    /export async function (GET|POST|PUT|PATCH|DELETE)\(([^)]*)\{ params \}: \{ params: Promise<\{ id: string \}> \}\)/g,
    "export async function $1($2{ params }: { params: Promise<{ id: string }> })",
  );

  // Add const { id } = await params; after each handler opening if Number(params.id) or params.id exists
  src = src.replace(
    /(export async function (?:GET|POST)[^{]+\{ params \}: \{ params: Promise<\{ id: string \}> \}\) \{\n)(?!(\s*const \{ id \}))/g,
    "$1  const { id } = await params;\n",
  );

  src = src.replace(/Number\(params\.id\)/g, "Number(id)");
  src = src.replace(/params\.id/g, "id");

  fs.writeFileSync(file, src);
  return true;
}

/** @param {string} file */
function migrateOgImage(file) {
  let src = fs.readFileSync(file, "utf8");
  if (!src.includes("params:") || src.includes("Promise<")) return false;

  src = src.replace(
    /type Props = \{ params: \{ slug: string \} \};/g,
    "type Props = { params: Promise<{ slug: string }> };",
  );
  src = src.replace(
    /export default function (\w+)\(\{ params \}: Props\)/g,
    "export default async function $1({ params }: Props)",
  );
  src = src.replace(
    /(export default async function \w+\(\{ params \}: Props\) \{\n)(\s*)(const )/g,
    "$1$2const { slug } = await params;\n$2$3",
  );
  src = src.replace(/params\.slug/g, "slug");

  fs.writeFileSync(file, src);
  return true;
}

/** @param {string} dir */
function walk(dir, handler) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "node_modules" || entry.name === ".next") continue;
      walk(full, handler);
    } else if (entry.name === "page.tsx" || entry.name === "route.ts" || entry.name.endsWith("opengraph-image.tsx")) {
      if (handler(full)) console.log("migrated:", full);
    }
  }
}

walk(path.join(ROOT, "app"), (file) => {
  if (file.endsWith("opengraph-image.tsx")) return migrateOgImage(file);
  if (file.endsWith("route.ts")) return migrateRouteFile(file);
  return migratePageFile(file);
});
