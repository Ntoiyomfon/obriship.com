import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { TrackingResultCard } from "@/components/tracking/TrackingResultCard";
import { Button } from "@/components/ui/button";
import { getShipmentByTrackingId } from "@/lib/repository";

export async function generateMetadata({
  params
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  return {
    title: `Tracking ${id.toUpperCase()} - FX Logistics`
  };
}

export default async function TrackingPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const shipment = await getShipmentByTrackingId(id);

  if (!shipment) {
    notFound();
  }

  return (
    <main className="bg-[--surface] py-8">
      <div className="section-shell space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-3">
            <p className="section-label">Shipment Tracking</p>
            <p className="max-w-2xl text-sm leading-6 text-[--ink-muted]">
              Follow each checkpoint, route movement, and delivery milestone for this shipment.
            </p>
          </div>
          <Link href="/">
            <Button variant="secondary">Track Another Shipment</Button>
          </Link>
        </div>
        <TrackingResultCard initialShipment={shipment} />
      </div>
    </main>
  );
}
