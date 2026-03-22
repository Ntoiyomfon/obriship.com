import { redirect } from "next/navigation";

import { AdminLoginForm } from "@/components/admin/AdminLoginForm";
import { getAdminSession } from "@/lib/admin-auth";

export default async function AdminLoginPage() {
  const session = await getAdminSession();

  if (session) {
    redirect("/admin/dashboard");
  }

  return (
    <main className="hero-noise terminal-grid flex min-h-screen items-center justify-center bg-ink px-4 py-10">
      <AdminLoginForm />
    </main>
  );
}
