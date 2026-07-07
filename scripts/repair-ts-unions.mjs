/**
 * Repair TypeScript union types broken by accidental ` | ` → `, ` replacement.
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");

function walk(dir, out = []) {
  for (const name of fs.readdirSync(dir)) {
    if (name === "node_modules" || name === ".next" || name === "vendor") continue;
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) walk(p, out);
    else if (/\.(ts|tsx)$/.test(name)) out.push(p);
  }
  return out;
}

function repair(content) {
  let s = content;

  s = s.replace(/^, "/gm, '| "');

  s = s.replace(/type (\w+) = ((?:"[^"]+")(?:, "[^"]+")+);/g, (_, name, union) =>
    `type ${name} = ${union.replace(/, "/g, ' | "')};`,
  );

  s = s.replace(/tone: "ok", "error", "accent", "wait", "success"/g,
    'tone: "ok" | "error" | "accent" | "wait" | "success"');
  s = s.replace(/lang: "en", "fa"/g, 'lang: "en" | "fa"');
  s = s.replace(/\): "fa", "en"/g, '): "fa" | "en"');
  s = s.replace(/purpose: "login", "register"/g, 'purpose: "login" | "register"');
  s = s.replace(/role: "owner", "manager", "member"/g, 'role: "owner" | "manager" | "member"');
  s = s.replace(/id: "tehran", "shiraz", "ahvaz"/g, 'id: "tehran" | "shiraz" | "ahvaz"');
  s = s.replace(/tone\?: "default", "danger", "warn"/g, 'tone?: "default" | "danger" | "warn"');
  s = s.replace(/dir\?: "ltr", "rtl"/g, 'dir?: "ltr" | "rtl"');
  s = s.replace(/type: "input", "output", "error"/g, 'type: "input" | "output" | "error"');
  s = s.replace(
    /export type SocialNetwork = "instagram", "linkedin", "facebook", "telegram"/,
    'export type SocialNetwork = "instagram" | "linkedin" | "facebook" | "telegram"',
  );

  s = s.replace(/ as 0, 1/g, " as 0 | 1");
  s = s.replace(/\(andAB, andCD\)/g, "(andAB | andCD)");

  s = s.replace(/(\w+(?:Row|Record)?), undefined/g, "$1 | undefined");
  s = s.replace(/(\{ user_id: number; subject: string \}), undefined/g, "$1 | undefined");
  s = s.replace(/(\{ id: number \}), undefined/g, "$1 | undefined");
  s = s.replace(/(\{ projectId: number; userId: number \}), null/g, "$1 | null");
  s = s.replace(/organizationId\?: number, null/g, "organizationId?: number | null");
  s = s.replace(/ContactLeadRow, undefined/g, "ContactLeadRow | undefined");

  // Generic nullable object fields broken by comma replacement
  s = s.replace(/: string, null/g, ": string | null");
  s = s.replace(/: number, null/g, ": number | null");
  s = s.replace(/useState<(\w+\[\]), null>/g, "useState<$1 | null>");
  s = s.replace(/useState<([^,>]+), null>/g, "useState<$1 | null>");
  s = s.replace(/useRef<([^,>]+), null>/g, "useRef<$1 | null>");
  s = s.replace(/useState<Color, null>/g, "useState<Color | null>");
  s = s.replace(/value: 0, 1/g, "value: 0 | 1");
  s = s.replace(/ as \{ organization_id: number \}, undefined/g,
    " as { organization_id: number } | undefined");

  return s;
}

let changed = 0;
for (const file of walk(ROOT)) {
  const rel = path.relative(ROOT, file);
  if (rel.startsWith("scripts" + path.sep)) continue;
  const before = fs.readFileSync(file, "utf8");
  const after = repair(before);
  if (after !== before) {
    fs.writeFileSync(file, after);
    changed++;
  }
}
console.log(`Repaired ${changed} file(s).`);
