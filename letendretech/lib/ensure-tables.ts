import { sql } from "./db";

let tablesEnsured = false;

export async function ensureTables(): Promise<void> {
  if (tablesEnsured) return;

  await sql`
    CREATE TABLE IF NOT EXISTS leads (
      id              SERIAL PRIMARY KEY,
      name            TEXT NOT NULL,
      email           TEXT,
      phone           TEXT,
      business_type   TEXT,
      town            TEXT,
      service_interest TEXT,
      message         TEXT,
      status          TEXT NOT NULL DEFAULT 'new',
      source          TEXT DEFAULT 'website',
      created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS jobs (
      id            SERIAL PRIMARY KEY,
      client_name   TEXT NOT NULL,
      project_name  TEXT NOT NULL,
      description   TEXT,
      status        TEXT NOT NULL DEFAULT 'discovery',
      start_date    DATE,
      end_date      DATE,
      value         NUMERIC(10,2),
      notes         TEXT,
      lead_id       INTEGER REFERENCES leads(id) ON DELETE SET NULL,
      created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS settings (
      id          SERIAL PRIMARY KEY,
      key         TEXT UNIQUE NOT NULL,
      value       TEXT NOT NULL DEFAULT '',
      updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS site_images (
      id          SERIAL PRIMARY KEY,
      label       TEXT NOT NULL,
      url         TEXT NOT NULL,
      section     TEXT,
      alt_text    TEXT,
      created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  tablesEnsured = true;
}
