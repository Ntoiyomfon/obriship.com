"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { Check, Copy } from "lucide-react";

import { createBooking } from "@/app/(public)/book/actions";
import { bookingSteps, useBookingForm, type BookingAction } from "@/hooks/useBookingForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const contactFields = [
  ["name", "Name"],
  ["company", "Company"],
  ["address1", "Address line 1"],
  ["address2", "Address line 2"],
  ["city", "City"],
  ["state", "State"],
  ["country", "Country"],
  ["postalCode", "Postal code"],
  ["phone", "Phone"]
];

const packageFields = [
  ["weight", "Weight (kg)"],
  ["length", "Length (cm)"],
  ["width", "Width (cm)"],
  ["height", "Height (cm)"],
  ["value", "Declared value"],
  ["description", "Description"]
];

const services = [
  ["standard", "Standard", "7-14 days", "Calculated at checkout"],
  ["express", "Express", "3-5 days", "Calculated at checkout"],
  ["air", "Air Freight", "Priority lane", "Quoted after review"],
  ["sea", "Sea Freight", "Container lane", "Quoted after review"]
];

export function BookingFlow() {
  const { state, dispatch, next, validateCurrentStep } = useBookingForm();
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [isConfirming, startConfirming] = useTransition();
  const stepName = bookingSteps[state.step];

  function confirmBooking() {
    setBookingError(null);

    if (!validateCurrentStep()) {
      return;
    }

    startConfirming(async () => {
      const result = await createBooking({
        sender: state.data.sender,
        receiver: state.data.receiver,
        package: state.data.package,
        service: state.data.service
      });

      if (!result.ok) {
        setBookingError(result.error);
        return;
      }

      dispatch({ type: "field", section: "reference", name: "reference", value: result.trackingId });
      dispatch({ type: "next" });
    });
  }

  return (
    <div className="space-y-8">
      <div className="overflow-x-auto">
        <ol className="flex min-w-[680px] gap-4 border-b border-[--border]">
          {bookingSteps.map((step, index) => (
            <li
              key={step}
              className={`flex flex-1 items-center gap-2 pb-3 text-sm ${
                index === state.step ? "border-b-2 border-[--freight] font-semibold text-[--ink]" : "text-[--ink-muted]"
              }`}
            >
              {index < state.step ? <Check className="size-4 text-[--freight]" /> : null}
              {step}
            </li>
          ))}
        </ol>
      </div>

      <section className="rounded-xl border border-[--border] bg-white p-5 shadow-soft md:p-8">
        <div className="mb-6">
          <p className="section-label">Step {state.step + 1}</p>
          <h1 className="mt-2 font-display text-headline text-[--ink]">{stepName}</h1>
        </div>

        {state.step === 0 || state.step === 1 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {contactFields.map(([name, label]) => {
              const section = state.step === 0 ? "sender" : "receiver";
              const value = state.data[section][name] ?? "";
              return (
                <div key={name} className={name.includes("address") ? "md:col-span-2" : undefined}>
                  <Label htmlFor={`${section}-${name}`} className="text-[--ink]">
                    {label}
                  </Label>
                  <Input
                    id={`${section}-${name}`}
                    name={`${section}-${name}`}
                    type={name === "phone" ? "tel" : "text"}
                    autoComplete="off"
                    className="mt-2"
                    value={value}
                    onChange={(event) =>
                      dispatch({ type: "field", section, name, value: event.target.value })
                    }
                  />
                  {state.errors[name] ? <p className="mt-1 text-sm text-[--error]">{state.errors[name]}</p> : null}
                </div>
              );
            })}
          </div>
        ) : null}

        {state.step === 2 ? (
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <Label htmlFor="package-type" className="text-[--ink]">
                Package type
              </Label>
              <select
                id="package-type"
                name="package-type"
                className="mt-2 h-12 w-full rounded-xl border border-[--border] bg-white px-4 text-sm focus:border-[--freight] focus:ring-1 focus:ring-[--freight]"
                value={state.data.package.type ?? ""}
                onChange={(event) =>
                  dispatch({ type: "field", section: "package", name: "type", value: event.target.value })
                }
              >
                <option value="">Select type</option>
                <option value="document">Document</option>
                <option value="parcel">Parcel</option>
                <option value="pallet">Pallet</option>
              </select>
              {state.errors.type ? <p className="mt-1 text-sm text-[--error]">{state.errors.type}</p> : null}
            </div>
            {packageFields.map(([name, label]) => (
              <div key={name} className={name === "description" ? "md:col-span-3" : undefined}>
                <Label htmlFor={`package-${name}`} className="text-[--ink]">
                  {label}
                </Label>
                  <Input
                  id={`package-${name}`}
                  name={`package-${name}`}
                  type={["weight", "length", "width", "height", "value"].includes(name) ? "number" : "text"}
                  min={["weight", "length", "width", "height", "value"].includes(name) ? "0" : undefined}
                  step={["weight", "length", "width", "height", "value"].includes(name) ? "0.01" : undefined}
                  autoComplete="off"
                  className="mt-2"
                  value={state.data.package[name] ?? ""}
                  onChange={(event) =>
                    dispatch({ type: "field", section: "package", name, value: event.target.value })
                  }
                />
                {state.errors[name] ? <p className="mt-1 text-sm text-[--error]">{state.errors[name]}</p> : null}
              </div>
            ))}
          </div>
        ) : null}

        {state.step === 3 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {services.map(([id, title, window, price]) => (
              <button
                key={id}
                type="button"
                onClick={() => dispatch({ type: "service", value: id })}
                className={`rounded-xl border p-5 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--focus] focus-visible:ring-offset-2 ${
                  state.data.service === id ? "border-[--freight] bg-[--freight-light]" : "border-[--border] hover:border-[--freight]"
                }`}
              >
                <p className="font-display text-title text-[--ink]">{title}</p>
                <p className="mt-2 text-small text-[--ink-muted]">{window}</p>
                <p className="mt-4 font-mono text-mono text-[--ink]">{price}</p>
              </button>
            ))}
            {state.errors.service ? <p className="text-sm text-[--error] md:col-span-2">{state.errors.service}</p> : null}
          </div>
        ) : null}

        {state.step === 4 ? (
          <div className="space-y-6">
            {(["sender", "receiver", "package"] as const).map((section) => (
              <div key={section} className="border-b border-[--border] pb-4">
                <p className="font-display text-title capitalize text-[--ink]">{section}</p>
                <p className="mt-2 text-small text-[--ink-muted]">
                  {Object.values(state.data[section]).filter(Boolean).join(" / ")}
                </p>
              </div>
            ))}
            <p className="font-display text-title text-[--ink]">Total cost: pending carrier rate</p>
            <label className="flex items-start gap-3 text-sm text-[--ink]">
              <input
                name="acceptedTerms"
                type="checkbox"
                className="mt-1"
                checked={state.data.acceptedTerms}
                onChange={(event) =>
                  dispatch({ type: "field", section: "acceptedTerms", name: "acceptedTerms", value: event.target.checked })
                }
              />
              I confirm the shipment details are accurate.
            </label>
            {state.errors.acceptedTerms ? <p className="text-sm text-[--error]">{state.errors.acceptedTerms}</p> : null}
            {bookingError ? (
              <p aria-live="polite" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-[--error]">
                {bookingError}
              </p>
            ) : null}
          </div>
        ) : null}

        {state.step === 5 ? (
          <ConfirmationStep reference={state.data.reference} dispatch={dispatch} />
        ) : null}

        {state.step < 5 ? (
          <div className="mt-8 flex justify-between gap-3">
            <Button variant="secondary" disabled={state.step === 0} onClick={() => dispatch({ type: "back" })}>
              Back
            </Button>
            <Button onClick={state.step === 4 ? confirmBooking : next} disabled={isConfirming}>
              {state.step === 4 ? (isConfirming ? "Confirming" : "Confirm Booking") : "Next"}
            </Button>
          </div>
        ) : null}
      </section>
    </div>
  );
}

