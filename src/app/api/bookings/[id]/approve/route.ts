import { NextRequest, NextResponse } from "next/server";

import { getAdminSession } from "@/lib/admin-auth";
import { updateBookingStatus } from "@/lib/repository";
import { sendBookingEmail } from "@/lib/email";
import { getSupabaseAdminClient } from "@/lib/supabase/server";

export async function POST(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const session = await getAdminSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;

  // Fetch booking for the sender email
  const supabase = getSupabaseAdminClient();

  if (!supabase) {
    return NextResponse.json(
      { error: "Admin client unavailable" },
      { status: 500 }
    );
  }

  const { data: booking } = await supabase
    .from("bookings")
    .select("*")
    .eq("id", id)
    .single();

  // Update status first
  await updateBookingStatus(id, "processing");

  // Send email (non-fatal if fails)
  if (booking) {
    const sender = booking.sender as Record<string, string> | null;
    const senderEmail = sender?.email ?? null;
    const senderName =
      sender?.name ?? sender?.full_name ?? sender?.firstName ?? "Customer";

    try {
      if (senderEmail) {
        await sendBookingEmail(
          booking.tracking_id ?? "",
          senderEmail,
          senderName,
          "approved"
        );
      }
    } catch {
      // email failure is non-fatal
    }
  }

  return NextResponse.json({ success: true });
}
