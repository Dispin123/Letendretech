import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { ensureTables } from "@/lib/ensure-tables";
import { sendLeadNotification } from "@/lib/sendgrid";

export async function POST(request: NextRequest) {
  try {
    await ensureTables();

    const body = await request.json();

    // Honeypot check — bots fill this field, humans don't
    if (body._gotcha || body.website) {
      // Silently return success to confuse bots
      return NextResponse.json({ success: true });
    }

    // Validate required fields
    const name = (body.name || "").trim();
    const email = (body.email || "").trim();

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address" }, { status: 400 });
    }

    const phone = (body.phone || "").trim() || null;
    const business_type = (body.business_type || "").trim() || null;
    const town = (body.town || "").trim() || null;
    const service_interest = (body.service_interest || "").trim() || null;
    const message = (body.message || "").trim() || null;

    const [lead] = await sql`
      INSERT INTO leads (name, email, phone, business_type, town, service_interest, message)
      VALUES (${name}, ${email}, ${phone}, ${business_type}, ${town}, ${service_interest}, ${message})
      RETURNING *
    `;

    // Send email notification (non-blocking — don't fail the response if email fails)
    try {
      await sendLeadNotification({ name, email, phone, business_type, town, service_interest, message });
    } catch (emailErr) {
      console.error("Lead email notification failed:", emailErr);
      // Lead is saved — email failure is logged but not fatal
    }

    return NextResponse.json({ success: true, id: lead.id });
  } catch (err) {
    console.error("Lead submission error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again or call us directly." },
      { status: 500 }
    );
  }
}
