import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import LeadForm from "@/components/LeadForm";

type ServiceSlug = "managed-it" | "web-design" | "local-seo" | "cybersecurity" | "ecommerce" | "maintenance";

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
    subtitle: "Proactive IT support for 1–50 seat businesses. No more break-fix chaos.",
    description:
      "With over 200 clients managed at a real MSP, Nathan brings enterprise-grade processes to small business budgets. RMM monitoring, patch management, help desk, and network support — all under one predictable monthly fee.",
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
      "Quarterly security and performance audits",
    ],
    pricing: "Starting at $49/seat/month",
    pricingNote: "Minimum 5 seats. Fixed monthly pricing — no surprise invoices.",
  },
  "web-design": {
    emoji: "🌐",
    title: "Web Design & Development",
    subtitle: "Fast, modern websites built on Next.js. Not WordPress templates.",
    description:
      "Local businesses deserve websites that actually work — fast, visible on Google, and built to convert visitors into calls and leads. Every site includes lead capture, admin dashboard access, and hosting setup.",
    features: [
      "Custom design — no templates, no page builders",
      "Built on Next.js 15 — fast, SEO-friendly, scalable",
      "Lead capture forms connected to a real database",
      "Admin dashboard to manage leads and content",
      "Mobile-responsive and accessible",
      "Google-optimized structure from day one",
      "Netlify hosting setup and configuration",
      "SendGrid email notifications for new leads",
      "Domain and DNS configuration",
      "30-day post-launch support included",
    ],
    pricing: "Starting at $1,500",
    pricingNote: "Simple brochure sites to full web apps. Maintenance plans available.",
  },
  "local-seo": {
    emoji: "📍",
    title: "Local SEO",
    subtitle: "Get found by customers in your town — not buried on page 5.",
    description:
      "Most local businesses are invisible online because their Google Business Profile is incomplete, their website isn't structured for local search, and they have zero citations. We fix all three.",
    features: [
      "Google Business Profile setup and full optimization",
      "Local keyword research specific to your service area",
      "On-page SEO — title tags, headings, schema markup",
      "NAP (Name, Address, Phone) consistency audit and fix",
      "Local citation building across 40+ directories",
      "Competitor analysis and gap identification",
      "Monthly reporting on rankings and visibility",
      "Review generation strategy and response templates",
    ],
    pricing: "Starting at $300/month",
    pricingNote: "6-month minimum recommended for meaningful results.",
  },
  "cybersecurity": {
    emoji: "🔒",
    title: "Cybersecurity",
    subtitle: "Real security for real businesses — not just checkbox compliance.",
    description:
      "With a B.S. in Cybersecurity and hands-on experience with HIPAA-adjacent environments, Nathan brings structured security practices to small business budgets. From firewall rules to full security plans.",
    features: [
      "SonicWall firewall deployment and rule configuration",
      "VPN setup for secure remote access",
      "HIPAA-aware practices for healthcare adjacent businesses",
      "Vulnerability assessments and remediation planning",
      "Access controls and user permission audits",
      "Security awareness training for staff",
      "Incident response planning",
      "DKIM, DMARC, SPF email authentication setup",
      "Endpoint protection deployment and management",
      "Written security plan documentation",
    ],
    pricing: "Starting at $750 for assessment",
    pricingNote: "Ongoing monitoring plans available. HIPAA gap analysis available.",
  },
  "ecommerce": {
    emoji: "🛒",
    title: "E-Commerce Development",
    subtitle: "Sell online without paying for features you don't need.",
    description:
      "Whether you need a simple online store added to your existing site or a full e-commerce platform, we build it to fit your actual workflow — not the other way around.",
    features: [
      "Custom Next.js + Stripe integration for full control",
      "Shopify store setup and customization",
      "Product catalog setup and management training",
      "Inventory and order management integration",
      "Local pickup / delivery options",
      "Mobile-optimized checkout flow",
      "Email receipt and notification setup",
      "Google Shopping / local product listings",
      "Analytics and conversion tracking setup",
    ],
    pricing: "Starting at $2,500",
    pricingNote: "Pricing depends on catalog size and complexity.",
  },
  "maintenance": {
    emoji: "🔧",
    title: "Website Maintenance Plans",
    subtitle: "Your site stays fast, secure, and updated — without you thinking about it.",
    description:
      "A website is not a one-time project. Plugins go out of date, content needs updating, and things break. Our maintenance plans keep everything running smoothly.",
    features: [
      "Monthly security updates and patches",
      "Uptime monitoring with instant alerts",
      "Monthly performance check and optimization",
      "Content updates (up to 2 hours/month)",
      "Database backups with 30-day retention",
      "Priority support response (next business day)",
      "Monthly report on traffic, leads, and site health",
    ],
    pricing: "Starting at $99/month",
    pricingNote: "Includes hosting cost for Netlify-hosted sites.",
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
