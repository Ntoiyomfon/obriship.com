import "server-only";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { getSupabaseServerClient } from "@/lib/supabase/server";

const ADMIN_COOKIE = "tracking-admin-session";

export async function getAdminSession() {
  const cookieStore = await cookies();

  if (cookieStore.get(ADMIN_COOKIE)?.value === "1") {
    return { email: "Operations Preview", fallback: true };
  }

  const supabase = await getSupabaseServerClient();

  if (!supabase) {
    return null;
  }

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user?.email) {
    return null;
  }

  return { email: user.email, fallback: false };
}

export async function requireAdminSession() {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  return session;
}

export async function createFallbackAdminSession() {
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE, "1", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/"
  });
}

export async function clearFallbackAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE);
}