function ConfirmationStep({
  reference,
  dispatch
}: {
  reference: string;
  dispatch: React.Dispatch<BookingAction>;
}) {
  const [copied, setCopied] = useState(false);

  async function copyReference() {
    try {
      await navigator.clipboard.writeText(reference);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API not available
    }
  }

  return (
    <div className="space-y-5">
      <h2 className="font-display text-headline text-[--ink]">Booking Confirmed</h2>
      <div className="inline-flex items-center gap-2 rounded-xl bg-[--freight-light] px-4 py-2">
        <span className="font-mono text-mono text-[--freight]">{reference}</span>
        <button
          type="button"
          onClick={copyReference}
          className="rounded-md p-1 text-[--freight] transition hover:bg-[--freight]/10"
          aria-label={copied ? "Copied" : "Copy reference"}
        >
          {copied ? (
            <span className="text-xs font-medium text-[--freight]">Copied!</span>
          ) : (
            <Copy className="size-3.5" />
          )}
        </button>
      </div>
      <p className="text-body text-[--ink-muted]">
        Save your booking reference. You&apos;ll need it to check your shipment status.
        We&apos;ll begin processing your booking shortly.
      </p>
      <div className="flex flex-wrap gap-3">
        <Link href={`/book/status/${reference}`}>
          <Button>Check Booking Status</Button>
        </Link>
        <Button variant="secondary" onClick={() => dispatch({ type: "reset" })}>
          Book Another Shipment
        </Button>
      </div>
    </div>
  );
}
