import Link from "next/link";
import { notFound } from "next/navigation";

import { CreateShipmentForm } from "@/components/admin/CreateShipmentForm";
import { StatusUpdateForm } from "@/components/admin/StatusUpdateForm";
import { AdminShell } from "@/components/layout/AdminShell";
import { StatusTimeline } from "@/components/tracking/StatusTimeline";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { requireAdminSession } from "@/lib/admin-auth";
import { getShipmentById } from "@/lib/repository";
import { formatDateLong, statusLabel } from "@/lib/utils";

export default async function EditShipmentPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await requireAdminSession();
  const { id } = await params;
  const shipment = await getShipmentById(id);

  if (!shipment) {
    notFound();
  }

  return (
    <AdminShell email={session.email}>
      <div className="section-shell space-y-6 py-10 md:py-12">
        <Card className="bg-ink text-white">
          <CardHeader className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="space-y-3">
              <p className="section-label text-white/45">Shipment Edit View</p>
              <CardTitle className="text-white">{shipment.trackingId}</CardTitle>
              <p className="text-sm text-white/65">
                {shipment.senderCountry} → {shipment.recipientCountry} ·{" "}
                {statusLabel(shipment.currentStatus)}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href={`/track/${shipment.trackingId}`}>
                <Button
                  variant="secondary"
                  className="border-white/15 text-white hover:bg-white hover:text-ink"
                >
                  View Public Tracking
                </Button>
              </Link>
              <div className="rounded-full bg-white/5 px-4 py-3 font-mono text-xs uppercase tracking-[0.18em] text-white/70">
                ETA {formatDateLong(shipment.estimatedDelivery)}
              </div>
            </div>
          </CardHeader>
        </Card>
        <StatusUpdateForm shipment={shipment} />
        <div className="grid gap-6 xl:grid-cols-[0.95fr,1.05fr]">
          <CreateShipmentForm shipment={shipment} />
          <StatusTimeline logs={shipment.statusLogs} showNotes />
        </div>
        <Card>
          <CardHeader>
            <p className="section-label">Destructive Action</p>
            <CardTitle>Delete Shipment</CardTitle>
          </CardHeader>
          <CardContent>
            <form action={`/api/shipments/${shipment.id}`} method="post">
              <input type="hidden" name="_method" value="DELETE" />
              <Button variant="destructive">Delete Shipment Record</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </AdminShell>
  );
}
