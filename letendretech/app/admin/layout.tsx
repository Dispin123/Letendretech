import { redirect } from "next/navigation";
import { getServerAuth } from "@/lib/auth";
import AdminSidebar from "@/components/AdminSidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // The login page itself doesn't need auth
  return <AdminLayoutInner>{children}</AdminLayoutInner>;
}

// We can't conditionally render sidebar based on path easily in a layout,
// so we use a client-side approach with the sidebar hidden on login page.
// For the actual protected pages, they check auth themselves.
function AdminLayoutInner({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
