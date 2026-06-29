"use client";

import { motion, useReducedMotion } from "framer-motion";

// Real shipping route coordinates (as percentages of viewBox 0-100)
// These connect actual geographic locations on a world map
const ROUTES = [
  // New York → London
  {
    id: "ny-london",
    x1: 27, y1: 38, x2: 51, y2: 33,
    delay: 0
  },
  // Los Angeles → Shanghai
  {
    id: "la-shanghai",
    x1: 15, y1: 42, x2: 78, y2: 40,
    delay: 0.8
  },
  // Rotterdam → Singapore
  {
    id: "rotterdam-singapore",
    x1: 52, y1: 30, x2: 76, y2: 55,
    delay: 1.6
  },
  // Miami → São Paulo
  {
    id: "miami-brazil",
    x1: 26, y1: 46, x2: 33, y2: 65,
    delay: 2.4
  }
];

// City dot positions (% of viewBox 0-100)
const CITIES = [
  { id: "new-york", x: 27, y: 38, label: "New York" },
  { id: "london", x: 51, y: 33, label: "London" },
  { id: "los-angeles", x: 15, y: 42, label: "Los Angeles" },
  { id: "shanghai", x: 78, y: 40, label: "Shanghai" },
  { id: "rotterdam", x: 52, y: 30, label: "Rotterdam" },
  { id: "singapore", x: 76, y: 55, label: "Singapore" },
  { id: "miami", x: 26, y: 46, label: "Miami" },
  { id: "sao-paulo", x: 33, y: 65, label: "São Paulo" },
];

function getCurvedPath(
  x1: number, y1: number,
  x2: number, y2: number
): string {
  // Convert percentage to SVG units (viewBox 0 0 1000 500)
  const sx = x1 * 10;
  const sy = y1 * 5;
  const ex = x2 * 10;
  const ey = y2 * 5;
  // Control point arcs upward for shipping route feel
  const cx = (sx + ex) / 2;
  const cy = Math.min(sy, ey) - 60;
  return `M${sx},${sy} Q${cx},${cy} ${ex},${ey}`;
}

export function RouteMap({ className = "" }: { className?: string }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className={`relative ${className}`}>
      {/* World map as background image */}
      <img
        src="/world-map.svg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-contain opacity-[0.08]"
        style={{ filter: "brightness(0) invert(1)" }}
      />

      {/* Dot-grid texture overlay as fallback texture */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)",
          backgroundSize: "24px 24px"
        }}
      />

      {/* Route overlay SVG */}
      <svg
        viewBox="0 0 1000 500"
        className="relative z-10 h-full w-full"
        role="img"
        aria-label="Global shipping routes"
      >
        {/* Route lines */}
        {ROUTES.map((route) => {
          const path = getCurvedPath(
            route.x1, route.y1, route.x2, route.y2
          );
          return (
            <g key={route.id}>
              {/* Ghost trail */}
              <path
                d={path}
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="1"
              />
              {/* Animated highlight */}
              {reduceMotion ? (
                <path
                  d={path}
                  fill="none"
                  stroke="#C7500A"
                  strokeWidth="1.5"
                  opacity="0.6"
                />
              ) : (
                <motion.path
                  d={path}
                  fill="none"
                  stroke="#C7500A"
                  strokeWidth="1.5"
                  opacity="0.7"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{
                    duration: 1.4,
                    delay: route.delay * 0.3,
                    ease: "easeOut"
                  }}
                />
              )}
              {/* Moving dot along route */}
              {!reduceMotion && (
                <circle r="3" fill="#C7500A">
                  <animateMotion
                    dur="4s"
                    repeatCount="indefinite"
                    begin={`${route.delay}s`}
                    path={path}
                  />
                </circle>
              )}
            </g>
          );
        })}

        {/* City dots */}
        {CITIES.map((city) => (
          <g key={city.id}>
            <circle
              cx={city.x * 10}
              cy={city.y * 5}
              r="3"
              fill="white"
              opacity="0.6"
            />
            <circle
              cx={city.x * 10}
              cy={city.y * 5}
              r="6"
              fill="none"
              stroke="white"
              strokeWidth="0.5"
              opacity="0.3"
            />
          </g>
        ))}
      </svg>
    </div>
  );
}
