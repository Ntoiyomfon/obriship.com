import { redirect } from "next/navigation";
import type { Metadata } from "next";

import { AdminLoginForm } from "@/components/admin/AdminLoginForm";
import { getAdminSession } from "@/lib/admin-auth";

export const metadata: Metadata = {
  title: "FX Logistics Admin"
};

export default async function AdminLoginPage() {
  const session = await getAdminSession();

  if (session) {
    redirect("/admin/dashboard");
  }

  return (
    <main className="hero-noise flex min-h-dvh items-center justify-center bg-[--freight-dim] px-4 py-10">
      <AdminLoginForm />
    </main>
  );
}
