import { redirect } from "next/navigation";
import { getServerAuth } from "@/lib/auth";
import AdminSidebar from "@/components/AdminSidebar";
import AdminImagesClient from "./AdminImagesClient";

export const metadata = { title: "Images — Admin" };

export default async function AdminImagesPage() {
  const auth = await getServerAuth();
  if (!auth) redirect("/admin");

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <main className="admin-main">
        <div className="admin-header">
          <h1>Site Images</h1>
        </div>
        <AdminImagesClient />
      </main>
    </div>
  );
}
