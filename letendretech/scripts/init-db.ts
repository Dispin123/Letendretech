/**
 * Letendre Tech — DB Init Script
 * Run: npm run init-db
 *
 * Creates tables with safe nullable columns from the start (no migration headaches).
 * Idempotent — safe to run multiple times.
 */

import { neon } from "@neondatabase/serverless";
import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env.local") });

if (!process.env.DATABASE_URL) {
  console.error("❌ DATABASE_URL is not set in .env.local");
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);

async function init() {
  console.log("🔧 Initializing Letendre Tech database...\n");

  // LEADS table — all contact/nullable from day one
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
  console.log("✅ leads table ready");

  // JOBS / PROJECT TRACKING table
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
  console.log("✅ jobs table ready");

  // SETTINGS table — key/value site config
  await sql`
    CREATE TABLE IF NOT EXISTS settings (
      id          SERIAL PRIMARY KEY,
      key         TEXT UNIQUE NOT NULL,
      value       TEXT NOT NULL DEFAULT '',
      updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
  console.log("✅ settings table ready");

  // SITE_IMAGES table — paste-URL image management
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
  console.log("✅ site_images table ready");

  // Seed default settings
  const defaultSettings = [
    { key: "hero_headline", value: "Local IT Partner for Southern New England" },
    { key: "hero_subheadline", value: "Managed IT services, cybersecurity, and web development for small businesses across Massachusetts and Rhode Island." },
    { key: "hero_cta", value: "Get a Free Estimate" },
    { key: "phone", value: "(774) 260-0259" },
    { key: "email", value: "nathan@letendretech.com" },
    { key: "tagline", value: "Straightforward tech. Real results." },
  ];

  for (const { key, value } of defaultSettings) {
    await sql`
      INSERT INTO settings (key, value)
      VALUES (${key}, ${value})
      ON CONFLICT (key) DO NOTHING
    `;
  }
  console.log("✅ Default settings seeded");

  console.log("\n🚀 Database initialization complete!");
  console.log("   Next: Set your .env.local variables and run: npm run dev");
}

init().catch((err) => {
  console.error("❌ Init failed:", err);
  process.exit(1);
});
