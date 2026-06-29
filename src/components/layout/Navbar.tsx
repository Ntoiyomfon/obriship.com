"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Search, X } from "lucide-react";
import { useState } from "react";
import { TrackingSearchBar } from "@/components/tracking/TrackingSearchBar";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { cn } from "@/lib/utils";

const COUNTRIES = [
  { code: "US", label: "United States", lang: "EN" },
  { code: "GB", label: "United Kingdom", lang: "EN" },
  { code: "CA", label: "Canada", lang: "EN" },
  { code: "AU", label: "Australia", lang: "EN" },
  { code: "DE", label: "Germany", lang: "DE" },
  { code: "FR", label: "France", lang: "FR" },
  { code: "MX", label: "Mexico", lang: "ES" },
  { code: "BR", label: "Brazil", lang: "PT" },
  { code: "IN", label: "India", lang: "EN" },
];

function CountrySelector() {
  const [selected, setSelected] = useState(COUNTRIES[0]);
  const [open, setOpen] = useState(false);

  const flagEmoji = (code: string) => {
    switch (code) {
      case "US": return "🇺🇸";
      case "GB": return "🇬🇧";
      case "CA": return "🇨🇦";
      case "AU": return "🇦🇺";
      case "DE": return "🇩🇪";
      case "FR": return "🇫🇷";
      case "MX": return "🇲🇽";
      case "BR": return "🇧🇷";
      case "IN": return "🇮🇳";
      default: return "🇺🇸";
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-[--ink-muted] hover:bg-[--surface] hover:text-[--ink] transition-colors"
      >
        <span className="text-base leading-none">{flagEmoji(selected.code)}</span>
        <span>{selected.lang}</span>
        <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" className="opacity-50">
          <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </svg>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full z-50 mt-1 w-48 overflow-hidden rounded-xl border border-[--border] bg-white shadow-[0_8px_32px_rgba(0,0,0,0.12)]">
            {COUNTRIES.map((country) => (
              <button
                key={country.code}
                onClick={() => { setSelected(country); setOpen(false); }}
                className={cn(
                  "flex w-full items-center gap-3 px-4 py-2.5 text-sm transition-colors hover:bg-[--surface]",
                  selected.code === country.code
                    ? "text-[--freight] font-medium"
                    : "text-[--ink]"
                )}
              >
                <span>{flagEmoji(country.code)}</span>
                <span>{country.label}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

const navLinks = [
  { href: "/", label: "Tracking" },
  { href: "/book", label: "Book a Shipment" },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const passedHero = useScrollPosition(400);
  const isHome = pathname === "/";
  const compact = !isHome || passedHero;

  return (
    <header className="sticky top-0 z-40 border-b border-[--border] bg-white/95 backdrop-blur">
      <div className="section-shell flex h-16 items-center justify-between gap-6">
        {/* Logo */}
        <Link
          href="/"
          aria-label="FX Logistics home"
          className="flex items-center gap-3 shrink-0"
        >
          <span className="grid size-9 place-items-center rounded-xl bg-[--ink] font-bold text-sm text-white tracking-tight">
            FX
          </span>
          <span className="hidden font-bold text-[--ink] sm:block">
            Logistics
          </span>
        </Link>

        {/* Center: compact tracking bar */}
        <div className="hidden flex-1 max-w-sm md:flex">
          {compact && (
            <TrackingSearchBar variant="compact" autoFocus={false} />
          )}
        </div>

        {/* Right: nav + CTA */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-lg transition-colors hover:bg-[--surface]",
                pathname === item.href
                  ? "text-[--freight]"
                  : "text-[--ink-muted] hover:text-[--ink]"
              )}
            >
              {item.label}
            </Link>
          ))}
          <div className="ml-3 flex items-center gap-2">
            <Link
              href="/login"
              className="px-4 py-2 text-sm font-medium text-[--ink-muted] hover:text-[--ink] transition-colors"
            >
              Log In
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 text-sm font-semibold rounded-lg bg-[--freight] text-white hover:bg-[#b04508] transition-colors"
            >
              Sign Up
            </Link>
            <CountrySelector />
          </div>
        </nav>

        {/* Mobile */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            aria-label="Search"
            onClick={() => setMobileSearchOpen((o) => !o)}
            className="grid size-9 place-items-center rounded-lg hover:bg-[--surface]"
          >
            {mobileSearchOpen ? (
              <X className="size-4" />
            ) : (
              <Search className="size-4" />
            )}
          </button>
          <Sheet>
            <SheetTrigger asChild>
              <button
                aria-label="Open menu"
                className="grid size-9 place-items-center rounded-lg hover:bg-[--surface]"
              >
                <Menu className="size-4" />
              </button>
            </SheetTrigger>
            <SheetContent>
              <SheetTitle className="text-xl font-bold">
                FX Logistics
              </SheetTitle>
              <SheetDescription className="text-sm text-[--ink-muted]">
                Tracking, booking, and freight operations.
              </SheetDescription>
              <div className="mt-6 flex flex-col gap-2">
                {[
                  ...navLinks,
                  { href: "/login", label: "Log In" },
                  { href: "/register", label: "Sign Up" },
                ].map((item) => (
                  <SheetClose key={item.href} asChild>
                    <Link
                      href={item.href}
                      className="rounded-xl border border-[--border] px-4 py-3.5 text-base font-medium transition hover:border-[--freight] hover:text-[--freight]"
                    >
                      {item.label}
                    </Link>
                  </SheetClose>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Mobile search slide-down */}
      <AnimatePresence>
        {mobileSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="border-t border-[--border] px-5 py-3 md:hidden"
          >
            <TrackingSearchBar autoFocus={false} className="w-full" />
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
