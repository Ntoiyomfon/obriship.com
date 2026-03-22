"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProgressStepper } from "@/components/tracking/ProgressStepper";
import { ShipmentStatusBanner } from "@/components/tracking/ShipmentStatusBanner";
import { StatusTimeline } from "@/components/tracking/StatusTimeline";
import { TrackingMap } from "@/components/tracking/TrackingMap";
import { useShipmentRealtime } from "@/hooks/useShipmentRealtime";
import { formatDateLong } from "@/lib/utils";
import type { ShipmentWithLogs } from "@/types/shipment";

const details = [
  {
    key: "serviceType",
    label: "Service Type"
  },
  {
    key: "senderCountry",
    label: "Origin Country"
  },
  {
    key: "recipientCountry",
    label: "Destination Country"
  },
  {
    key: "weightKg",
    label: "Weight"
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
      <motion.div
        {...sectionVariant}
        transition={{ delay: 0.08, duration: 0.38, ease: "easeOut" }}
      >
        <ProgressStepper status={shipment.currentStatus} />
      </motion.div>
      <div className="grid gap-6 md:grid-cols-1 xl:grid-cols-[1.1fr,0.9fr]">
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
            <p className="section-label">Shipment Details</p>
            <CardTitle>Delivery Information</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {details.map((detail) => (
              <div key={detail.key} className="rounded-2xl border border-border bg-surface p-4">
                <p className="section-label">{detail.label}</p>
                <p className="mt-2 text-sm font-semibold text-ink">
                  {detail.key === "weightKg"
                    ? shipment.weightKg
                      ? `${shipment.weightKg} kg`
                      : "To be confirmed"
                    : String(shipment[detail.key] ?? "To be confirmed")}
                </p>
              </div>
            ))}
            <div className="rounded-2xl border border-border bg-surface p-4 md:col-span-2 xl:col-span-4">
              <p className="section-label">Estimated Delivery</p>
              <p className="mt-2 text-sm font-semibold text-ink">
                {formatDateLong(shipment.estimatedDelivery)}
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
