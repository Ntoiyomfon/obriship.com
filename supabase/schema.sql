create extension if not exists pgcrypto;

create table if not exists public.shipments (
  id uuid primary key default gen_random_uuid(),
  tracking_id text unique not null,
  sender_name text not null,
  sender_country text not null,
  recipient_name text not null,
  recipient_country text not null,
  recipient_email text not null,
  service_type text not null check (service_type in ('EXPRESS', 'STANDARD', 'ECONOMY')),
  weight_kg numeric(8, 2),
  description text,
  current_status text not null default 'ORDER_PLACED',
  current_location text,
  current_lat numeric(10, 6),
  current_lng numeric(10, 6),
  estimated_delivery date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.status_logs (
  id uuid primary key default gen_random_uuid(),
  shipment_id uuid not null references public.shipments(id) on delete cascade,
  status text not null,
  location_name text not null,
  lat numeric(10, 6),
  lng numeric(10, 6),
  note text,
  created_at timestamptz not null default now()
);

alter table public.shipments enable row level security;
alter table public.status_logs enable row level security;

drop policy if exists public_track on public.shipments;
create policy public_track
on public.shipments
for select
using (true);

drop policy if exists public_read_logs on public.status_logs;
create policy public_read_logs
on public.status_logs
for select
using (true);

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_shipments_updated_at on public.shipments;
create trigger set_shipments_updated_at
before update on public.shipments
for each row
execute function public.touch_updated_at();

alter publication supabase_realtime add table public.status_logs;
