"use client";

import {
  AlertTriangle,
  Box,
  CircleDashed,
  PackageCheck,
  ShieldCheck,
  Truck
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { Badge } from "@/components/ui/badge";
import { cn, formatDateTimeUtc, statusBadgeClassName, statusLabel } from "@/lib/utils";
import type { ShipmentStatus, StatusLog } from "@/types/shipment";

function getStatusIcon(status: ShipmentStatus) {
  switch (status) {
    case "ORDER_PLACED":
      return Box;
    case "PICKED_UP":
      return PackageCheck;
    case "IN_TRANSIT":
      return Truck;
    case "CUSTOMS_CLEARANCE":
      return ShieldCheck;
    case "OUT_FOR_DELIVERY":
      return Truck;
    case "DELIVERED":
      return PackageCheck;
    case "EXCEPTION":
      return AlertTriangle;
    default:
      return CircleDashed;
  }
}

export function StatusTimeline({
  logs,
  highlightLatest = false
}: {
  logs: StatusLog[];
  highlightLatest?: boolean;
}) {
  const reducedMotion = useReducedMotion();

  return (
    <section className="surface-card p-6">
      <div className="mb-6 space-y-2">
        <p className="section-label">Timeline</p>
        <h2 className="font-display text-title font-bold text-ink">Status History</h2>
      </div>
      <div className="space-y-0">
        {logs.map((log, index) => {
          const Icon = getStatusIcon(log.status);

          return (
            <motion.article
              key={log.id}
              initial={reducedMotion ? false : { opacity: 0, y: 12 }}
              animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08, duration: 0.28, ease: "easeOut" }}
              className={cn(
                "relative flex gap-4 pb-6 pl-2",
                index === 0 && highlightLatest && "animate-flash-in rounded-2xl"
              )}
            >
              {index < logs.length - 1 ? (
                <div className="absolute left-[1.17rem] top-12 h-[calc(100%-1rem)] w-px bg-border" />
              ) : null}
              <div
                className={cn(
                  "relative z-10 mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border",
                  index === 0
                    ? "border-accent bg-accent text-ink"
                    : "border-border bg-surface text-muted"
                )}
              >
                <Icon className="h-4 w-4" />
              </div>
              <div
                className={cn(
                  "flex-1 rounded-2xl border p-4",
                  index === 0 ? "border-accent/50 bg-accent/10" : "border-border bg-white"
                )}
              >
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div className="space-y-2">
                    <Badge className={statusBadgeClassName(log.status)}>
                      {statusLabel(log.status)}
                    </Badge>
                    <p className="text-sm font-semibold text-ink">{log.locationName}</p>
                    {log.note ? (
                      <p className="text-sm leading-6 text-muted">{log.note}</p>
                    ) : null}
                  </div>
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
                    {formatDateTimeUtc(log.createdAt)}
                  </p>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}

