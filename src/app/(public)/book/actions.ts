"use server";

import { randomBytes } from "node:crypto";

import { getSupabaseAdminClient, getSupabaseServerClient } from "@/lib/supabase/server";

type BookingPayload = {
  sender: Record<string, string>;
  receiver: Record<string, string>;
  package: Record<string, string>;
  service: string;
};

type BookingResult =
  | { ok: true; trackingId: string }
  | { ok: false; error: string };

function generateBookingTrackingId() {
  const date = new Date().toISOString().slice(0, 10).replaceAll("-", "");
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const bytes = randomBytes(5);
  const suffix = Array.from(bytes, (byte) => alphabet[byte % alphabet.length]).join("");

  return `FX-${date}-${suffix}`;
}

export async function createBooking(payload: BookingPayload): Promise<BookingResult> {
  // Get user from the standard server client (uses cookies/auth session)
  const supabaseClient = await getSupabaseServerClient();
  const { data: { user } } = supabaseClient
    ? await supabaseClient.auth.getUser()
    : { data: { user: null } };

  const supabase = getSupabaseAdminClient();

  if (!supabase) {
    return {
      ok: false,
      error: "Booking cannot be confirmed because Supabase admin credentials are not configured."
    };
  }

  const trackingId = generateBookingTrackingId();

  const { error } = await supabase.from("bookings").insert({
    user_id: user?.id ?? null,
    tracking_id: trackingId,
    status: "pending",
    sender: payload.sender,
    receiver: payload.receiver,
    package: payload.package,
    service: payload.service
  });

  if (error) {
    return {
      ok: false,
      error: "Unable to confirm booking. Please check the shipment details and try again."
    };
  }

  return {
    ok: true,
    trackingId
  };
}
