"use client";

import { useEffect, useRef } from "react";
import { LoaderCircle, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTrackingSearch } from "@/hooks/useTrackingSearch";

export function TrackingSearchBar({
  initialValue = "",
  className = ""
}: {
  initialValue?: string;
  className?: string;
}) {
  const { value, setValue, isSubmitting, onSubmit } = useTrackingSearch(initialValue);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (window.matchMedia("(min-width: 768px)").matches) {
      inputRef.current?.focus();
    }
  }, []);

  return (
    <form
      onSubmit={onSubmit}
      className={`flex flex-col gap-3 rounded-[2rem] border border-white/10 bg-white p-3 shadow-2xl sm:flex-row sm:items-center ${className}`}
    >
      <Label htmlFor="tracking-search" className="sr-only">
        Track your shipment
      </Label>
      <div className="flex flex-1 items-center gap-3 rounded-full border border-border bg-surface px-4">
        <Search className="h-4 w-4 text-muted" />
        <Input
          id="tracking-search"
          ref={inputRef}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="Enter your tracking number — e.g. TRK-2024-XKQP"
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
          "Track My Shipment"
        )}
      </Button>
    </form>
  );
}
