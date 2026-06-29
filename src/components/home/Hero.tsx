import { TrackingSearchBar } from "@/components/tracking/TrackingSearchBar";

export function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-[--freight-dim]">
      {/* Photo background */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero-bg.webp"
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover object-center"
          style={{ opacity: 0.35 }}
        />
        {/* Overlay - lighter than before so truck is visible */}
        <div className="absolute inset-0 bg-[--freight-dim]/60" />
      </div>

      {/* Ember glow */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 20% 50%, rgba(199,80,10,0.2), transparent 55%)"
        }}
      />

      {/* Content — centered, single column */}
      <div className="section-shell relative z-10 flex flex-col items-start justify-center py-28 md:py-36">
        <div className="max-w-[680px] space-y-8">
          <div className="space-y-5">
            <h1 className="text-balance font-display text-[clamp(3rem,9vw,4rem)] font-extrabold leading-none tracking-[-0.04em] text-white md:text-display">
              Your shipment, tracked in real time.
            </h1>
            <p className="max-w-xl text-pretty text-small text-white/65">
              From pickup to doorstep - enter your tracking number for a live view of your shipment.
            </p>
          </div>
          <TrackingSearchBar />
        </div>
      </div>
    </section>
  );
}
