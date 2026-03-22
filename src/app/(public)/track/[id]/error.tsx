"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function TrackingError({
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="bg-surface py-16 md:py-24">
      <div className="section-shell">
        <div className="surface-card mx-auto max-w-3xl p-10 text-center">
          <p className="section-label">Tracking Unavailable</p>
          <h1 className="mt-4 font-display text-headline font-extrabold text-ink">
            We’re having trouble loading this shipment right now.
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-body text-muted">
            Please try again in a moment. If the issue continues, contact support for help.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button onClick={() => reset()}>Try Again</Button>
            <Link href="/">
              <Button variant="secondary">Back to Search</Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
