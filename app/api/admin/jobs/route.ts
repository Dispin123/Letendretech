import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { ensureTables } from "@/lib/ensure-tables";
import { requireAuth } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const authError = await requireAuth(request);
  if (authError) return authError;

  try {
    await ensureTables();
    const jobs = await sql`SELECT * FROM jobs ORDER BY created_at DESC LIMIT 100`;
    return NextResponse.json({ jobs });
  } catch (err) {
    console.error("Admin jobs GET error:", err);
    return NextResponse.json({ error: "Failed to fetch jobs" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const authError = await requireAuth(request);
  if (authError) return authError;

  try {
    await ensureTables();
    const { client_name, project_name, description, status, start_date, end_date, value, notes, lead_id } =
      await request.json();

    if (!client_name || !project_name) {
      return NextResponse.json({ error: "Client name and project name are required" }, { status: 400 });
    }

    const [job] = await sql`
      INSERT INTO jobs (client_name, project_name, description, status, start_date, end_date, value, notes, lead_id)
      VALUES (
        ${client_name},
        ${project_name},
        ${description || null},
        ${status || "discovery"},
        ${start_date || null},
        ${end_date || null},
        ${value || null},
        ${notes || null},
        ${lead_id || null}
      )
      RETURNING *
    `;

    return NextResponse.json({ job }, { status: 201 });
  } catch (err) {
    console.error("Admin jobs POST error:", err);
    return NextResponse.json({ error: "Failed to create job" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  const authError = await requireAuth(request);
  if (authError) return authError;

  try {
    await ensureTables();
    const { id, client_name, project_name, description, status, start_date, end_date, value, notes } =
      await request.json();

    if (!id) return NextResponse.json({ error: "Job ID required" }, { status: 400 });

    const [job] = await sql`
      UPDATE jobs
      SET client_name  = COALESCE(${client_name}, client_name),
          project_name = COALESCE(${project_name}, project_name),
          description  = COALESCE(${description}, description),
          status       = COALESCE(${status}, status),
          start_date   = COALESCE(${start_date}, start_date),
          end_date     = COALESCE(${end_date}, end_date),
          value        = COALESCE(${value}, value),
          notes        = COALESCE(${notes}, notes),
          updated_at   = NOW()
      WHERE id = ${id}
      RETURNING *
    `;

    return NextResponse.json({ job });
  } catch (err) {
    console.error("Admin jobs PATCH error:", err);
    return NextResponse.json({ error: "Failed to update job" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const authError = await requireAuth(request);
  if (authError) return authError;

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Job ID required" }, { status: 400 });

    await sql`DELETE FROM jobs WHERE id = ${id}`;
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Admin jobs DELETE error:", err);
    return NextResponse.json({ error: "Failed to delete job" }, { status: 500 });
  }
}
