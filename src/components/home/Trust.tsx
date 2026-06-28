import { Check } from "lucide-react";

const proofPoints = [
  "No account needed to track",
  "Updates within 30 seconds of status change",
  "Works for 150+ carrier networks"
];

export function Trust() {
  return (
    <section className="bg-[--surface] py-20 md:py-28">
      <div className="section-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="space-y-4">
          <p className="section-label">Shipment Confidence</p>
          <h2 className="text-balance font-display text-headline text-[--ink]">
            Clear answers without opening a support ticket.
          </h2>
          <p className="text-pretty text-body text-[--ink-muted]">
            FX Logistics keeps the important shipment facts visible: where it is, what changed,
            and what happens next.
          </p>
        </div>
        <div className="space-y-4">
          {proofPoints.map((point) => (
            <div key={point} className="flex items-start gap-4 border-b border-[--border] pb-5 last:border-b-0">
              <Check className="mt-1 size-5 shrink-0 text-[--freight]" />
              <p className="font-display text-title text-[--ink]">{point}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
