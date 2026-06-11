import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

type SolutionDemo = {
  title: string;
  label: string;
  category: string;
  summary: string;
  challenge: string;
  solution: string;
  capabilities: string[];
  approaches: string[];
  stack: string[];
  emoji: string;
};

const SOLUTION_DEMOS: Record<string, SolutionDemo> = {
  "landscaping-operations": {
    emoji: "🌿",
    label: "Letendre Tech Industry Demo",
    category: "Landscaping Website + Operations Workflow",
    title: "From Website Inquiry to Scheduled Landscaping Job",
    summary:
      "A reusable solution concept for landscaping and property-service companies that need a professional website and a clearer way to manage leads, estimates, jobs, and follow-up.",
    challenge:
      "Many landscaping companies receive inquiries through calls, texts, social media, and website forms. Details get scattered, estimates are difficult to track, and owners lack a clear view of which opportunities need attention.",
    solution:
      "The concept pairs a focused lead-generation website with an operations workflow. A company can use a lightweight custom dashboard for a simple, controlled experience or use HubSpot as the backend when it needs a mature CRM, pipelines, automation, reporting, and integrations.",
    capabilities: [
      "Service-specific inquiry forms with property and project details",
      "Lead qualification and estimate-request tracking",
      "Estimate, approval, scheduling, and job-status stages",
      "Photo, note, and customer-communication history",
      "Automated confirmations and follow-up reminders",
      "Mobile-friendly access for office and field teams",
    ],
    approaches: [
      "Custom admin dashboard: focused interface, tailored workflow, and direct database ownership",
      "HubSpot backend: CRM records, deal pipelines, tasks, automation, email history, and reporting",
      "Hybrid approach: custom customer experience with HubSpot as the operational system of record",
    ],
    stack: [
      "Next.js responsive marketing site and portal",
      "HubSpot CRM or a focused PostgreSQL-backed admin dashboard",
      "Netlify hosting and serverless functions",
      "Email and workflow automation",
      "Optional QuickBooks-ready integration planning",
    ],
  },
};

export async function generateStaticParams() {
  return Object.keys(SOLUTION_DEMOS).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const demo = SOLUTION_DEMOS[slug];
  if (!demo) return {};
  return {
    title: `${demo.title} — Solution Demo`,
    description: demo.summary,
  };
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const demo = SOLUTION_DEMOS[slug];
  if (!demo) notFound();

  return (
    <>
      <SiteHeader />

      <section className="service-hero">
        <div className="container">
          <p className="section-label">Industry Solution Demo — Not Client Work</p>
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>{demo.emoji}</div>
          <h1>{demo.title}</h1>
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
            {demo.label} — {demo.category}
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
              {demo.summary}
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "48px" }}>
            <TextSection title="The Operational Problem" body={demo.challenge} />
            <TextSection title="The Solution Concept" body={demo.solution} />
            <ListSection title="Example Capabilities" items={demo.capabilities} />
            <ListSection title="Backend Options" items={demo.approaches} />

            <div>
              <h2 style={{ fontSize: "22px", marginBottom: "16px", color: "var(--navy)" }}>
                Possible Stack
              </h2>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {demo.stack.map((tech) => (
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
              Want to shape this around your business?
            </h3>
            <p style={{ color: "var(--slate)", marginBottom: "28px" }}>
              Start with paid workflow discovery, then choose the smallest system that solves
              the real operational problem.
            </p>
            <Link href="/contact" className="btn btn-primary">
              Discuss Your Workflow →
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}

function TextSection({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <h2 style={{ fontSize: "22px", marginBottom: "16px", color: "var(--navy)" }}>{title}</h2>
      <p style={{ fontSize: "16px", lineHeight: "1.75", color: "var(--text-muted)" }}>{body}</p>
    </div>
  );
}

function ListSection({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h2 style={{ fontSize: "22px", marginBottom: "20px", color: "var(--navy)" }}>{title}</h2>
      <ul className="features-list">
        {items.map((item) => (
          <li key={item} style={{ fontSize: "16px" }}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
