import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { BookOpen, LayoutDashboard, LogOut, PackageSearch, Settings, Truck } from "lucide-react";

import { env } from "@/lib/env";
import type { Database } from "@/types/database.types";

const items = [
  ["Dashboard", "/dashboard", LayoutDashboard],
  ["Track Shipment", "/", PackageSearch],
  ["Book Shipment", "/book", BookOpen],
  ["My Shipments", "/dashboard", Truck],
  ["Settings", "/dashboard", Settings]
] as const;

export function Sidebar({ email }: { email: string }) {
  async function signOut() {
    "use server";

    if (!env.supabaseUrl || !env.supabaseAnonKey) {
      redirect("/login");
    }

    const cookieStore = await cookies();
    const supabase = createServerClient<Database>(env.supabaseUrl, env.supabaseAnonKey, {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set({ name, value: "", ...options });
        }
      }
    });

    await supabase.auth.signOut();
    redirect("/login");
  }

  return (
    <aside className="hidden min-h-dvh w-60 shrink-0 bg-[--ink] text-white lg:flex lg:flex-col">
      <div className="p-6 font-display text-2xl font-extrabold tracking-tight">FX</div>
      <nav className="flex-1 space-y-1 px-3">
        {items.map(([label, href, Icon], index) => (
          <Link
            key={`${label}-${index}`}
            href={href}
            className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition hover:bg-white/10 ${
              index === 0 ? "border-l-2 border-[--freight] bg-white/10 text-white" : "text-white/72"
            }`}
          >
            <Icon className="size-4" />
            {label}
          </Link>
        ))}
      </nav>
      <div className="border-t border-white/10 p-4">
        <div className="flex items-center gap-3">
          <div className="grid size-9 place-items-center rounded-xl bg-white/10 font-display font-bold">FX</div>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">{email}</p>
            <form action={signOut}>
              <button type="submit" className="mt-1 inline-flex items-center gap-1 text-xs text-white/55">
                <LogOut className="size-3" />
                Sign out
              </button>
            </form>
          </div>
        </div>
      </div>
    </aside>
  );
}
