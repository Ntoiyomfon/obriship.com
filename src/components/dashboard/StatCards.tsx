import type { Shipment } from "@/types/shipment";

export function StatCards({ shipments }: { shipments: Shipment[] }) {
  const stats = [
    ["Active Shipments", shipments.filter((shipment) => shipment.currentStatus !== "DELIVERED").length, "+8%"],
    ["Delivered This Month", shipments.filter((shipment) => shipment.currentStatus === "DELIVERED").length, "+3%"],
    ["In Transit", shipments.filter((shipment) => shipment.currentStatus === "IN_TRANSIT").length, "+12%"],
    ["Exceptions", shipments.filter((shipment) => shipment.currentStatus === "EXCEPTION").length, "0 open"]
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {stats.map(([label, value, trend]) => (
        <article key={label} className="surface-card p-5">
          <p className="text-small text-[--ink-muted]">{label}</p>
          <p className="mt-3 font-display text-4xl font-extrabold tracking-tight text-[--ink]">{value}</p>
          <p className="mt-2 text-small text-[--success]">{trend}</p>
        </article>
      ))}
    </div>
  );
}
