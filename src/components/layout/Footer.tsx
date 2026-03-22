import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-white py-10">
      <div className="section-shell flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <p className="font-display text-lg font-bold text-ink">Global Tracking Platform</p>
          <p className="max-w-md text-sm leading-6 text-muted">
            Premium shipment visibility for cross-border logistics teams and customers.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-muted">
          <Link href="/" className="transition hover:text-ink">
            Track
          </Link>
          <a href="#about" className="transition hover:text-ink">
            About
          </a>
          <a href="#contact" className="transition hover:text-ink">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}

