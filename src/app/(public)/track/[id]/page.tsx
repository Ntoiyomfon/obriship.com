import { getShipmentByTrackingId } from "@/lib/repository";
import { TrackingResultCard } from "@/components/tracking/TrackingResultCard";

export default async function TrackingPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const shipment = await getShipmentByTrackingId(id);

  if (!shipment) {
    return (
      <main className="bg-surface py-16 md:py-24">
        <div className="section-shell">
          <div className="surface-card mx-auto max-w-3xl p-10 text-center">
            <p className="section-label">Tracking Not Found</p>
            <h1 className="mt-4 font-display text-headline font-extrabold text-ink">
              We couldn’t locate that shipment.
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-body text-muted">
              Double-check the tracking number and try again. Sample preview IDs include
              <span className="mx-2 font-mono">TRK-2026-XKQP</span>
              and
              <span className="ml-2 font-mono">TRK-2026-Q2LN</span>.
            </p>
            <div className="mt-8 flex justify-center">
              <a
                href="/"
                className="inline-flex rounded-full bg-accent px-8 py-3 text-sm font-semibold text-ink transition hover:bg-accent-dim"
              >
                Return to Tracking Search
              </a>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-surface py-10 md:py-16">
      <div className="section-shell space-y-6">
        <div className="space-y-3">
          <p className="section-label">Tracking Dashboard</p>
          <p className="max-w-2xl text-sm leading-6 text-muted">
            Premium shipment visibility for {shipment.recipientName}. Updates from the
            operations team will appear here live when realtime is configured.
          </p>
        </div>
        <TrackingResultCard initialShipment={shipment} />
      </div>
    </main>
  );
}

