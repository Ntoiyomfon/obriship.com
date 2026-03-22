"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  LogOut,
  Menu,
  PackageOpen,
  PlusCircle
} from "lucide-react";
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

const links = [
  {
    href: "/admin/dashboard",
    label: "Overview",
    icon: LayoutDashboard
  },
  {
    href: "/admin/shipments/new",
    label: "Create Shipment",
    icon: PlusCircle
  }
];

export function AdminSidebar({ email }: { email: string }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  function NavLinks({ mobile = false }: { mobile?: boolean }) {
    return (
      <>
        {links.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          const content = (
            <div
              className={cn(
                "flex items-center rounded-2xl text-sm font-medium transition",
                collapsed && !mobile
                  ? "justify-center px-0 py-3"
                  : "gap-3 px-4 py-3",
                active
                  ? "bg-accent text-ink"
                  : "text-white/70 hover:bg-white/5 hover:text-white"
              )}
              title={collapsed && !mobile ? item.label : undefined}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span className={cn(collapsed && !mobile && "sr-only")}>{item.label}</span>
            </div>
          );

          return mobile ? (
            <SheetClose asChild key={item.href}>
              <Link href={item.href}>{content}</Link>
            </SheetClose>
          ) : (
            <Link key={item.href} href={item.href}>
              {content}
            </Link>
          );
        })}
        {mobile ? (
          <SheetClose asChild>
            <Link href="/">
              <div className="mt-2 flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-white/70 transition hover:bg-white/5 hover:text-white">
                <PackageOpen className="h-4 w-4 shrink-0" />
                <span>Public Tracker</span>
              </div>
            </Link>
          </SheetClose>
        ) : (
          <Link href="/">
            <div
              className={cn(
                "mt-2 flex items-center rounded-2xl text-sm font-medium text-white/70 transition hover:bg-white/5 hover:text-white",
                collapsed ? "justify-center px-0 py-3" : "gap-3 px-4 py-3"
              )}
              title={collapsed ? "Public Tracker" : undefined}
            >
              <PackageOpen className="h-4 w-4 shrink-0" />
              <span className={cn(collapsed && "sr-only")}>Public Tracker</span>
            </div>
          </Link>
        )}
      </>
    );
  }

  return (
    <>
      <div className="sticky top-0 z-30 flex items-center justify-between border-b border-white/10 bg-ink px-4 py-4 text-white lg:hidden">
        <div>
          <p className="section-label text-white/45">Shipment Operations</p>
          <h2 className="mt-1 font-display text-xl font-bold tracking-[-0.04em]">
            Orbis
          </h2>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10 hover:text-white"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open admin navigation</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="max-w-[18rem]">
            <SheetTitle className="font-display text-2xl font-bold tracking-[-0.04em]">
              Orbis
            </SheetTitle>
            <SheetDescription className="text-sm leading-6 text-white/65">
              {email}
            </SheetDescription>
            <nav className="flex flex-1 flex-col gap-2">
              <NavLinks mobile />
            </nav>
            <form action="/api/admin/logout" method="post">
              <Button
                type="submit"
                variant="secondary"
                className="w-full border-white/15 text-white hover:bg-white hover:text-ink"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </form>
          </SheetContent>
        </Sheet>
      </div>

      <aside
        className={cn(
          "hidden min-h-screen shrink-0 flex-col border-r border-white/10 bg-ink text-white transition-[width] duration-200 lg:flex",
          collapsed ? "w-24" : "w-72"
        )}
      >
        <div
          className={cn(
            "border-b border-white/10",
            collapsed ? "px-3 py-5" : "px-6 py-6"
          )}
        >
          <div className={cn("flex items-start", collapsed ? "justify-center" : "justify-between")}>
            <div className={cn(collapsed && "sr-only")}>
              <p className="section-label text-white/50">Shipment Operations</p>
              <h2 className="mt-2 font-display text-2xl font-bold tracking-[-0.04em]">
                Orbis
              </h2>
              <p className="mt-3 text-sm text-white/60">{email}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-white/70 hover:bg-white/10 hover:text-white"
              onClick={() => setCollapsed((value) => !value)}
            >
              {collapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
              <span className="sr-only">
                {collapsed ? "Expand sidebar" : "Collapse sidebar"}
              </span>
            </Button>
          </div>
          {collapsed ? (
            <div className="mt-4 flex justify-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 text-lg font-display font-bold">
                O
              </div>
            </div>
          ) : null}
        </div>
        <nav className="flex flex-1 flex-col gap-2 px-4 py-6">
          <NavLinks />
        </nav>
        <div className="border-t border-white/10 px-4 py-4">
          <form action="/api/admin/logout" method="post">
            <Button
              type="submit"
              variant="secondary"
              className={cn(
                "border-white/15 text-white hover:bg-white hover:text-ink",
                collapsed ? "w-14 px-0" : "w-full"
              )}
              title={collapsed ? "Sign Out" : undefined}
            >
              <LogOut className={cn("h-4 w-4", !collapsed && "mr-2")} />
              <span className={cn(collapsed && "sr-only")}>Sign Out</span>
            </Button>
          </form>
        </div>
      </aside>
    </>
  );
}
