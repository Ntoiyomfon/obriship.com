create table if not exists bookings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  tracking_id text unique,
  status text not null default 'pending',
  sender jsonb not null,
  receiver jsonb not null,
  package jsonb not null,
  service text not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table bookings enable row level security;

drop policy if exists "Users see own bookings" on bookings;
create policy "Users see own bookings"
  on bookings for all
  using (auth.uid() = user_id);
