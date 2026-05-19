"use client";

import { useEffect, useState } from "react";

type Job = {
  id: number;
  client_name: string;
  project_name: string;
  description: string | null;
  status: string;
  start_date: string | null;
  end_date: string | null;
  value: number | null;
  notes: string | null;
  created_at: string;
};

const STATUS_OPTIONS = ["discovery", "proposal", "active", "on-hold", "complete", "cancelled"];

function formatDate(d: string | null) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function StatusBadge({ status }: { status: string }) {
  const cls =
    status === "active"
      ? "badge badge-active"
      : status === "complete"
      ? "badge badge-complete"
      : status === "discovery" || status === "proposal"
      ? "badge badge-new"
      : "badge badge-closed";
  return <span className={cls}>{status}</span>;
}

export default function AdminJobsClient() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [newJob, setNewJob] = useState({ client_name: "", project_name: "", description: "", status: "discovery", value: "" });
  const [saving, setSaving] = useState(false);

  const fetchJobs = async () => {
    try {
      const res = await fetch("/api/admin/jobs");
      if (!res.ok) throw new Error("Unauthorized");
      const data = await res.json();
      setJobs(data.jobs);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchJobs(); }, []);

  const createJob = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/admin/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newJob, value: newJob.value ? parseFloat(newJob.value) : null }),
      });
      if (!res.ok) throw new Error("Failed to create job");
      const data = await res.json();
      setJobs((prev) => [data.job, ...prev]);
      setShowForm(false);
      setNewJob({ client_name: "", project_name: "", description: "", status: "discovery", value: "" });
    } catch (e) {
      alert("Failed to create project");
    } finally {
      setSaving(false);
    }
  };

  const updateStatus = async (id: number, status: string) => {
    try {
      const res = await fetch("/api/admin/jobs", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (!res.ok) throw new Error();
      setJobs((prev) => prev.map((j) => (j.id === id ? { ...j, status } : j)));
    } catch {
      alert("Failed to update status");
    }
  };

  if (loading) return <div style={{ padding: "20px", color: "var(--text-muted)" }}>Loading projects...</div>;
  if (error) return <div className="form-error-banner">{error}</div>;

  const activeRevenue = jobs
    .filter((j) => j.status === "active" || j.status === "complete")
    .reduce((sum, j) => sum + (j.value || 0), 0);

  return (
    <>
      <div style={{ display: "flex", gap: "12px", marginBottom: "20px", flexWrap: "wrap", alignItems: "center" }}>
        <div style={{ padding: "16px 24px", background: "var(--white)", borderRadius: "8px", border: "1px solid var(--border)" }}>
          <div style={{ fontSize: "28px", fontWeight: 700, color: "var(--navy)" }}>{jobs.length}</div>
          <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>Total Projects</div>
        </div>
        <div style={{ padding: "16px 24px", background: "var(--white)", borderRadius: "8px", border: "1px solid var(--border)" }}>
          <div style={{ fontSize: "28px", fontWeight: 700, color: "var(--green)" }}>
            ${activeRevenue.toLocaleString()}
          </div>
          <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>Active + Complete Value</div>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn btn-primary"
          style={{ marginLeft: "auto" }}
        >
          + New Project
        </button>
      </div>

      {showForm && (
        <div style={{ background: "var(--white)", border: "1px solid var(--border)", borderRadius: "10px", padding: "24px", marginBottom: "20px" }}>
          <h3 style={{ fontSize: "16px", marginBottom: "20px" }}>New Project</h3>
          <form onSubmit={createJob} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div className="form-field" style={{}}>
              <label>Client Name *</label>
              <input type="text" required value={newJob.client_name} onChange={(e) => setNewJob(p => ({...p, client_name: e.target.value}))} style={{ background: "var(--off-white)", border: "1px solid var(--border)", color: "var(--text)", padding: "10px 14px", borderRadius: "6px", fontSize: "14px" }} />
            </div>
            <div className="form-field">
              <label>Project Name *</label>
              <input type="text" required value={newJob.project_name} onChange={(e) => setNewJob(p => ({...p, project_name: e.target.value}))} style={{ background: "var(--off-white)", border: "1px solid var(--border)", color: "var(--text)", padding: "10px 14px", borderRadius: "6px", fontSize: "14px" }} />
            </div>
            <div className="form-field">
              <label>Status</label>
              <select value={newJob.status} onChange={(e) => setNewJob(p => ({...p, status: e.target.value}))} style={{ background: "var(--off-white)", border: "1px solid var(--border)", color: "var(--text)", padding: "10px 14px", borderRadius: "6px", fontSize: "14px" }}>
                {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="form-field">
              <label>Value ($)</label>
              <input type="number" value={newJob.value} onChange={(e) => setNewJob(p => ({...p, value: e.target.value}))} placeholder="1500" style={{ background: "var(--off-white)", border: "1px solid var(--border)", color: "var(--text)", padding: "10px 14px", borderRadius: "6px", fontSize: "14px" }} />
            </div>
            <div className="form-field" style={{ gridColumn: "span 2" }}>
              <label>Description</label>
              <textarea value={newJob.description} onChange={(e) => setNewJob(p => ({...p, description: e.target.value}))} rows={2} style={{ background: "var(--off-white)", border: "1px solid var(--border)", color: "var(--text)", padding: "10px 14px", borderRadius: "6px", fontSize: "14px", resize: "vertical" }} />
            </div>
            <div style={{ gridColumn: "span 2", display: "flex", gap: "12px" }}>
              <button type="submit" disabled={saving} className="btn btn-primary">
                {saving ? "Saving..." : "Create Project"}
              </button>
              <button type="button" onClick={() => setShowForm(false)} className="btn btn-dark">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Client</th>
              <th>Project</th>
              <th>Status</th>
              <th>Value</th>
              <th>Start</th>
              <th>End</th>
            </tr>
          </thead>
          <tbody>
            {jobs.length === 0 && (
              <tr>
                <td colSpan={6} style={{ textAlign: "center", color: "var(--text-muted)", padding: "40px" }}>
                  No projects yet. Click &quot;New Project&quot; to add one.
                </td>
              </tr>
            )}
            {jobs.map((job) => (
              <tr key={job.id}>
                <td style={{ fontWeight: 600 }}>{job.client_name}</td>
                <td>
                  <div>{job.project_name}</div>
                  {job.description && (
                    <div style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "2px" }}>{job.description}</div>
                  )}
                </td>
                <td>
                  <select
                    value={job.status}
                    onChange={(e) => updateStatus(job.id, e.target.value)}
                    style={{ fontSize: "12px", padding: "4px 8px", borderRadius: "4px", border: "1px solid var(--border)", background: "var(--off-white)", cursor: "pointer" }}
                  >
                    {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </td>
                <td style={{ fontSize: "14px", fontWeight: 600 }}>
                  {job.value ? `$${Number(job.value).toLocaleString()}` : "—"}
                </td>
                <td style={{ fontSize: "13px", color: "var(--text-muted)" }}>{formatDate(job.start_date)}</td>
                <td style={{ fontSize: "13px", color: "var(--text-muted)" }}>{formatDate(job.end_date)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
