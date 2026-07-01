import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerClient } from "@supabase/ssr";
import type { CookieOptions } from "@supabase/ssr";

import { AuthBrandPanel } from "@/components/auth/AuthBrandPanel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/password-input";
import { env } from "@/lib/env";
import type { Database } from "@/types/database.types";

async function signIn(formData: FormData) {
  "use server";

  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const cookieStore = await cookies();

  const supabase = createServerClient<Database>(env.supabaseUrl!, env.supabaseAnonKey!, {
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

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    redirect("/login?error=invalid");
  }

  redirect("/dashboard");
}

export default async function LoginPage({
  searchParams
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  const hasError = params.error === "invalid";

  return (
    <main className="grid min-h-dvh bg-white lg:grid-cols-[45fr_55fr]">
      <AuthBrandPanel tagline="Every shipment, accounted for." />
      <section className="flex items-center justify-center px-5 py-12 sm:px-8">
        <form action={signIn} className="w-full max-w-[400px] space-y-6">
          <div className="space-y-2">
            <img
              src="/fxlogisticslogo.png"
              alt="FX Logistics"
              className="mb-2 h-7 w-auto object-contain lg:hidden"
            />
            <h2 className="font-display text-title text-[--ink]">Sign in to your account</h2>
          </div>
          {hasError ? (
            <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              Invalid email or password.
            </p>
          ) : null}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-[--ink]">
              Email
            </Label>
            <Input id="email" name="email" type="email" autoComplete="email" spellCheck={false} required />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-4">
              <Label htmlFor="password" className="text-[--ink]">
                Password
              </Label>
              <a href="/forgot-password" className="text-sm font-medium text-[--freight]">
                Forgot password?
              </a>
            </div>
            <PasswordInput id="password" name="password" autoComplete="current-password" required />
          </div>
          <Button type="submit" className="h-12 w-full">
            Sign in
          </Button>
          <div className="border-t border-[--border] pt-6 text-center text-sm text-[--ink-muted]">
            Don't have an account?{" "}
            <a href="/register" className="font-semibold text-[--freight]">
              Create one
            </a>
          </div>
        </form>
      </section>
    </main>
  );
}
