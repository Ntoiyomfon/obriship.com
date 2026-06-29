const proofPoints = [
  {
    stat: "No account",
    detail: "needed to track any shipment",
  },
  {
    stat: "30 seconds",
    detail: "average update lag after a carrier scan",
  },
  {
    stat: "150+ networks",
    detail: "supported across carriers and regions",
  },
];

export function Trust() {
  return (
    <section className="bg-[--surface] py-20 md:py-28">
      <div className="section-shell grid gap-16 lg:grid-cols-2 lg:items-center">
        {/* Left */}
        <div className="space-y-6">
          <p className="section-label">Shipment Confidence</p>
          <h2 className="font-display text-headline text-[--ink]">
            Clear answers. No support ticket required.
          </h2>
          <p className="text-body text-[--ink-muted] leading-relaxed max-w-md">
            FX Logistics keeps the facts visible: where your shipment is,
            what changed, and what happens next — in plain language.
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-2 rounded-lg bg-[--freight] px-5 py-3 text-sm font-semibold text-white hover:bg-[#b04508] transition-colors"
          >
            Track a shipment now →
          </a>
        </div>

        {/* Right */}
        <div className="space-y-0 divide-y divide-[--border]">
          {proofPoints.map(({ stat, detail }) => (
            <div key={stat} className="flex items-center gap-6 py-7">
              <p className="w-32 shrink-0 font-display text-2xl font-extrabold text-[--freight]">
                {stat}
              </p>
              <p className="text-body text-[--ink]">{detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}