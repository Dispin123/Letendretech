import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

type CaseStudy = {
  title: string;
  client: string;
  category: string;
  summary: string;
  challenge: string;
  solution: string;
  results: string[];
  stack: string[];
  emoji: string;
};

const CASE_STUDIES: Record<string, CaseStudy> = {
  jmckinnon: {
    emoji: "🏡",
    client: "J. McKinnon Property Management",
    category: "Web Design + Lead Management System",
    title: "Full-Stack Website with Admin Dashboard",
    summary:
      "A custom Next.js website with a lead capture system, Neon PostgreSQL database, SendGrid email notifications, and a full admin dashboard — all deployed on Netlify.",
    challenge:
      "The client had no web presence and was tracking leads via email and sticky notes. They needed a professional website that could capture and manage leads from multiple property inquiry sources.",
    solution:
      "We built a full-stack Next.js 15 site using the App Router with a Neon PostgreSQL serverless database. The site includes a lead form with honeypot spam protection and a Netlify Forms fallback. Every new submission triggers a branded email notification via SendGrid. A JWT-authenticated admin dashboard lets the client view, update, and manage all incoming leads, project jobs, and site images.",
    results: [
      "Professional web presence live within 2 weeks of kickoff",
      "Lead form submissions captured directly to database — no more lost emails",
      "Admin dashboard with real-time lead management",
      "Instant email notification for every new inquiry",
      "Site scores 90+ on Google PageSpeed Insights",
      "Zero downtime since launch on Netlify",
    ],
    stack: [
      "Next.js 15 (App Router, TypeScript)",
      "Neon PostgreSQL (serverless)",
      "Netlify + @netlify/plugin-nextjs",
      "SendGrid (transactional email)",
      "JWT auth via jose + bcryptjs",
    ],
  },
};

export async function generateStaticParams() {
  return Object.keys(CASE_STUDIES).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cs = CASE_STUDIES[slug];
  if (!cs) return {};
  return {
    title: `${cs.client} — Case Study`,
    description: cs.summary,
  };
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cs = CASE_STUDIES[slug];
  if (!cs) notFound();

  return (
    <>
      <SiteHeader />

      <section className="service-hero">
        <div className="container">
          <p className="section-label">Case Study</p>
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>{cs.emoji}</div>
          <h1>{cs.title}</h1>
          <p
            style={{
              color: "var(--electric)",
              fontFamily: "var(--font-mono)",
              fontSize: "12px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginTop: "12px",
            }}
          >
            {cs.client} — {cs.category}
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: "800px" }}>
          <div
            style={{
              background: "var(--off-white)",
              borderRadius: "12px",
              padding: "32px",
              marginBottom: "48px",
              borderLeft: "4px solid var(--electric)",
            }}
          >
            <p style={{ fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>
              {cs.summary}
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "48px" }}>
            <div>
              <h2 style={{ fontSize: "22px", marginBottom: "16px", color: "var(--navy)" }}>
                The Challenge
              </h2>
              <p style={{ fontSize: "16px", lineHeight: "1.75", color: "var(--text-muted)" }}>
                {cs.challenge}
              </p>
            </div>

            <div>
              <h2 style={{ fontSize: "22px", marginBottom: "16px", color: "var(--navy)" }}>
                The Solution
              </h2>
              <p style={{ fontSize: "16px", lineHeight: "1.75", color: "var(--text-muted)" }}>
                {cs.solution}
              </p>
            </div>

            <div>
              <h2 style={{ fontSize: "22px", marginBottom: "20px", color: "var(--navy)" }}>
                Results
              </h2>
              <ul className="features-list">
                {cs.results.map((r) => (
                  <li key={r} style={{ fontSize: "16px" }}>
                    {r}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 style={{ fontSize: "22px", marginBottom: "16px", color: "var(--navy)" }}>
                Tech Stack
              </h2>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {cs.stack.map((tech) => (
                  <span
                    key={tech}
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "12px",
                      padding: "6px 12px",
                      background: "var(--navy)",
                      color: "var(--electric)",
                      borderRadius: "4px",
                      border: "1px solid rgba(0,194,203,0.2)",
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div
            style={{
              marginTop: "64px",
              textAlign: "center",
              padding: "48px",
              background: "var(--navy)",
              borderRadius: "16px",
            }}
          >
            <h3 style={{ color: "var(--white)", fontSize: "22px", marginBottom: "12px" }}>
              Want something like this?
            </h3>
            <p style={{ color: "var(--slate)", marginBottom: "28px" }}>
              We can build a similar system for your business — usually in 2–3 weeks.
            </p>
            <Link href="/contact" className="btn btn-primary">
              Get a Free Estimate →
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
