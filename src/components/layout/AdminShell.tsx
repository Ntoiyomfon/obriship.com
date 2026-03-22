import { AdminSidebar } from "@/components/layout/AdminSidebar";

export function AdminShell({
  email,
  children
}: {
  email: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <AdminSidebar email={email} />
      <main className="min-w-0 flex-1 bg-surface">{children}</main>
    </div>
  );
}

