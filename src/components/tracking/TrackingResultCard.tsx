"use client";

import { useState } from "react";

import { TrackingMap } from "@/components/tracking/TrackingMap";
import { TrackingTimeline } from "@/components/tracking/TrackingTimeline";
import { useShipmentRealtime } from "@/hooks/useShipmentRealtime";
import { formatDateLong } from "@/lib/utils";
import type { ShipmentWithLogs } from "@/types/shipment";

function badgeClass(status: string) {
  if (status === "DELIVERED") return "bg-green-50 text-[--success] border-green-200";
  if (status === "EXCEPTION") return "bg-red-50 text-[--error] border-red-200";
  return "bg-amber-50 text-[--warning] border-amber-200";
}

export function TrackingResultCard({ initialShipment }: { initialShipment: ShipmentWithLogs }) {
  const [shipment, setShipment] = useState(initialShipment);

  useShipmentRealtime({
    shipmentId: shipment.id,
    trackingId: shipment.trackingId,
    onShipment: setShipment
  });

  const route = shipment.statusLogs
    .filter((log) => log.lat !== null && log.lng !== null)
    .map((log) => [log.lat!, log.lng!] as [number, number])
    .reverse();

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,0.6fr)_minmax(340px,0.4fr)]">
      <div className="space-y-6">
        <section className="surface-card p-5 md:p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="font-mono text-mono text-[--ink-muted]">{shipment.trackingId}</p>
              <h1 className="mt-3 font-display text-headline text-[--ink]">
                {formatDateLong(shipment.estimatedDelivery)}
              </h1>
              <p className="mt-2 text-small text-[--ink-muted]">Estimated delivery</p>
            </div>
            <span className={`rounded-xl border px-3 py-1 text-xs font-semibold capitalize ${badgeClass(shipment.currentStatus)}`}>
              {shipment.currentStatus.replaceAll("_", " ").toLowerCase()}
            </span>
          </div>
        </section>

        <section className="surface-card p-5 md:p-6">
          <h2 className="font-display text-title text-[--ink]">Checkpoint Timeline</h2>
          <div className="mt-6">
            <TrackingTimeline logs={shipment.statusLogs} />
          </div>
        </section>

        <section className="surface-card p-5 md:p-6">
          <h2 className="font-display text-title text-[--ink]">Package Details</h2>
          <dl className="mt-5 grid gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-small text-[--ink-muted]">Weight</dt>
              <dd className="font-mono text-mono text-[--ink]">{shipment.weightKg ? `${shipment.weightKg} kg` : "To be confirmed"}</dd>
            </div>
            <div>
              <dt className="text-small text-[--ink-muted]">Dimensions</dt>
              <dd className="font-mono text-mono text-[--ink]">Pending scan</dd>
            </div>
            <div>
              <dt className="text-small text-[--ink-muted]">Origin to destination</dt>
              <dd className="font-mono text-mono text-[--ink]">
                {shipment.senderCountry} - {shipment.recipientCountry}
              </dd>
            </div>
            <div>
              <dt className="text-small text-[--ink-muted]">Carrier</dt>
              <dd className="font-mono text-mono text-[--ink]">
                FX Logistics · {shipment.serviceType.charAt(0).toUpperCase() + shipment.serviceType.slice(1).toLowerCase()}
            </dd>
            </div>
          </dl>
        </section>
      </div>
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <TrackingMap
          locationName={shipment.currentLocation}
          lat={shipment.currentLat}
          lng={shipment.currentLng}
          route={route}
        />
      </aside>
    </div>
  );
}
