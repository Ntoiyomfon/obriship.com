import type {
  ShipmentFilters,
  ShipmentListResponse,
  ShipmentWithLogs,
  StatusUpdateInput
} from "@/types/shipment";

export async function fetchTrackingShipment(trackingId: string) {
  const response = await fetch(`/api/track/${trackingId}`, {
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error("Shipment not found");
  }

  return (await response.json()) as ShipmentWithLogs;
}

export async function fetchShipments(filters: ShipmentFilters = {}) {
  const params = new URLSearchParams();

  if (filters.query) {
    params.set("query", filters.query);
  }

  if (filters.status && filters.status !== "ALL") {
    params.set("status", filters.status);
  }

  if (filters.page) {
    params.set("page", String(filters.page));
  }

  const response = await fetch(`/api/shipments?${params.toString()}`, {
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error("Unable to load shipments");
  }

  return (await response.json()) as ShipmentListResponse;
}

export async function postShipmentStatus(id: string, payload: StatusUpdateInput) {
  const response = await fetch(`/api/shipments/${id}/status`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error("Unable to push update");
  }

  return (await response.json()) as ShipmentWithLogs;
}

