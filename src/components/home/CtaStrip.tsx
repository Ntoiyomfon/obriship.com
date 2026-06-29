import Link from "next/link";

export function CtaStrip() {
  return (
    <section className="bg-[--freight-dim] py-16 md:py-20">
      <div className="section-shell flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <p className="font-display text-3xl font-extrabold tracking-tight text-white md:text-4xl">
            Ready to ship?
          </p>
          <p className="text-base text-white/60">
            Get a quote and book your first shipment in under 3 minutes.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="/book"
            className="inline-flex items-center justify-center rounded-lg bg-[--freight] px-6 py-3.5 text-sm font-semibold text-white hover:bg-[#b04508] transition-colors"
          >
            Book a Shipment
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-lg border border-white/20 px-6 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
          >
            Track a Shipment
          </Link>
        </div>
      </div>
    </section>
  );
}