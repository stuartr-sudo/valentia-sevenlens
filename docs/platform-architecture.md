# Valentia Platform Architecture

Valentia starts as a one-product public site, but the backend is structured as a shared operating layer for retail customers, wholesale clients, inventory, content, ads, SEO, and media.

## Runtime

- Next.js App Router on Vercel.
- Supabase for Auth, Postgres, Storage, and row-level security.
- Public lead capture works in local preview without Supabase credentials and persists once the Supabase env vars are set.

## Data Areas

- Inventory: `products`, `product_variants`, `inventory_locations`, `inventory_movements`.
- Customers: Supabase Auth plus `profiles`, addresses, waitlist records, and quiz/programmatic sources.
- Businesses: `business_accounts`, `business_memberships`, wholesale approval state, price lists, and wholesale orders.
- Growth: `advertising_campaigns`, `advertising_metrics`, `seo_keywords`, `programmatic_pages`, and `schema_documents`.
- Media: `media_assets` plus Supabase Storage buckets for product, programmatic, and customer upload media.

## Security Model

Security levels are role based:

- Customer: own profile and account records.
- Wholesale buyer or manager: own approved business records and wholesale orders.
- Inventory manager: stock and product operations.
- Content editor: pages and media.
- SEO manager: SEO keywords, programmatic pages, and schema.
- Ads manager: advertising campaigns and metrics.
- Admin or super admin: cross-domain operations and audit visibility.

The migration in `supabase/migrations/202606190001_initial_platform.sql` enables RLS and creates helper functions for these permission checks.

## Vercel Setup

Set these environment variables in Vercel and locally:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.example
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
```

The service role key is only used in server-side routes. Do not expose it to client components.
