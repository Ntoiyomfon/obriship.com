"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  LayoutDashboard,
  PackageSearch,
  Settings,
  Truck,
} from "lucide-react";

const items = [
  { label: "Dashboard", href: "/dashboard", Icon: LayoutDashboard },
  { label: "Track Shipment", href: "/dashboard/track", Icon: PackageSearch },
  { label: "Book Shipment", href: "/book", Icon: BookOpen },
  { label: "My Shipments", href: "/dashboard/shipments", Icon: Truck },
  { label: "Settings", href: "/dashboard/settings", Icon: Settings },
] as const;

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="flex-1 space-y-1 px-3">
      {items.map(({ label, href, Icon }) => {
        const isActive =
          pathname === href ||
          (href !== "/dashboard" &&
            href !== "/book" &&
            pathname.startsWith(href));

        return (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition hover:bg-white/10 ${
              isActive
                ? "border-l-2 border-[--freight] bg-white/10 text-white"
                : "text-white/70"
            }`}
          >
            <Icon className="size-4 shrink-0" />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
