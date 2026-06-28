import Link from "next/link";
import { Check } from "lucide-react";

import { getSupabaseAdminClient } from "@/lib/supabase/server";
import type { Database } from "@/types/database.types";

type BookingRow = Database["public"]["Tables"]["bookings"]["Row"];

function StepIndicator({
  confirmed,
  processing,
  dispatched
}: {
  confirmed: "active" | "done" | "inactive";
  processing: "active" | "done" | "inactive";
  dispatched: "active" | "done" | "inactive";
}) {
  const steps = [
    { label: "Confirmed", state: confirmed },
    { label: "Processing", state: processing },
    { label: "Dispatched", state: dispatched }
  ];

  return (
    <div className="flex items-center gap-0">
      {steps.map((step, index) => (
        <div key={step.label} className="flex items-center">
          {index > 0 && (
            <div
              className={`h-[2px] w-12 sm:w-20 ${
                step.state === "inactive" ? "bg-[--border]" : "bg-[--freight]"
              }`}
            />
          )}
          <div className="flex flex-col items-center gap-2">
            <div
              className={`grid size-8 place-items-center rounded-full text-sm font-semibold ${
                step.state === "active"
                  ? "bg-[--freight] text-white"
                  : step.state === "done"
                    ? "bg-[--freight] text-white"
                    : "border-2 border-[--border] bg-white text-[--ink-muted]"
              }`}
            >
              {step.state === "done" ? (
                <Check className="size-4" />
              ) : step.state === "active" ? (
                <span className="size-2.5 rounded-full bg-white" />
              ) : (
                <span className="size-2.5 rounded-full bg-[--border]" />
              )}
            </div>
            <span
              className={`text-xs font-medium ${
                step.state === "inactive" ? "text-[--ink-muted]" : "text-[--ink]"
              }`}
            >
              {step.label}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default async function BookingStatusPage({
  params
}: {
  params: Promise<{ reference: string }>;
}) {
  const { reference } = await params;
  const supabase = getSupabaseAdminClient();

  let booking: BookingRow | null = null;

  if (supabase) {
    const { data } = await supabase
      .from("bookings")
      .select("*")
      .eq("tracking_id", reference)
      .single();

    booking = data as BookingRow | null;
  }

  return (
    <main className="section-shell py-20">
      <div className="mx-auto max-w-xl space-y-8">
        {!booking ? (
          <div className="rounded-xl border border-[--border] bg-white p-8 shadow-soft">
            <h1 className="font-display text-headline text-[--ink]">Booking Not Found</h1>
            <p className="mt-4 text-body text-[--ink-muted]">
              We couldn&apos;t find a booking with that reference. Check your reference number
              and try again.
            </p>
            <Link
              href="/book"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[--freight] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[--freight-dim]"
            >
              Book a Shipment
            </Link>
          </div>
        ) : booking.status === "pending" ? (
          <>
            <div className="rounded-xl border border-[--border] bg-white p-8 shadow-soft">
              <h1 className="font-display text-headline text-[--ink]">Booking Confirmed</h1>
              <p className="mt-4 text-body text-[--ink-muted]">
                We&apos;ve received your booking. Our team is reviewing it and will assign a
                courier shortly.
              </p>
            </div>
            <div className="flex justify-center rounded-xl border border-[--border] bg-white p-8 shadow-soft">
              <StepIndicator confirmed="active" processing="inactive" dispatched="inactive" />
            </div>
          </>
        ) : booking.status === "processing" ? (
          <>
            <div className="rounded-xl border border-[--border] bg-white p-8 shadow-soft">
              <h1 className="font-display text-headline text-[--ink]">Being Processed</h1>
              <p className="mt-4 text-body text-[--ink-muted]">
                Your shipment is being prepared. A tracking number will be assigned once your
                package is collected.
              </p>
            </div>
            <div className="flex justify-center rounded-xl border border-[--border] bg-white p-8 shadow-soft">
              <StepIndicator confirmed="done" processing="active" dispatched="inactive" />
            </div>
          </>
        ) : booking.status === "dispatched" ? (
          <>
            <div className="rounded-xl border border-[--border] bg-white p-8 shadow-soft">
              <h1 className="font-display text-headline text-[--ink]">Shipment Dispatched</h1>
              <p className="mt-4 text-body text-[--ink-muted]">
                Your package is on its way.
              </p>
              <Link
                href={`/track/${booking.tracking_id}`}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[--freight] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[--freight-dim]"
              >
                Track your shipment →
              </Link>
            </div>
            <div className="flex justify-center rounded-xl border border-[--border] bg-white p-8 shadow-soft">
              <StepIndicator confirmed="done" processing="done" dispatched="active" />
            </div>
          </>
        ) : (
          <div className="rounded-xl border border-[--border] bg-white p-8 shadow-soft">
            <h1 className="font-display text-headline text-[--ink]">
              Status: {booking.status}
            </h1>
            <p className="mt-4 text-body text-[--ink-muted]">
              Your booking status is currently &ldquo;{booking.status}&rdquo;. Check back for
              updates.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
