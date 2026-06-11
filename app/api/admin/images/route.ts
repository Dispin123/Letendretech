import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { ensureTables } from "@/lib/ensure-tables";
import { requireAuth } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const authError = await requireAuth(request);
  if (authError) return authError;

  try {
    await ensureTables();
    const images = await sql`SELECT * FROM site_images ORDER BY created_at DESC`;
    return NextResponse.json({ images });
  } catch (err) {
    console.error("Admin images GET error:", err);
    return NextResponse.json({ error: "Failed to fetch images" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const authError = await requireAuth(request);
  if (authError) return authError;

  try {
    await ensureTables();
    const { label, url, section, alt_text } = await request.json();

    if (!label || !url) {
      return NextResponse.json({ error: "Label and URL are required" }, { status: 400 });
    }

    const [image] = await sql`
      INSERT INTO site_images (label, url, section, alt_text)
      VALUES (${label}, ${url}, ${section || null}, ${alt_text || null})
      RETURNING *
    `;

    return NextResponse.json({ image }, { status: 201 });
  } catch (err) {
    console.error("Admin images POST error:", err);
    return NextResponse.json({ error: "Failed to add image" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const authError = await requireAuth(request);
  if (authError) return authError;

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Image ID required" }, { status: 400 });

    await sql`DELETE FROM site_images WHERE id = ${id}`;
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Admin images DELETE error:", err);
    return NextResponse.json({ error: "Failed to delete image" }, { status: 500 });
  }
}
