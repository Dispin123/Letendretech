import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import LeadForm from "@/components/LeadForm";

export const metadata: Metadata = {
  title: "Letendre Tech — Managed IT & Web Development | Southeastern MA",
  description:
    "Nathan Letendre brings MSP-grade IT support and modern web development to local businesses. Serving Walpole, Middleborough, and all of SE Massachusetts.",
};

const SERVICES = [
  {
    icon: "🖥️",
    title: "Managed IT Services",
    desc: "Reliable support, monitoring, security, Microsoft 365 administration, and vendor coordination for growing local businesses.",
    href: "/services/managed-it",
  },
  {
    icon: "🌐",
    title: "Technology Assessments",
    desc: "A practical review of your technology, security, backups, vendors, and documentation with a prioritized improvement plan.",
    href: "/services/assessment",
  },
  {
    icon: "📍",
    title: "IT Projects & Remediation",
    desc: "Well-scoped network, Wi-Fi, Microsoft 365, backup, security, and technology-refresh projects.",
    href: "/services/it-projects",
  },
  {
    icon: "🔒",
    title: "Cybersecurity",
    desc: "Security assessments, endpoint protection, identity controls, firewalls, backups, and clear remediation plans.",
    href: "/services/cybersecurity",
  },
  {
    icon: "☁️",
    title: "Workflow Modernization",
    desc: "Practical improvements to intake, quoting, scheduling, approvals, field work, billing, and customer follow-up.",
    href: "/services/workflow-modernization",
  },
  {
    icon: "🛒",
    title: "Websites & Lightweight Apps",
    desc: "Fast small-business websites, lead-generation forms, client portals, and focused database-backed tools.",
    href: "/services/web-design",
  },
];

const PROCESS = [
  {
    num: "01",
    title: "Discovery Call",
    desc: "We talk through your current setup, pain points, and goals. No pressure, no upsell — just a real conversation.",
  },
  {
    num: "02",
    title: "Proposal & Scope",
    desc: "You get a clear, itemized quote. Fixed-price where possible so there are no surprises at the end.",
  },
  {
    num: "03",
    title: "Build & Deploy",
    desc: "Work starts fast. You have a direct line to Nathan throughout — no tickets bouncing between offshore teams.",
  },
  {
    num: "04",
    title: "Ongoing Support",
    desc: "When there is a good fit, ongoing support is proposed with defined service hours, responsibilities, and response targets.",
  },
];

export default function HomePage() {
  return (
    <>
      <SiteHeader />

      {/* ── HERO ───────────────────────────────────── */}
      <section className="hero">
        <div className="container">
          <div className="hero-grid">
            <div>
              <p className="hero-eyebrow">Letendre Tech — Southeastern Massachusetts</p>
              <h1>
                The Local IT Partner
                <br />
                Your Business <span className="accent">Actually Needs</span>
              </h1>
              <p className="hero-lead">
                Managed IT, cybersecurity, and modern web development — from someone who picks
                up the phone. Serving small businesses across SE Mass and Rhode Island.
              </p>
              <div className="hero-actions">
                <Link href="/contact" className="btn btn-primary">
                  Get a Free Estimate →
                </Link>
                <a href="tel:7742600259" className="btn btn-outline">
                  (774) 260-0259
                </a>
              </div>
              <div className="hero-stats">
                <div>
                  <span className="hero-stat-num">200+</span>
                  <span className="hero-stat-label">Clients Supported</span>
                </div>
                <div>
                  <span className="hero-stat-num">99.9%</span>
                  <span className="hero-stat-label">Uptime Target</span>
                </div>
                <div>
                  <span className="hero-stat-num">B.S.</span>
                  <span className="hero-stat-label">Cybersecurity</span>
                </div>
              </div>
            </div>

            <div className="hero-form-card">
              <h3>Get a Free Estimate</h3>
              <p>Response within one business day — usually same day.</p>
              <LeadForm compact />
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ───────────────────────────────── */}
      <section className="section">
        <div className="container">
          <p className="section-label">What We Do</p>
          <h2 style={{ fontSize: "clamp(28px,3vw,40px)", maxWidth: 560 }}>
            Practical technology support for local service businesses
          </h2>
          <div className="services-grid">
            {SERVICES.map((s) => (
              <div key={s.title} className="service-card">
                <div className="service-card-icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <Link href={s.href} className="service-card-link">
                  Learn more →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WORK / PORTFOLIO ───────────────────────── */}
      <section className="section section--dark">
        <div className="container">
          <p className="section-label">Recent Work</p>
          <h2 style={{ fontSize: "clamp(28px,3vw,40px)", color: "var(--white)", marginBottom: 0 }}>
            Built for real local businesses
          </h2>
          <div className="work-grid">
            <Link href="/work/jmckinnon" className="work-card" style={{ textDecoration: "none" }}>
              <div className="work-card-image">
                <span>🏡</span>
              </div>
              <div className="work-card-body">
                <p className="work-card-tag">Web Design + Lead Management</p>
                <h3>J. McKinnon Property Management</h3>
                <p>
                  Full Next.js website with admin dashboard, lead capture form, Neon PostgreSQL
                  database, and SendGrid email notifications.
                </p>
              </div>
            </Link>

            <div className="work-card">
              <div className="work-card-image">
                <span style={{ fontSize: 36, opacity: 0.4, color: "var(--slate)" }}>
                  Coming Soon
                </span>
              </div>
              <div className="work-card-body">
                <p className="work-card-tag">Your Business Here</p>
                <h3>Let&apos;s build something together</h3>
                <p>
                  Ready to launch your new website or get your IT under control?
                  Reach out to discuss a focused first project.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROCESS ────────────────────────────────── */}
      <section className="section section--navy-mid">
        <div className="container">
          <p className="section-label">How It Works</p>
          <h2 style={{ fontSize: "clamp(28px,3vw,40px)", color: "var(--white)", marginBottom: 0 }}>
            Simple, transparent, no runaround
          </h2>
          <div className="process-steps">
            {PROCESS.map((step) => (
              <div key={step.num} className="process-step">
                <div className="process-num">{step.num}</div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────── */}
      <section className="cta-section">
        <div className="container" style={{ position: "relative" }}>
          <h2>Ready to stop dealing with tech headaches?</h2>
          <p>
            Whether you need a new website, IT support, or just a second opinion on your
            current setup — let&apos;s talk. No commitment required.
          </p>
          <div className="cta-actions">
            <Link href="/contact" className="btn btn-primary">
              Get a Free Estimate →
            </Link>
            <a href="tel:7742600259" className="btn btn-outline">
              Call (774) 260-0259
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
