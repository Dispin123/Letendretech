import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import LeadForm from "@/components/LeadForm";

type ServiceSlug =
  | "managed-it"
  | "assessment"
  | "it-projects"
  | "cybersecurity"
  | "workflow-modernization"
  | "web-design";

const SERVICES: Record<ServiceSlug, {
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  pricing: string;
  pricingNote: string;
  emoji: string;
}> = {
  "managed-it": {
    emoji: "🖥️",
    title: "Managed IT Services",
    subtitle: "Proactive IT support for growing local businesses without internal IT staff.",
    description:
      "Letendre Tech provides one accountable local relationship for day-to-day support, security, Microsoft 365 administration, documentation, and vendor coordination.",
    features: [
      "Remote monitoring & management (RMM) via N-Able or similar",
      "Proactive patch management — servers, workstations, network gear",
      "Help desk support via phone, email, and remote session",
      "SonicWall firewall deployment and management",
      "VPN setup and remote access configuration",
      "Microsoft 365 administration and support",
      "Endpoint Detection & Response (EDR) / antivirus management",
      "Backup solution setup and monitoring (cloud + local)",
      "Network documentation you can actually use",
      "Regular service reviews and practical improvement planning",
    ],
    pricing: "Planning baseline: approximately $150/user/month",
    pricingNote: "Best fit is generally 5–25 users. Final pricing depends on environment, included tools, locations, risk, and support needs. Onboarding is quoted separately.",
  },
  "web-design": {
    emoji: "🌐",
    title: "Web Design & Development",
    subtitle: "Focused websites and lightweight apps built around a clear business goal.",
    description:
      "Letendre Tech builds fast small-business marketing websites, lead-generation forms, client portals, and focused database-backed tools with a defined scope.",
    features: [
      "Template-based or custom design based on the approved scope",
      "Built on Next.js 15 — fast, SEO-friendly, scalable",
      "Lead capture forms connected to a real database",
      "Optional lead-management or admin capabilities",
      "Mobile-responsive and accessible",
      "Google-optimized structure from day one",
      "Netlify hosting setup and configuration",
      "SendGrid email notifications for new leads",
      "Domain and DNS configuration",
      "Launch support and ongoing care scoped explicitly",
    ],
    pricing: "Template-based marketing websites: $2,500–$5,000",
    pricingNote: "Custom workflows and database-backed tools are priced after paid discovery. Revisions, content, integrations, hosting, and ongoing care are scoped explicitly.",
  },
  "assessment": {
    emoji: "📋",
    title: "Technology Assessment",
    subtitle: "A practical starting point for improving reliability, security, and operations.",
    description:
      "A paid assessment creates a clear picture of your current environment and a prioritized plan before larger projects or ongoing service begin.",
    features: [
      "Stakeholder discovery",
      "High-level review of users, devices, Microsoft 365, network, security, and backups",
      "Vendor and documentation review",
      "Risk and opportunity summary",
      "Prioritized recommendations and budget ranges",
      "Managed-service suitability review",
    ],
    pricing: "$750–$1,500",
    pricingNote: "Final price depends on business size, locations, environment, and assessment scope.",
  },
  "cybersecurity": {
    emoji: "🔒",
    title: "Cybersecurity",
    subtitle: "Real security for real businesses — not just checkbox compliance.",
    description:
      "Security work is grounded in practical risk reduction, clear documentation, and improvements that fit the business environment.",
    features: [
      "SonicWall firewall deployment and rule configuration",
      "VPN setup for secure remote access",
      "Vulnerability assessments and remediation planning",
      "Access controls and user permission audits",
      "Security awareness training for staff",
      "Incident response planning",
      "DKIM, DMARC, SPF email authentication setup",
      "Endpoint protection deployment and management",
      "Security documentation and recovery planning",
    ],
    pricing: "Assessments typically $750–$1,500",
    pricingNote: "Remediation and ongoing monitoring are quoted separately based on approved scope.",
  },
  "workflow-modernization": {
    emoji: "⚙️",
    title: "Workflow Modernization",
    subtitle: "Reduce duplicate entry and make everyday work easier to manage.",
    description:
      "Letendre Tech maps the current process, identifies practical improvements, and designs a clearer workflow before implementation begins.",
    features: [
      "Customer intake and sales pipeline design",
      "HubSpot CRM configuration",
      "Quote, approval, scheduling, field-work, and billing workflows",
      "QuickBooks-ready data and integration preparation",
      "Forms, portals, lightweight databases, and approval processes",
      "Clear implementation scope and testing plan",
    ],
    pricing: "Paid discovery and workflow design: $1,500–$3,000",
    pricingNote: "Implementation, complex integrations, and ongoing administration are proposed separately after discovery.",
  },
  "it-projects": {
    emoji: "🛠️",
    title: "IT Projects & Remediation",
    subtitle: "Defined projects that improve reliability, security, and day-to-day operations.",
    description:
      "From network improvements to Microsoft 365 and backup projects, work is scoped clearly with assumptions, exclusions, and written approval.",
    features: [
      "Network, firewall, Wi-Fi, and VPN improvements",
      "Microsoft 365 setup, migrations, and security improvements",
      "Endpoint standardization and cleanup",
      "Backup and recovery implementation",
      "New-office and technology-refresh projects",
      "Documentation and vendor-consolidation projects",
    ],
    pricing: "Approximately $150/hour or a fixed-price proposal",
    pricingNote: "Remote engagements generally have a two-hour minimum; onsite engagements generally have a four-hour minimum. Scheduled projects typically require a 50% deposit.",
  },
};

