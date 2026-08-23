import type Database from "better-sqlite3";
import { getDb } from "@/lib/auth/db";

let schemaReady = false;

function columnExists(database: Database.Database, table: string, column: string): boolean {
  const rows = database.pragma(`table_info(${table})`) as { name: string }[];
  return rows.some((row) => row.name === column);
}

function isDuplicateColumnError(err: unknown): boolean {
  return err instanceof Error && /duplicate column name/i.test(err.message);
}

function safeAddColumn(db: Database.Database, sql: string): void {
  try {
    db.exec(sql);
  } catch (err) {
    if (!isDuplicateColumnError(err)) throw err;
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

function runPanelMigration(db: Database.Database): void {
  addColumnIfMissing(db, "users", "role", "TEXT NOT NULL DEFAULT 'client'");
  addColumnIfMissing(db, "users", "panel_skin", "TEXT NOT NULL DEFAULT 'modern'");

  db.exec(`
    CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      title TEXT NOT NULL,
      service_slug TEXT,
      status TEXT NOT NULL DEFAULT 'inquiry',
      phase TEXT NOT NULL DEFAULT 'consult',
      progress_pct INTEGER NOT NULL DEFAULT 0,
      summary TEXT,
      delivery_due TEXT,
      started_at TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now')),
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
    CREATE INDEX IF NOT EXISTS idx_projects_user ON projects(user_id);

    CREATE TABLE IF NOT EXISTS project_milestones (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      project_id INTEGER NOT NULL,
      milestone_key TEXT NOT NULL,
      label TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'pending',
      sort_order INTEGER NOT NULL DEFAULT 0,
      completed_at TEXT,
      FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
    );
    CREATE INDEX IF NOT EXISTS idx_milestones_project ON project_milestones(project_id);

    CREATE TABLE IF NOT EXISTS project_updates (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      project_id INTEGER NOT NULL,
      body TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS contracts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      project_id INTEGER NOT NULL,
      user_id INTEGER NOT NULL,
      title TEXT NOT NULL,
      version INTEGER NOT NULL DEFAULT 1,
      status TEXT NOT NULL DEFAULT 'pending',
      summary TEXT,
      file_path TEXT,
      signed_at TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
    CREATE INDEX IF NOT EXISTS idx_contracts_user ON contracts(user_id);

    CREATE TABLE IF NOT EXISTS tickets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      project_id INTEGER,
      subject TEXT NOT NULL,
      priority TEXT NOT NULL DEFAULT 'normal',
      status TEXT NOT NULL DEFAULT 'open',
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now')),
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE SET NULL
    );
    CREATE INDEX IF NOT EXISTS idx_tickets_user ON tickets(user_id);

    CREATE TABLE IF NOT EXISTS ticket_messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      ticket_id INTEGER NOT NULL,
      author_type TEXT NOT NULL CHECK (author_type IN ('client', 'staff')),
      author_name TEXT,
      body TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      FOREIGN KEY (ticket_id) REFERENCES tickets(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS panel_files (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      project_id INTEGER,
      direction TEXT NOT NULL CHECK (direction IN ('upload', 'download')),
      name TEXT NOT NULL,
      storage_path TEXT NOT NULL,
      mime TEXT,
      size_bytes INTEGER,
      description TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE SET NULL
    );
    CREATE INDEX IF NOT EXISTS idx_panel_files_user ON panel_files(user_id);

    CREATE TABLE IF NOT EXISTS invoices (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      project_id INTEGER,
      number TEXT NOT NULL,
      title TEXT NOT NULL,
      amount_rial INTEGER NOT NULL,
      status TEXT NOT NULL DEFAULT 'unpaid',
      due_at TEXT,
      pay_url TEXT,
      paid_at TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE SET NULL
    );
    CREATE INDEX IF NOT EXISTS idx_invoices_user ON invoices(user_id);

    CREATE TABLE IF NOT EXISTS approvals (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      project_id INTEGER NOT NULL,
      user_id INTEGER NOT NULL,
      title TEXT NOT NULL,
      description TEXT,
      status TEXT NOT NULL DEFAULT 'pending',
      decided_at TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
    CREATE INDEX IF NOT EXISTS idx_approvals_user ON approvals(user_id);

    CREATE TABLE IF NOT EXISTS notifications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      kind TEXT NOT NULL,
      title TEXT NOT NULL,
      body TEXT,
      link TEXT,
      read_at TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
    CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id);

    CREATE TABLE IF NOT EXISTS organizations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS organization_members (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      organization_id INTEGER NOT NULL,
      user_id INTEGER NOT NULL,
      role TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('owner', 'manager', 'member')),
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE CASCADE,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      UNIQUE (organization_id, user_id)
    );
    CREATE INDEX IF NOT EXISTS idx_org_members_user ON organization_members(user_id);
    CREATE INDEX IF NOT EXISTS idx_org_members_org ON organization_members(organization_id);
  `);

  addColumnIfMissing(
    db,
    "projects",
    "organization_id",
    "INTEGER REFERENCES organizations(id)",
  );
  addColumnIfMissing(db, "contracts", "mime", "TEXT");
  addColumnIfMissing(db, "contracts", "signature_hash", "TEXT");
  addColumnIfMissing(db, "contracts", "signature_payload", "TEXT");
  addColumnIfMissing(db, "contracts", "signed_file_path", "TEXT");
  addColumnIfMissing(db, "invoices", "payment_authority", "TEXT");
  addColumnIfMissing(db, "invoices", "payment_ref_id", "TEXT");
  addColumnIfMissing(db, "invoices", "payment_gateway", "TEXT DEFAULT 'manual'");
  if (columnExists(db, "contact_leads", "id")) {
    addColumnIfMissing(db, "contact_leads", "user_id", "INTEGER REFERENCES users(id)");
    addColumnIfMissing(db, "contact_leads", "status", "TEXT NOT NULL DEFAULT 'received'");
  }
}

function applyTicketFormColumns(db: Database.Database): void {
  addColumnIfMissing(db, "tickets", "contract_id", "INTEGER");
  addColumnIfMissing(db, "tickets", "department", "TEXT NOT NULL DEFAULT 'support'");
  addColumnIfMissing(db, "panel_files", "ticket_id", "INTEGER");
}

// Cache the additive ticket-form columns so long-lived workers don't re-run
// PRAGMA/ALTER checks on every request once the schema is known-good.
let ticketFormColumnsReady = false;

/** Run panel schema migrations once per process; safe under parallel Next.js build workers. */
export function ensurePanelSchema(): void {
  const db = getDb();

  if (schemaReady) {
    // Idempotent additive columns so hot-reload / long-lived workers still pick up new fields.
    if (!ticketFormColumnsReady) {
      applyTicketFormColumns(db);
      ticketFormColumnsReady = true;
    }
    return;
  }

  db.exec("BEGIN IMMEDIATE");
  try {
    runPanelMigration(db);
    applyTicketFormColumns(db);
    ticketFormColumnsReady = true;
    db.exec("COMMIT");
    schemaReady = true;
  } catch (err) {
    try {
      db.exec("ROLLBACK");
    } catch {
      /* ignore rollback failure */
    }
    throw err;
  }
}

/** @deprecated Use ensurePanelSchema() */
export function migratePanelSchema(): void {
  ensurePanelSchema();
}

export const DEFAULT_MILESTONES = [
  { key: "consult", sort: 1 },
  { key: "design", sort: 2 },
  { key: "build", sort: 3 },
  { key: "launch", sort: 4 },
] as const;
