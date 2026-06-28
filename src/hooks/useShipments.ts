"use client";

import { useQuery } from "@tanstack/react-query";

import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import type { Database } from "@/types/database.types";
import type { Shipment, StatusLog } from "@/types/shipment";

type ShipmentRow = Database["public"]["Tables"]["shipments"]["Row"];
type StatusLogRow = Database["public"]["Tables"]["status_logs"]["Row"];

function normalizeShipment(row: ShipmentRow): Shipment {
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

function normalizeStatusLog(row: StatusLogRow): StatusLog {
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

export function useShipments(userId: string | undefined) {
  return useQuery({
    queryKey: ["shipments", userId],
    queryFn: async () => {
      const supabase = getSupabaseBrowserClient();

      if (!supabase || !userId) {
        throw new Error("Supabase is not configured.");
      }

      const [shipmentsResult, logsResult] = await Promise.all([
        supabase
          .from("shipments")
          .select("*")
          .eq("user_id", userId)
          .order("updated_at", { ascending: false })
          .limit(8),
        supabase
          .from("status_logs")
          .select("*, shipments!inner(user_id)")
          .eq("shipments.user_id", userId)
          .order("created_at", { ascending: false })
          .limit(10)
      ]);

      if (shipmentsResult.error) {
        throw new Error(shipmentsResult.error.message);
      }

      if (logsResult.error) {
        throw new Error(logsResult.error.message);
      }

      return {
        shipments: (shipmentsResult.data ?? []).map(normalizeShipment),
        logs: (logsResult.data ?? []).map(normalizeStatusLog)
      };
    },
    enabled: !!userId
  });
}
