"use client";

import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { ShipmentsTable } from "@/components/dashboard/ShipmentsTable";
import { StatCards } from "@/components/dashboard/StatCards";
import { TrackingSearchBar } from "@/components/tracking/TrackingSearchBar";
import { useShipments } from "@/hooks/useShipments";

export function DashboardClient({ userId }: { userId: string | undefined }) {
  const { data, error, isLoading } = useShipments(userId);
  const shipments = data?.shipments ?? [];
  const logs = data?.logs ?? [];

  return (
    <div className="space-y-8">
      <div>
        <p className="section-label">Operations</p>
        <h1 className="mt-2 font-display text-headline text-[--ink]">Dashboard</h1>
      </div>

      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="surface-card h-36 animate-pulse bg-white" />
          ))}
        </div>
      ) : null}

      {error ? (
        <div aria-live="polite" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-[--error]">
          {error.message}
        </div>
      ) : null}

      {!isLoading && !error ? (
        <>
          <StatCards shipments={shipments} />
          <div className="grid gap-6 xl:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.55fr)]">
            <ShipmentsTable shipments={shipments} />
            <aside className="space-y-4">
              <section className="surface-card p-5">
                <h2 className="font-display text-title text-[--ink]">Quick Track</h2>
                <TrackingSearchBar variant="compact" autoFocus={false} className="mt-4" />
                <div className="mt-5 space-y-2">
                  {shipments.slice(0, 3).map((shipment) => (
                    <p key={shipment.id} className="font-mono text-xs text-[--ink-muted]">
                      {shipment.trackingId}
                    </p>
                  ))}
                  {shipments.length === 0 ? (
                    <p className="text-small text-[--ink-muted]">No recent shipments.</p>
                  ) : null}
                </div>
              </section>
            </aside>
          </div>
          <ActivityFeed logs={logs} />
        </>
      ) : null}
    </div>
  );
}
