import { CreateShipmentForm } from "@/components/admin/CreateShipmentForm";
import { AdminShell } from "@/components/layout/AdminShell";
import { requireAdminSession } from "@/lib/admin-auth";

export default async function CreateShipmentPage() {
  const session = await requireAdminSession();

  return (
    <AdminShell email={session.email}>
      <div className="section-shell py-10 md:py-12">
        <CreateShipmentForm />
      </div>
    </AdminShell>
  );
}
