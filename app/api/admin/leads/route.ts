import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { ensureTables } from "@/lib/ensure-tables";
import { requireAuth } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const authError = await requireAuth(request);
  if (authError) return authError;

  try {
    await ensureTables();

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const limit = Math.min(parseInt(searchParams.get("limit") || "50"), 200);
    const offset = parseInt(searchParams.get("offset") || "0");

    const leads = status
      ? await sql`SELECT * FROM leads WHERE status = ${status} ORDER BY created_at DESC LIMIT ${limit} OFFSET ${offset}`
      : await sql`SELECT * FROM leads ORDER BY created_at DESC LIMIT ${limit} OFFSET ${offset}`;

    const [{ count }] = await sql`SELECT COUNT(*) as count FROM leads`;

    return NextResponse.json({ leads, total: Number(count) });
  } catch (err) {
    console.error("Admin leads GET error:", err);
    return NextResponse.json({ error: "Failed to fetch leads" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  const authError = await requireAuth(request);
  if (authError) return authError;

  try {
    await ensureTables();
    const { id, status, notes } = await request.json();

    if (!id) return NextResponse.json({ error: "Lead ID required" }, { status: 400 });

    const [lead] = await sql`
      UPDATE leads
      SET status = COALESCE(${status}, status),
          updated_at = NOW()
      WHERE id = ${id}
      RETURNING *
    `;

    return NextResponse.json({ lead });
  } catch (err) {
    console.error("Admin leads PATCH error:", err);
    return NextResponse.json({ error: "Failed to update lead" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const authError = await requireAuth(request);
  if (authError) return authError;

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Lead ID required" }, { status: 400 });

    await sql`DELETE FROM leads WHERE id = ${id}`;
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Admin leads DELETE error:", err);
    return NextResponse.json({ error: "Failed to delete lead" }, { status: 500 });
  }
}
