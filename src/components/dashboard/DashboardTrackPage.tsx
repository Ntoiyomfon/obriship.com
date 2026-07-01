"use client";
import { TrackingSearchBar } from "@/components/tracking/TrackingSearchBar";

export function DashboardTrackPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="section-label">Tracking</p>
        <h1 className="mt-2 font-display text-headline text-[--ink]">
          Track a Shipment
        </h1>
        <p className="mt-2 text-body text-[--ink-muted]">
          Enter any tracking number to get real-time status.
        </p>
      </div>
      <div className="surface-card max-w-2xl p-6">
        <TrackingSearchBar variant="hero" autoFocus={true} />
      </div>
    </div>
  );
}
