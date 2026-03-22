"use client";

import { useEffect, useRef } from "react";

import { fetchTrackingShipment } from "@/lib/api";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import type { ShipmentWithLogs } from "@/types/shipment";

interface UseShipmentRealtimeOptions {
  shipmentId: string;
  trackingId: string;
  onShipment: (shipment: ShipmentWithLogs) => void;
}

export function useShipmentRealtime({
  shipmentId,
  trackingId,
  onShipment
}: UseShipmentRealtimeOptions) {
  const onShipmentRef = useRef(onShipment);

  useEffect(() => {
    onShipmentRef.current = onShipment;
  }, [onShipment]);

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();

    if (!supabase) {
      return;
    }

    const channel = supabase
      .channel(`shipment-${shipmentId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "status_logs",
          filter: `shipment_id=eq.${shipmentId}`
        },
        async () => {
          const shipment = await fetchTrackingShipment(trackingId);
          onShipmentRef.current(shipment);
        }
      )
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [shipmentId, trackingId]);
}
