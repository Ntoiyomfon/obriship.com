"use client";

import { useEffect } from "react";
import L from "leaflet";
import { MapContainer, Marker, TileLayer, useMap, ZoomControl } from "react-leaflet";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const missionPinIcon = L.divIcon({
  className: "mission-control-pin",
  html: `
    <div style="position: relative; width: 22px; height: 22px;">
      <span style="position:absolute; inset:0; border-radius:999px; background: rgba(232,255,71,0.26); animation: pulse-ring 1.8s ease-out infinite;"></span>
      <span style="position:absolute; inset:4px; border-radius:999px; background:#E8FF47; box-shadow: 0 0 0 4px rgba(10,10,10,0.42);"></span>
    </div>
  `,
  iconSize: [22, 22],
  iconAnchor: [11, 11]
});

function MapFocus({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();

  useEffect(() => {
    map.flyTo([lat, lng], 6, {
      animate: true,
      duration: 1.2
    });
  }, [lat, lng, map]);

  return null;
}

export function TrackingMapClient({
  locationName,
  lat,
  lng
}: {
  locationName: string | null;
  lat: number | null;
  lng: number | null;
}) {
  if (lat === null || lng === null) {
    return (
      <Card className="overflow-hidden bg-ink text-white">
        <CardHeader className="border-b border-white/10">
          <p className="section-label text-white/45">Current Location</p>
          <CardTitle className="text-white">Shipment Map</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          <div className="terminal-grid flex h-[360px] items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03]">
            <div className="max-w-xs space-y-3 text-center">
              <p className="font-display text-2xl font-bold tracking-[-0.04em]">
                Location not available yet
              </p>
              <p className="text-sm leading-6 text-white/65">
                The map will appear as soon as a shipment location is available.
              </p>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/45">
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
    <Card className="overflow-hidden bg-ink text-white">
      <CardHeader className="border-b border-white/10">
        <p className="section-label text-white/45">Current Location</p>
        <CardTitle className="text-white">Shipment Map</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="overflow-hidden rounded-2xl border border-white/10">
          <MapContainer
            center={[lat, lng]}
            zoom={3}
            scrollWheelZoom={false}
            zoomControl={false}
            className="h-[360px] w-full"
          >
            <ZoomControl position="bottomright" />
            <TileLayer
              attribution='&copy; <a href="https://carto.com/">CARTO</a>'
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />
            <Marker position={[lat, lng]} icon={missionPinIcon} />
            <MapFocus lat={lat} lng={lng} />
          </MapContainer>
        </div>
        <p className="mt-4 font-mono text-xs uppercase tracking-[0.18em] text-white/50">
          {locationName}
        </p>
        <p className="sr-only">
          Interactive map centered on the shipment location at {locationName}.
        </p>
      </CardContent>
    </Card>
  );
}
