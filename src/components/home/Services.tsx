const services = [
  {
    title: "Air Freight",
    description:
      "Priority movement for time-sensitive cargo across long-distance lanes. Our fastest service for shipments that can't wait.",
    image: "/service-air.webp",
    tag: "Fastest",
    size: "large",
  },
  {
    title: "Sea Freight",
    description:
      "Containerized shipping for larger loads with clear milestone tracking.",
    image: "/service-sea.webp",
    tag: "Most economical",
    size: "wide",
  },
  {
    title: "Road Freight",
    description:
      "Regional pickup, linehaul, and last-mile delivery coordination.",
    image: "/service-road.webp",
    tag: "Domestic",
    size: "small",
  },
  {
    title: "Express Courier",
    description:
      "Fast parcel delivery with shipment-level visibility from dispatch.",
    image: "/service-express.webp",
    tag: "Door to door",
    size: "small",
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
            Book a shipment &rarr;
          </a>
        </div>

        {/* Bento grid: 4 columns on desktop */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-4 md:grid-rows-2">
          {services.map((service) => {
            const spanClass =
              service.size === "large"
                ? "md:col-span-2 md:row-span-2"
                : service.size === "wide"
                ? "md:col-span-2 md:row-span-1"
                : "md:col-span-1 md:row-span-1";

            const heightClass =
              service.size === "large"
                ? "h-80 md:h-full"
                : service.size === "wide"
                ? "h-52"
                : "h-52";

            return (
              <article
                key={service.title}
                className={`group relative overflow-hidden rounded-xl border border-[--border] bg-white transition duration-200 hover:border-[--freight] hover:shadow-[0_4px_24px_rgba(199,80,10,0.10)] ${spanClass}`}
              >
                <div className={`relative ${heightClass} overflow-hidden bg-[--ink]`}>
                  <img
                    src={service.image}
                    alt={service.title}
                    className="h-full w-full object-cover opacity-80 transition duration-300 group-hover:opacity-90 group-hover:scale-[1.02]"
                  />
                  <span className="absolute left-4 top-4 rounded-md bg-black/50 px-2.5 py-1 text-xs font-semibold uppercase tracking-widest text-white backdrop-blur-sm">
                    {service.tag}
                  </span>

                  {/* Content overlay at bottom of image */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 pt-16">
                    <h3 className="font-display text-xl font-bold text-white md:text-2xl">
                      {service.title}
                    </h3>
                    <p className="mt-1.5 max-w-md text-sm text-white/80 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
