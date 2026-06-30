import { createId } from "@/lib/utils";
import type { Shipment, ShipmentWithLogs, StatusLog } from "@/types/shipment";

const shipmentAId = createId("shp");
const shipmentBId = createId("shp");
const shipmentCId = createId("shp");

const now = new Date("2026-03-22T12:30:00.000Z");

function hoursAgo(hours: number) {
  return new Date(now.getTime() - hours * 60 * 60 * 1000).toISOString();
}

function daysAhead(days: number) {
  return new Date(now.getTime() + days * 24 * 60 * 60 * 1000)
    .toISOString()
    .slice(0, 10);
}

const logs: StatusLog[] = [
  {
    id: createId("log"),
    shipmentId: shipmentAId,
    status: "ORDER_PLACED",
    locationName: "Lagos, Nigeria",
    lat: 6.5244,
    lng: 3.3792,
    note: "Order booked in operations system.",
    createdAt: hoursAgo(68)
  },
  {
    id: createId("log"),
    shipmentId: shipmentAId,
    status: "PICKED_UP",
    locationName: "Lagos, Nigeria",
    lat: 6.5244,
    lng: 3.3792,
    note: "Collected from sender.",
    createdAt: hoursAgo(60)
  },
  {
    id: createId("log"),
    shipmentId: shipmentAId,
    status: "IN_TRANSIT",
    locationName: "Casablanca, Morocco",
    lat: 33.5731,
    lng: -7.5898,
    note: "Linehaul transfer completed.",
    createdAt: hoursAgo(18)
  },
  {
    id: createId("log"),
    shipmentId: shipmentBId,
    status: "ORDER_PLACED",
    locationName: "Frankfurt, Germany",
    lat: 50.1109,
    lng: 8.6821,
    note: null,
    createdAt: hoursAgo(94)
  },
  {
    id: createId("log"),
    shipmentId: shipmentBId,
    status: "PICKED_UP",
    locationName: "Frankfurt, Germany",
    lat: 50.1109,
    lng: 8.6821,
    note: null,
    createdAt: hoursAgo(84)
  },
  {
    id: createId("log"),
    shipmentId: shipmentBId,
    status: "CUSTOMS_CLEARANCE",
    locationName: "JFK Airport, United States",
    lat: 40.6413,
    lng: -73.7781,
    note: "Awaiting release window.",
    createdAt: hoursAgo(9)
  },
  {
    id: createId("log"),
    shipmentId: shipmentCId,
    status: "ORDER_PLACED",
    locationName: "Tokyo, Japan",
    lat: 35.6762,
    lng: 139.6503,
    note: null,
    createdAt: hoursAgo(200)
  },
  {
    id: createId("log"),
    shipmentId: shipmentCId,
    status: "PICKED_UP",
    locationName: "Tokyo, Japan",
    lat: 35.6762,
    lng: 139.6503,
    note: null,
    createdAt: hoursAgo(180)
  },
  {
    id: createId("log"),
    shipmentId: shipmentCId,
    status: "IN_TRANSIT",
    locationName: "Vancouver, Canada",
    lat: 49.2827,
    lng: -123.1207,
    note: null,
    createdAt: hoursAgo(92)
  },
  {
    id: createId("log"),
    shipmentId: shipmentCId,
    status: "OUT_FOR_DELIVERY",
    locationName: "Seattle, United States",
    lat: 47.6061,
    lng: -122.3328,
    note: "Courier dispatched.",
    createdAt: hoursAgo(2)
  }
];

export const mockShipments: Shipment[] = [
  {
    id: shipmentAId,
    trackingId: "TRK-2026-XKQP",
    senderName: "Musa Export Ltd",
    senderCountry: "Nigeria",
    recipientName: "Amina Kareem",
    recipientCountry: "Morocco",
    recipientEmail: "amina@example.com",
    serviceType: "EXPRESS",
    weightKg: 18.5,
    description: "Industrial samples and customs paperwork.",
    currentStatus: "IN_TRANSIT",
    currentLocation: "Casablanca, Morocco",
    currentLat: 33.5731,
    currentLng: -7.5898,
    estimatedDelivery: daysAhead(2),
    createdAt: hoursAgo(72),
    updatedAt: hoursAgo(18)
  },
  {
    id: shipmentBId,
    trackingId: "TRK-2026-M4TR",
    senderName: "Helix Medical GmbH",
    senderCountry: "Germany",
    recipientName: "Aurora Labs",
    recipientCountry: "United States",
    recipientEmail: "ops@auroralabs.example",
    serviceType: "STANDARD",
    weightKg: 7.2,
    description: "Cold-chain components.",
    currentStatus: "CUSTOMS_CLEARANCE",
    currentLocation: "JFK Airport, United States",
    currentLat: 40.6413,
    currentLng: -73.7781,
    estimatedDelivery: daysAhead(4),
    createdAt: hoursAgo(96),
    updatedAt: hoursAgo(9)
  },
  {
    id: shipmentCId,
    trackingId: "TRK-2026-Q2LN",
    senderName: "Shin Atlas Trading",
    senderCountry: "Japan",
    recipientName: "Harbor Retail",
    recipientCountry: "United States",
    recipientEmail: "receiving@harborretail.example",
    serviceType: "STANDARD",
    weightKg: 32.4,
    description: "Retail fixtures and electronic labels.",
    currentStatus: "OUT_FOR_DELIVERY",
    currentLocation: "Seattle, United States",
    currentLat: 47.6061,
    currentLng: -122.3328,
    estimatedDelivery: daysAhead(0),
    createdAt: hoursAgo(210),
    updatedAt: hoursAgo(2)
  }
];

export function getMockShipmentWithLogs(id: string) {
  const shipment = mockShipments.find((entry) => entry.id === id);

  if (!shipment) {
    return null;
  }

  return {
    ...shipment,
    statusLogs: logs
      .filter((entry) => entry.shipmentId === shipment.id)
      .sort((left, right) => right.createdAt.localeCompare(left.createdAt))
  } satisfies ShipmentWithLogs;
}

export function getMockShipmentByTrackingId(trackingId: string) {
  const shipment = mockShipments.find(
    (entry) => entry.trackingId.toUpperCase() === trackingId.toUpperCase()
  );

  if (!shipment) {
    return null;
  }

  return getMockShipmentWithLogs(shipment.id);
}

export const mockStatusLogs = logs;

