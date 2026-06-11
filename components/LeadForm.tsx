"use client";

import { useState } from "react";

interface LeadFormProps {
  compact?: boolean;
  defaultService?: string;
  onSuccess?: () => void;
}

const SERVICE_OPTIONS = [
  "Technology Assessment",
  "Managed IT Services",
  "IT Projects & Remediation",
  "Cybersecurity Assessment",
  "Workflow Modernization",
  "Websites & Lightweight Apps",
  "Coordinated Cabling / Electrical",
  "Other",
];

export default function LeadForm({ compact = false, defaultService, onSuccess }: LeadFormProps) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    business_type: "",
    town: "",
    service_interest: defaultService || "",
    message: "",
    _gotcha: "", // honeypot
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    // Client-side validation
    if (!form.name.trim()) {
      setErrorMessage("Please enter your name.");
      setStatus("error");
      return;
    }
    if (!form.email.trim()) {
      setErrorMessage("Please enter your email address.");
      setStatus("error");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setErrorMessage("Please enter a valid email address.");
      setStatus("error");
      return;
    }

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Submission failed. Please try again.");
      }

      setStatus("success");
      onSuccess?.();
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Something went wrong. Please call us directly at (774) 260-0259.";
      setErrorMessage(message);
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="lead-form-success">
        <div className="success-icon">✓</div>
        <h3>Message received!</h3>
        <p>
          Thanks for reaching out. Nathan will get back to you within one business day —
          usually much sooner.
        </p>
        <p className="success-phone">
          Need something urgent? Call{" "}
          <a href="tel:7742600259">(774) 260-0259</a>
        </p>
      </div>
    );
  }

  return (
    <form
      className={`lead-form${compact ? " lead-form--compact" : ""}`}
      onSubmit={handleSubmit}
      // Netlify Forms fallback
      data-netlify="true"
      name="contact"
      netlify-honeypot="_gotcha"
    >
      {/* Hidden netlify form name */}
      <input type="hidden" name="form-name" value="contact" />

      {/* Honeypot — hidden from humans, bots fill it */}
      <div style={{ display: "none" }} aria-hidden="true">
        <label>
          Don&apos;t fill this out:
          <input name="_gotcha" value={form._gotcha} onChange={handleChange} tabIndex={-1} />
        </label>
      </div>

      {/* Error banner */}
      {status === "error" && errorMessage && (
        <div className="form-error-banner" role="alert">
          <span>⚠</span> {errorMessage}
        </div>
      )}

      <div className={compact ? "form-grid-2" : "form-grid-2"}>
        <div className="form-field">
          <label htmlFor="name">
            Name <span className="required">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            placeholder="Jane Smith"
            required
            autoComplete="name"
          />
        </div>

        <div className="form-field">
          <label htmlFor="email">
            Email <span className="required">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="jane@yourbusiness.com"
            required
            autoComplete="email"
          />
        </div>

        <div className="form-field">
          <label htmlFor="phone">Phone <span className="optional">(optional)</span></label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            placeholder="(508) 555-0100"
            autoComplete="tel"
          />
        </div>

        <div className="form-field">
          <label htmlFor="town">Town / City</label>
          <input
            id="town"
            name="town"
            type="text"
            value={form.town}
            onChange={handleChange}
            placeholder="Walpole, MA"
          />
        </div>

        <div className="form-field">
          <label htmlFor="business_type">Type of Business</label>
          <input
            id="business_type"
            name="business_type"
            type="text"
            value={form.business_type}
            onChange={handleChange}
            placeholder="Restaurant, law firm, retail..."
          />
        </div>

        <div className="form-field">
          <label htmlFor="service_interest">Service Interested In</label>
          <select
            id="service_interest"
            name="service_interest"
            value={form.service_interest}
            onChange={handleChange}
          >
            <option value="">Select a service...</option>
            {SERVICE_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      {!compact && (
        <div className="form-field">
          <label htmlFor="message">Tell us about your project</label>
          <textarea
            id="message"
            name="message"
            value={form.message}
            onChange={handleChange}
            rows={4}
            placeholder="What are you trying to accomplish? Any specific challenges or timeline?"
          />
        </div>
      )}

      <button
        type="submit"
        className="btn-submit"
        disabled={status === "loading"}
      >
        {status === "loading" ? (
          <>
            <span className="spinner" /> Sending...
          </>
        ) : (
          "Get a Free Estimate →"
        )}
      </button>

      <p className="form-footnote">
        No spam. No commitment. Just a real conversation about your needs.
      </p>
    </form>
  );
}
