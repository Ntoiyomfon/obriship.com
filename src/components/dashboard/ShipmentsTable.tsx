import Link from "next/link";

import type { Shipment } from "@/types/shipment";

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  month: "short",
  day: "numeric",
  year: "numeric"
});

function statusLabel(status: string) {
  return status.replaceAll("_", " ").toLowerCase();
}

export function ShipmentsTable({ shipments }: { shipments: Shipment[] }) {
  return (
    <div className="surface-card overflow-hidden">
      <div className="border-b border-[--border] p-5">
        <h2 className="font-display text-title text-[--ink]">Shipments</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-[--surface] text-xs uppercase text-[--ink-muted]">
            <tr>
              <th className="px-5 py-3">Tracking ID</th>
              <th className="px-5 py-3">Origin</th>
              <th className="px-5 py-3">Destination</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Last Update</th>
              <th className="px-5 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {shipments.length === 0 ? (
              <tr>
                <td colSpan={6}>
                  <div className="py-16 text-center">
                    <p className="font-display text-lg font-semibold text-[--ink]">
                      No shipments yet
                    </p>
                    <p className="mt-1 text-sm text-[--ink-muted]">
                      Your shipments will appear here once you book one.
                    </p>
                    <a
                      href="/book"
                      className="mt-4 inline-block rounded-lg bg-[--freight] px-4 py-2 text-sm font-semibold text-white"
                    >
                      Book a Shipment
                    </a>
                  </div>
                </td>
              </tr>
            ) : null}
            {shipments.map((shipment) => (
              <tr key={shipment.id} className="border-t border-[--border] hover:bg-[--card-hover]">
                <td className="px-5 py-4 font-mono text-mono text-[--ink]">{shipment.trackingId}</td>
                <td className="px-5 py-4">{shipment.senderCountry}</td>
                <td className="px-5 py-4">{shipment.recipientCountry}</td>
                <td className="px-5 py-4">
                  <span className="rounded-xl bg-[--freight-light] px-3 py-1 text-xs font-semibold capitalize text-[--freight]">
                    {statusLabel(shipment.currentStatus)}
                  </span>
                </td>
                <td className="px-5 py-4 text-[--ink-muted]">{dateFormatter.format(new Date(shipment.updatedAt))}</td>
                <td className="px-5 py-4">
                  <Link href={`/track/${shipment.trackingId}`} className="font-semibold text-[--freight]">
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
