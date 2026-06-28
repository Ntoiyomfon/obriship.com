const stats = [
  ["150+", "Countries"],
  ["2,400+", "Routes"],
  ["Real-Time", "Updates"],
  ["End-to-End", "Tracking"]
];

export function StatsBar() {
  return (
    <section className="border-b border-[--border] bg-white">
      <div className="section-shell grid gap-0 py-6 sm:grid-cols-2 md:grid-cols-4 md:divide-x md:divide-[--border]">
        {stats.map(([value, label]) => (
          <div key={label} className="px-4 py-4 text-center md:first:pl-0 md:last:pr-0">
            <p className="font-display text-2xl font-extrabold tracking-tight text-[--ink]">{value}</p>
            <p className="mt-1 text-small text-[--ink-muted]">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
