import type { StatusLog } from "@/types/shipment";

export function TrackingTimeline({ logs }: { logs: StatusLog[] }) {
  return (
    <div className="space-y-5">
      {logs.map((log, index) => (
        <div key={log.id} className="grid grid-cols-[1rem_1fr] gap-4">
          <div className="flex flex-col items-center">
            <span className={`mt-1 size-3 rounded-full ${index === 0 ? "bg-[--freight]" : "bg-[--border]"}`} />
            {index < logs.length - 1 ? <span className="mt-2 h-full min-h-14 border-l border-dashed border-[--border]" /> : null}
          </div>
          <div className="pb-6">
            <p className="font-mono text-xs text-[--ink-muted]">{new Date(log.createdAt).toLocaleString()}</p>
            <p className="mt-1 font-display text-title capitalize text-[--ink]">
              {log.status.replaceAll("_", " ").toLowerCase()}
            </p>
            <p className="mt-1 text-small text-[--ink-muted]">{log.locationName}</p>
            {log.note ? <p className="mt-2 text-small text-[--ink]">{log.note}</p> : null}
          </div>
        </div>
      ))}
    </div>
  );
}
