import { NextRequest, NextResponse } from "next/server";

import { createFallbackAdminSession } from "@/lib/admin-auth";
import { hasSupabaseEnv } from "@/lib/env";
import { createSupabaseRouteClient } from "@/lib/supabase/route";
import { loginSchema } from "@/lib/validation";

export async function POST(request: NextRequest) {
  const payload = await request.json();
  const parsed = loginSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid login payload" },
      { status: 400 }
    );
  }

  if (!hasSupabaseEnv) {
    if (
      parsed.data.email === "admin@tracking.local" &&
      parsed.data.password === "demo-admin"
    ) {
      await createFallbackAdminSession();
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Use the local demo credentials" }, { status: 401 });
  }

  const response = NextResponse.json({ success: true });
  const supabase = createSupabaseRouteClient(request, response);

  if (!supabase) {
    return NextResponse.json({ error: "Supabase is not configured" }, { status: 500 });
  }

  const { error } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }

  return response;
}
