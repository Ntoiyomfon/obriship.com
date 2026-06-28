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
  { href: "/", label: "Track" },
  { href: "/book", label: "Book" },
  { href: "/dashboard", label: "Dashboard" }
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const passedHero = useScrollPosition(400);
  const isHome = pathname === "/";
  const compact = !isHome || passedHero;

  return (
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
  );
}
