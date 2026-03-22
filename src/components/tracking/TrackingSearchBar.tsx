"use client";

import { LoaderCircle, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTrackingSearch } from "@/hooks/useTrackingSearch";

export function TrackingSearchBar({
  initialValue = "",
  className = ""
}: {
  initialValue?: string;
  className?: string;
}) {
  const { value, setValue, isSubmitting, onSubmit } = useTrackingSearch(initialValue);

  return (
    <form
      onSubmit={onSubmit}
      className={`flex flex-col gap-3 rounded-[2rem] border border-white/10 bg-white p-3 shadow-2xl sm:flex-row sm:items-center ${className}`}
    >
      <div className="flex flex-1 items-center gap-3 rounded-full border border-border bg-surface px-4">
        <Search className="h-4 w-4 text-muted" />
        <Input
          autoFocus
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="Enter tracking number e.g. TRK-2024-XKQP"
          className="h-14 border-0 bg-transparent px-0 font-mono text-mono !text-ink caret-ink shadow-none focus:ring-0"
          aria-label="Tracking number"
        />
      </div>
      <Button type="submit" className="h-14 px-8">
        {isSubmitting ? (
          <>
            <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
            Tracking
          </>
        ) : (
          "Track Shipment"
        )}
      </Button>
    </form>
  );
}
