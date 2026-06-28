alter table shipments 
  add column if not exists user_id uuid references auth.users(id);

create index if not exists shipments_user_id_idx 
  on shipments(user_id);
