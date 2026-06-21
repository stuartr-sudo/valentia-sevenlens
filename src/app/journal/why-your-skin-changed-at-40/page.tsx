import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { StructuredData } from "@/components/seo/StructuredData";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { skinChangedAt40ArticleJsonLd } from "@/lib/seo/schema";

export const metadata: Metadata = {
  title: "Why Your Skin Changed at 40",
  description:
    "Davina Hearne explains why skin can become drier, more reactive and less predictable through the perimenopausal transition.",
  alternates: {
    canonical: "/journal/why-your-skin-changed-at-40",
  },
};

const changes = [
  "Stop stripping. Swap any foaming or high-pH cleanser for something that leaves skin comfortable, not squeaky. If it stings on application, it is too much for this skin right now.",
  "Lead with comfort and water. A barrier-supporting serum or cream with humectants and plant oils does more for transitional skin than another active. Give it three to four weeks before you judge it.",
  "Keep one antioxidant, not five actives. A stable, plant-derived vitamin C supports tone and daily defence without overloading the barrier. One considered step beats a shelf of half-used bottles.",
];

export default function SkinChangedAt40Page() {
  return (
    <main className="min-h-screen bg-cream text-forest">
      <StructuredData data={skinChangedAt40ArticleJsonLd()} />
      <SiteHeader active="Journal" />

      <article>
        <header className="mx-auto max-w-4xl px-5 py-14 sm:py-20">
          <Link href="/journal" className="text-sm text-forest/60">
            Back to journal
          </Link>
          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.18em] text-sage">
            Skin
          </p>
          <h1 className="mt-4 font-display text-5xl font-normal leading-tight sm:text-7xl">
            Why your skin changed at 40, and how to formulate for it.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-forest/72">
            The serums that worked for a decade stopped working, and nobody
            warned you. Here is what is actually happening and what to do first.
          </p>
          <p className="mt-6 text-sm text-forest/55">
            Davina Hearne, Naturopath (Diploma, NZ). 8 min read. June 2026.
          </p>
        </header>

        <div className="relative mx-auto min-h-[360px] max-w-6xl overflow-hidden rounded-lg sm:min-h-[620px]">
          <Image
            src="/valentia/brand/photo-3.jpg"
            alt="Valentia skincare ritual for skin in transition"
            fill
            sizes="92vw"
            className="object-cover"
          />
        </div>

        <div className="mx-auto max-w-3xl px-5 py-14 text-lg leading-9 text-forest/82">
          <p>
            You did not change your routine. Your routine changed on you. The
            same cleanser that kept you comfortable now leaves your skin tight.
            The moisturiser that used to be enough sits on the surface.
            Something stings that never used to, and your skin is somehow drier
            and breaking out at the same time, which is not supposed to be
            possible.
          </p>
          <p className="mt-6">
            This is one of the most common things women describe in the same
            season they start waking at 3am. It is not a coincidence, and it is
            not your imagination.
          </p>

          <blockquote className="my-8 border-l-4 border-rose bg-white p-6 font-display text-3xl italic leading-10 text-forest">
            Skin is an oestrogen-responsive organ. When oestrogen begins to
            fluctuate, the skin feels it too.
          </blockquote>

          <p>
            Oestrogen supports the skin in three quiet, structural ways: it
            helps maintain collagen, supports the skin&apos;s ability to hold
            water and helps regulate oil. As oestrogen swings and then settles
            lower through the perimenopausal transition, all three soften at
            once. Collagen production slows, so skin feels less resilient. The
            barrier holds less water, so it feels drier and more reactive. Oil
            regulation shifts, so you can be dry on the surface and still
            breaking out underneath.
          </p>

          <p className="mt-6">
            That last combination is the one that makes women feel like their
            skin has betrayed them, because the old rules stopped applying.
          </p>

          <p className="mt-6">
            Here is the mistake the wellness internet will push you toward: more
            actives. Stronger acids, higher retinol, another exfoliant, because
            if the skin looks off, surely it needs more work. In this stage that
            usually makes it worse. Skin that has lost barrier integrity does
            not need to be pushed harder. It needs to be supported first.
          </p>

          <div className="my-10 rounded-lg bg-forest p-7 text-cream">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-rose">
              The order that matters
            </p>
            <p className="mt-3 text-base leading-8 text-cream/80">
              Barrier first. Always. Comfort and hydration before correction,
              because a calm barrier is what lets everything else work without
              stinging.
            </p>
          </div>

          <h2 className="font-display text-4xl font-medium leading-tight">
            Three things to change this week
          </h2>
          <div className="mt-6 grid gap-4">
            {changes.map((change, index) => (
              <div key={change} className="grid grid-cols-[3rem_1fr] gap-4">
                <span className="font-display text-4xl text-sage">
                  {index + 1}
                </span>
                <p>{change}</p>
              </div>
            ))}
          </div>

          <p className="mt-8">
            Your skin did not fail. It changed, the way the rest of you is
            changing, and it responds to being met where it is rather than
            fought. The aim is not to look younger. It is to look like yourself,
            rested.
          </p>

          <p className="mt-8 text-base leading-8 text-forest/65">
            This article is educational and is not a substitute for individual
            medical advice. Always speak to your healthcare provider about your
            symptoms.
          </p>
        </div>
      </article>

      <section className="bg-sand px-5 py-14 text-center">
        <h2 className="font-display text-4xl font-normal">
          Not sure where you are?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-base leading-7 text-forest/75">
          Five minutes. Ten questions. The same diagnostic Davina would give you
          in clinic.
        </p>
        <Link
          href="/quiz"
          className="mt-7 inline-flex min-h-12 items-center rounded bg-forest px-8 text-sm font-medium text-white"
        >
          Begin the quiz
        </Link>
      </section>

      <SiteFooter note="Educational content only." />
    </main>
  );
}
