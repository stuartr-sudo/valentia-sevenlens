create extension if not exists "pgcrypto";

do $$
begin
  create type public.app_role as enum (
    'customer',
    'wholesale_buyer',
    'wholesale_manager',
    'inventory_manager',
    'content_editor',
    'seo_manager',
    'ads_manager',
    'business_admin',
    'admin',
    'super_admin'
  );
exception
  when duplicate_object then null;
end $$;

do $$
begin
  create type public.business_status as enum (
    'lead',
    'pending_review',
    'approved',
    'paused',
    'declined'
  );
exception
  when duplicate_object then null;
end $$;

do $$
begin
  create type public.product_status as enum (
    'draft',
    'active',
    'archived'
  );
exception
  when duplicate_object then null;
end $$;

do $$
begin
  create type public.content_status as enum (
    'draft',
    'review',
    'published',
    'archived'
  );
exception
  when duplicate_object then null;
end $$;

do $$
begin
  create type public.media_kind as enum (
    'image',
    'video',
    'gif',
    'document'
  );
exception
  when duplicate_object then null;
end $$;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique,
  full_name text,
  avatar_url text,
  role public.app_role not null default 'customer',
  security_level integer not null default 10,
  phone text,
  default_business_id uuid,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.business_accounts (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  legal_name text,
  status public.business_status not null default 'lead',
  account_type text not null default 'wholesale',
  contact_email text,
  phone text,
  website text,
  tax_identifier text,
  billing_address jsonb not null default '{}'::jsonb,
  shipping_address jsonb not null default '{}'::jsonb,
  notes text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles
  add constraint profiles_default_business_id_fkey
  foreign key (default_business_id)
  references public.business_accounts(id)
  on delete set null
  not valid;

do $$
begin
  alter table public.profiles validate constraint profiles_default_business_id_fkey;
exception
  when duplicate_object then null;
end $$;

create table if not exists public.business_memberships (
  business_id uuid not null references public.business_accounts(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  role public.app_role not null default 'wholesale_buyer',
  status public.business_status not null default 'pending_review',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (business_id, user_id)
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  subtitle text,
  description text,
  status public.product_status not null default 'draft',
  sku text unique,
  brand text not null default 'Valentia',
  category text not null default 'Skin care serum',
  ingredients jsonb not null default '[]'::jsonb,
  claims jsonb not null default '[]'::jsonb,
  hero_media_id uuid,
  seo_title text,
  seo_description text,
  structured_data jsonb not null default '{}'::jsonb,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.product_variants (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  sku text not null unique,
  title text not null,
  size_label text,
  retail_price_cents integer not null,
  currency text not null default 'USD',
  subscription_price_cents integer,
  barcode text,
  status public.product_status not null default 'active',
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.inventory_locations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  code text not null unique,
  address jsonb not null default '{}'::jsonb,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.inventory_movements (
  id uuid primary key default gen_random_uuid(),
  variant_id uuid not null references public.product_variants(id) on delete cascade,
  location_id uuid references public.inventory_locations(id) on delete set null,
  quantity_delta integer not null,
  reason text not null,
  reference_type text,
  reference_id uuid,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  metadata jsonb not null default '{}'::jsonb
);

create table if not exists public.waitlist_signups (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  name text,
  source text not null default 'site',
  status text not null default 'new',
  profile_id uuid references public.profiles(id) on delete set null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.wholesale_price_lists (
  id uuid primary key default gen_random_uuid(),
  business_id uuid references public.business_accounts(id) on delete cascade,
  name text not null,
  status public.content_status not null default 'draft',
  currency text not null default 'USD',
  minimum_order_cents integer,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.wholesale_price_list_items (
  id uuid primary key default gen_random_uuid(),
  price_list_id uuid not null references public.wholesale_price_lists(id) on delete cascade,
  variant_id uuid not null references public.product_variants(id) on delete cascade,
  wholesale_price_cents integer not null,
  minimum_quantity integer not null default 1,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (price_list_id, variant_id)
);

create table if not exists public.wholesale_orders (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.business_accounts(id) on delete cascade,
  created_by uuid references public.profiles(id) on delete set null,
  status text not null default 'draft',
  currency text not null default 'USD',
  subtotal_cents integer not null default 0,
  notes text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.wholesale_order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.wholesale_orders(id) on delete cascade,
  variant_id uuid not null references public.product_variants(id) on delete restrict,
  quantity integer not null check (quantity > 0),
  unit_price_cents integer not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.media_assets (
  id uuid primary key default gen_random_uuid(),
  kind public.media_kind not null,
  bucket text not null,
  storage_path text not null,
  public_url text,
  alt_text text,
  caption text,
  usage_context text,
  status public.content_status not null default 'draft',
  metadata jsonb not null default '{}'::jsonb,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (bucket, storage_path)
);

alter table public.products
  add constraint products_hero_media_id_fkey
  foreign key (hero_media_id)
  references public.media_assets(id)
  on delete set null
  not valid;

do $$
begin
  alter table public.products validate constraint products_hero_media_id_fkey;
exception
  when duplicate_object then null;
end $$;

create table if not exists public.programmatic_pages (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  meta_description text,
  hero_kicker text,
  body text,
  status public.content_status not null default 'draft',
  target_audience text,
  intent text,
  primary_keyword text,
  structured_data jsonb not null default '{}'::jsonb,
  media_asset_id uuid references public.media_assets(id) on delete set null,
  published_at timestamptz,
  created_by uuid references public.profiles(id) on delete set null,
  updated_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.seo_keywords (
  id uuid primary key default gen_random_uuid(),
  keyword text not null unique,
  search_intent text,
  funnel_stage text,
  monthly_volume integer,
  difficulty numeric,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.programmatic_page_keywords (
  page_id uuid not null references public.programmatic_pages(id) on delete cascade,
  keyword_id uuid not null references public.seo_keywords(id) on delete cascade,
  role text not null default 'secondary',
  created_at timestamptz not null default now(),
  primary key (page_id, keyword_id)
);

create table if not exists public.schema_documents (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  entity_type text not null,
  entity_id uuid,
  schema_json jsonb not null,
  status public.content_status not null default 'draft',
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.advertising_campaigns (
  id uuid primary key default gen_random_uuid(),
  platform text not null,
  account_name text,
  campaign_external_id text,
  name text not null,
  status text not null default 'draft',
  objective text,
  budget_cents integer,
  currency text not null default 'USD',
  starts_at timestamptz,
  ends_at timestamptz,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.advertising_metrics (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid not null references public.advertising_campaigns(id) on delete cascade,
  metric_date date not null,
  impressions integer not null default 0,
  clicks integer not null default 0,
  spend_cents integer not null default 0,
  conversions numeric not null default 0,
  revenue_cents integer not null default 0,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (campaign_id, metric_date)
);

create table if not exists public.audit_log (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references public.profiles(id) on delete set null,
  action text not null,
  entity_table text,
  entity_id uuid,
  before_data jsonb,
  after_data jsonb,
  created_at timestamptz not null default now()
);

create index if not exists idx_profiles_role on public.profiles(role);
create index if not exists idx_business_memberships_user on public.business_memberships(user_id);
create index if not exists idx_products_status on public.products(status);
create index if not exists idx_programmatic_pages_status on public.programmatic_pages(status);
create index if not exists idx_programmatic_pages_keyword on public.programmatic_pages(primary_keyword);
create index if not exists idx_media_assets_status on public.media_assets(status);
create index if not exists idx_inventory_movements_variant on public.inventory_movements(variant_id);
create index if not exists idx_advertising_metrics_date on public.advertising_metrics(metric_date);

create or replace function public.current_app_role()
returns public.app_role
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(
    (select role from public.profiles where id = auth.uid()),
    'customer'::public.app_role
  );
$$;

create or replace function public.has_role(allowed_roles public.app_role[])
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select auth.role() = 'service_role'
    or public.current_app_role() = any(allowed_roles);
$$;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.has_role(array['admin', 'super_admin']::public.app_role[]);
$$;

create or replace function public.has_business_access(target_business_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select auth.role() = 'service_role'
    or public.is_admin()
    or exists (
      select 1
      from public.business_memberships bm
      where bm.business_id = target_business_id
        and bm.user_id = auth.uid()
        and bm.status = 'approved'
    );
$$;

grant execute on function public.current_app_role() to anon, authenticated, service_role;
grant execute on function public.has_role(public.app_role[]) to anon, authenticated, service_role;
grant execute on function public.is_admin() to anon, authenticated, service_role;
grant execute on function public.has_business_access(uuid) to anon, authenticated, service_role;

do $$
declare
  table_name text;
begin
  foreach table_name in array array[
    'profiles',
    'business_accounts',
    'business_memberships',
    'products',
    'product_variants',
    'inventory_locations',
    'inventory_movements',
    'waitlist_signups',
    'wholesale_price_lists',
    'wholesale_price_list_items',
    'wholesale_orders',
    'wholesale_order_items',
    'media_assets',
    'programmatic_pages',
    'seo_keywords',
    'programmatic_page_keywords',
    'schema_documents',
    'advertising_campaigns',
    'advertising_metrics',
    'audit_log'
  ]
  loop
    execute format('alter table public.%I enable row level security', table_name);
  end loop;
end $$;

do $$
declare
  item record;
begin
  for item in
    select tablename
    from pg_tables
    where schemaname = 'public'
      and tablename in (
        'profiles',
        'business_accounts',
        'business_memberships',
        'products',
        'product_variants',
        'inventory_locations',
        'inventory_movements',
        'waitlist_signups',
        'wholesale_price_lists',
        'wholesale_price_list_items',
        'wholesale_orders',
        'wholesale_order_items',
        'media_assets',
        'programmatic_pages',
        'seo_keywords',
        'programmatic_page_keywords',
        'schema_documents',
        'advertising_campaigns',
        'advertising_metrics'
      )
  loop
    execute format(
      'drop trigger if exists set_%I_updated_at on public.%I',
      item.tablename,
      item.tablename
    );
    execute format(
      'create trigger set_%I_updated_at before update on public.%I for each row execute function public.set_updated_at()',
      item.tablename,
      item.tablename
    );
  end loop;
end $$;

create policy "Profiles can read themselves"
  on public.profiles for select
  using (id = auth.uid() or public.is_admin());

create policy "Profiles can update themselves"
  on public.profiles for update
  using (id = auth.uid() or public.is_admin())
  with check (id = auth.uid() or public.is_admin());

create policy "Admins manage profiles"
  on public.profiles for all
  using (public.is_admin())
  with check (public.is_admin());

create policy "Businesses visible to members"
  on public.business_accounts for select
  using (public.has_business_access(id));

create policy "Business admins manage businesses"
  on public.business_accounts for all
  using (public.has_role(array['business_admin', 'admin', 'super_admin']::public.app_role[]))
  with check (public.has_role(array['business_admin', 'admin', 'super_admin']::public.app_role[]));

create policy "Memberships visible to members"
  on public.business_memberships for select
  using (user_id = auth.uid() or public.has_business_access(business_id));

create policy "Business admins manage memberships"
  on public.business_memberships for all
  using (public.has_role(array['business_admin', 'admin', 'super_admin']::public.app_role[]))
  with check (public.has_role(array['business_admin', 'admin', 'super_admin']::public.app_role[]));

create policy "Active products are public"
  on public.products for select
  using (status = 'active' or public.has_role(array['inventory_manager', 'content_editor', 'admin', 'super_admin']::public.app_role[]));

create policy "Inventory managers manage products"
  on public.products for all
  using (public.has_role(array['inventory_manager', 'content_editor', 'admin', 'super_admin']::public.app_role[]))
  with check (public.has_role(array['inventory_manager', 'content_editor', 'admin', 'super_admin']::public.app_role[]));

create policy "Active variants are public"
  on public.product_variants for select
  using (
    status = 'active'
    or public.has_role(array['inventory_manager', 'content_editor', 'admin', 'super_admin']::public.app_role[])
  );

create policy "Inventory managers manage variants"
  on public.product_variants for all
  using (public.has_role(array['inventory_manager', 'content_editor', 'admin', 'super_admin']::public.app_role[]))
  with check (public.has_role(array['inventory_manager', 'content_editor', 'admin', 'super_admin']::public.app_role[]));

create policy "Inventory locations visible to operators"
  on public.inventory_locations for select
  using (public.has_role(array['inventory_manager', 'admin', 'super_admin']::public.app_role[]));

create policy "Inventory managers manage locations"
  on public.inventory_locations for all
  using (public.has_role(array['inventory_manager', 'admin', 'super_admin']::public.app_role[]))
  with check (public.has_role(array['inventory_manager', 'admin', 'super_admin']::public.app_role[]));

create policy "Inventory movements visible to operators"
  on public.inventory_movements for select
  using (public.has_role(array['inventory_manager', 'admin', 'super_admin']::public.app_role[]));

create policy "Inventory managers create movements"
  on public.inventory_movements for insert
  with check (public.has_role(array['inventory_manager', 'admin', 'super_admin']::public.app_role[]));

create policy "Anyone can join waitlist"
  on public.waitlist_signups for insert
  with check (true);

create policy "Waitlist managers read signups"
  on public.waitlist_signups for select
  using (public.has_role(array['content_editor', 'ads_manager', 'admin', 'super_admin']::public.app_role[]));

create policy "Waitlist managers update signups"
  on public.waitlist_signups for update
  using (public.has_role(array['content_editor', 'ads_manager', 'admin', 'super_admin']::public.app_role[]))
  with check (public.has_role(array['content_editor', 'ads_manager', 'admin', 'super_admin']::public.app_role[]));

create policy "Wholesale lists visible to business"
  on public.wholesale_price_lists for select
  using (
    public.is_admin()
    or business_id is null
    or public.has_business_access(business_id)
  );

create policy "Wholesale managers manage price lists"
  on public.wholesale_price_lists for all
  using (public.has_role(array['wholesale_manager', 'business_admin', 'admin', 'super_admin']::public.app_role[]))
  with check (public.has_role(array['wholesale_manager', 'business_admin', 'admin', 'super_admin']::public.app_role[]));

create policy "Wholesale list items visible through lists"
  on public.wholesale_price_list_items for select
  using (
    public.is_admin()
    or exists (
      select 1 from public.wholesale_price_lists wpl
      where wpl.id = price_list_id
        and (wpl.business_id is null or public.has_business_access(wpl.business_id))
    )
  );

create policy "Wholesale managers manage price list items"
  on public.wholesale_price_list_items for all
  using (public.has_role(array['wholesale_manager', 'business_admin', 'admin', 'super_admin']::public.app_role[]))
  with check (public.has_role(array['wholesale_manager', 'business_admin', 'admin', 'super_admin']::public.app_role[]));

create policy "Wholesale orders visible to business"
  on public.wholesale_orders for select
  using (public.has_business_access(business_id));

create policy "Wholesale users create own orders"
  on public.wholesale_orders for insert
  with check (public.has_business_access(business_id));

create policy "Wholesale users update own draft orders"
  on public.wholesale_orders for update
  using (public.has_business_access(business_id) and status in ('draft', 'submitted'))
  with check (public.has_business_access(business_id));

create policy "Wholesale order items visible through order"
  on public.wholesale_order_items for select
  using (
    exists (
      select 1 from public.wholesale_orders wo
      where wo.id = order_id
        and public.has_business_access(wo.business_id)
    )
  );

create policy "Wholesale users manage draft order items"
  on public.wholesale_order_items for all
  using (
    exists (
      select 1 from public.wholesale_orders wo
      where wo.id = order_id
        and wo.status = 'draft'
        and public.has_business_access(wo.business_id)
    )
  )
  with check (
    exists (
      select 1 from public.wholesale_orders wo
      where wo.id = order_id
        and wo.status = 'draft'
        and public.has_business_access(wo.business_id)
    )
  );

create policy "Published media is public"
  on public.media_assets for select
  using (
    status = 'published'
    or public.has_role(array['content_editor', 'seo_manager', 'admin', 'super_admin']::public.app_role[])
  );

create policy "Content managers manage media"
  on public.media_assets for all
  using (public.has_role(array['content_editor', 'seo_manager', 'admin', 'super_admin']::public.app_role[]))
  with check (public.has_role(array['content_editor', 'seo_manager', 'admin', 'super_admin']::public.app_role[]));

create policy "Published programmatic pages are public"
  on public.programmatic_pages for select
  using (
    status = 'published'
    or public.has_role(array['content_editor', 'seo_manager', 'admin', 'super_admin']::public.app_role[])
  );

create policy "SEO managers manage programmatic pages"
  on public.programmatic_pages for all
  using (public.has_role(array['content_editor', 'seo_manager', 'admin', 'super_admin']::public.app_role[]))
  with check (public.has_role(array['content_editor', 'seo_manager', 'admin', 'super_admin']::public.app_role[]));

create policy "SEO keywords visible to SEO roles"
  on public.seo_keywords for select
  using (public.has_role(array['content_editor', 'seo_manager', 'admin', 'super_admin']::public.app_role[]));

create policy "SEO managers manage keywords"
  on public.seo_keywords for all
  using (public.has_role(array['seo_manager', 'admin', 'super_admin']::public.app_role[]))
  with check (public.has_role(array['seo_manager', 'admin', 'super_admin']::public.app_role[]));

create policy "SEO page keywords visible to SEO roles"
  on public.programmatic_page_keywords for select
  using (public.has_role(array['content_editor', 'seo_manager', 'admin', 'super_admin']::public.app_role[]));

create policy "SEO managers manage page keywords"
  on public.programmatic_page_keywords for all
  using (public.has_role(array['seo_manager', 'admin', 'super_admin']::public.app_role[]))
  with check (public.has_role(array['seo_manager', 'admin', 'super_admin']::public.app_role[]));

create policy "Schema documents visible to content roles"
  on public.schema_documents for select
  using (public.has_role(array['content_editor', 'seo_manager', 'admin', 'super_admin']::public.app_role[]));

create policy "Schema documents managed by content roles"
  on public.schema_documents for all
  using (public.has_role(array['content_editor', 'seo_manager', 'admin', 'super_admin']::public.app_role[]))
  with check (public.has_role(array['content_editor', 'seo_manager', 'admin', 'super_admin']::public.app_role[]));

create policy "Ad campaigns visible to ad roles"
  on public.advertising_campaigns for select
  using (public.has_role(array['ads_manager', 'admin', 'super_admin']::public.app_role[]));

create policy "Ad managers manage campaigns"
  on public.advertising_campaigns for all
  using (public.has_role(array['ads_manager', 'admin', 'super_admin']::public.app_role[]))
  with check (public.has_role(array['ads_manager', 'admin', 'super_admin']::public.app_role[]));

create policy "Ad metrics visible to ad roles"
  on public.advertising_metrics for select
  using (public.has_role(array['ads_manager', 'admin', 'super_admin']::public.app_role[]));

create policy "Ad managers manage metrics"
  on public.advertising_metrics for all
  using (public.has_role(array['ads_manager', 'admin', 'super_admin']::public.app_role[]))
  with check (public.has_role(array['ads_manager', 'admin', 'super_admin']::public.app_role[]));

create policy "Audit log visible to admins"
  on public.audit_log for select
  using (public.is_admin());

create policy "Audit log written by admins"
  on public.audit_log for insert
  with check (public.is_admin());

grant usage on schema public to anon, authenticated, service_role;
grant select on public.products, public.product_variants, public.media_assets, public.programmatic_pages to anon, authenticated;
grant insert on public.waitlist_signups to anon, authenticated;
grant all on all tables in schema public to service_role;
grant select, insert, update, delete on all tables in schema public to authenticated;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  (
    'product-media',
    'product-media',
    true,
    52428800,
    array['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'video/mp4']
  ),
  (
    'programmatic-media',
    'programmatic-media',
    true,
    52428800,
    array['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'video/mp4']
  ),
  (
    'customer-uploads',
    'customer-uploads',
    false,
    10485760,
    array['image/jpeg', 'image/png', 'image/webp', 'application/pdf']
  )
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

create policy "Public product media read"
  on storage.objects for select
  using (bucket_id in ('product-media', 'programmatic-media'));

create policy "Content roles manage public media"
  on storage.objects for all
  using (
    bucket_id in ('product-media', 'programmatic-media')
    and public.has_role(array['content_editor', 'seo_manager', 'admin', 'super_admin']::public.app_role[])
  )
  with check (
    bucket_id in ('product-media', 'programmatic-media')
    and public.has_role(array['content_editor', 'seo_manager', 'admin', 'super_admin']::public.app_role[])
  );

create policy "Customers read own uploads"
  on storage.objects for select
  using (
    bucket_id = 'customer-uploads'
    and (owner = auth.uid() or public.is_admin())
  );

create policy "Customers upload own files"
  on storage.objects for insert
  with check (
    bucket_id = 'customer-uploads'
    and owner = auth.uid()
  );

with product_row as (
  insert into public.products (
    slug,
    name,
    subtitle,
    description,
    status,
    sku,
    ingredients,
    claims,
    seo_title,
    seo_description,
    structured_data
  )
  values (
    'vitamin-c-serum',
    'Valentia Vitamin C Serum',
    'With Kakadu plum and ferulic acid',
    'A plant-led vitamin C serum formulated around long-term skin balance.',
    'active',
    'VAL-VITC',
    '["Kakadu plum", "Ferulic acid", "Hyaluronic acid", "Rosehip oil", "Vitamin E"]'::jsonb,
    '["Vegan", "Cruelty-free", "Every dose disclosed", "60-day guarantee"]'::jsonb,
    'Valentia Vitamin C Serum',
    'A naturopath-formulated vitamin C serum for a simple daily skincare ritual.',
    '{"@type":"Product","name":"Valentia Vitamin C Serum"}'::jsonb
  )
  on conflict (slug) do update
  set
    name = excluded.name,
    subtitle = excluded.subtitle,
    description = excluded.description,
    status = excluded.status,
    ingredients = excluded.ingredients,
    claims = excluded.claims,
    seo_title = excluded.seo_title,
    seo_description = excluded.seo_description,
    structured_data = excluded.structured_data,
    updated_at = now()
  returning id
)
insert into public.product_variants (
  product_id,
  sku,
  title,
  size_label,
  retail_price_cents,
  subscription_price_cents,
  currency,
  status
)
select
  id,
  'VAL-VITC-30ML',
  '30 ml bottle',
  '30 ml',
  3800,
  3200,
  'USD',
  'active'
from product_row
on conflict (sku) do update
set
  retail_price_cents = excluded.retail_price_cents,
  subscription_price_cents = excluded.subscription_price_cents,
  status = excluded.status,
  updated_at = now();

insert into public.programmatic_pages (
  slug,
  title,
  meta_description,
  hero_kicker,
  body,
  status,
  target_audience,
  intent,
  primary_keyword,
  structured_data,
  published_at
)
values (
  'hormonal-skin-check-in',
  'The Hormonal Skin Check-In',
  'A Valentia education page for women whose skin has changed suddenly and who want a calm, ingredient-led reset.',
  'Programmatic education page',
  'A calm guide for understanding sudden skin changes, choosing a simple reset ritual, and deciding whether Valentia Vitamin C Serum belongs in that routine.',
  'published',
  'Women experiencing sudden skin changes',
  'education',
  'hormonal skin check in',
  '{"@context":"https://schema.org","@type":"Article","headline":"The Hormonal Skin Check-In","author":{"@type":"Organization","name":"Valentia"}}'::jsonb,
  now()
)
on conflict (slug) do update
set
  title = excluded.title,
  meta_description = excluded.meta_description,
  hero_kicker = excluded.hero_kicker,
  body = excluded.body,
  status = excluded.status,
  target_audience = excluded.target_audience,
  intent = excluded.intent,
  primary_keyword = excluded.primary_keyword,
  structured_data = excluded.structured_data,
  published_at = excluded.published_at,
  updated_at = now();
