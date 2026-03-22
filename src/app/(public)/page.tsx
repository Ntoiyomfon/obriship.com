import { ArrowRight, Globe2, Radar, TimerReset } from "lucide-react";

import { TrackingSearchBar } from "@/components/tracking/TrackingSearchBar";

const features = [
  {
    title: "Rapid Visibility",
    description:
      "Operational updates surface instantly with a premium customer experience that feels precise and trustworthy.",
    icon: TimerReset
  },
  {
    title: "Global Positioning",
    description:
      "Track location handoffs across customs, hub transfers, and final-mile delivery from one mission-control view.",
    icon: Globe2
  },
  {
    title: "Realtime Signal",
    description:
      "Built to plug into live status updates so customers see the same ground truth as your operations team.",
    icon: Radar
  }
];

export default function HomePage() {
  return (
    <main>
      <section className="hero-noise relative overflow-hidden bg-ink py-20 text-white md:py-28">
        <div className="terminal-grid absolute inset-0 opacity-30" />
        <div className="section-shell relative z-10 flex min-h-[calc(100vh-5rem)] flex-col justify-center">
          <div className="max-w-4xl space-y-8">
            <div className="space-y-4">
              <p className="section-label text-white/55">Global Shipment Tracking Platform</p>
              <h1 className="max-w-3xl font-display text-[clamp(3.5rem,8vw,6rem)] font-extrabold leading-none tracking-[-0.05em]">
                Track anything, anywhere.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-white/72">
                Precision-grade visibility for cross-border shipments, with live updates,
                premium status dashboards, and operations tooling that feels built for
                serious logistics teams.
              </p>
            </div>
            <TrackingSearchBar />
            {/* <div className="flex flex-wrap gap-4 text-sm text-white/62">
              <span className="rounded-full border border-white/10 px-4 py-2 font-mono">
                Try TRK-2026-XKQP
              </span>
              <span className="rounded-full border border-white/10 px-4 py-2 font-mono">
                Try TRK-2026-Q2LN
              </span>
            </div> */}
          </div>
        </div>
      </section>

      <section className="surface-grid bg-surface py-16 md:py-24" id="about">
        <div className="section-shell space-y-10">
          <div className="max-w-3xl space-y-4">
            <p className="section-label">Why It Works</p>
            <h2 className="font-display text-headline font-extrabold text-ink">
              Built with the clarity of a logistics control tower.
            </h2>
            <p className="text-body text-muted">
              The public interface is intentionally minimal, while the delivery detail
              experience gives customers rich context without noise. Every surface is tuned
              for trust, speed, and operational precision.
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <article key={feature.title} className="surface-card p-6">
                  <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-ink">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-title font-bold text-ink">{feature.title}</h3>
                  <p className="mt-3 text-body text-muted">{feature.description}</p>
                  <div className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-ink">
                    Operationally precise
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24" id="contact">
        <div className="section-shell grid gap-10 lg:grid-cols-[1fr,0.8fr] lg:items-center">
          <div className="space-y-4">
            <p className="section-label">Contact</p>
            <h2 className="font-display text-[clamp(2.75rem,10vw,4rem)] font-extrabold leading-[0.95] text-ink md:text-headline md:leading-[1.1]">
              Need support on a live shipment?
            </h2>
            <p className="max-w-2xl text-body text-muted">
              Operations teams can use the admin terminal to create shipments and push live
              updates. Customers can use any valid tracking number to jump straight into the
              mission dashboard.
            </p>
          </div>
          <div className="surface-card bg-ink p-8 text-white">
            <p className="section-label text-white/45">Operations Desk</p>
            <div className="mt-4 space-y-4">
              <p className="break-all font-display text-2xl font-extrabold tracking-[-0.04em] sm:text-3xl">
                ntoiyomfon@gmail.com
              </p>
              <p className="text-sm leading-7 text-white/65">
                Admin access is protected. Configure Supabase credentials in `.env.local` to
                connect this interface to production auth and data.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
