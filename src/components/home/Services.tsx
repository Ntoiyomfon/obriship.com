import { Plane, Ship, Truck, Zap } from "lucide-react";

const services = [
  {
    title: "Air Freight",
    description: "Priority movement for time-sensitive cargo across long-distance lanes.",
    icon: Plane
  },
  {
    title: "Sea Freight",
    description: "Containerized shipping for larger loads with clear milestone tracking.",
    icon: Ship
  },
  {
    title: "Road Freight",
    description: "Regional pickup, linehaul, and last-mile delivery coordination.",
    icon: Truck
  },
  {
    title: "Express Courier",
    description: "Fast parcel delivery with shipment-level visibility from dispatch.",
    icon: Zap
  }
];

export function Services() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="section-shell space-y-12">
        <div className="max-w-2xl space-y-4">
          <p className="section-label">What We Cover</p>
          <h2 className="text-balance font-display text-headline text-[--ink]">
            Freight modes built around the route, not the template.
          </h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <article
                key={service.title}
                className="surface-card p-6 transition duration-150 ease-out hover:border-[--freight] hover:shadow-[0_4px_20px_rgba(199,80,10,0.08)]"
              >
                <Icon className="size-6 text-[--ink]" />
                <h3 className="mt-6 font-display text-title text-[--ink]">{service.title}</h3>
                <p className="mt-2 text-small text-[--ink-muted]">{service.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
