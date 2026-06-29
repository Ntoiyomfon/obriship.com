const steps = [
  {
    number: "01",
    title: "Enter your tracking number",
    description:
      "Use the number from your confirmation, shipping label, or carrier handoff document.",
  },
  {
    number: "02",
    title: "We locate your shipment",
    description:
      "FX Logistics queries the latest carrier and checkpoint records across 150+ networks.",
  },
  {
    number: "03",
    title: "Live updates until delivery",
    description:
      "Follow every status change from origin through final delivery — no refresh needed.",
  },
];

export function HowItWorks() {
  return (
    <section className="bg-[--surface] py-20 md:py-28">
      <div className="section-shell space-y-16">
        <div className="max-w-xl space-y-3">
          <p className="section-label">How It Works</p>
          <h2 className="font-display text-headline text-[--ink]">
            Three steps from uncertainty to a live shipment view.
          </h2>
        </div>

        <div className="grid gap-0 md:grid-cols-3">
          {steps.map((step, index) => (
            <article
              key={step.number}
              className={`relative space-y-5 py-8 pr-8 ${
                index < steps.length - 1
                  ? "border-b border-[--border] md:border-b-0 md:border-r"
                  : ""
              } ${index > 0 ? "md:pl-8" : ""}`}
            >
              <span className="font-display text-[80px] font-extrabold leading-none text-[--freight]/15 select-none">
                {step.number}
              </span>
              <div className="space-y-2">
                <h3 className="font-display text-title font-bold text-[--ink]">
                  {step.title}
                </h3>
                <p className="text-small text-[--ink-muted] leading-relaxed">
                  {step.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}