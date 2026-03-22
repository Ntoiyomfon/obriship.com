import { ShipmentTable } from "@/components/admin/ShipmentTable";
import { AdminShell } from "@/components/layout/AdminShell";
import { requireAdminSession } from "@/lib/admin-auth";
import { listShipments } from "@/lib/repository";

export default async function AdminDashboardPage({
  searchParams
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const session = await requireAdminSession();
  const params = await searchParams;
  const query = typeof params.query === "string" ? params.query : "";
  const status = typeof params.status === "string" ? params.status : "ALL";
  const page = typeof params.page === "string" ? Number(params.page) : 1;
  const response = await listShipments({
    query,
    status: status as never,
    page: Number.isFinite(page) && page > 0 ? page : 1
  });

  return (
    <AdminShell email={session.email}>
      <div className="section-shell space-y-6 py-10 md:py-12">
        <div className="space-y-2">
          <p className="section-label">Shipment Operations</p>
          <h1 className="font-display text-headline font-extrabold text-ink">Overview</h1>
        </div>
        <ShipmentTable response={response} query={query} status={status} />
      </div>
    </AdminShell>
  );
}
