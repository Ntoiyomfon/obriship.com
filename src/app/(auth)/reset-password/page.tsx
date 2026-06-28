"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { RouteMap } from "@/components/map/RouteMap";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [sessionReady, setSessionReady] = useState(false);
  const [sessionError, setSessionError] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<{
    password?: string;
    confirm_password?: string;
    general?: string;
  }>({});
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      setSessionError(true);
      return;
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setSessionReady(true);
      } else {
        setSessionError(true);
      }
    });
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setErrors({});

      const fieldErrors: typeof errors = {};

      if (!password) {
        fieldErrors.password = "New password is required";
      } else if (password.length < 8) {
        fieldErrors.password =
          "Password must be at least 8 characters";
      }

      if (!confirmPassword) {
        fieldErrors.confirm_password = "Please confirm your password";
      } else if (password !== confirmPassword) {
        fieldErrors.confirm_password = "Passwords do not match";
      }

      if (Object.keys(fieldErrors).length > 0) {
        setErrors(fieldErrors);
        return;
      }

      setSubmitting(true);

      const supabase = getSupabaseBrowserClient();
      if (!supabase) {
        setErrors({
          general:
            "Could not connect to authentication service. Please try again."
        });
        setSubmitting(false);
        return;
      }

      const { error } = await supabase.auth.updateUser({
        password
      });

      if (error) {
        setErrors({
          general:
            "Could not update password. Your reset link may have expired. Request a new one."
        });
        setSubmitting(false);
        return;
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    },
    [password, confirmPassword, router]
  );

  if (sessionError) {
    return (
      <main className="grid min-h-dvh bg-white lg:grid-cols-[45fr_55fr]">
        <section className="relative hidden overflow-hidden bg-[--freight-dim] p-10 text-white lg:flex lg:flex-col">
          <p className="font-display text-2xl font-extrabold tracking-tight">
            FX Logistics
          </p>
          <div className="flex flex-1 items-center">
            <h1 className="max-w-lg text-balance font-display text-display text-white">
              Choose a new password.
            </h1>
          </div>
          <RouteMap className="absolute bottom-0 left-0 h-72 w-full opacity-55" />
        </section>
        <section className="flex items-center justify-center px-5 py-12 sm:px-8">
          <div className="w-full max-w-[400px] space-y-6 text-center">
            <h2 className="font-display text-title text-[--ink]">
              Link expired or invalid
            </h2>
            <p className="leading-relaxed text-[--ink-muted]">
              Your password reset link may have expired. Request a new one
              below.
            </p>
            <Link href="/forgot-password">
              <Button type="button" className="h-12 w-full">
                Request new link
              </Button>
            </Link>
            <div className="text-center text-sm">
              <Link
                href="/login"
                className="font-medium text-[--freight]"
              >
                Back to login
              </Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  if (success) {
    return (
      <main className="grid min-h-dvh bg-white lg:grid-cols-[45fr_55fr]">
        <section className="relative hidden overflow-hidden bg-[--freight-dim] p-10 text-white lg:flex lg:flex-col">
          <p className="font-display text-2xl font-extrabold tracking-tight">
            FX Logistics
          </p>
          <div className="flex flex-1 items-center">
            <h1 className="max-w-lg text-balance font-display text-display text-white">
              Choose a new password.
            </h1>
          </div>
          <RouteMap className="absolute bottom-0 left-0 h-72 w-full opacity-55" />
        </section>
        <section className="flex items-center justify-center px-5 py-12 sm:px-8">
          <div className="w-full max-w-[400px] space-y-6 text-center">
            <div className="space-y-4">
              <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-green-100">
                <svg
                  className="size-7 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m4.5 12.75 6 6 9-13.5"
                  />
                </svg>
              </div>
              <h2 className="font-display text-title text-[--ink]">
                Password updated
              </h2>
              <p className="leading-relaxed text-[--ink-muted]">
                Password updated. Redirecting&hellip;
              </p>
            </div>
          </div>
        </section>
      </main>
    );
  }

  if (!sessionReady) {
    return (
      <main className="grid min-h-dvh bg-white lg:grid-cols-[45fr_55fr]">
        <section className="relative hidden overflow-hidden bg-[--freight-dim] p-10 text-white lg:flex lg:flex-col">
          <p className="font-display text-2xl font-extrabold tracking-tight">
            FX Logistics
          </p>
          <div className="flex flex-1 items-center">
            <h1 className="max-w-lg text-balance font-display text-display text-white">
              Choose a new password.
            </h1>
          </div>
          <RouteMap className="absolute bottom-0 left-0 h-72 w-full opacity-55" />
        </section>
        <section className="flex items-center justify-center px-5 py-12 sm:px-8">
          <div className="w-full max-w-[400px] text-center">
            <p className="text-[--ink-muted]">
              Verifying your reset link&hellip;
            </p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="grid min-h-dvh bg-white lg:grid-cols-[45fr_55fr]">
      <section className="relative hidden overflow-hidden bg-[--freight-dim] p-10 text-white lg:flex lg:flex-col">
        <p className="font-display text-2xl font-extrabold tracking-tight">
          FX Logistics
        </p>
        <div className="flex flex-1 items-center">
          <h1 className="max-w-lg text-balance font-display text-display text-white">
            Choose a new password.
          </h1>
        </div>
        <RouteMap className="absolute bottom-0 left-0 h-72 w-full opacity-55" />
      </section>
      <section className="flex items-center justify-center px-5 py-12 sm:px-8">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-[400px] space-y-5"
        >
          <div className="space-y-2">
            <p className="font-display text-2xl font-extrabold tracking-tight text-[--ink] lg:hidden">
              FX Logistics
            </p>
            <h2 className="font-display text-title text-[--ink]">
              Reset your password
            </h2>
          </div>

          {errors.general ? (
            <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {errors.general}
            </p>
          ) : null}

          <div className="space-y-2">
            <Label htmlFor="password" className="text-[--ink]">
              New password
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password ? (
              <p className="text-xs text-[--error]">
                {errors.password}
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm_password" className="text-[--ink]">
              Confirm password
            </Label>
            <Input
              id="confirm_password"
              name="confirm_password"
              type="password"
              autoComplete="new-password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {errors.confirm_password ? (
              <p className="text-xs text-[--error]">
                {errors.confirm_password}
              </p>
            ) : null}
          </div>

          <Button
            type="submit"
            className="h-12 w-full"
            disabled={submitting}
          >
            {submitting ? "Updating password\u2026" : "Reset password"}
          </Button>

          <div className="text-center text-sm">
            <Link
              href="/login"
              className="font-medium text-[--freight]"
            >
              Back to login
            </Link>
          </div>
        </form>
      </section>
    </main>
  );
}
