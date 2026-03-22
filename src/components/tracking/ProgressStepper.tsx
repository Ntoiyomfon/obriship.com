"use client";

import { Check } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { cn, getProgressIndex, statusLabel } from "@/lib/utils";
import { PROGRESS_STEPS, type ShipmentStatus } from "@/types/shipment";

export function ProgressStepper({ status }: { status: ShipmentStatus }) {
  const reducedMotion = useReducedMotion();
  const activeIndex = getProgressIndex(status);

  return (
    <div className="surface-card p-6">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="section-label">Progress</p>
          <h2 className="mt-2 font-display text-title font-bold text-ink">Delivery Milestones</h2>
        </div>
        <p className="hidden text-sm text-muted md:block">
          {status === "EXCEPTION" ? "Issue detected during delivery" : statusLabel(status)}
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-5">
        {PROGRESS_STEPS.map((step, index) => {
          const completed = index < activeIndex;
          const active = index === activeIndex;

          return (
            <div
              key={step}
              className="relative flex items-center gap-4 md:flex-col md:items-start md:gap-5"
            >
              {index < PROGRESS_STEPS.length - 1 ? (
                <div className="absolute left-[18px] top-10 h-[calc(100%-1rem)] w-px bg-border md:left-10 md:right-0 md:top-[18px] md:h-px md:w-[calc(100%-1rem)]" />
              ) : null}
              <motion.div
                initial={reducedMotion ? false : { scale: 0.85, opacity: 0 }}
                animate={reducedMotion ? undefined : { scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.08, type: "spring", stiffness: 180, damping: 18 }}
                className={cn(
                  "relative z-10 flex h-10 w-10 items-center justify-center rounded-full border text-sm font-semibold",
                  completed
                    ? "border-accent bg-accent text-ink"
                    : active
                      ? "border-accent bg-accent/20 text-ink"
                      : "border-border bg-white text-muted"
                )}
              >
                {active ? <span className="absolute inset-0 animate-pulse-ring rounded-full bg-accent/35" /> : null}
                <span className="relative z-10">
                  {completed ? <Check className="h-4 w-4" /> : index + 1}
                </span>
              </motion.div>
              <div className="space-y-1">
                <p className="font-display text-sm font-bold uppercase tracking-[0.06em] text-ink">
                  {statusLabel(step)}
                </p>
                <p className="text-sm leading-6 text-muted">
                  {completed
                    ? "Completed"
                    : active
                      ? "Current step"
                      : "Queued"}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
