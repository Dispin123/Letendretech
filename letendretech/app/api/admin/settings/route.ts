import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { ensureTables } from "@/lib/ensure-tables";
import { requireAuth } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const authError = await requireAuth(request);
  if (authError) return authError;

  try {
    await ensureTables();
    const settings = await sql`SELECT * FROM settings ORDER BY key ASC`;
    return NextResponse.json({ settings });
  } catch (err) {
    console.error("Admin settings GET error:", err);
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const authError = await requireAuth(request);
  if (authError) return authError;

  try {
    await ensureTables();
    const { key, value } = await request.json();
    if (!key) return NextResponse.json({ error: "Key is required" }, { status: 400 });

    const [setting] = await sql`
      INSERT INTO settings (key, value, updated_at)
      VALUES (${key}, ${value ?? ""}, NOW())
      ON CONFLICT (key) DO UPDATE
      SET value = EXCLUDED.value, updated_at = NOW()
      RETURNING *
    `;

    return NextResponse.json({ setting });
  } catch (err) {
    console.error("Admin settings POST error:", err);
    return NextResponse.json({ error: "Failed to save setting" }, { status: 500 });
  }
}
