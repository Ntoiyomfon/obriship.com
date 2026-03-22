"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProgressStepper } from "@/components/tracking/ProgressStepper";
import { ShipmentStatusBanner } from "@/components/tracking/ShipmentStatusBanner";
import { StatusTimeline } from "@/components/tracking/StatusTimeline";
import { TrackingMap } from "@/components/tracking/TrackingMap";
import { useShipmentRealtime } from "@/hooks/useShipmentRealtime";
import { formatDateLong, statusLabel } from "@/lib/utils";
import type { ShipmentWithLogs } from "@/types/shipment";

const details = [
  {
    key: "senderName",
    label: "Sender"
  },
  {
    key: "recipientName",
    label: "Recipient"
  },
  {
    key: "serviceType",
    label: "Service"
  },
  {
    key: "weightKg",
    label: "Weight"
  },
  {
    key: "estimatedDelivery",
    label: "Estimated Delivery"
  }
] as const;

export function TrackingResultCard({
  initialShipment
}: {
  initialShipment: ShipmentWithLogs;
}) {
  const [shipment, setShipment] = useState(initialShipment);
  const [highlightLatest, setHighlightLatest] = useState(false);
  const reducedMotion = useReducedMotion();

  useShipmentRealtime({
    shipmentId: shipment.id,
    trackingId: shipment.trackingId,
    onShipment: (nextShipment) => {
      setShipment(nextShipment);
      setHighlightLatest(true);
      setTimeout(() => setHighlightLatest(false), 1200);
    }
  });

  const sectionVariant = reducedMotion
    ? undefined
    : {
        initial: { opacity: 0, y: 18 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.38, ease: "easeOut" as const }
      };

  return (
    <div className="space-y-6">
      <motion.div {...sectionVariant}>
        <ShipmentStatusBanner shipment={shipment} />
      </motion.div>
      <motion.div {...sectionVariant} transition={{ delay: 0.08, duration: 0.38, ease: "easeOut" }}>
        <ProgressStepper status={shipment.currentStatus} />
      </motion.div>
      <div className="grid gap-6 xl:grid-cols-[1.1fr,0.9fr]">
        <motion.div
          {...sectionVariant}
          transition={{ delay: 0.16, duration: 0.38, ease: "easeOut" }}
        >
          <StatusTimeline logs={shipment.statusLogs} highlightLatest={highlightLatest} />
        </motion.div>
        <motion.div
          {...sectionVariant}
          transition={{ delay: 0.24, duration: 0.38, ease: "easeOut" }}
        >
          <TrackingMap
            locationName={shipment.currentLocation}
            lat={shipment.currentLat}
            lng={shipment.currentLng}
          />
        </motion.div>
      </div>
      <motion.div
        {...sectionVariant}
        transition={{ delay: 0.32, duration: 0.38, ease: "easeOut" }}
      >
        <Card>
          <CardHeader>
            <p className="section-label">Shipment Profile</p>
            <CardTitle>Operational Summary</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {details.map((detail) => (
              <div key={detail.key} className="rounded-2xl border border-border bg-surface p-4">
                <p className="section-label">{detail.label}</p>
                <p className="mt-2 text-sm font-semibold text-ink">
                  {detail.key === "weightKg"
                    ? shipment.weightKg
                      ? `${shipment.weightKg} kg`
                      : "Not recorded"
                    : detail.key === "estimatedDelivery"
                      ? formatDateLong(shipment.estimatedDelivery)
                      : String(shipment[detail.key] ?? "Not available")}
                </p>
              </div>
            ))}
            <div className="rounded-2xl border border-border bg-surface p-4 md:col-span-2 xl:col-span-5">
              <p className="section-label">Shipment Notes</p>
              <p className="mt-2 max-w-3xl text-sm leading-7 text-muted">
                {shipment.description ??
                  `Shipment is currently marked as ${statusLabel(
                    shipment.currentStatus
                  )}. Additional package notes have not been added by the operations team yet.`}
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

