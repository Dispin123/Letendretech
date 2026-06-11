import { redirect } from "next/navigation";
import { getServerAuth } from "@/lib/auth";
import AdminSidebar from "@/components/AdminSidebar";
import AdminJobsClient from "./AdminJobsClient";

export const metadata = { title: "Projects — Admin" };

export default async function AdminJobsPage() {
  const auth = await getServerAuth();
  if (!auth) redirect("/admin");

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <main className="admin-main">
        <div className="admin-header">
          <h1>Projects</h1>
        </div>
        <AdminJobsClient />
      </main>
    </div>
  );
}
