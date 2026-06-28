"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, LayoutDashboard, PackageSearch, Settings, Truck } from "lucide-react";

import { cn } from "@/lib/utils";

const items = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/", label: "Track", icon: PackageSearch },
  { href: "/book", label: "Book", icon: BookOpen },
  { href: "/dashboard", label: "Shipments", icon: Truck },
  { href: "/dashboard", label: "Settings", icon: Settings }
];

export function MobileDashboardNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Dashboard navigation" className="fixed inset-x-0 bottom-0 z-40 border-t border-[--border] bg-white px-2 pb-[env(safe-area-inset-bottom)] md:hidden">
      <div className="grid h-16 grid-cols-5">
        {items.map((item, index) => {
          const Icon = item.icon;
          const active = pathname === item.href && (item.href !== "/dashboard" || index === 0);

          return (
            <Link
              key={`${item.label}-${index}`}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex flex-col items-center justify-center gap-1 text-[0.68rem] font-medium text-[--ink-muted] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[--focus]",
                active && "text-[--freight]"
              )}
            >
              <Icon className="size-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
