"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type SiteImage = {
  id: number;
  label: string;
  url: string;
  section: string | null;
  alt_text: string | null;
  created_at: string;
};

const SECTIONS = ["hero", "services", "work", "about", "general"];

export default function AdminImagesClient() {
  const [images, setImages] = useState<SiteImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ label: "", url: "", section: "general", alt_text: "" });
  const [saving, setSaving] = useState(false);

  const fetchImages = async () => {
    try {
      const res = await fetch("/api/admin/images");
      if (!res.ok) throw new Error("Unauthorized");
      const data = await res.json();
      setImages(data.images);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to load images");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchImages(); }, []);

  const addImage = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/admin/images", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to add image");
      const data = await res.json();
      setImages((prev) => [data.image, ...prev]);
      setForm({ label: "", url: "", section: "general", alt_text: "" });
    } catch (e) {
      alert("Failed to add image");
    } finally {
      setSaving(false);
    }
  };

  const deleteImage = async (id: number) => {
    if (!confirm("Remove this image?")) return;
    try {
      const res = await fetch(`/api/admin/images?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setImages((prev) => prev.filter((img) => img.id !== id));
    } catch {
      alert("Failed to delete image");
    }
  };

  if (loading) return <div style={{ padding: "20px", color: "var(--text-muted)" }}>Loading images...</div>;
  if (error) return <div className="form-error-banner">{error}</div>;

  return (
    <>
      {/* Add image form */}
      <div style={{ background: "var(--white)", border: "1px solid var(--border)", borderRadius: "10px", padding: "24px", marginBottom: "24px" }}>
        <h3 style={{ fontSize: "16px", marginBottom: "20px" }}>Add Image by URL</h3>
        <form onSubmit={addImage} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <div className="form-field">
            <label>Label *</label>
            <input type="text" required value={form.label} onChange={(e) => setForm(p => ({...p, label: e.target.value}))} placeholder="Hero background" style={{ background: "var(--off-white)", border: "1px solid var(--border)", color: "var(--text)", padding: "10px 14px", borderRadius: "6px", fontSize: "14px" }} />
          </div>
          <div className="form-field">
            <label>Section</label>
            <select value={form.section} onChange={(e) => setForm(p => ({...p, section: e.target.value}))} style={{ background: "var(--off-white)", border: "1px solid var(--border)", color: "var(--text)", padding: "10px 14px", borderRadius: "6px", fontSize: "14px" }}>
              {SECTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="form-field" style={{ gridColumn: "span 2" }}>
            <label>Image URL *</label>
            <input type="url" required value={form.url} onChange={(e) => setForm(p => ({...p, url: e.target.value}))} placeholder="https://images.unsplash.com/photo-..." style={{ background: "var(--off-white)", border: "1px solid var(--border)", color: "var(--text)", padding: "10px 14px", borderRadius: "6px", fontSize: "14px" }} />
          </div>
          <div className="form-field">
            <label>Alt Text</label>
            <input type="text" value={form.alt_text} onChange={(e) => setForm(p => ({...p, alt_text: e.target.value}))} placeholder="Descriptive alt text" style={{ background: "var(--off-white)", border: "1px solid var(--border)", color: "var(--text)", padding: "10px 14px", borderRadius: "6px", fontSize: "14px" }} />
          </div>
          <div style={{ display: "flex", alignItems: "flex-end" }}>
            <button type="submit" disabled={saving} className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}>
              {saving ? "Adding..." : "+ Add Image"}
            </button>
          </div>
        </form>
      </div>

      {/* Image grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "16px" }}>
        {images.length === 0 && (
          <div style={{ gridColumn: "span 4", textAlign: "center", padding: "48px", color: "var(--text-muted)", background: "var(--white)", borderRadius: "10px", border: "1px solid var(--border)" }}>
            No images yet. Paste a URL above to add one.
          </div>
        )}
        {images.map((img) => (
          <div key={img.id} style={{ background: "var(--white)", border: "1px solid var(--border)", borderRadius: "10px", overflow: "hidden" }}>
            <div style={{ aspectRatio: "16/9", background: "var(--off-white)", position: "relative", overflow: "hidden" }}>
              <img
                src={img.url}
                alt={img.alt_text || img.label}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
            <div style={{ padding: "12px" }}>
              <div style={{ fontWeight: 600, fontSize: "14px", marginBottom: "4px" }}>{img.label}</div>
              <div style={{ fontSize: "11px", color: "var(--electric)", fontFamily: "var(--font-mono)", textTransform: "uppercase", marginBottom: "8px" }}>
                {img.section}
              </div>
              <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                <button
                  onClick={() => navigator.clipboard.writeText(img.url)}
                  style={{ fontSize: "11px", color: "var(--text-muted)", background: "var(--off-white)", border: "1px solid var(--border)", borderRadius: "4px", padding: "4px 8px", cursor: "pointer" }}
                >
                  Copy URL
                </button>
                <button
                  onClick={() => deleteImage(img.id)}
                  style={{ fontSize: "11px", color: "var(--red)", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: "4px", padding: "4px 8px", cursor: "pointer", marginLeft: "auto" }}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
