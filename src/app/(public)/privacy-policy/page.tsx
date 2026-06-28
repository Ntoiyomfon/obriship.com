import { format } from "date-fns";

import { env } from "@/lib/env";

export default function PrivacyPolicyPage() {
  const lastUpdated = format(new Date(), "MMMM d, yyyy");

  return (
    <main className="bg-white py-16 md:py-24">
      <div className="section-shell max-w-3xl space-y-6">
        <p className="section-label">Privacy Policy</p>
        <h1 className="font-display text-headline font-extrabold text-ink">Privacy Policy</h1>
        <p className="text-body text-muted">Last updated: {lastUpdated}</p>
        <div className="surface-card p-6">
          <p className="text-body text-muted">
            FX Logistics collects only the information necessary to provide shipment tracking
            services. We do not sell or share personal information with third parties.
            Tracking data is retained for 90 days after delivery. For questions about your
            data, contact {env.supportEmail}.
          </p>
        </div>
      </div>
    </main>
  );
}
