# Valentia SevenLens

Next.js App Router site for Valentia, a quiz-led wellness and skincare brand centered on the Hormonal Skin Check-In, founding-list validation, and the first Valentia Vitamin C Serum formula.

## What is included

- Quiz-led homepage using the provided Valentia design assets.
- Added pages from the second design archive: About, Journal, Article, Topic,
  Quiz, Contact, Cart, Checkout, Wholesale, and Stockist Portal.
- Updated core pages from `files (4).zip`: homepage, About, and Hormonal Skin
  Check-In.
- `/cart` and `/checkout` redirect to the founding list while the site remains
  validation-first.
- Vercel-ready Next.js 16 app with responsive layouts and optimized images.
- Supabase helpers for browser, server, and service-role access.
- Lead capture route at `POST /api/leads`.
- Owner wholesale access route at `POST /api/wholesale/access`.
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
VALENTIA_OWNER_ACCESS_SIGNING_SECRET=...
```

Apply the initial schema:

```bash
supabase db push
```

Migration path:

```text
supabase/migrations/202606190001_initial_platform.sql
supabase/migrations/202606190002_owner_access_codes.sql
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
- Hashed wholesale owner access for `davinah84`.

## Wholesale owner access

The wholesale portal supports an owner access code for `davinah84`. Only the
SHA-256 verifier is stored in code and in the Supabase migration. The plaintext
access code should be held outside the repo.

Set `VALENTIA_OWNER_ACCESS_SIGNING_SECRET` in Vercel so the 12-hour owner
session cookie is signed with a deployment secret. Use
`VALENTIA_OWNER_ACCESS_CODE_HASH` only when rotating the access code without a
code change.

## Vercel

Connect the GitHub repo `stuartr-sudo/valentia-sevenlens.git` to Vercel.

Required Vercel environment variables:

```bash
NEXT_PUBLIC_SITE_URL=https://your-live-domain
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
VALENTIA_OWNER_ACCESS_SIGNING_SECRET=...
```

Build command:

```bash
npm run build
```

## Reference

See `docs/platform-architecture.md` for the data and permission model.
