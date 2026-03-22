import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function TrackingNotFound() {
  return (
    <main className="bg-surface py-16 md:py-24">
      <div className="section-shell">
        <div className="surface-card mx-auto max-w-3xl p-10 text-center">
          <p className="section-label">Tracking Not Found</p>
          <h1 className="mt-4 font-display text-headline font-extrabold text-ink">
            We couldn't find that shipment.
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-body text-muted">
            We couldn't find a shipment with that tracking number. Please check the number
            and try again, or contact support if you believe this is an error.
          </p>
          <div className="mt-8 flex justify-center">
            <Link href="/">
              <Button>Track Another Shipment</Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
