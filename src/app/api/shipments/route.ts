import { NextRequest, NextResponse } from "next/server";

import { getAdminSession } from "@/lib/admin-auth";
import { createShipment, listShipments } from "@/lib/repository";
import { shipmentFormSchema } from "@/lib/validation";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const response = await listShipments({
    query: searchParams.get("query") ?? undefined,
    status: (searchParams.get("status") as never) ?? "ALL",
    page: searchParams.get("page") ? Number(searchParams.get("page")) : 1
  });

  return NextResponse.json(response);
}

export async function POST(request: NextRequest) {
  const session = await getAdminSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = await request.json();
  const parsed = shipmentFormSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid shipment payload" },
      { status: 400 }
    );
  }

  const shipment = await createShipment(parsed.data);
  return NextResponse.json(shipment, { status: 201 });
}
