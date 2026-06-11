import { redirect } from "next/navigation";
import { getServerAuth } from "@/lib/auth";
import AdminSidebar from "@/components/AdminSidebar";
import AdminLeadsClient from "./AdminLeadsClient";

export const metadata = { title: "Leads — Admin" };

export default async function AdminLeadsPage() {
  const auth = await getServerAuth();
  if (!auth) redirect("/admin");

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <main className="admin-main">
        <div className="admin-header">
          <h1>Leads</h1>
        </div>
        <AdminLeadsClient />
      </main>
    </div>
  );
}
