import { NextResponse } from "next/server";

import { getShipmentByTrackingId } from "@/lib/repository";

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const shipment = await getShipmentByTrackingId(id);

  if (!shipment) {
    return NextResponse.json({ error: "Shipment not found" }, { status: 404 });
  }

  return NextResponse.json(shipment);
}
