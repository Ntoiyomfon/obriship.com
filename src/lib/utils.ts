import { format, parseISO } from "date-fns";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { PROGRESS_STEPS, type ShipmentStatus } from "@/types/shipment";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDateTimeUtc(value: string | null | undefined) {
  if (!value) {
    return "Pending";
  }

  return `${format(parseISO(value), "MMM d, yyyy")} · ${format(
    parseISO(value),
    "HH:mm"
  )} UTC`;
}

export function formatDateLong(value: string | null | undefined) {
  if (!value) {
    return "To be confirmed";
  }

  return format(parseISO(value), "MMMM d, yyyy");
}

export function statusLabel(status: ShipmentStatus) {
  return status
    .split("_")
    .map((token) => token[0] + token.slice(1).toLowerCase())
    .join(" ");
}

export function getProgressIndex(status: ShipmentStatus) {
  const directIndex = PROGRESS_STEPS.indexOf(status as (typeof PROGRESS_STEPS)[number]);

  if (directIndex >= 0) {
    return directIndex;
  }

  if (status === "CUSTOMS_CLEARANCE") {
    return 2;
  }

  return status === "EXCEPTION" ? 2 : 0;
}

export function statusBadgeClassName(status: ShipmentStatus) {
  switch (status) {
    case "ORDER_PLACED":
      return "bg-zinc-100 text-zinc-700";
    case "PICKED_UP":
      return "bg-blue-50 text-blue-700";
    case "IN_TRANSIT":
      return "bg-amber-50 text-amber-700";
    case "CUSTOMS_CLEARANCE":
      return "bg-violet-50 text-violet-700";
    case "OUT_FOR_DELIVERY":
      return "bg-orange-50 text-orange-700";
    case "DELIVERED":
      return "bg-emerald-50 text-emerald-700";
    case "EXCEPTION":
      return "bg-red-50 text-red-700";
    default:
      return "bg-zinc-100 text-zinc-700";
  }
}

export function statusBannerClassName(status: ShipmentStatus) {
  switch (status) {
    case "DELIVERED":
      return "border-emerald-200 bg-emerald-50 text-emerald-900";
    case "EXCEPTION":
      return "border-red-200 bg-red-50 text-red-900";
    case "OUT_FOR_DELIVERY":
      return "border-orange-200 bg-orange-50 text-orange-900";
    case "IN_TRANSIT":
    case "CUSTOMS_CLEARANCE":
      return "border-amber-200 bg-amber-50 text-amber-900";
    default:
      return "border-zinc-200 bg-zinc-50 text-zinc-900";
  }
}

export function heroSectionLabel(label: string) {
  return label.toUpperCase();
}

export function createId(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}

