import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerClient } from "@supabase/ssr";
import type { CookieOptions } from "@supabase/ssr";

import { RouteMap } from "@/components/map/RouteMap";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { env } from "@/lib/env";
import type { Database } from "@/types/database.types";

async function sendReset(formData: FormData) {
  "use server";

  const email = String(formData.get("email") ?? "").trim();
  const cookieStore = await cookies();

  const supabase = createServerClient<Database>(
    env.supabaseUrl!,
    env.supabaseAnonKey!,
    {
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
    }
  );

  await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${env.siteUrl}/reset-password`
  });

  redirect("/forgot-password?sent=true");
}

export default async function ForgotPasswordPage({
  searchParams
}: {
  searchParams: Promise<{ sent?: string }>;
}) {
  const params = await searchParams;
  const hasSent = params.sent === "true";

  return (
    <main className="grid min-h-dvh bg-white lg:grid-cols-[45fr_55fr]">
      <section className="relative hidden overflow-hidden bg-[--freight-dim] p-10 text-white lg:flex lg:flex-col">
        <p className="font-display text-2xl font-extrabold tracking-tight">
          FX Logistics
        </p>
        <div className="flex flex-1 items-center">
          <h1 className="max-w-lg text-balance font-display text-display text-white">
            Reset your password.
          </h1>
        </div>
        <RouteMap className="absolute bottom-0 left-0 h-72 w-full opacity-55" />
      </section>
      <section className="flex items-center justify-center px-5 py-12 sm:px-8">
        {hasSent ? (
          <div className="w-full max-w-[400px] space-y-6 text-center">
            <div className="space-y-4">
              <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-[--freight-light]">
                <svg
                  className="size-7 text-[--freight]"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                  />
                </svg>
              </div>
              <h2 className="font-display text-title text-[--ink]">
                Reset link sent
              </h2>
              <p className="leading-relaxed text-[--ink-muted]">
                If an account exists for that email, you&apos;ll receive a
                password reset link shortly.
              </p>
            </div>
            <a href="/login">
              <Button type="button" className="h-12 w-full">
                Back to login
              </Button>
            </a>
          </div>
        ) : (
          <form
            action={sendReset}
            className="w-full max-w-[400px] space-y-6"
          >
            <div className="space-y-2">
              <p className="font-display text-2xl font-extrabold tracking-tight text-[--ink] lg:hidden">
                FX Logistics
              </p>
              <h2 className="font-display text-title text-[--ink]">
                Forgot your password?
              </h2>
              <p className="text-sm leading-relaxed text-[--ink-muted]">
                Enter your email address and we&apos;ll send you a link to
                reset your password.
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[--ink]">
                Email address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                spellCheck={false}
                required
              />
            </div>
            <Button type="submit" className="h-12 w-full">
              Send reset link
            </Button>
            <div className="text-center text-sm">
              <a
                href="/login"
                className="font-medium text-[--freight]"
              >
                Back to login
              </a>
            </div>
          </form>
        )}
      </section>
    </main>
  );
}
