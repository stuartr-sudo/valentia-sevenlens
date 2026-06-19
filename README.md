# Valentia SevenLens

Next.js App Router site for Valentia, a one-product skincare line centered on Valentia Vitamin C Serum.

## What is included

- Public one-product landing page using the provided Valentia design assets.
- Added pages from the second design archive: About, Journal, Article, Topic,
  Quiz, Contact, Cart, Checkout, Wholesale, and Stockist Portal.
- Vercel-ready Next.js 16 app with responsive layouts and optimized images.
- Supabase helpers for browser, server, and service-role access.
- Lead capture route at `POST /api/leads`.
- Account, wholesale, and programmatic page route foundations.
- SEO routes: `robots.txt`, `sitemap.xml`, metadata, JSON-LD graph, and `llms.txt`.
- Supabase migration for inventory, customers, businesses, wholesale, ads, SEO, schema, programmatic pages, media, and RLS policies.

## Local development

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

The site previews without Supabase credentials. Lead submissions return a local-preview response until Supabase env vars are added.

## Supabase

Create or select a Supabase project, then set:

```bash
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
```

Apply the initial schema:

```bash
supabase db push
```

Migration path:

```text
supabase/migrations/202606190001_initial_platform.sql
```

The migration creates:

- Product and variant tables for the one-product line.
- Inventory locations and movement ledger.
- Customer profiles and business memberships.
- Wholesale price lists, order drafts, and order items.
- Waitlist and wholesale lead capture.
- Advertising campaign and metric tables.
- SEO keyword, programmatic page, and schema document tables.
- Media asset metadata and Supabase Storage buckets.
- RLS helper functions and role-scoped policies.

## Vercel

Connect the GitHub repo `stuartr-sudo/valentia-sevenlens.git` to Vercel.

Required Vercel environment variables:

```bash
NEXT_PUBLIC_SITE_URL=https://your-live-domain
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
```

Build command:

```bash
npm run build
```

## Reference

See `docs/platform-architecture.md` for the data and permission model.
