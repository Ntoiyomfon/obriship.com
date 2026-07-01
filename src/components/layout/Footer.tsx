import Link from "next/link";
import { env } from "@/lib/env";

const navigation = {
  services: [
    { label: "Track a Shipment", href: "/" },
    { label: "Book a Shipment", href: "/book" },
    { label: "Air Freight", href: "/book" },
    { label: "Sea Freight", href: "/book" },
    { label: "Road Freight", href: "/book" },
    { label: "Express Courier", href: "/book" },
  ],
  company: [
    { label: "About FX Logistics", href: "/" },
    { label: "Support", href: `mailto:${env.supportEmail}` },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms-of-service" },
  ],
  account: [
    { label: "Log In", href: "/login" },
    { label: "Create Account", href: "/register" },
    { label: "Dashboard", href: "/dashboard" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-[--border] bg-[--ink] text-white">
      <div className="section-shell py-16 md:py-20">
        {/* Carrier strip */}
        <div className="mb-12 space-y-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-white/30">
            Carrier network
          </p>
          <div className="flex flex-wrap gap-3">
            {[
              { name: "UPS", slug: "ups" },
              { name: "FedEx", slug: "fedex" },
              { name: "DHL", slug: "dhl" },
              { name: "USPS", slug: "usps" },
              { name: "Qatar Cargo", slug: "qatarairways" },
              { name: "Emirates SkyCargo", slug: "emirates" },
            ].map((carrier) => (
              <span
                key={carrier.name}
                className="flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs font-medium text-white/60"
              >
                <img
                  src={`https://cdn.simpleicons.org/${carrier.slug}/ffffff`}
                  alt={`${carrier.name} logo`}
                  className="h-3.5 w-3.5 shrink-0 opacity-70"
                />
                {carrier.name}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {["TNT", "Aramex", "Maersk", "MSC"].map((carrier) => (
              <span
                key={carrier}
                className="rounded-lg border border-white/10 px-3 py-1.5 text-xs font-medium text-white/50"
              >
                {carrier}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-[2fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div className="space-y-4">
            <img
              src="/fxlogisticslogo.png"
              alt="FX Logistics"
              className="h-8 w-auto object-contain brightness-0 invert opacity-80"
            />
            <p className="max-w-xs text-sm leading-relaxed text-white/50">
              Real-time freight tracking and booking for businesses and
              individuals. 150+ carrier networks, one platform.
            </p>
            <p className="text-xs text-white/30">
              1-800-FX-SHIP · Mon–Fri 8am–8pm EST
            </p>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/40">
              Services
            </p>
            <ul className="space-y-3">
              {navigation.services.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/60 transition hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/40">
              Company
            </p>
            <ul className="space-y-3">
              {navigation.company.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/60 transition hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/40">
              Account
            </p>
            <ul className="space-y-3">
              {navigation.account.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/60 transition hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/30">
            © 2026 FX Logistics. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {[
              { label: "Facebook", href: "#",
                icon: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" },
              { label: "LinkedIn", href: "#",
                icon: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z" },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="text-white/30 hover:text-white/70 transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round">
                  <path d={social.icon} />
                </svg>
              </a>
            ))}
          </div>
          <p className="text-xs text-white/30">
            United States · English
          </p>
        </div>
      </div>
    </footer>
  );
}