import Link from "next/link";

import { Button } from "@/components/ui/button";

export function CtaStrip() {
  return (
    <section className="bg-[--freight-dim] py-12 text-white">
      <div className="section-shell flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-display text-2xl font-bold tracking-tight">Need to ship something?</p>
        <Link href="/book">
          <Button className="bg-white text-[--ink] hover:bg-[--freight-light]">Book a Shipment</Button>
        </Link>
      </div>
    </section>
  );
}
