"use server";

import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import type { CookieOptions } from "@supabase/ssr";

import type { Database } from "@/types/database.types";
import { env } from "@/lib/env";

export type SignUpState = {
  errors?: {
    full_name?: string;
    email?: string;
    password?: string;
    confirm_password?: string;
    general?: string;
  };
  success?: boolean;
  email?: string;
};

export async function signUp(
  _prevState: SignUpState,
  formData: FormData
): Promise<SignUpState> {
  const fullName = String(formData.get("full_name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const confirmPassword = String(formData.get("confirm_password") ?? "");

  const errors: SignUpState["errors"] = {};

  if (!fullName) {
    errors.full_name = "Full name is required";
  }

  if (!email) {
    errors.email = "Email address is required";
  }

  if (!password) {
    errors.password = "Password is required";
  } else if (password.length < 8) {
    errors.password = "Password must be at least 8 characters";
  }

  if (!confirmPassword) {
    errors.confirm_password = "Please confirm your password";
  } else if (password !== confirmPassword) {
    errors.confirm_password = "Passwords do not match";
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

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

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName }
    }
  });

  if (error) {
    return {
      errors: { general: "Could not create account. Please try again." }
    };
  }

  return { success: true, email };
}
