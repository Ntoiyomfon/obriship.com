import { RouteMap } from "@/components/map/RouteMap";
import { TrackingSearchBar } from "@/components/tracking/TrackingSearchBar";

export function Hero() {
  return (
    <section className="hero-noise relative overflow-hidden bg-[--freight-dim] py-20 text-white md:py-28">
      <div className="section-shell grid min-h-[calc(100dvh-4rem)] items-center gap-12 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="relative z-10 max-w-2xl space-y-8">
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
        <div className="relative min-h-[320px] lg:min-h-[520px]">
          <RouteMap className="absolute inset-0 h-full w-full" />
        </div>
      </div>
    </section>
  );
}
