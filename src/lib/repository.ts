import "server-only";
import { randomUUID } from "node:crypto";

import {
  getMockShipmentByTrackingId,
  getMockShipmentWithLogs,
  mockShipments,
  mockStatusLogs
} from "@/lib/mock-data";
import { generateTrackingId } from "@/lib/tracking-id";
import { createId } from "@/lib/utils";
import { getSupabaseAdminClient } from "@/lib/supabase/server";
import type { Database } from "@/types/database.types";
import type {
  CreateShipmentInput,
  Shipment,
  ShipmentFilters,
  ShipmentListResponse,
  ShipmentWithLogs,
  StatusLog,
  StatusUpdateInput,
  UpdateShipmentInput
} from "@/types/shipment";

type ShipmentRow = Database["public"]["Tables"]["shipments"]["Row"];
type ShipmentInsert = Database["public"]["Tables"]["shipments"]["Insert"];
type ShipmentUpdate = Database["public"]["Tables"]["shipments"]["Update"];
type StatusLogRow = Database["public"]["Tables"]["status_logs"]["Row"];
type StatusLogInsert = Database["public"]["Tables"]["status_logs"]["Insert"];

function normalizeShipmentRow(row: ShipmentRow): Shipment {
  return {
    id: row.id,
    trackingId: row.tracking_id,
    senderName: row.sender_name,
    senderCountry: row.sender_country,
    recipientName: row.recipient_name,
    recipientCountry: row.recipient_country,
    recipientEmail: row.recipient_email,
    serviceType: row.service_type as Shipment["serviceType"],
    weightKg: row.weight_kg,
    description: row.description,
    currentStatus: row.current_status as Shipment["currentStatus"],
    currentLocation: row.current_location,
    currentLat: row.current_lat,
    currentLng: row.current_lng,
    estimatedDelivery: row.estimated_delivery,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

function normalizeStatusLogRow(row: StatusLogRow): StatusLog {
  return {
    id: row.id,
    shipmentId: row.shipment_id,
    status: row.status as StatusLog["status"],
    locationName: row.location_name,
    lat: row.lat,
    lng: row.lng,
    note: row.note,
    createdAt: row.created_at
  };
}

function filterShipments(items: Shipment[], filters: ShipmentFilters) {
  const normalizedQuery = filters.query?.trim().toLowerCase();

  return items.filter((shipment) => {
    const matchesStatus =
      !filters.status || filters.status === "ALL" || shipment.currentStatus === filters.status;
    const matchesQuery =
      !normalizedQuery ||
      shipment.trackingId.toLowerCase().includes(normalizedQuery) ||
      shipment.recipientName.toLowerCase().includes(normalizedQuery);

    return matchesStatus && matchesQuery;
  });
}

export async function listShipments(filters: ShipmentFilters = {}): Promise<ShipmentListResponse> {
  const page = filters.page ?? 1;
  const pageSize = filters.pageSize ?? 8;
  const supabase = getSupabaseAdminClient();

  if (!supabase) {
    const filtered = filterShipments([...mockShipments].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)), filters);
    const start = (page - 1) * pageSize;
    const items = filtered.slice(start, start + pageSize);

    return {
      items,
      total: filtered.length,
      page,
      pageSize,
      pageCount: Math.max(1, Math.ceil(filtered.length / pageSize))
    };
  }

  let query = supabase
    .from("shipments")
    .select("*", { count: "exact" })
    .order("updated_at", { ascending: false });

  if (filters.status && filters.status !== "ALL") {
    query = query.eq("current_status", filters.status);
  }

  if (filters.query?.trim()) {
    query = query.or(
      `tracking_id.ilike.%${filters.query.trim()}%,recipient_name.ilike.%${filters.query.trim()}%`
    );
  }

  const start = (page - 1) * pageSize;
  const end = start + pageSize - 1;
  const { data, count } = await query.range(start, end);
  const rows = (data ?? []) as ShipmentRow[];

  return {
    items: rows.map(normalizeShipmentRow),
    total: count ?? 0,
    page,
    pageSize,
    pageCount: Math.max(1, Math.ceil((count ?? 0) / pageSize))
  };
}

