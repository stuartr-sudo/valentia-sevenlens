import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FoundingListForm } from "@/components/landing/FoundingListForm";
import { StructuredData } from "@/components/seo/StructuredData";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { journalPosts } from "@/lib/pages";
import { journalPageJsonLd } from "@/lib/seo/schema";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Clinical writing from Valentia on perimenopausal hormones, sleep, skin, dosing, and daily basics.",
  alternates: {
    canonical: "/journal",
  },
};

const filters = ["All", "Sleep and cortisol", "Brain and mood", "The body", "Skin", "Dosing and labels"];

export default function JournalPage() {
  const [featured, ...posts] = journalPosts;

  return (
    <main className="min-h-screen bg-cream text-forest">
      <StructuredData data={journalPageJsonLd()} />
      <SiteHeader active="Journal" />

      <section className="mx-auto max-w-5xl px-5 py-16 text-center sm:py-24">
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-rose-deep">
          The journal
        </p>
        <h1 className="font-display text-5xl font-normal leading-tight sm:text-7xl">
          Clinical writing for the woman who reads before she buys.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-forest/74">
          Long-form, evidence-informed notes on perimenopausal hormones, sleep,
          skin, and the daily basics. No hooks. No urgency. The version Davina
          would give a client.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {filters.map((filter) => (
            <span
              key={filter}
              className="rounded-full border border-line bg-white px-4 py-2 text-xs font-medium uppercase tracking-[0.08em] text-forest/70"
            >
              {filter}
            </span>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-5 pb-16 lg:grid-cols-[1.05fr_0.95fr] lg:px-10">
        <Link
          href={featured.href}
          className="group block overflow-hidden rounded-lg border border-line bg-white"
        >
          <div className="relative min-h-[360px]">
            <Image
              src={featured.image}
              alt={featured.title}
              fill
              sizes="(min-width: 1024px) 46vw, 92vw"
              className="object-cover transition duration-500 group-hover:scale-[1.02]"
            />
          </div>
          <div className="p-7 sm:p-9">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-sage">
              Featured. {featured.category}
            </p>
            <h2 className="font-display text-4xl font-normal leading-tight">
              {featured.title}
            </h2>
            <p className="mt-4 text-base leading-7 text-forest/72">
              {featured.copy}
            </p>
            <p className="mt-5 text-sm text-forest/55">
              {featured.readTime}. By Davina Hearne.
            </p>
          </div>
        </Link>

        <div className="grid gap-5">
          {posts.map((post) => (
            <Link
              key={post.title}
              href={post.href}
              className="grid gap-4 rounded-lg border border-line bg-white p-4 transition hover:border-sand sm:grid-cols-[9rem_1fr]"
            >
              <div className="relative min-h-36 overflow-hidden rounded">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="144px"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-sage">
                  {post.category}
                </p>
                <h3 className="mt-2 font-display text-2xl leading-tight">
                  {post.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-forest/68">
                  {post.readTime}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-white px-5 py-16 lg:px-10">
        <div className="mx-auto grid max-w-5xl gap-6 rounded-lg border border-line bg-cream p-7 sm:p-9 lg:grid-cols-[1fr_1.15fr] lg:items-center">
          <div>
            <h2 className="font-display text-4xl font-normal">
              The weekly note.
            </h2>
            <p className="mt-3 text-base leading-7 text-forest/72">
              One considered email a week. What Davina is reading, formulating,
              and paying attention to. Unsubscribe in two clicks.
            </p>
          </div>
          <FoundingListForm source="journal" />
        </div>
      </section>

      <SiteFooter note="Educational content only." />
    </main>
  );
}
