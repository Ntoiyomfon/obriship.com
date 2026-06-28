import "server-only";

import { Resend } from "resend";

import { env, hasResendEnv } from "@/lib/env";
import { statusLabel } from "@/lib/utils";
import {
  EMAIL_MILESTONE_STATUSES,
  type Shipment,
  type ShipmentStatus
} from "@/types/shipment";

const headlineMap: Record<(typeof EMAIL_MILESTONE_STATUSES)[number], string> = {
  IN_TRANSIT: "Your shipment is on the way",
  OUT_FOR_DELIVERY: "Your shipment will arrive today",
  DELIVERED: "Your shipment has been delivered",
  EXCEPTION: "Action required on your shipment"
};

function buildEmailHtml(shipment: Shipment, status: ShipmentStatus) {
  const headline =
    status in headlineMap
      ? headlineMap[status as keyof typeof headlineMap]
      : `Shipment status: ${statusLabel(status)}`;
  const trackingUrl = `${env.siteUrl}/track/${shipment.trackingId}`;

  return `
    <div style="font-family: Arial, sans-serif; background: #f5f4f0; padding: 24px;">
      <div style="max-width: 560px; margin: 0 auto; background: #ffffff; border: 1px solid #e4e3df; border-radius: 12px; padding: 32px;">
        <div style="font-size: 12px; letter-spacing: 0.18em; text-transform: uppercase; color: #6b7280; margin-bottom: 14px;">
          FX Logistics
        </div>
        <h1 style="font-size: 28px; line-height: 1.1; color: #0e1117; margin: 0 0 12px;">
          ${headline}
        </h1>
        <p style="font-size: 16px; line-height: 1.7; color: #374151; margin: 0 0 20px;">
          Shipment for ${shipment.recipientName} is currently marked as ${statusLabel(
            status
          )}.
        </p>
        <div style="font-family: 'JetBrains Mono', monospace; background: #0e1117; color: #ffffff; padding: 14px 16px; border-radius: 12px; margin-bottom: 22px;">
          ${shipment.trackingId}
        </div>
        <a href="${trackingUrl}" style="display: inline-block; background: #c7500a; color: #ffffff; padding: 14px 22px; border-radius: 12px; text-decoration: none; font-weight: 600;">
          View Tracking
        </a>
        <p style="font-size: 14px; color: #6b7280; margin: 24px 0 0;">
          FX Logistics
        </p>
      </div>
    </div>
  `;
}

export async function sendStatusEmail(shipment: Shipment, status: ShipmentStatus) {
  if (!EMAIL_MILESTONE_STATUSES.includes(status as (typeof EMAIL_MILESTONE_STATUSES)[number])) {
    return { skipped: true };
  }

  if (!hasResendEnv) {
    return { skipped: true };
  }

  const resend = new Resend(env.resendApiKey);

  await resend.emails.send({
    from: env.resendFromEmail!,
    to: shipment.recipientEmail,
    subject: status in headlineMap ? headlineMap[status as keyof typeof headlineMap] : statusLabel(status),
    html: buildEmailHtml(shipment, status)
  });

  return { skipped: false };
}
