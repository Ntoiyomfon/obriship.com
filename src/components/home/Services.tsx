const services = [
  {
    title: "Air Freight",
    description:
      "Priority movement for time-sensitive cargo across long-distance lanes.",
    image: "/service-air.webp",
    tag: "Fastest",
  },
  {
    title: "Sea Freight",
    description:
      "Containerized shipping for larger loads with clear milestone tracking.",
    image: "/service-sea.webp",
    tag: "Most economical",
  },
  {
    title: "Road Freight",
    description:
      "Regional pickup, linehaul, and last-mile delivery coordination.",
    image: "/service-road.webp",
    tag: "Domestic",
  },
  {
    title: "Express Courier",
    description:
      "Fast parcel delivery with shipment-level visibility from dispatch.",
    image: "/service-express.webp",
    tag: "Door to door",
  },
];

export function Services() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="section-shell space-y-12">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl space-y-3">
            <p className="section-label">What We Cover</p>
            <h2 className="font-display text-headline text-[--ink]">
              Every freight mode. One platform.
            </h2>
          </div>
          <a
            href="/book"
            className="shrink-0 text-sm font-semibold text-[--freight] hover:underline"
          >
            Book a shipment →
          </a>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {services.map((service) => (
            <article
              key={service.title}
              className="group overflow-hidden rounded-xl border border-[--border] bg-white transition duration-200 hover:border-[--freight] hover:shadow-[0_4px_24px_rgba(199,80,10,0.10)]"
            >
              <div className="relative h-52 overflow-hidden bg-[--ink]">
                <img
                  src={service.image}
                  alt={service.title}
                  className="h-full w-full object-cover opacity-80 transition duration-300 group-hover:opacity-90 group-hover:scale-[1.02]"
                />
                <span className="absolute left-4 top-4 rounded-md bg-black/50 px-2.5 py-1 text-xs font-semibold uppercase tracking-widest text-white backdrop-blur-sm">
                  {service.tag}
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-display text-title font-bold text-[--ink]">
                  {service.title}
                </h3>
                <p className="mt-2 text-small text-[--ink-muted] leading-relaxed">
                  {service.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
