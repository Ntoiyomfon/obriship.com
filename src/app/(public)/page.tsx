import { ArrowRight, Globe2, Radar, TimerReset } from "lucide-react";

import GlobeHero from "@/components/globe/GlobeHero";
import { TrackingSearchBar } from "@/components/tracking/TrackingSearchBar";
import { env } from "@/lib/env";

const features = [
  {
    title: "Live Location Updates",
    description:
      "See exactly where your shipment is at every moment. Orbis updates the moment your package moves through a checkpoint, customs, or delivery hub.",
    icon: TimerReset
  },
  {
    title: "End-to-End Coverage",
    description:
      "From international customs clearance to last-mile delivery, every handoff is logged and visible on an interactive map so you never lose sight of your shipment.",
    icon: Globe2
  },
  {
    title: "Instant Status Alerts",
    description:
      "Get notified the moment your shipment status changes. Whether it's cleared customs or is out for delivery, you'll know before you have to ask.",
    icon: Radar
  }
];

export default function HomePage() {
  return (
    <main>
      <section className="hero-noise relative overflow-hidden bg-ink py-20 text-white md:py-28">
        <div className="terminal-grid absolute inset-0 opacity-30" />
        <div className="section-shell relative z-10 flex min-h-[calc(100vh-5rem)] flex-col justify-center">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div className="max-w-4xl space-y-8 z-10">
              <div className="space-y-4">
                <h1 className="max-w-3xl font-display text-[clamp(3.5rem,8vw,6rem)] font-extrabold leading-none tracking-[-0.05em]">
                  Track anything, anywhere.
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-white/72">
                  From first pickup to final delivery, follow your shipment every step of the
                  way with live location updates, clear status milestones, and instant
                  notifications.
                </p>
              </div>
              <TrackingSearchBar />
            </div>
            <div className="relative hidden h-[560px] lg:block">
              <GlobeHero />
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-white py-5">
        <div className="section-shell grid gap-4 text-caption font-medium uppercase tracking-[0.22em] text-muted md:grid-cols-3 md:divide-x md:divide-border">
          <p className="text-center md:pr-6">150+ Countries Covered</p>
          <p className="text-center md:px-6">Real-Time Updates</p>
          <p className="text-center md:pl-6">End-to-End Visibility</p>
        </div>
      </section>

      <section className="surface-grid bg-surface py-16 md:py-24">
        <div className="section-shell space-y-10">
          <div className="max-w-3xl space-y-4">
            <p className="section-label">What You Get</p>
            <h2 className="font-display text-headline font-extrabold text-ink">
              Everything you need to stay informed about your delivery.
            </h2>
            <p className="text-body text-muted">
              Simple to use for customers. Powerful enough for logistics teams. Enter a
              tracking number and get a complete, real-time picture of your shipment no
              account needed.
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
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24" id="about">
        <div className="section-shell grid gap-10 lg:grid-cols-[1fr,0.8fr] lg:items-center">
          <div className="space-y-5">
            <p className="section-label">About Orbis</p>
            <h2 className="font-display text-headline font-extrabold text-ink">
              Built for the way goods actually move.
            </h2>
            <p className="max-w-2xl text-body text-muted">
              Orbis was built to solve a simple problem people shouldn't have to wonder
              where their package is. Whether it's a cross-border business shipment or a
              personal delivery, everyone deserves clear, accurate, and timely information.
            </p>
            <p className="max-w-2xl text-body text-muted">
              We work with logistics operations worldwide to provide a single, clean
              tracking experience. No clutter. No guesswork. Just your shipment, tracked in
              real time.
            </p>
          </div>
          <div className="surface-card grid gap-4 p-6">
            <div className="rounded-2xl border border-border bg-surface p-5">
              <p className="section-label">Visibility</p>
              <p className="mt-2 text-sm leading-7 text-muted">
                Follow every checkpoint from origin to destination with one clear timeline.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-surface p-5">
              <p className="section-label">Coverage</p>
              <p className="mt-2 text-sm leading-7 text-muted">
                International shipments, customs milestones, and final delivery all in one place.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-surface p-5">
              <p className="section-label">Clarity</p>
              <p className="mt-2 text-sm leading-7 text-muted">
                A clean tracking experience designed to answer the question that matters most:
                where is my shipment right now?
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24" id="contact">
        <div className="section-shell grid gap-10 lg:grid-cols-[1fr,0.8fr] lg:items-center">
          <div className="space-y-4">
            <p className="section-label">Contact</p>
            <h2 className="font-display text-[clamp(2.75rem,10vw,4rem)] font-extrabold leading-[0.95] text-ink md:text-headline md:leading-[1.1]">
              Need help with your shipment?
            </h2>
            <p className="max-w-2xl text-body text-muted">
              If you have a question about a delivery, a delay, or need to report an issue
               our support team is ready to help. Have your tracking number on hand when
              you reach out.
            </p>
          </div>
          <div className="surface-card bg-ink p-8 text-white">
            <p className="section-label text-white/45">Customer Support</p>
            <div className="mt-4 space-y-4">
              <p className="break-all font-display text-2xl font-extrabold tracking-[-0.04em] sm:text-3xl">
                {env.supportEmail}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
