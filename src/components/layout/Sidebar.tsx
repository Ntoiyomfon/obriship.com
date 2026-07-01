import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { LogOut } from "lucide-react";

import { env } from "@/lib/env";
import { SidebarNav } from "@/components/layout/SidebarNav";
import type { Database } from "@/types/database.types";

export function Sidebar({
  email,
}: {
  email: string;
}) {
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
      <SidebarNav />
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
