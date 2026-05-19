import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import LeadForm from "@/components/LeadForm";

export const metadata: Metadata = {
  title: "Contact & Free Estimate",
  description:
    "Get in touch with Letendre Tech for a free estimate on managed IT services, web design, or cybersecurity. Serving southeastern Massachusetts.",
};

export default function ContactPage() {
  return (
    <>
      <SiteHeader />

      <section className="service-hero">
        <div className="container">
          <p className="section-label">Get In Touch</p>
          <h1>Let&apos;s Talk About Your Tech</h1>
          <p style={{ color: "var(--slate-light)", fontSize: "18px", maxWidth: 540 }}>
            Fill out the form and Nathan will get back to you within one business day —
            usually same day. Or just call.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 480px",
              gap: "64px",
              alignItems: "start",
            }}
          >
            {/* Left: info */}
            <div>
              <h2 style={{ fontSize: "24px", marginBottom: "24px" }}>
                What to expect
              </h2>
              <ul className="features-list">
                <li>Response within 1 business day — often same day</li>
                <li>No-pressure conversation about your actual needs</li>
                <li>Fixed-price quotes so you know exactly what you&apos;re getting</li>
                <li>Direct line to Nathan throughout the entire project</li>
                <li>No offshore handoffs, no ticketing maze</li>
              </ul>

              <div style={{ marginTop: "40px" }}>
                <h3 style={{ fontSize: "16px", marginBottom: "16px", color: "var(--text-muted)" }}>
                  Prefer to reach out directly?
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <a
                    href="tel:7742600259"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      fontSize: "18px",
                      fontWeight: 600,
                      color: "var(--navy)",
                    }}
                  >
                    📞 (774) 260-0259
                  </a>
                  <a
                    href="mailto:nathan@letendretech.com"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      fontSize: "16px",
                      color: "var(--text-muted)",
                    }}
                  >
                    ✉️ nathan@letendretech.com
                  </a>
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      fontSize: "14px",
                      color: "var(--text-muted)",
                    }}
                  >
                    📍 Based in Middleborough, MA — serving SE Mass &amp; RI
                  </span>
                </div>
              </div>
            </div>

            {/* Right: form */}
            <div
              style={{
                background: "var(--navy)",
                borderRadius: "16px",
                padding: "36px",
              }}
            >
              <h2 style={{ fontSize: "20px", color: "var(--white)", marginBottom: "4px" }}>
                Free Estimate Request
              </h2>
              <p style={{ fontSize: "13px", color: "var(--slate)", marginBottom: "24px" }}>
                No commitment. Just a real conversation.
              </p>
              <LeadForm />
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
