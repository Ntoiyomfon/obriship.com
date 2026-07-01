import { RouteMap } from "@/components/map/RouteMap";

interface AuthBrandPanelProps {
  tagline: string;
}

export function AuthBrandPanel({ tagline }: AuthBrandPanelProps) {
  return (
    <section className="relative hidden overflow-hidden bg-[--freight-dim] p-10 text-white lg:flex lg:flex-col">
      <div className="shrink-0">
        <img
          src="/fxlogisticslogo.png"
          alt="FX Logistics"
          className="h-8 w-auto object-contain brightness-0 invert"
        />
      </div>
      <div className="flex flex-1 items-center">
        <h1 className="max-w-lg text-balance font-display text-display text-white">
          {tagline}
        </h1>
      </div>
      <RouteMap className="absolute bottom-0 left-0 h-72 w-full opacity-55" />
    </section>
  );
}
