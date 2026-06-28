# FX Logistics — Project Context

This is a Next.js 15 / React 19 shipment tracking and booking platform,
rebranded from "Obriship" to "FX Logistics". 

## Stack
Next.js 15, React 19, Tailwind CSS v3, Shadcn/Radix UI, Supabase (remote, 
no local config.toml), TanStack Query, React Leaflet, Framer Motion, Resend, 
Zod, React Hook Form.

## Key rules
- Never recommend or use Supabase local Docker — use remote project only
- All Supabase reads go through TanStack Query hooks
- All Supabase mutations go through Server Actions
- No direct Supabase calls inside components
- Design tokens are in globals.css under --freight, --ink, --surface etc.
- Primary font: Space Grotesk (display), Inter (body), JetBrains Mono (mono)

## Current task
Implementing 7 fixes from the previous agent session. See the prompt 
provided for exact specifications.