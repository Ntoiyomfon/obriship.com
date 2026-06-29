"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Search, X } from "lucide-react";
import { useState } from "react";

import { TrackingSearchBar } from "@/components/tracking/TrackingSearchBar";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Tracking" },
  { href: "/book", label: "Book a Shipment" },
  { href: "/services", label: "Services" }
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const passedHero = useScrollPosition(400);
  const isHome = pathname === "/";
  const compact = !isHome || passedHero;
  const isAuthPage = pathname === "/login" || pathname === "/register";

  return (
    <>
      {/* Tier 1 – Utility bar */}
      <div className="hidden md:block bg-[--freight-dim]">
        <div className="mx-auto flex h-9 max-w-[1200px] items-center justify-between px-5 sm:px-8 lg:px-10">
          <span className="flex items-center gap-2 text-xs text-white/60">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 .18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.16 6.16l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
            </svg>
            <span>1-800-FX-SHIP · Mon–Fri 8am–8pm EST</span>
          </span>
          <div className="flex items-center gap-4">
            <Link href="/support" className="text-xs text-white/60 hover:text-white transition-colors">
              Support
            </Link>
            <Link href="/login" className="text-xs text-white/60 hover:text-white transition-colors">
              Log In
            </Link>
            <Link
              href="/register"
              className="text-xs bg-[--freight] text-white px-3 py-1 rounded-md font-medium hover:bg-[#b04508] transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>

      {/* Tier 2 – Main nav */}
      <header className="sticky top-0 z-40 border-b border-[--border] bg-white/95 text-[--ink] backdrop-blur">
        <div className="section-shell flex min-h-16 items-center justify-between gap-4 py-2">
          <motion.div layout transition={{ duration: 0.18, ease: "easeOut" }}>
            <Link
              href="/"
              aria-label="FX Logistics home"
              className={cn(
                "inline-flex items-center font-display font-extrabold tracking-tight",
                compact ? "text-lg" : "text-xl"
              )}
            >
              <span className="grid size-9 place-items-center rounded-xl bg-[--ink] text-white">FX</span>
              {!compact ? <span className="ml-3 hidden sm:inline">Logistics</span> : null}
            </Link>
          </motion.div>

          <motion.div layout className="hidden flex-1 justify-center md:flex" transition={{ duration: 0.18, ease: "easeOut" }}>
            {compact ? <TrackingSearchBar variant="compact" autoFocus={false} /> : null}
          </motion.div>

          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="nav"
                  className={cn(pathname === item.href && "text-[--freight]")}
                >
                  {item.label}
                </Button>
              </Link>
            ))}
            {/* TODO: Hide when user is authenticated */}
            {!isAuthPage && (
              <Link href="/register">
                <Button className="bg-[--freight] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#b04508] transition-colors">
                  Sign Up
                </Button>
              </Link>
            )}
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <Button
              variant="ghost"
              size="icon"
              aria-label={mobileSearchOpen ? "Close tracking search" : "Open tracking search"}
              onClick={() => setMobileSearchOpen((open) => !open)}
            >
              {mobileSearchOpen ? <X className="size-5" /> : <Search className="size-5" />}
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open menu">
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetTitle className="font-display text-2xl font-bold tracking-tight">
                  FX Logistics
                </SheetTitle>
                <SheetDescription className="text-sm leading-6 text-white/70">
                  Tracking, booking, and shipment operations.
                </SheetDescription>
                <div className="mt-6 flex flex-col gap-3">
                  {navItems.map((item) => (
                    <SheetClose key={item.href} asChild>
                      <Link
                        href={item.href}
                        className="rounded-xl border border-white/10 px-4 py-4 text-lg font-medium transition hover:border-[--freight] hover:text-[--freight]"
                      >
                        {item.label}
                      </Link>
                    </SheetClose>
                  ))}
                  <SheetClose asChild>
                    <Link
                      href="/login"
                      className="rounded-xl border border-white/10 px-4 py-4 text-lg font-medium transition hover:border-[--freight] hover:text-[--freight]"
                    >
                      Log In
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      href="/register"
                      className="rounded-xl bg-[--freight] px-4 py-4 text-center text-lg font-semibold text-white transition hover:bg-[#b04508]"
                    >
                      Sign Up
                    </Link>
                  </SheetClose>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        <AnimatePresence>
          {mobileSearchOpen ? (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.16, ease: "easeOut" }}
              className="border-t border-[--border] px-5 py-3 md:hidden"
            >
              <TrackingSearchBar autoFocus={false} className="w-full" />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </header>
    </>
  );
}
