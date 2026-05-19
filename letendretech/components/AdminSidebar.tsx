"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV_ITEMS = [
  { href: "/admin/leads", label: "Leads", icon: "📥" },
  { href: "/admin/jobs", label: "Projects", icon: "🔧" },
  { href: "/admin/images", label: "Images", icon: "🖼️" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      window.location.href = "/admin";
    } catch {
      setLoggingOut(false);
    }
  };

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-logo">
        <Link href="/" className="admin-logo-link">
          <span className="logo-mark">LT</span>
          <span className="logo-text">Letendre Tech</span>
        </Link>
        <span className="admin-badge">Admin</span>
      </div>

      <nav className="admin-nav">
        {NAV_ITEMS.map(({ href, label, icon }) => (
          <Link
            key={href}
            href={href}
            className={`admin-nav-item${pathname === href ? " active" : ""}`}
          >
            <span className="nav-icon">{icon}</span>
            <span>{label}</span>
          </Link>
        ))}
      </nav>

      <div className="admin-sidebar-footer">
        <Link href="/" className="admin-nav-item view-site">
          <span className="nav-icon">🌐</span>
          <span>View Site</span>
        </Link>
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="admin-nav-item logout-btn"
        >
          <span className="nav-icon">→</span>
          <span>{loggingOut ? "Logging out..." : "Log Out"}</span>
        </button>
      </div>
    </aside>
  );
}
