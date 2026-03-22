"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { SERVICE_TYPES, type ShipmentWithLogs } from "@/types/shipment";
import { shipmentFormSchema } from "@/lib/validation";

type ShipmentFormValues = z.infer<typeof shipmentFormSchema>;

interface CreateShipmentFormProps {
  shipment?: ShipmentWithLogs;
}

export function CreateShipmentForm({ shipment }: CreateShipmentFormProps) {
  const router = useRouter();
  const form = useForm<ShipmentFormValues>({
    resolver: zodResolver(shipmentFormSchema),
    defaultValues: {
      senderName: shipment?.senderName ?? "",
      senderCountry: shipment?.senderCountry ?? "",
      recipientName: shipment?.recipientName ?? "",
      recipientCountry: shipment?.recipientCountry ?? "",
      recipientEmail: shipment?.recipientEmail ?? "",
      serviceType: shipment?.serviceType ?? "EXPRESS",
      weightKg: shipment?.weightKg ?? undefined,
      description: shipment?.description ?? undefined,
      estimatedDelivery: shipment?.estimatedDelivery ?? undefined
    }
  });

  const mode = shipment ? "edit" : "create";

  async function onSubmit(values: ShipmentFormValues) {
    const payload = {
      ...values,
      weightKg: values.weightKg ?? null,
      description: values.description ?? null,
      estimatedDelivery: values.estimatedDelivery ?? null
    };

    const response = await fetch(
      mode === "create" ? "/api/shipments" : `/api/shipments/${shipment!.id}`,
      {
        method: mode === "create" ? "POST" : "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      }
    );

    if (!response.ok) {
      const data = (await response.json()) as { error?: string };
      toast.error(data.error ?? "Unable to save shipment");
      return;
    }

    const savedShipment = (await response.json()) as ShipmentWithLogs;
    toast.success(mode === "create" ? "Shipment created" : "Shipment details updated");

    if (mode === "create") {
      router.push(`/admin/shipments/${savedShipment.id}`);
    } else {
      router.refresh();
    }
  }

  return (
    <Card>
      <CardHeader>
        <p className="section-label">{mode === "create" ? "Create Shipment" : "Shipment Details"}</p>
        <CardTitle>
          {mode === "create" ? "New Shipment Manifest" : "Edit Core Shipment Information"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-5 lg:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="senderName">Sender Name</Label>
            <Input id="senderName" {...form.register("senderName")} />
            {form.formState.errors.senderName ? (
              <p className="text-sm text-error">{form.formState.errors.senderName.message}</p>
            ) : null}
          </div>
          <div className="space-y-2">
            <Label htmlFor="senderCountry">Sender Country</Label>
            <Input id="senderCountry" {...form.register("senderCountry")} />
            {form.formState.errors.senderCountry ? (
              <p className="text-sm text-error">{form.formState.errors.senderCountry.message}</p>
            ) : null}
          </div>
          <div className="space-y-2">
            <Label htmlFor="recipientName">Recipient Name</Label>
            <Input id="recipientName" {...form.register("recipientName")} />
            {form.formState.errors.recipientName ? (
              <p className="text-sm text-error">{form.formState.errors.recipientName.message}</p>
            ) : null}
          </div>
          <div className="space-y-2">
            <Label htmlFor="recipientCountry">Recipient Country</Label>
            <Input id="recipientCountry" {...form.register("recipientCountry")} />
            {form.formState.errors.recipientCountry ? (
              <p className="text-sm text-error">{form.formState.errors.recipientCountry.message}</p>
            ) : null}
          </div>
          <div className="space-y-2">
            <Label htmlFor="recipientEmail">Recipient Email</Label>
            <Input id="recipientEmail" type="email" {...form.register("recipientEmail")} />
            {form.formState.errors.recipientEmail ? (
              <p className="text-sm text-error">{form.formState.errors.recipientEmail.message}</p>
            ) : null}
          </div>
          <div className="space-y-2">
            <Label htmlFor="serviceType">Service Type</Label>
            <Select id="serviceType" {...form.register("serviceType")}>
              {SERVICE_TYPES.map((serviceType) => (
                <option key={serviceType} value={serviceType}>
                  {serviceType}
                </option>
              ))}
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="weightKg">Weight (kg)</Label>
            <Input
              id="weightKg"
              type="number"
              step="0.01"
              {...form.register("weightKg", {
                setValueAs: (value) =>
                  value === "" || value === null ? undefined : Number(value)
              })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="estimatedDelivery">Estimated Delivery</Label>
            <Input id="estimatedDelivery" type="date" {...form.register("estimatedDelivery")} />
          </div>
          <div className="space-y-2 lg:col-span-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" {...form.register("description")} />
          </div>
          <div className="lg:col-span-2">
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? (
                <>
                  <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                  Saving
                </>
              ) : mode === "create" ? (
                "Create Shipment"
              ) : (
                "Update Shipment"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
