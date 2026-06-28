const steps = [
  {
    title: "Enter your tracking number",
    description: "Use the number from your confirmation, label, or carrier handoff."
  },
  {
    title: "We locate your shipment",
    description: "FX Logistics checks the latest carrier and checkpoint records."
  },
  {
    title: "Live updates until delivery",
    description: "Follow each status change from origin through final delivery."
  }
];

export function HowItWorks() {
  return (
    <section className="bg-[--surface] py-20 md:py-28">
      <div className="section-shell space-y-12">
        <div className="max-w-2xl space-y-4">
          <h2 className="text-balance font-display text-headline text-[--ink]">
            Three steps from uncertainty to a live shipment view.
          </h2>
          <p className="text-pretty text-body text-[--ink-muted]">
            Tracking stays simple for recipients and useful for operations teams.
          </p>
        </div>
        <div className="relative grid gap-8 md:grid-cols-3">
          <div className="absolute left-[16.5%] right-[16.5%] top-10 hidden border-t border-dashed border-[--freight]/30 md:block" />
          {steps.map((step, index) => (
            <article key={step.title} className="relative space-y-4">
              <div className="relative z-10 inline-grid size-20 place-items-center rounded-xl border border-[--border] bg-white shadow-soft">
                <span className="font-display text-4xl font-extrabold text-[--freight]">{index + 1}</span>
              </div>
              <div className="space-y-2">
                <h3 className="text-balance font-display text-title text-[--ink]">{step.title}</h3>
                <p className="text-pretty text-small text-[--ink-muted]">{step.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
