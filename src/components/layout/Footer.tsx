import Link from "next/link";

import { env } from "@/lib/env";

export function Footer() {
  return (
    <footer className="border-t border-border bg-white py-10">
      <div className="section-shell flex flex-col gap-6">
        <div className="space-y-2">
          <p className="font-display text-lg font-bold text-ink">Orbis</p>
          <p className="max-w-md text-sm leading-6 text-muted">
            Reliable shipment tracking for individuals and businesses worldwide.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-muted">
          <Link href="/" className="transition hover:text-ink">
            Track a Shipment
          </Link>
          <a href={`mailto:${env.supportEmail}`} className="transition hover:text-ink">
            Support
          </a>
          <Link href="/privacy-policy" className="transition hover:text-ink">
            Privacy Policy
          </Link>
          <Link href="/terms-of-service" className="transition hover:text-ink">
            Terms of Service
          </Link>
        </div>
        <div className="text-sm text-muted">
          © 2025 Orbis. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
