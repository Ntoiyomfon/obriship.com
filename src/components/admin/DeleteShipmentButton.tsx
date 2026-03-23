"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

export function DeleteShipmentButton({ shipmentId }: { shipmentId: string }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    const confirmed = window.confirm(
      "Delete this shipment record and all of its tracking history?"
    );

    if (!confirmed) {
      return;
    }

    setIsDeleting(true);

    try {
      const response = await fetch(`/api/shipments/${shipmentId}`, {
        method: "DELETE"
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as { error?: string } | null;
        toast.error(data?.error ?? "Unable to delete shipment");
        return;
      }

      toast.success("Shipment deleted");
      router.replace("/admin/dashboard");
      router.refresh();
    } catch {
      toast.error("Unable to delete shipment");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <Button variant="destructive" disabled={isDeleting} onClick={handleDelete}>
      {isDeleting ? (
        <>
          <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
          Deleting
        </>
      ) : (
        "Delete Shipment Record"
      )}
    </Button>
  );
}
