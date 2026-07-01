"use client";

import { useActionState } from "react";
import Link from "next/link";

import { AuthBrandPanel } from "@/components/auth/AuthBrandPanel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/password-input";

import { signUp, type SignUpState } from "./actions";

export default function RegisterPage() {
  const [state, formAction, pending] = useActionState<SignUpState, FormData>(
    signUp,
    {}
  );

  if (state.success) {
    return (
      <main className="grid min-h-dvh bg-white lg:grid-cols-[45fr_55fr]">
        <AuthBrandPanel tagline="Join thousands shipping with confidence." />
        <section className="flex items-center justify-center px-5 py-12 sm:px-8">
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
                Check your email
              </h2>
              <p className="leading-relaxed text-[--ink-muted]">
                We&apos;ve sent a verification link to{" "}
                <strong className="text-[--ink]">{state.email}</strong>. Click
                the link to activate your account.
              </p>
            </div>
            <Link href="/login">
              <Button type="button" className="h-12 w-full">
                Back to login
              </Button>
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="grid min-h-dvh bg-white lg:grid-cols-[45fr_55fr]">
      <AuthBrandPanel tagline="Join thousands shipping with confidence." />
      <section className="flex items-center justify-center px-5 py-12 sm:px-8">
        <form action={formAction} className="w-full max-w-[400px] space-y-5" noValidate>
          <div className="space-y-2">
            <img
              src="/fxlogisticslogo.png"
              alt="FX Logistics"
              className="mb-2 h-7 w-auto object-contain lg:hidden"
            />
            <h2 className="font-display text-title text-[--ink]">
              Create your account
            </h2>
          </div>

          {state.errors?.general ? (
            <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {state.errors.general}
            </p>
          ) : null}

          <div className="space-y-2">
            <Label htmlFor="full_name" className="text-[--ink]">
              Full name
            </Label>
            <Input
              id="full_name"
              name="full_name"
              type="text"
              autoComplete="name"
              required
            />
            {state.errors?.full_name ? (
              <p className="text-xs text-[--error]">{state.errors.full_name}</p>
            ) : null}
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
            {state.errors?.email ? (
              <p className="text-xs text-[--error]">{state.errors.email}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-[--ink]">
              Password
            </Label>
            <PasswordInput
              id="password"
              name="password"
              autoComplete="new-password"
              required
              minLength={8}
            />
            {state.errors?.password ? (
              <p className="text-xs text-[--error]">
                {state.errors.password}
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm_password" className="text-[--ink]">
              Confirm password
            </Label>
            <PasswordInput
              id="confirm_password"
              name="confirm_password"
              autoComplete="new-password"
              required
            />
            {state.errors?.confirm_password ? (
              <p className="text-xs text-[--error]">
                {state.errors.confirm_password}
              </p>
            ) : null}
          </div>

          <Button
            type="submit"
            className="h-12 w-full"
            disabled={pending}
          >
            {pending ? "Creating account\u2026" : "Create account"}
          </Button>

          <div className="border-t border-[--border] pt-6 text-center text-sm text-[--ink-muted]">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-[--freight]"
            >
              Sign in
            </Link>
          </div>
        </form>
      </section>
    </main>
  );
}
