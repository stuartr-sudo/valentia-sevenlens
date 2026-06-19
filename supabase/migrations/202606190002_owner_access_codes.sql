create table if not exists public.access_codes (
  id uuid primary key default gen_random_uuid(),
  username text not null unique,
  code_hash text not null,
  role public.app_role not null default 'super_admin',
  security_level integer not null default 100,
  scopes text[] not null default array['wholesale', 'owner', 'admin'],
  is_active boolean not null default true,
  expires_at timestamptz,
  last_used_at timestamptz,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.access_codes enable row level security;

drop trigger if exists set_access_codes_updated_at on public.access_codes;
create trigger set_access_codes_updated_at
  before update on public.access_codes
  for each row
  execute function public.set_updated_at();

drop policy if exists "Admins manage access codes" on public.access_codes;
create policy "Admins manage access codes"
  on public.access_codes for all
  using (public.is_admin())
  with check (public.is_admin());

grant all on public.access_codes to service_role;
grant select, insert, update, delete on public.access_codes to authenticated;

insert into public.access_codes (
  username,
  code_hash,
  role,
  security_level,
  scopes,
  is_active,
  metadata
)
values (
  'davinah84',
  'e65e237f997272beb978cf2a43013708c275ec265c4452a8b326f5b86022a1ea',
  'super_admin',
  100,
  array['wholesale', 'owner', 'admin'],
  true,
  '{"issued_for":"Davina owner wholesale access","hash_algorithm":"sha256(username:access_code)"}'::jsonb
)
on conflict (username) do update
set
  code_hash = excluded.code_hash,
  role = excluded.role,
  security_level = excluded.security_level,
  scopes = excluded.scopes,
  is_active = excluded.is_active,
  metadata = excluded.metadata,
  updated_at = now();
