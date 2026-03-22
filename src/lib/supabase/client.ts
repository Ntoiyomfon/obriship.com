"use client";

import { createBrowserClient } from "@supabase/ssr";

import type { Database } from "@/types/database.types";
import { env, hasSupabaseEnv } from "@/lib/env";

let client: ReturnType<typeof createBrowserClient<Database>> | null = null;

export function getSupabaseBrowserClient() {
  if (!hasSupabaseEnv) {
    return null;
  }

  if (!client) {
    client = createBrowserClient<Database>(env.supabaseUrl!, env.supabaseAnonKey!);
  }

  return client;
}

