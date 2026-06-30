"use client";

import { useEffect, useId, useRef } from "react";
import { LoaderCircle, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTrackingSearch } from "@/hooks/useTrackingSearch";

export function TrackingSearchBar({
  initialValue = "",
  className = "",
  variant = "hero",
  autoFocus = true
}: {
  initialValue?: string;
  className?: string;
  variant?: "hero" | "compact";
  autoFocus?: boolean;
}) {
  const { value, setValue, isSubmitting, onSubmit } = useTrackingSearch(initialValue);
  const inputRef = useRef<HTMLInputElement>(null);
  const inputId = useId();

  useEffect(() => {
    if (autoFocus && window.matchMedia("(min-width: 768px)").matches) {
      inputRef.current?.focus();
    }
  }, [autoFocus]);

  const isCompact = variant === "compact";

  // rounded-full border border-[--border] bg-white shadow-soft <-- goes in the form for hero variant
  return (
    <form
      onSubmit={onSubmit}
      className={`flex gap-2  ${
        isCompact ? "h-11 items-center p-1.5" : "flex-col p-3 sm:h-16 sm:flex-row sm:items-center"
      } ${className}`}
    >
      <Label htmlFor={inputId} className="sr-only">
        Track your shipment
      </Label>
      <div
        className={`flex flex-1 items-center gap-3 rounded-xl ${
          isCompact ? "px-3" : "border border-border bg-surface px-4"
        }`}
      >
        <Search className="h-4 w-4 text-muted" />
        <Input
          id={inputId}
          name="trackingNumber"
          ref={inputRef}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="Enter tracking number…"
          autoComplete="off"
          spellCheck={false}
          className={`border-0 bg-transparent px-0 font-mono text-mono !text-ink caret-ink shadow-none focus:ring-0 ${
            isCompact ? "h-8 w-44" : "h-12"
          }`}
          aria-label="Tracking number"
        />
      </div>
      <Button type="submit" className={isCompact ? "h-8 px-4" : "h-12 rounded-xl px-8"}>
        {isSubmitting ? (
          <>
            <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
            {isCompact ? "Go" : "Tracking"}
          </>
        ) : (
          isCompact ? "Track" : "Track My Shipment"
        )}
      </Button>
    </form>
  );
}
