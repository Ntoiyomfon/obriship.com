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
import { SHIPMENT_STATUSES, type ShipmentWithLogs } from "@/types/shipment";
import { statusUpdateSchema } from "@/lib/validation";

type StatusUpdateValues = z.infer<typeof statusUpdateSchema>;

export function StatusUpdateForm({ shipment }: { shipment: ShipmentWithLogs }) {
  const router = useRouter();
  const form = useForm<StatusUpdateValues>({
    resolver: zodResolver(statusUpdateSchema),
    defaultValues: {
      status: shipment.currentStatus,
      locationName: shipment.currentLocation ?? "",
      note: ""
    }
  });

  async function onSubmit(values: StatusUpdateValues) {
    const response = await fetch(`/api/shipments/${shipment.id}/status`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values)
    });

    if (!response.ok) {
      const payload = (await response.json()) as { error?: string };
      toast.error(payload.error ?? "Unable to push status update");
      return;
    }

    toast.success("Status update pushed");
    router.refresh();
    form.reset({
      status: values.status,
      locationName: values.locationName,
      note: ""
    });
  }

  return (
    <Card>
      <CardHeader>
        <p className="section-label">Primary Action</p>
        <CardTitle>Push Shipment Update</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-5 lg:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select id="status" {...form.register("status")}>
              {SHIPMENT_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </Select>
          </div>
          <div className="space-y-2 lg:col-span-2">
            <Label htmlFor="locationName">Location</Label>
            <Input id="locationName" {...form.register("locationName")} />
            {form.formState.errors.locationName ? (
              <p className="text-sm text-error">{form.formState.errors.locationName.message}</p>
            ) : null}
          </div>
          <div className="space-y-2 lg:col-span-3">
            <Label htmlFor="note">Internal Note</Label>
            <Textarea id="note" {...form.register("note")} />
          </div>
          <div className="lg:col-span-3">
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? (
                <>
                  <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                  Pushing
                </>
              ) : (
                "Push Update"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
