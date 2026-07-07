import type Database from "better-sqlite3";
import { getDb } from "@/lib/auth/db";

function columnExists(database: Database.Database, table: string, column: string): boolean {
  const rows = database.pragma(`table_info(${table})`) as { name: string }[];
  return rows.some((row) => row.name === column);
}

function safeAddColumn(db: Database.Database, sql: string): void {
  try {
    db.exec(sql);
  } catch (err) {
    if (!(err instanceof Error && /duplicate column name/i.test(err.message))) throw err;
  }
}

function addColumnIfMissing(
  db: Database.Database,
  table: string,
  column: string,
  definition: string,
): void {
  if (columnExists(db, table, column)) return;
  safeAddColumn(db, `ALTER TABLE ${table} ADD COLUMN ${column} ${definition}`);
}

export function migrateContactLeadsTable(db: Database.Database): void {
  addColumnIfMissing(db, "contact_leads", "lead_type", "TEXT NOT NULL DEFAULT 'general'");
  addColumnIfMissing(db, "contact_leads", "company_name", "TEXT");
  addColumnIfMissing(db, "contact_leads", "project_types", "TEXT");
  addColumnIfMissing(db, "contact_leads", "budget", "TEXT");
  addColumnIfMissing(db, "contact_leads", "timeline", "TEXT");
  addColumnIfMissing(db, "contact_leads", "attachments", "TEXT");
  addColumnIfMissing(db, "contact_leads", "contact_method", "TEXT");
  addColumnIfMissing(db, "contact_leads", "contact_time", "TEXT");
  addColumnIfMissing(db, "contact_leads", "metadata", "TEXT");
}

export function ensureContactLeadsMigrated(): void {
  migrateContactLeadsTable(getDb());
}
