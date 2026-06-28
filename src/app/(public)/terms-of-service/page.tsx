import { format } from "date-fns";

export default function TermsOfServicePage() {
  const lastUpdated = format(new Date(), "MMMM d, yyyy");

  return (
    <main className="bg-white py-16 md:py-24">
      <div className="section-shell max-w-3xl space-y-6">
        <p className="section-label">Terms of Service</p>
        <h1 className="font-display text-headline font-extrabold text-ink">Terms of Service</h1>
        <p className="text-body text-muted">Last updated: {lastUpdated}</p>
        <div className="surface-card p-6">
          <p className="text-body text-muted">
            By using FX Logistics, you agree to use the platform only for lawful purposes related
            to shipment tracking. FX Logistics provides tracking information as a service and is
            not liable for delays or issues caused by carriers or customs authorities.
            Service availability is not guaranteed.
          </p>
        </div>
      </div>
    </main>
  );
}
