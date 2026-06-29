const stats = [
  { value: "150+", label: "Countries served" },
  { value: "2,400+", label: "Active routes" },
  { value: "30s", label: "Update frequency" },
  { value: "99.4%", label: "On-time visibility" },
];

export function StatsBar() {
  return (
    <section className="border-b border-[--border] bg-white">
      <div className="section-shell py-16 md:py-20">
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-4">
          {stats.map(({ value, label }) => (
            <div key={label} className="space-y-2">
              <p className="font-display text-5xl font-extrabold tracking-tight text-[--ink] md:text-6xl">
                {value}
              </p>
              <p className="text-sm font-medium text-[--ink-muted]">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}