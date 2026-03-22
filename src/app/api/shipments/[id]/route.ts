import { NextRequest, NextResponse } from "next/server";

import { getAdminSession } from "@/lib/admin-auth";
import { deleteShipment, updateShipment } from "@/lib/repository";
import { shipmentFormSchema } from "@/lib/validation";

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
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

  const { id } = await context.params;
  const shipment = await updateShipment(id, parsed.data);

  if (!shipment) {
    return NextResponse.json({ error: "Shipment not found" }, { status: 404 });
  }

  return NextResponse.json(shipment);
}

export async function DELETE(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const session = await getAdminSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const deleted = await deleteShipment(id);

  if (!deleted) {
    return NextResponse.json({ error: "Shipment not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const methodOverride = (await request.formData()).get("_method");

  if (methodOverride === "DELETE") {
    const session = await getAdminSession();

    if (!session) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    const { id } = await context.params;
    await deleteShipment(id);
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  return NextResponse.json({ error: "Method not supported" }, { status: 405 });
}
