import { Globe, Route, Zap, CheckCircle } from "lucide-react";

const stats = [
  {
    icon: Globe,
    value: "150+",
    label: "Countries served",
    description: "Global coverage across every major trade lane",
  },
  {
    icon: Route,
    value: "2,400+",
    label: "Active routes",
    description: "Direct and multi-leg freight corridors",
  },
  {
    icon: Zap,
    value: "30s",
    label: "Update frequency",
    description: "Real-time status after every carrier scan",
  },
  {
    icon: CheckCircle,
    value: "99.4%",
    label: "On-time visibility",
    description: "Shipment data accuracy across all networks",
  },
];

export function StatsBar() {
  return (
    <section className="border-b border-[--border] bg-white">
      <div className="section-shell py-16 md:py-20">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
          {stats.map(({ icon: Icon, value, label, description }) => (
            <div key={label} className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-[--freight-light]">
                  <Icon className="size-5 text-[--freight]" strokeWidth={1.5} />
                </div>
                <p className="font-display text-2xl font-extrabold tracking-tight text-[--ink] md:text-4xl">
                  {value}
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-[--ink]">
                  {label}
                </p>
                <p className="mt-0.5 text-xs text-[--ink-muted] leading-relaxed">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
