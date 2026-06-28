interface BookingStatusFilterProps {
  currentStatus: string;
}

const FILTERS = [
  { label: "All", href: "/admin/bookings", value: "ALL" },
  { label: "Pending", href: "/admin/bookings?status=pending", value: "pending" },
  { label: "Processing", href: "/admin/bookings?status=processing", value: "processing" },
  { label: "Dispatched", href: "/admin/bookings?status=dispatched", value: "dispatched" }
] as const;

export function BookingStatusFilter({ currentStatus }: BookingStatusFilterProps) {
  const activeValue =
    currentStatus === "ALL" || !currentStatus ? "ALL" : currentStatus;

  return (
    <div className="flex gap-2 flex-wrap">
      {FILTERS.map((filter) => {
        const isActive = activeValue === filter.value;

        return (
          <a
            key={filter.value}
            href={filter.href}
            className={
              isActive
                ? "rounded-lg px-4 py-2 text-sm font-medium bg-[--ink] text-white"
                : "rounded-lg px-4 py-2 text-sm font-medium text-[--ink-muted] hover:text-[--ink] hover:bg-[--surface] transition-colors"
            }
          >
            {filter.label}
          </a>
        );
      })}
    </div>
  );
}
