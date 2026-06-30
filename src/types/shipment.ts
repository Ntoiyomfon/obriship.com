export const SHIPMENT_STATUSES = [
  "ORDER_PLACED",
  "PICKED_UP",
  "IN_TRANSIT",
  "CUSTOMS_CLEARANCE",
  "OUT_FOR_DELIVERY",
  "DELIVERED",
  "EXCEPTION"
] as const;

export const PROGRESS_STEPS = [
  "ORDER_PLACED",
  "PICKED_UP",
  "IN_TRANSIT",
  "OUT_FOR_DELIVERY",
  "DELIVERED"
] as const;

export const SERVICE_TYPES = ["STANDARD", "EXPRESS", "AIR", "SEA"] as const;

export const EMAIL_MILESTONE_STATUSES = [
  "IN_TRANSIT",
  "OUT_FOR_DELIVERY",
  "DELIVERED",
  "EXCEPTION"
] as const;

export type ShipmentStatus = (typeof SHIPMENT_STATUSES)[number];
export type ProgressStep = (typeof PROGRESS_STEPS)[number];
export type ServiceType = (typeof SERVICE_TYPES)[number];

export interface StatusLog {
  id: string;
  shipmentId: string;
  status: ShipmentStatus;
  locationName: string;
  lat: number | null;
  lng: number | null;
  note: string | null;
  createdAt: string;
}

export interface Shipment {
  id: string;
  trackingId: string;
  senderName: string;
  senderCountry: string;
  recipientName: string;
  recipientCountry: string;
  recipientEmail: string;
  serviceType: ServiceType;
  weightKg: number | null;
  description: string | null;
  currentStatus: ShipmentStatus;
  currentLocation: string | null;
  currentLat: number | null;
  currentLng: number | null;
  estimatedDelivery: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ShipmentWithLogs extends Shipment {
  statusLogs: StatusLog[];
}

export interface ShipmentFilters {
  query?: string;
  status?: ShipmentStatus | "ALL";
  page?: number;
  pageSize?: number;
}

export interface ShipmentListResponse {
  items: Shipment[];
  total: number;
  page: number;
  pageSize: number;
  pageCount: number;
}

export interface CreateShipmentInput {
  senderName: string;
  senderCountry: string;
  recipientName: string;
  recipientCountry: string;
  recipientEmail: string;
  serviceType: ServiceType;
  weightKg?: number | null;
  description?: string | null;
  estimatedDelivery?: string | null;
}

export interface UpdateShipmentInput {
  senderName?: string;
  senderCountry?: string;
  recipientName?: string;
  recipientCountry?: string;
  recipientEmail?: string;
  serviceType?: ServiceType;
  weightKg?: number | null;
  description?: string | null;
  estimatedDelivery?: string | null;
}

export interface StatusUpdateInput {
  status: ShipmentStatus;
  locationName: string;
  note?: string | null;
}

