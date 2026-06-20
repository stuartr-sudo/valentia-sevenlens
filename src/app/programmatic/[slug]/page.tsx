import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";
import { siteConfig } from "@/lib/site";

type PageRecord = {
  slug: string;
  title: string;
  meta_description: string | null;
  hero_kicker: string | null;
  body: string | null;
  structured_data: Record<string, unknown> | null;
};

const fallbackPage: PageRecord = {
  slug: "vitamin-c-serum-for-sensitive-skin",
  title: "Vitamin C Serum for Sensitive Skin",
  meta_description:
    "A Valentia buyer-intent guide for people comparing gentle, ingredient-transparent vitamin C serum options.",
  hero_kicker: "Programmatic buyer-intent page",
  body:
    "This route is wired for Supabase-backed programmatic pages. The initial fallback page previews how Valentia can publish search-focused education around sensitive skin, vitamin C serum, ingredient transparency, and the daily serum ritual before live database content is connected.",
  structured_data: {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Vitamin C Serum for Sensitive Skin",
    author: {
      "@type": "Organization",
      name: "Valentia",
    },
  },
};

export async function generateStaticParams() {
  return [{ slug: fallbackPage.slug }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = await getProgrammaticPage(slug);

  if (!page) {
    return {};
  }

  return {
    title: page.title,
    description: page.meta_description || siteConfig.description,
    alternates: {
      canonical: `/programmatic/${page.slug}`,
    },
  };
}

export default async function ProgrammaticPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = await getProgrammaticPage(slug);

  if (!page) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-cream text-forest">
      {page.structured_data ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(page.structured_data) }}
        />
      ) : null}

      <section className="mx-auto max-w-4xl px-5 py-16 sm:py-24">
        <Link href="/" className="text-sm font-medium text-rose-deep">
          Back to Valentia
        </Link>
        <p className="mt-10 text-xs font-semibold uppercase tracking-[0.18em] text-rose-deep">
          {page.hero_kicker || "Valentia guide"}
        </p>
        <h1 className="mt-5 font-display text-6xl font-normal leading-tight">
          {page.title}
        </h1>
        <p className="mt-6 text-lg leading-8 text-forest/75">
          {page.meta_description || siteConfig.description}
        </p>

        <article className="mt-12 rounded-lg border border-line bg-white p-7 text-base leading-8 text-forest/78 sm:p-10">
          {page.body}
        </article>
      </section>
    </main>
  );
}

async function getProgrammaticPage(slug: string): Promise<PageRecord | null> {
  const supabase = getSupabaseAdminClient();

  if (supabase) {
    const { data } = await supabase
      .from("programmatic_pages")
      .select(
        "slug,title,meta_description,hero_kicker,body,structured_data",
      )
      .eq("slug", slug)
      .eq("status", "published")
      .maybeSingle<PageRecord>();

    if (data) {
      return data;
    }
  }

  return slug === fallbackPage.slug ? fallbackPage : null;
}