export async function getShipmentByTrackingId(trackingId: string): Promise<ShipmentWithLogs | null> {
  const supabase = getSupabaseAdminClient();

  if (!supabase) {
    return getMockShipmentByTrackingId(trackingId);
  }

  const { data } = await supabase
    .from("shipments")
    .select("*")
    .ilike("tracking_id", trackingId)
    .maybeSingle();
  const shipmentRow = data as ShipmentRow | null;

  if (!shipmentRow) {
    return null;
  }

  const { data: logData } = await supabase
    .from("status_logs")
    .select("*")
    .eq("shipment_id", shipmentRow.id)
    .order("created_at", { ascending: false });
  const logRows = (logData ?? []) as StatusLogRow[];

  return {
    ...normalizeShipmentRow(shipmentRow),
    statusLogs: logRows.map(normalizeStatusLogRow)
  };
}

export async function getShipmentById(id: string): Promise<ShipmentWithLogs | null> {
  const supabase = getSupabaseAdminClient();

  if (!supabase) {
    return getMockShipmentWithLogs(id);
  }

  const { data } = await supabase
    .from("shipments")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  const shipmentRow = data as ShipmentRow | null;

  if (!shipmentRow) {
    return null;
  }

  const { data: logData } = await supabase
    .from("status_logs")
    .select("*")
    .eq("shipment_id", id)
    .order("created_at", { ascending: false });
  const logRows = (logData ?? []) as StatusLogRow[];

  return {
    ...normalizeShipmentRow(shipmentRow),
    statusLogs: logRows.map(normalizeStatusLogRow)
  };
}

export async function createShipment(input: CreateShipmentInput): Promise<ShipmentWithLogs> {
  const now = new Date().toISOString();
  const shipment: Shipment = {
    id: randomUUID(),
    trackingId: generateTrackingId(),
    senderName: input.senderName,
    senderCountry: input.senderCountry,
    recipientName: input.recipientName,
    recipientCountry: input.recipientCountry,
    recipientEmail: input.recipientEmail,
    serviceType: input.serviceType,
    weightKg: input.weightKg ?? null,
    description: input.description ?? null,
    currentStatus: "ORDER_PLACED",
    currentLocation: input.senderCountry,
    currentLat: null,
    currentLng: null,
    estimatedDelivery: input.estimatedDelivery ?? null,
    createdAt: now,
    updatedAt: now
  };

  const initialLog: StatusLog = {
    id: randomUUID(),
    shipmentId: shipment.id,
    status: "ORDER_PLACED",
    locationName: input.senderCountry,
    lat: null,
    lng: null,
    note: "Shipment created by admin.",
    createdAt: now
  };

  const supabase = getSupabaseAdminClient();

  if (!supabase) {
    mockShipments.unshift(shipment);
    mockStatusLogs.unshift(initialLog);
    return { ...shipment, statusLogs: [initialLog] };
  }

  const { data: shipmentRow, error: shipmentError } = await supabase
    .from("shipments")
    .insert({
      id: shipment.id,
      tracking_id: shipment.trackingId,
      sender_name: shipment.senderName,
      sender_country: shipment.senderCountry,
      recipient_name: shipment.recipientName,
      recipient_country: shipment.recipientCountry,
      recipient_email: shipment.recipientEmail,
      service_type: shipment.serviceType,
      weight_kg: shipment.weightKg,
      description: shipment.description,
      current_status: shipment.currentStatus,
      current_location: shipment.currentLocation,
      current_lat: shipment.currentLat,
      current_lng: shipment.currentLng,
      estimated_delivery: shipment.estimatedDelivery,
      created_at: shipment.createdAt,
      updated_at: shipment.updatedAt
    } satisfies ShipmentInsert)
    .select("*")
    .single();

  if (shipmentError || !shipmentRow) {
    throw new Error("Unable to create shipment");
  }
  const createdShipmentRow = shipmentRow as ShipmentRow;

  await supabase.from("status_logs").insert({
    id: initialLog.id,
    shipment_id: shipment.id,
    status: initialLog.status,
    location_name: initialLog.locationName,
    lat: initialLog.lat,
    lng: initialLog.lng,
    note: initialLog.note,
    created_at: initialLog.createdAt
  } satisfies StatusLogInsert);

  return {
    ...normalizeShipmentRow(createdShipmentRow),
    statusLogs: [initialLog]
  };
}

