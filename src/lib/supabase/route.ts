import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

import type { Database } from "@/types/database.types";
import { env, hasSupabaseEnv } from "@/lib/env";

export function createSupabaseRouteClient(
  request: NextRequest,
  response: NextResponse
) {
  if (!hasSupabaseEnv) {
    return null;
  }

  return createServerClient<Database>(env.supabaseUrl!, env.supabaseAnonKey!, {
    cookies: {
      get(name: string) {
        return request.cookies.get(name)?.value;
      },
      set(name: string, value: string, options: Record<string, unknown>) {
        response.cookies.set({
          name,
          value,
          ...options
        });
      },
      remove(name: string, options: Record<string, unknown>) {
        response.cookies.set({
          name,
          value: "",
          ...options,
          maxAge: 0
        });
      }
    }
  });
}