export async function generateStaticParams() {
  return Object.keys(SERVICES).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES[slug as ServiceSlug];
  if (!service) return {};
  return {
    title: service.title,
    description: service.subtitle,
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = SERVICES[slug as ServiceSlug];
  if (!service) notFound();

  return (
    <>
      <SiteHeader />

      <section className="service-hero">
        <div className="container">
          <p className="section-label">Services</p>
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>{service.emoji}</div>
          <h1>{service.title}</h1>
          <p style={{ color: "var(--slate-light)", fontSize: "18px", marginTop: "12px" }}>
            {service.subtitle}
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 400px",
              gap: "64px",
              alignItems: "start",
            }}
          >
            <div>
              <p
                style={{
                  fontSize: "17px",
                  color: "var(--text-muted)",
                  lineHeight: "1.7",
                  marginBottom: "32px",
                }}
              >
                {service.description}
              </p>

              <h2 style={{ fontSize: "20px", marginBottom: "20px" }}>What&apos;s Included</h2>
              <ul className="features-list">
                {service.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>

              <div
                style={{
                  marginTop: "40px",
                  padding: "24px",
                  background: "var(--off-white)",
                  borderRadius: "12px",
                  border: "1px solid var(--border)",
                }}
              >
                <div style={{ fontSize: "24px", fontWeight: 700, color: "var(--navy)" }}>
                  {service.pricing}
                </div>
                <div
                  style={{ fontSize: "14px", color: "var(--text-muted)", marginTop: "6px" }}
                >
                  {service.pricingNote}
                </div>
                <Link
                  href="/contact"
                  className="btn btn-primary"
                  style={{ marginTop: "20px" }}
                >
                  Get a Free Estimate →
                </Link>
              </div>
            </div>

            <div
              style={{
                background: "var(--navy)",
                borderRadius: "16px",
                padding: "32px",
                position: "sticky",
                top: "88px",
              }}
            >
              <h3 style={{ color: "var(--white)", marginBottom: "4px", fontSize: "18px" }}>
                Request a Quote
              </h3>
              <p style={{ color: "var(--slate)", fontSize: "13px", marginBottom: "24px" }}>
                Tell us about your project — no commitment.
              </p>
              <LeadForm compact defaultService={service.title} />
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
