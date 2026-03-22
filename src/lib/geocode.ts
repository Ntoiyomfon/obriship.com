import { createHash } from "node:crypto";

const cache = new Map<string, { lat: number; lng: number }>();
let lastRequestAt = 0;

const fallbackCoordinates: Record<string, { lat: number; lng: number }> = {
  "lagos, nigeria": { lat: 6.5244, lng: 3.3792 },
  "casablanca, morocco": { lat: 33.5731, lng: -7.5898 },
  "frankfurt, germany": { lat: 50.1109, lng: 8.6821 },
  "jfk airport, united states": { lat: 40.6413, lng: -73.7781 },
  "tokyo, japan": { lat: 35.6762, lng: 139.6503 },
  "vancouver, canada": { lat: 49.2827, lng: -123.1207 },
  "seattle, united states": { lat: 47.6061, lng: -122.3328 }
};

async function throttle() {
  const elapsed = Date.now() - lastRequestAt;

  if (elapsed < 1000) {
    await new Promise((resolve) => setTimeout(resolve, 1000 - elapsed));
  }

  lastRequestAt = Date.now();
}

export function geocodeCacheKey(locationName: string) {
  return createHash("sha1").update(locationName.trim().toLowerCase()).digest("hex");
}

export async function geocodeLocation(locationName: string) {
  const normalized = locationName.trim().toLowerCase();
  const cached = cache.get(normalized);

  if (cached) {
    return cached;
  }

  if (fallbackCoordinates[normalized]) {
    cache.set(normalized, fallbackCoordinates[normalized]);
    return fallbackCoordinates[normalized];
  }

  try {
    await throttle();

    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
      locationName
    )}&format=json&limit=1`;
    const response = await fetch(url, {
      headers: {
        "User-Agent": "TrackingApp/1.0"
      },
      next: {
        revalidate: 86400
      }
    });

    if (!response.ok) {
      return null;
    }

    const data = (await response.json()) as Array<{ lat: string; lon: string }>;

    if (!data[0]) {
      return null;
    }

    const result = {
      lat: Number.parseFloat(data[0].lat),
      lng: Number.parseFloat(data[0].lon)
    };

    cache.set(normalized, result);
    return result;
  } catch {
    return null;
  }
}

