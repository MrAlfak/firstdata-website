import fs from "fs";
import path from "path";

const htmlPath =
  "c:/Users/firstConsult - GFX/Downloads/تصاوبر محزون اکادمی/iran_square_grid_live_fixed.html";
const outPath = path.join(process.cwd(), "components/hero/iran-grid-data.ts");

const html = fs.readFileSync(htmlPath, "utf8");
const match = html.match(/const rows = \[([\s\S]*?)\];/);
if (!match) throw new Error("rows not found");

const rows = eval(`[${match[1]}]`);

const lines = [
  `/** Iran bitmap — ${120}×${rows.length} square grid (1 = land) */`,
  "export const IRAN_GRID_COLS = 120 as const;",
  `export const IRAN_GRID_ROW_COUNT = ${rows.length} as const;`,
  "",
  "export const IRAN_GRID_ROWS: readonly string[] = [",
  ...rows.map((r) => `  ${JSON.stringify(r)},`),
  "];",
  "",
  'export type IranGridCity = { id: "tehran" | "shiraz" | "ahvaz"; row: number; col: number };',
  "",
  "export const IRAN_GRID_CITIES: IranGridCity[] = [",
  '  { id: "tehran", row: 20, col: 64 },',
  '  { id: "shiraz", row: 78, col: 56 },',
  '  { id: "ahvaz", row: 52, col: 40 },',
  "];",
  "",
  "export type IranLandCell = { row: number; col: number; order: number; bright: boolean };",
  "",
  "export function getIranLandCells(): IranLandCell[] {",
  "  const cells: IranLandCell[] = [];",
  "  let order = 0;",
  "  for (let row = 0; row < IRAN_GRID_ROWS.length; row++) {",
  "    const line = IRAN_GRID_ROWS[row];",
  "    for (let col = 0; col < line.length; col++) {",
  '      if (line[col] !== "1") continue;',
  "      cells.push({",
  "        row,",
  "        col,",
  "        order: order++,",
  "        bright: ((row * 17 + col * 31 + row * col) % 100) < 12,",
  "      });",
  "    }",
  "  }",
  "  return cells;",
  "}",
  "",
];

fs.writeFileSync(outPath, lines.join("\n"));
console.log(`Wrote ${outPath} (${rows.length} rows, ${getIranLandCells(rows).length} land cells)`);

function getIranLandCells(r) {
  let n = 0;
  for (const line of r) for (const ch of line) if (ch === "1") n++;
  return n;
}
