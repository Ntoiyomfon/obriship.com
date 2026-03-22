import { NextRequest, NextResponse } from "next/server";

import { getAdminSession } from "@/lib/admin-auth";
import { sendStatusEmail } from "@/lib/email";
import { geocodeLocation } from "@/lib/geocode";
import { addStatusUpdate, getShipmentById } from "@/lib/repository";
import { statusUpdateSchema } from "@/lib/validation";

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const session = await getAdminSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = await request.json();
  const parsed = statusUpdateSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid status update" },
      { status: 400 }
    );
  }

  const { id } = await context.params;
  const coordinates = await geocodeLocation(parsed.data.locationName);
  const shipment = await addStatusUpdate(id, parsed.data, {
    lat: coordinates?.lat ?? null,
    lng: coordinates?.lng ?? null
  });

  if (!shipment) {
    return NextResponse.json({ error: "Shipment not found" }, { status: 404 });
  }

  const latestShipment = (await getShipmentById(id)) ?? shipment;
  await sendStatusEmail(latestShipment, parsed.data.status);

  return NextResponse.json(latestShipment);
}
