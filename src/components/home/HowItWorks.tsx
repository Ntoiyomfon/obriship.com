"use client";

const steps = [
  {
    number: "01",
    title: "Enter your tracking number",
    description:
      "Use the number from your confirmation, shipping label, or carrier handoff document. Works with any major carrier format — no reformatting needed.",
    image: "/how-1.webp",
    alt: "Person entering tracking number",
  },
  {
    number: "02",
    title: "We locate your shipment",
    description:
      "FX Logistics queries the latest carrier and checkpoint records across 150+ networks in real time. No manual lookups, no delays.",
    image: "/how-2.webp",
    alt: "Shipment being scanned at warehouse",
  },
  {
    number: "03",
    title: "Live updates until delivery",
    description:
      "Follow every status change from origin through final delivery. Get notified the moment something changes — no refresh needed.",
    image: "/how-3.webp",
    alt: "Package delivered to door",
  },
];

export function HowItWorks() {
  return (
    <section className="bg-[--surface] py-20 md:py-28">
      <div className="section-shell space-y-6">
        <div className="max-w-xl space-y-3">
          <p className="section-label">How It Works</p>
          <h2 className="font-display text-headline text-[--ink]">
            Three steps from uncertainty to a live shipment view.
          </h2>
        </div>

        <div className="mt-16 space-y-0 divide-y divide-[--border]">
          {steps.map((step, index) => {
            const isEven = index % 2 === 1;
            return (
              <article
                key={step.number}
                className="grid grid-cols-1 gap-8 py-16 md:grid-cols-2 md:items-center md:gap-16"
              >
                {/* Image — alternates left/right */}
                <div
                  className={`relative overflow-hidden rounded-2xl bg-[--ink] ${
                    isEven ? "md:order-last" : ""
                  }`}
                >
                  {/* Fallback gradient while image loads or if missing */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[--freight-dim] to-[--ink]" />
                  <img
                    src={step.image}
                    alt={step.alt}
                    className="relative z-10 h-72 w-full object-cover opacity-0 transition-opacity duration-300"
                    onLoad={(e) => {
                      (e.target as HTMLImageElement).style.opacity = "1";
                    }}
                    onError={(e) => {
                      // Hide broken image, show gradient fallback
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                  {/* Step number overlay */}
                  <span className="absolute bottom-4 right-4 font-display text-6xl font-extrabold text-white/10 select-none z-20">
                    {step.number}
                  </span>
                </div>

                {/* Text */}
                <div className="space-y-4">
                  <span className="inline-block font-display text-sm font-bold uppercase tracking-widest text-[--freight]">
                    Step {step.number}
                  </span>
                  <h3 className="font-display text-2xl font-bold leading-snug text-[--ink] md:text-3xl">
                    {step.title}
                  </h3>
                  <p className="text-base leading-relaxed text-[--ink-muted]">
                    {step.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}