export async function updateShipment(id: string, updates: UpdateShipmentInput) {
  const supabase = getSupabaseAdminClient();
  const compactUpdates = Object.fromEntries(
    Object.entries(updates).filter(([, value]) => value !== undefined)
  ) as UpdateShipmentInput;

  if (!supabase) {
    const shipment = mockShipments.find((entry) => entry.id === id);

    if (!shipment) {
      return null;
    }

    Object.assign(shipment, compactUpdates, {
      updatedAt: new Date().toISOString()
    });

    return getMockShipmentWithLogs(id);
  }

  const { data: shipmentRow } = await supabase
    .from("shipments")
    .update({
      ...(compactUpdates.senderName !== undefined
        ? { sender_name: compactUpdates.senderName }
        : {}),
      ...(compactUpdates.senderCountry !== undefined
        ? { sender_country: compactUpdates.senderCountry }
        : {}),
      ...(compactUpdates.recipientName !== undefined
        ? { recipient_name: compactUpdates.recipientName }
        : {}),
      ...(compactUpdates.recipientCountry !== undefined
        ? { recipient_country: compactUpdates.recipientCountry }
        : {}),
      ...(compactUpdates.recipientEmail !== undefined
        ? { recipient_email: compactUpdates.recipientEmail }
        : {}),
      ...(compactUpdates.serviceType !== undefined
        ? { service_type: compactUpdates.serviceType }
        : {}),
      ...(compactUpdates.weightKg !== undefined
        ? { weight_kg: compactUpdates.weightKg }
        : {}),
      ...(compactUpdates.description !== undefined
        ? { description: compactUpdates.description }
        : {}),
      ...(compactUpdates.estimatedDelivery !== undefined
        ? { estimated_delivery: compactUpdates.estimatedDelivery }
        : {}),
      updated_at: new Date().toISOString()
    } satisfies ShipmentUpdate)
    .eq("id", id)
    .select("*")
    .maybeSingle();

  if (!shipmentRow) {
    return null;
  }

  return getShipmentById(id);
}

export async function deleteShipment(id: string) {
  const supabase = getSupabaseAdminClient();

  if (!supabase) {
    const shipmentIndex = mockShipments.findIndex((entry) => entry.id === id);

    if (shipmentIndex < 0) {
      return false;
    }

    mockShipments.splice(shipmentIndex, 1);

    for (let index = mockStatusLogs.length - 1; index >= 0; index -= 1) {
      if (mockStatusLogs[index].shipmentId === id) {
        mockStatusLogs.splice(index, 1);
      }
    }

    return true;
  }

  const { error } = await supabase.from("shipments").delete().eq("id", id);
  return !error;
}

export async function addStatusUpdate(
  id: string,
  input: StatusUpdateInput,
  coordinates?: { lat: number | null; lng: number | null }
) {
  const createdAt = new Date().toISOString();
  const supabase = getSupabaseAdminClient();

  if (!supabase) {
    const shipment = mockShipments.find((entry) => entry.id === id);

    if (!shipment) {
      return null;
    }

    const log: StatusLog = {
      id: randomUUID(),
      shipmentId: id,
      status: input.status,
      locationName: input.locationName,
      lat: coordinates?.lat ?? null,
      lng: coordinates?.lng ?? null,
      note: input.note ?? null,
      createdAt
    };

    mockStatusLogs.unshift(log);
    Object.assign(shipment, {
      currentStatus: input.status,
      currentLocation: input.locationName,
      currentLat: coordinates?.lat ?? null,
      currentLng: coordinates?.lng ?? null,
      updatedAt: createdAt
    });

    return getMockShipmentWithLogs(id);
  }

  const { data } = await supabase
    .from("shipments")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  const existingShipment = data as ShipmentRow | null;

  if (!existingShipment) {
    return null;
  }

  await supabase.from("status_logs").insert({
    id: randomUUID(),
    shipment_id: id,
    status: input.status,
    location_name: input.locationName,
    lat: coordinates?.lat ?? null,
    lng: coordinates?.lng ?? null,
    note: input.note ?? null,
    created_at: createdAt
  } satisfies StatusLogInsert);

  await supabase
    .from("shipments")
    .update({
      current_status: input.status,
      current_location: input.locationName,
      current_lat: coordinates?.lat ?? null,
      current_lng: coordinates?.lng ?? null,
      updated_at: createdAt
    } satisfies ShipmentUpdate)
    .eq("id", id);

  return getShipmentById(id);
}
