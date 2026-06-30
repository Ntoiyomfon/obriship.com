-- Drop the old restrictive constraint
alter table shipments
  drop constraint if exists shipments_service_type_check;

-- Add new constraint matching actual service types offered
-- in the booking flow, stored as uppercase for consistency
-- with existing data
alter table shipments
  add constraint shipments_service_type_check
  check (service_type in ('STANDARD', 'EXPRESS', 'AIR', 'SEA'));
