import { z } from "zod";

import { SERVICE_TYPES, SHIPMENT_STATUSES } from "@/types/shipment";

export const statusUpdateSchema = z.object({
  status: z.enum(SHIPMENT_STATUSES),
  locationName: z
    .string()
    .trim()
    .min(2, "Location is required")
    .transform((value) => value.trim()),
  note: z
    .string()
    .trim()
    .max(200, "Notes must stay under 200 characters")
    .optional()
    .transform((value) => value || undefined)
});

export const shipmentFormSchema = z.object({
  senderName: z.string().trim().min(2, "Sender name is required"),
  senderCountry: z.string().trim().min(2, "Sender country is required"),
  recipientName: z.string().trim().min(2, "Recipient name is required"),
  recipientCountry: z.string().trim().min(2, "Recipient country is required"),
  recipientEmail: z.string().trim().email("Enter a valid email address"),
  serviceType: z.enum(SERVICE_TYPES),
  weightKg: z
    .union([z.number().min(0), z.nan()])
    .optional()
    .transform((value) => (Number.isNaN(value) ? undefined : value)),
  description: z
    .string()
    .trim()
    .max(260, "Description must stay under 260 characters")
    .optional()
    .transform((value) => value || undefined),
  estimatedDelivery: z
    .string()
    .trim()
    .optional()
    .transform((value) => value || undefined)
});

export const loginSchema = z.object({
  email: z.string().trim().email("Enter a valid admin email"),
  password: z.string().min(6, "Password must be at least 6 characters")
});
