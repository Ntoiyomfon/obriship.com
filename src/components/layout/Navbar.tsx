"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Track" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" }
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isHome = pathname === "/";
  const isTransparent = isHome && !scrolled;

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition duration-300",
        isTransparent
          ? "bg-transparent text-ink"
          : "border-b border-border bg-white/95 text-ink backdrop-blur"
      )}
    >
      <div className="section-shell flex h-20 items-center justify-between">
        <Link href="/" className="font-display text-xl font-extrabold tracking-[-0.05em]">
          Global Tracking
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button
                variant="nav"
                className={cn(isTransparent ? "text-ink hover:text-accent" : "text-ink")}
              >
                {item.label}
              </Button>
            </Link>
          ))}
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "md:hidden",
                isTransparent ? "text-ink hover:bg-ink/5" : "text-ink hover:bg-ink/5"
              )}
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetTitle className="font-display text-2xl font-bold tracking-[-0.04em]">
              Global Tracking
            </SheetTitle>
            <SheetDescription className="text-sm leading-6 text-white/70">
              Precision shipment visibility, built for customers and operations teams.
            </SheetDescription>
            <div className="mt-6 flex flex-col gap-3">
              {navItems.map((item) => (
                <SheetClose key={item.href} asChild>
                  <Link
                    href={item.href}
                    className="rounded-2xl border border-white/10 px-4 py-4 text-lg font-medium transition hover:border-accent hover:text-accent"
                  >
                    {item.label}
                  </Link>
                </SheetClose>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
