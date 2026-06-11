export interface LeadEmailData {
  name: string;
  email?: string | null;
  phone?: string | null;
  business_type?: string | null;
  town?: string | null;
  service_interest?: string | null;
  message?: string | null;
}

export async function sendLeadNotification(lead: LeadEmailData): Promise<void> {
  const apiKey = process.env.SENDGRID_API_KEY;
  const fromEmail = process.env.SENDGRID_FROM_EMAIL;
  const ownerEmail = process.env.OWNER_EMAIL;

  if (!apiKey || !fromEmail || !ownerEmail) {
    console.warn("SendGrid environment variables not fully configured — skipping email");
    return;
  }

  const html = `
    <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #0d1b2a; color: #e2e8f0; border-radius: 12px; overflow: hidden;">
      <div style="background: linear-gradient(135deg, #1b4f8a, #00c2cb); padding: 32px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 24px; letter-spacing: 0.05em;">LETENDRE TECH</h1>
        <p style="color: rgba(255,255,255,0.8); margin: 8px 0 0;">New Lead Received</p>
      </div>
      <div style="padding: 32px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1); color: #00c2cb; font-weight: 600; width: 140px;">Name</td><td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">${lead.name}</td></tr>
          ${lead.email ? `<tr><td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1); color: #00c2cb; font-weight: 600;">Email</td><td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1);"><a href="mailto:${lead.email}" style="color: #00c2cb;">${lead.email}</a></td></tr>` : ""}
          ${lead.phone ? `<tr><td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1); color: #00c2cb; font-weight: 600;">Phone</td><td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">${lead.phone}</td></tr>` : ""}
          ${lead.business_type ? `<tr><td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1); color: #00c2cb; font-weight: 600;">Business</td><td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">${lead.business_type}</td></tr>` : ""}
          ${lead.town ? `<tr><td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1); color: #00c2cb; font-weight: 600;">Town</td><td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">${lead.town}</td></tr>` : ""}
          ${lead.service_interest ? `<tr><td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1); color: #00c2cb; font-weight: 600;">Service</td><td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">${lead.service_interest}</td></tr>` : ""}
        </table>
        ${lead.message ? `<div style="margin-top: 24px; padding: 20px; background: rgba(255,255,255,0.05); border-radius: 8px; border-left: 4px solid #00c2cb;"><p style="margin: 0 0 8px; color: #00c2cb; font-weight: 600;">Message</p><p style="margin: 0; line-height: 1.6;">${lead.message.replace(/\n/g, "<br>")}</p></div>` : ""}
        <div style="margin-top: 32px; text-align: center;">
          <a href="${process.env.NEXT_PUBLIC_SITE_URL}/admin/leads" style="display: inline-block; padding: 14px 28px; background: linear-gradient(135deg, #1b4f8a, #00c2cb); color: white; text-decoration: none; border-radius: 8px; font-weight: 600;">View in Admin Dashboard →</a>
        </div>
      </div>
    </div>
  `;

  const body = {
    personalizations: [{ to: [{ email: ownerEmail }] }],
    from: { email: fromEmail, name: "Letendre Tech" },
    subject: `New Lead: ${lead.name}${lead.service_interest ? ` — ${lead.service_interest}` : ""}`,
    content: [{ type: "text/html", value: html }],
  };

  const res = await fetch("https://api.sendgrid.com/v3/mail/send", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("SendGrid error:", res.status, text);
    throw new Error(`SendGrid failed: ${res.status}`);
  }
}
