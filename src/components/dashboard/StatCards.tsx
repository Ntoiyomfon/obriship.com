import type { Shipment } from "@/types/shipment";

export function StatCards({ shipments }: { shipments: Shipment[] }) {
  const active = shipments.filter(
    (s) => s.currentStatus !== "DELIVERED"
  ).length;
  const delivered = shipments.filter(
    (s) => s.currentStatus === "DELIVERED"
  ).length;
  const inTransit = shipments.filter(
    (s) => s.currentStatus === "IN_TRANSIT"
  ).length;
  const exceptions = shipments.filter(
    (s) => s.currentStatus === "EXCEPTION"
  ).length;

  const stats = [
    {
      label: "Active Shipments",
      value: active,
      sub: active === 0 ? "No active shipments" : `${active} in progress`,
    },
    {
      label: "Delivered This Month",
      value: delivered,
      sub: delivered === 0 ? "None delivered yet" : `${delivered} completed`,
    },
    {
      label: "In Transit",
      value: inTransit,
      sub: inTransit === 0 ? "None in transit" : `${inTransit} moving`,
    },
    {
      label: "Exceptions",
      value: exceptions,
      sub: exceptions === 0 ? "No exceptions" : `${exceptions} need attention`,
      alert: exceptions > 0,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {stats.map(({ label, value, sub, alert }) => (
        <article key={label} className="surface-card p-5">
          <p className="text-small text-[--ink-muted]">{label}</p>
          <p className="mt-3 font-display text-4xl font-extrabold tracking-tight text-[--ink]">
            {value}
          </p>
          <p
            className={`mt-2 text-small ${
              alert ? "text-[--error]" : "text-[--ink-muted]"
            }`}
          >
            {sub}
          </p>
        </article>
      ))}
    </div>
  );
}
