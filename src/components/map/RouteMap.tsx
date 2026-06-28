"use client";

import { motion, useReducedMotion } from "framer-motion";

const routes = [
  "M84 214 C168 118 285 118 378 190 S578 288 706 172",
  "M126 296 C248 236 350 254 442 318 S612 382 720 292",
  "M218 132 C324 86 424 104 520 158 S656 224 744 112"
];

const highlightRoutes = [
  { path: "M126 296 C248 236 350 254 442 318 S612 382 720 292", delay: "0s" },
  { path: "M84 214 C168 118 285 118 378 190 S578 288 706 172", delay: "0.7s" },
  { path: "M218 132 C324 86 424 104 520 158 S656 224 744 112", delay: "1.4s" }
];

export function RouteMap({ className = "" }: { className?: string }) {
  const reduceMotion = useReducedMotion();

  return (
    <svg
      viewBox="0 0 820 460"
      role="img"
      aria-label="Cargo routes connecting major shipping regions"
      className={className}
    >
      <defs>
        <filter id="route-soften">
          <feGaussianBlur stdDeviation="0.2" />
        </filter>
      </defs>
      <g fill="rgba(255,255,255,0.08)">
        <path d="M98 168c48-44 102-58 166-42 38 9 76 6 112-10 32-14 68-14 96 2 28 17 41 46 32 76-10 31-38 48-82 50-56 2-90 24-102 66-8 28-34 42-76 42-58 0-102-24-132-70-26-40-54-56-86-48-20 5-34-7-38-27-4-16 0-29 10-39z" />
        <path d="M540 236c44-28 88-31 132-8 38 20 58 50 60 90 2 34-12 58-42 72-34 16-70 10-108-18-28-20-56-25-86-15-25 8-42 0-50-22-8-23 0-45 22-66 18-17 42-28 72-33z" />
        <path d="M620 96c42-24 78-20 108 12 24 26 26 55 6 86-21 31-52 39-94 24-30-12-58-7-84 14-22 17-44 17-64-2-20-18-22-40-6-66 24-38 68-48 134-68z" />
      </g>

      {routes.map((route) => (
        <motion.path
          key={route}
          d={route}
          fill="none"
          stroke="rgba(255,255,255,0.18)"
          strokeWidth="1.5"
          filter="url(#route-soften)"
          initial={reduceMotion ? false : { pathLength: 0 }}
          animate={reduceMotion ? undefined : { pathLength: 1 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
        />
      ))}

      {highlightRoutes.map((route) => (
        <g key={route.path}>
          <path d={route.path} fill="none" stroke="rgba(199,80,10,0.7)" strokeWidth="1.5" />
          {reduceMotion ? null : (
            <circle r="4" fill="#C7500A">
              <animateMotion dur="3.4s" repeatCount="indefinite" begin={route.delay} path={route.path} />
            </circle>
          )}
        </g>
      ))}
    </svg>
  );
}
