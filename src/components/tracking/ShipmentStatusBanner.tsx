import { Badge } from "@/components/ui/badge";
import { formatDateLong, statusBannerClassName, statusLabel } from "@/lib/utils";
import type { Shipment } from "@/types/shipment";

export function ShipmentStatusBanner({ shipment }: { shipment: Shipment }) {
  return (
    <section
      className={`rounded-[2rem] border p-6 md:p-8 ${statusBannerClassName(shipment.currentStatus)}`}
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="space-y-3">
          <p className="section-label">Current Shipment Status</p>
          <h1 className="font-display text-3xl font-extrabold uppercase tracking-[-0.04em] md:text-5xl">
            {statusLabel(shipment.currentStatus)}
          </h1>
          <Badge className="w-fit bg-black/10 text-current">
            {shipment.trackingId}
          </Badge>
        </div>
        <div className="space-y-1 md:text-right">
          <p className="section-label">Estimated Delivery</p>
          <p className="text-xl font-semibold">{formatDateLong(shipment.estimatedDelivery)}</p>
          <p className="text-sm text-current/70">
            {shipment.currentLocation ?? "Location to be confirmed"}
          </p>
        </div>
      </div>
    </section>
  );
}
