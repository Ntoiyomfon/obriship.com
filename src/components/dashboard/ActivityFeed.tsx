import type { StatusLog } from "@/types/shipment";

const dateTimeFormatter = new Intl.DateTimeFormat(undefined, {
  month: "short",
  day: "numeric",
  year: "numeric",
  hour: "numeric",
  minute: "2-digit"
});

export function ActivityFeed({ logs }: { logs: StatusLog[] }) {
  return (
    <section className="surface-card p-5">
      <h2 className="font-display text-title text-[--ink]">Activity Feed</h2>
      <div className="mt-5 space-y-4">
        {logs.length === 0 ? (
          <div className="py-16 text-center">
            <p className="font-display text-lg font-semibold text-[--ink]">
              No activity yet
            </p>
            <p className="mt-1 text-sm text-[--ink-muted]">
              Shipment updates will appear here as they happen.
            </p>
            <a
              href="/book"
              className="mt-4 inline-block rounded-lg bg-[--freight] px-4 py-2 text-sm font-semibold text-white"
            >
              Book a Shipment
            </a>
          </div>
        ) : null}
        {logs.slice(0, 10).map((log) => (
          <div key={log.id} className="flex gap-3 border-b border-[--border] pb-4 last:border-b-0">
            <span className="mt-2 size-2 rounded-full bg-[--freight]" />
            <div>
              <p className="text-sm font-medium capitalize text-[--ink]">
                {log.status.replaceAll("_", " ").toLowerCase()} - {log.locationName}
              </p>
              <p className="mt-1 font-mono text-xs text-[--ink-muted]">
                {dateTimeFormatter.format(new Date(log.createdAt))}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
