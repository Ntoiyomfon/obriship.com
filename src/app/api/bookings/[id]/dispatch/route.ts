import { NextRequest, NextResponse } from "next/server";

import { getAdminSession } from "@/lib/admin-auth";
import {
  convertBookingToShipment,
  updateBookingStatus
} from "@/lib/repository";
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

  // Get booking by id
  const supabase = getSupabaseAdminClient();

  if (!supabase) {
    return NextResponse.json(
      { error: "Admin database client not available" },
      { status: 500 }
    );
  }

  const { data: booking } = await supabase
    .from("bookings")
    .select("*")
    .eq("id", id)
    .single();

  if (!booking) {
    return NextResponse.json({ error: "Booking not found" }, { status: 404 });
  }

  // Convert to shipment first
  await convertBookingToShipment(booking);

  // Then update status
  await updateBookingStatus(id, "dispatched");

  return NextResponse.json({ success: true });
}
