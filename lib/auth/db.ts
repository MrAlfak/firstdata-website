import Database from "better-sqlite3";

import fs from "node:fs";

import path from "node:path";



let db: Database.Database | null = null;



function columnExists(database: Database.Database, table: string, column: string): boolean {

  const rows = database.pragma(`table_info(${table})`) as { name: string }[];

  return rows.some((row) => row.name === column);

}



function migrateOtpCodesTable(database: Database.Database): void {

  const row = database

    .prepare(`SELECT sql FROM sqlite_master WHERE type='table' AND name='otp_codes'`)

    .get() as { sql: string } | undefined;

  if (!row?.sql || row.sql.includes("reset_password")) return;



  database.exec(`

    CREATE TABLE otp_codes_v2 (

      id INTEGER PRIMARY KEY AUTOINCREMENT,

      destination TEXT NOT NULL,

      channel TEXT NOT NULL DEFAULT 'email' CHECK (channel IN ('email', 'sms')),

      code_hash TEXT NOT NULL,

      purpose TEXT NOT NULL,

      expires_at TEXT NOT NULL,

      used_at TEXT,

      created_at TEXT NOT NULL DEFAULT (datetime('now'))

    );

    INSERT INTO otp_codes_v2 (id, destination, channel, code_hash, purpose, expires_at, used_at, created_at)

    SELECT id, destination, channel, code_hash, purpose, expires_at, used_at, created_at FROM otp_codes;

    DROP TABLE otp_codes;

    ALTER TABLE otp_codes_v2 RENAME TO otp_codes;

    CREATE INDEX IF NOT EXISTS idx_otp_destination_created ON otp_codes(destination, channel, created_at);

  `);

}



function migrate(database: Database.Database): void {

  database.exec(`

    CREATE TABLE IF NOT EXISTS users (

      id INTEGER PRIMARY KEY AUTOINCREMENT,

      email TEXT UNIQUE COLLATE NOCASE,

      phone TEXT UNIQUE,

      name TEXT NOT NULL,

      password_hash TEXT,

      created_at TEXT NOT NULL DEFAULT (datetime('now')),

      updated_at TEXT NOT NULL DEFAULT (datetime('now')),

      CHECK (email IS NOT NULL OR phone IS NOT NULL)

    );



    CREATE TABLE IF NOT EXISTS otp_codes (

      id INTEGER PRIMARY KEY AUTOINCREMENT,

      destination TEXT NOT NULL,

      channel TEXT NOT NULL DEFAULT 'email' CHECK (channel IN ('email', 'sms')),

      code_hash TEXT NOT NULL,

      purpose TEXT NOT NULL,

      expires_at TEXT NOT NULL,

      used_at TEXT,

      created_at TEXT NOT NULL DEFAULT (datetime('now'))

    );



    CREATE TABLE IF NOT EXISTS user_sessions (

      id TEXT PRIMARY KEY,

      user_id INTEGER NOT NULL,

      user_agent TEXT,

      ip TEXT,

      created_at TEXT NOT NULL DEFAULT (datetime('now')),

      last_seen_at TEXT NOT NULL DEFAULT (datetime('now')),

      revoked_at TEXT,

      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE

    );

  `);



  if (!columnExists(database, "users", "phone")) {

    database.exec(`ALTER TABLE users ADD COLUMN phone TEXT`);

    database.exec(`CREATE UNIQUE INDEX IF NOT EXISTS idx_users_phone ON users(phone)`);

  }



  if (columnExists(database, "otp_codes", "email") && !columnExists(database, "otp_codes", "destination")) {

    database.exec(`ALTER TABLE otp_codes ADD COLUMN destination TEXT`);

    database.exec(`UPDATE otp_codes SET destination = email WHERE destination IS NULL`);

  }



  if (!columnExists(database, "otp_codes", "destination")) {

    database.exec(`ALTER TABLE otp_codes ADD COLUMN destination TEXT NOT NULL DEFAULT ''`);

  }



  if (!columnExists(database, "otp_codes", "channel")) {

    database.exec(`ALTER TABLE otp_codes ADD COLUMN channel TEXT NOT NULL DEFAULT 'email'`);

  }



  migrateOtpCodesTable(database);



  if (!columnExists(database, "users", "email_verified_at")) {

    database.exec(`ALTER TABLE users ADD COLUMN email_verified_at TEXT`);

  }

  if (!columnExists(database, "users", "phone_verified_at")) {

    database.exec(`ALTER TABLE users ADD COLUMN phone_verified_at TEXT`);

  }

  if (!columnExists(database, "users", "status")) {

    database.exec(`ALTER TABLE users ADD COLUMN status TEXT NOT NULL DEFAULT 'active'`);

  }

  if (!columnExists(database, "users", "totp_secret")) {

    database.exec(`ALTER TABLE users ADD COLUMN totp_secret TEXT`);

  }

  if (!columnExists(database, "users", "totp_enabled")) {

    database.exec(`ALTER TABLE users ADD COLUMN totp_enabled INTEGER NOT NULL DEFAULT 0`);

  }



  database.exec(`

    CREATE INDEX IF NOT EXISTS idx_otp_destination_created ON otp_codes(destination, channel, created_at);

    CREATE INDEX IF NOT EXISTS idx_user_sessions_user ON user_sessions(user_id, revoked_at);

  `);

}



export function getDb(): Database.Database {

  if (db) return db;



  const dir = path.join(process.cwd(), "data");

  if (!fs.existsSync(dir)) {

    fs.mkdirSync(dir, { recursive: true });

  }



  const file = path.join(dir, "auth.db");

  db = new Database(file);

  db.pragma("journal_mode = WAL");

  db.pragma("foreign_keys = ON");

  migrate(db);

  return db;

}

