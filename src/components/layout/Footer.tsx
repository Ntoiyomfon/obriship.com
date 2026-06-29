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
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[2fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-xl bg-[--freight] font-display text-sm font-extrabold text-white">
                FX
              </span>
              <span className="font-display text-lg font-bold text-white">
                Logistics
              </span>
            </div>
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
          <p className="text-xs text-white/30">
            United States · English
          </p>
        </div>
      </div>
    </footer>
  );
}