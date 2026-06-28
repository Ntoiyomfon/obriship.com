"use client";

import { useEffect } from "react";
import L from "leaflet";
import { useReducedMotion } from "framer-motion";
import { MapContainer, Marker, Polyline, TileLayer, useMap, ZoomControl } from "react-leaflet";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const missionPinIcon = L.divIcon({
  className: "mission-control-pin",
  html: `
    <div style="position: relative; width: 22px; height: 22px;">
      <span style="position:absolute; inset:0; border-radius:999px; background: rgba(199,80,10,0.22); animation: pulse-ring 1.8s ease-out infinite;"></span>
      <span style="position:absolute; inset:4px; border-radius:999px; background:#C7500A; box-shadow: 0 0 0 4px rgba(255,255,255,0.8);"></span>
    </div>
  `,
  iconSize: [22, 22],
  iconAnchor: [11, 11]
});

function MapFocus({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    map.flyTo([lat, lng], 6, {
      animate: !reduceMotion,
      duration: reduceMotion ? 0 : 1.2
    });
  }, [lat, lng, map, reduceMotion]);

  return null;
}

export function TrackingMapClient({
  locationName,
  lat,
  lng,
  route = []
}: {
  locationName: string | null;
  lat: number | null;
  lng: number | null;
  route?: Array<[number, number]>;
}) {
  if (lat === null || lng === null) {
    return (
      <Card className="overflow-hidden border-[--border] bg-white text-[--ink] shadow-soft">
        <CardHeader className="border-b border-[--border]">
          <p className="section-label">Current Location</p>
          <CardTitle className="text-[--ink]">Shipment Map</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          <div className="flex h-[360px] items-center justify-center rounded-xl border border-[--border] bg-[--surface]">
            <div className="max-w-xs space-y-3 text-center">
              <p className="font-display text-2xl font-bold tracking-tight">
                Location not available yet
              </p>
              <p className="text-sm leading-6 text-[--ink-muted]">
                The map will appear as soon as a shipment location is available.
              </p>
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-[--ink-muted]">
                {locationName ?? "Awaiting location update"}
              </p>
            </div>
          </div>
          <p className="sr-only">
            A map preview is unavailable because this shipment does not yet have location data.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden border-[--border] bg-white text-[--ink] shadow-soft">
      <CardHeader className="border-b border-[--border]">
        <p className="section-label">Current Location</p>
        <CardTitle className="text-[--ink]">Shipment Map</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="relative z-0 overflow-hidden rounded-xl border border-[--border]">
          <MapContainer
            center={[lat, lng]}
            zoom={3}
            scrollWheelZoom={false}
            zoomControl={false}
            className="z-0 h-[360px] w-full"
          >
            <ZoomControl position="bottomright" />
            <TileLayer
              attribution='&copy; <a href="https://carto.com/">CARTO</a>'
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            />
            {route.length > 1 ? <Polyline positions={route} pathOptions={{ color: "#C7500A", opacity: 0.5, weight: 3 }} /> : null}
            <Marker position={[lat, lng]} icon={missionPinIcon} />
            <MapFocus lat={lat} lng={lng} />
          </MapContainer>
        </div>
        <p className="mt-4 font-mono text-xs uppercase tracking-[0.14em] text-[--ink-muted]">
          {locationName}
        </p>
        <p className="sr-only">
          Interactive map centered on the shipment location at {locationName}.
        </p>
      </CardContent>
    </Card>
  );
}
