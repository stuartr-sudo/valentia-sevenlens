import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { StructuredData } from "@/components/seo/StructuredData";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { wakeAt3amArticleJsonLd } from "@/lib/seo/schema";

export const metadata: Metadata = {
  title: "Why You Wake at 3am",
  description:
    "Davina Hearne explains the cortisol and progesterone pattern behind 3am waking in perimenopause.",
  alternates: {
    canonical: "/journal/why-you-wake-at-3am",
  },
};

const steps = [
  "Light first, within thirty minutes of waking. It anchors the cortisol curve to the correct hour.",
  "Protein at breakfast, thirty grams. Blood-sugar stability through the day reduces overnight adrenaline surges.",
  "Magnesium glycinate in the evening. Give it two to three weeks before you judge it.",
];

export default function ArticlePage() {
  return (
    <main className="min-h-screen bg-cream text-forest">
      <StructuredData data={wakeAt3amArticleJsonLd()} />
      <SiteHeader active="Journal" />

      <article>
        <header className="mx-auto max-w-4xl px-5 py-14 sm:py-20">
          <Link href="/journal" className="text-sm text-forest/60">
            Back to journal
          </Link>
          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.18em] text-sage">
            Sleep and cortisol
          </p>
          <h1 className="mt-4 font-display text-5xl font-normal leading-tight sm:text-7xl">
            Why you wake at 3am, and what is actually happening to your cortisol.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-forest/72">
            It is the single most common thing women describe in clinic. It is
            not in your head, and it is not the wine.
          </p>
          <p className="mt-6 text-sm text-forest/55">
            Davina Hearne, Naturopath (Diploma, NZ). 12 min read. May 2026.
          </p>
        </header>

        <div className="relative mx-auto min-h-[360px] max-w-6xl overflow-hidden rounded-lg sm:min-h-[620px]">
          <Image
            src="/valentia/brand/photo-2.jpg"
            alt="Warm bedroom scene for sleep and cortisol article"
            fill
            sizes="92vw"
            className="object-cover"
          />
        </div>

        <div className="mx-auto max-w-3xl px-5 py-14 text-lg leading-9 text-forest/82">
          <p>
            You fall asleep without trouble. Then, at almost exactly the same
            time each night, you are awake. Not drowsy-awake. Wide awake, heart
            going, mind switched on as if it were the middle of the afternoon.
          </p>
          <p className="mt-6">
            If this is you, the first thing to know is plain: this is a
            recognised physiological pattern, and it has a mechanism. Naming it
            is the beginning of changing it.
          </p>

          <h2 className="mt-12 font-display text-4xl font-medium leading-tight">
            What is happening to your cortisol
          </h2>
          <p className="mt-5">
            Cortisol is meant to follow a curve. Lowest around midnight,
            climbing through the early hours, peaking shortly after you wake. In
            the perimenopausal transition, falling progesterone removes one of
            the brakes on that curve.
          </p>
          <blockquote className="my-8 border-l-4 border-rose bg-white p-6 font-display text-3xl italic leading-10 text-forest">
            Progesterone is the calming hormone. When it falls, the nervous
            system loses its most reliable evening sedative.
          </blockquote>
          <p>
            This is why the wake-up feels physical rather than mental. You are
            not lying awake because you are worried. Your body has run an
            alerting program at the wrong hour, and the worry arrives afterward
            to fill the space.
          </p>

          <div className="my-10 rounded-lg bg-forest p-7 text-cream">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-rose">
              The clinical dose
            </p>
            <p className="mt-3 text-base leading-8 text-cream/80">
              Where Davina uses magnesium for this pattern, she uses magnesium
              glycinate, 300-400mg of elemental magnesium, taken in the evening.
              The glycinate form matters.
            </p>
          </div>

          <h2 className="font-display text-4xl font-medium leading-tight">
            Three things to change this week
          </h2>
          <div className="mt-6 grid gap-4">
            {steps.map((step, index) => (
              <div key={step} className="grid grid-cols-[3rem_1fr] gap-4">
                <span className="font-display text-4xl text-sage">
                  {index + 1}
                </span>
                <p>{step}</p>
              </div>
            ))}
          </div>
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
