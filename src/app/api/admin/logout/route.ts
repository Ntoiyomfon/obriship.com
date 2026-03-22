import { NextRequest, NextResponse } from "next/server";

import { clearFallbackAdminSession } from "@/lib/admin-auth";
import { hasSupabaseEnv } from "@/lib/env";
import { createSupabaseRouteClient } from "@/lib/supabase/route";

export async function POST(request: NextRequest) {
  await clearFallbackAdminSession();

  if (!hasSupabaseEnv) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  const response = NextResponse.redirect(new URL("/admin/login", request.url));
  const supabase = createSupabaseRouteClient(request, response);

  if (supabase) {
    await supabase.auth.signOut();
  }

  return response;
}
