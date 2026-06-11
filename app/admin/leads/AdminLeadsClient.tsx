"use client";

import { useEffect, useState } from "react";

type Lead = {
  id: number;
  name: string;
  email: string | null;
  phone: string | null;
  business_type: string | null;
  town: string | null;
  service_interest: string | null;
  message: string | null;
  status: string;
  created_at: string;
};

const STATUS_OPTIONS = ["new", "contacted", "qualified", "proposal", "closed-won", "closed-lost"];

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function StatusBadge({ status }: { status: string }) {
  const cls =
    status === "new"
      ? "badge badge-new"
      : status === "contacted"
      ? "badge badge-contacted"
      : status === "qualified"
      ? "badge badge-qualified"
      : "badge badge-closed";
  return <span className={cls}>{status}</span>;
}

export default function AdminLeadsClient() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/leads");
      if (!res.ok) throw new Error("Unauthorized");
      const data = await res.json();
      setLeads(data.leads);
      setTotal(data.total);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to load leads");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const updateStatus = async (id: number, status: string) => {
    try {
      const res = await fetch("/api/admin/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (!res.ok) throw new Error("Update failed");
      setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
    } catch (e) {
      alert("Failed to update status");
    }
  };

  if (loading) return <div style={{ padding: "20px", color: "var(--text-muted)" }}>Loading leads...</div>;
  if (error) return <div className="form-error-banner">{error}</div>;

  return (
    <>
      <div
        style={{
          display: "flex",
          gap: "12px",
          marginBottom: "20px",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            padding: "16px 24px",
            background: "var(--white)",
            borderRadius: "8px",
            border: "1px solid var(--border)",
            minWidth: "120px",
          }}
        >
          <div style={{ fontSize: "28px", fontWeight: 700, color: "var(--navy)" }}>{total}</div>
          <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>Total Leads</div>
        </div>
        <div
          style={{
            padding: "16px 24px",
            background: "var(--white)",
            borderRadius: "8px",
            border: "1px solid var(--border)",
            minWidth: "120px",
          }}
        >
          <div style={{ fontSize: "28px", fontWeight: 700, color: "var(--electric)" }}>
            {leads.filter((l) => l.status === "new").length}
          </div>
          <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>New</div>
        </div>
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Contact</th>
              <th>Business</th>
              <th>Service</th>
              <th>Status</th>
              <th>Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {leads.length === 0 && (
              <tr>
                <td colSpan={7} style={{ textAlign: "center", color: "var(--text-muted)", padding: "40px" }}>
                  No leads yet. They&apos;ll appear here when someone submits the contact form.
                </td>
              </tr>
            )}
            {leads.map((lead) => (
              <>
                <tr key={lead.id}>
                  <td style={{ fontWeight: 600 }}>{lead.name}</td>
                  <td>
                    <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                      {lead.email && (
                        <a href={`mailto:${lead.email}`} style={{ color: "var(--electric)", fontSize: "13px" }}>
                          {lead.email}
                        </a>
                      )}
                      {lead.phone && (
                        <a href={`tel:${lead.phone}`} style={{ color: "var(--text-muted)", fontSize: "12px" }}>
                          {lead.phone}
                        </a>
                      )}
                    </div>
                  </td>
                  <td style={{ fontSize: "13px" }}>
                    {lead.business_type || "—"}
                    {lead.town && (
                      <div style={{ color: "var(--text-muted)", fontSize: "12px" }}>{lead.town}</div>
                    )}
                  </td>
                  <td style={{ fontSize: "13px" }}>{lead.service_interest || "—"}</td>
                  <td>
                    <select
                      value={lead.status}
                      onChange={(e) => updateStatus(lead.id, e.target.value)}
                      style={{
                        fontSize: "12px",
                        padding: "4px 8px",
                        borderRadius: "4px",
                        border: "1px solid var(--border)",
                        background: "var(--off-white)",
                        cursor: "pointer",
                      }}
                    >
                      {STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                    {formatDate(lead.created_at)}
                  </td>
                  <td>
                    <button
                      onClick={() => setExpandedId(expandedId === lead.id ? null : lead.id)}
                      style={{
                        fontSize: "12px",
                        color: "var(--electric)",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: "4px",
                      }}
                    >
                      {expandedId === lead.id ? "▲" : "▼"}
                    </button>
                  </td>
                </tr>
                {expandedId === lead.id && (
                  <tr key={`${lead.id}-expanded`}>
                    <td
                      colSpan={7}
                      style={{
                        background: "rgba(0,194,203,0.03)",
                        padding: "16px",
                        borderBottom: "2px solid rgba(0,194,203,0.15)",
                      }}
                    >
                      {lead.message ? (
                        <div>
                          <div style={{ fontSize: "11px", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "6px" }}>
                            Message
                          </div>
                          <p style={{ fontSize: "14px", lineHeight: "1.6", whiteSpace: "pre-wrap" }}>
                            {lead.message}
                          </p>
                        </div>
                      ) : (
                        <span style={{ color: "var(--text-muted)", fontSize: "13px" }}>No message provided.</span>
                      )}
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
