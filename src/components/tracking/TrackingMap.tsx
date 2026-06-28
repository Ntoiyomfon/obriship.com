import dynamic from "next/dynamic";

const TrackingMapClient = dynamic(
  () => import("@/components/tracking/TrackingMapClient").then((module) => module.TrackingMapClient),
  {
    ssr: false,
    loading: () => (
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-ink p-6 text-white">
        <div className="animate-pulse space-y-4">
          <div className="h-6 w-40 rounded bg-white/10" />
          <div className="h-[360px] rounded-2xl bg-white/5" />
        </div>
      </div>
    )
  }
);

export function TrackingMap(props: {
  locationName: string | null;
  lat: number | null;
  lng: number | null;
  route?: Array<[number, number]>;
}) {
  return <TrackingMapClient {...props} />;
}
