import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";

export const metadata: Metadata = {
  title: "Why Do I Wake at 3am in Perimenopause?",
  description:
    "A naturopath's direct answer to 3am waking in perimenopause, with practical next steps.",
  alternates: {
    canonical: "/topics/why-do-i-wake-at-3am",
  },
};

const related = [
  "Is 3am waking always perimenopause?",
  "How long until magnesium helps my sleep?",
  "Should I get my hormones tested first?",
];

export default function TopicPage() {
  return (
    <main className="min-h-screen bg-cream text-forest">
      <SiteHeader active="Journal" />

      <section className="mx-auto max-w-4xl px-5 py-16 sm:py-24">
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-sage">
          Journal. Sleep and cortisol.
        </p>
        <p className="mb-4 text-sm font-medium text-rose-deep">
          Naturopath&apos;s answer
        </p>
        <h1 className="font-display text-5xl font-normal leading-tight sm:text-7xl">
          Why do I wake at 3am in perimenopause?
        </h1>
        <div className="mt-8 rounded-lg border border-line bg-white p-7 text-lg leading-9 text-forest/82">
          Most 3am waking in perimenopause is driven by falling progesterone and
          an early, steep rise in cortisol. Progesterone is calming; as it
          declines, the nervous system loses its evening brake and the
          early-morning cortisol climb begins too soon.
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-5 pb-16 lg:grid-cols-[1fr_0.9fr] lg:px-10">
        <div className="rounded-lg bg-white p-7 sm:p-9">
          <h2 className="font-display text-4xl font-normal">
            The mechanism, in plain terms
          </h2>
          <p className="mt-5 text-base leading-8 text-forest/75">
            Cortisol is meant to follow a curve: lowest around midnight,
            climbing through the early hours, peaking shortly after you wake. In
            perimenopause, falling progesterone removes one of the brakes on
            that curve.
          </p>
          <p className="mt-5 text-base leading-8 text-forest/75">
            This is why the wake-up feels physical rather than mental. You are
            not lying awake because you are worried; the alerting program has
            run at the wrong hour.
          </p>
        </div>

        <div className="rounded-lg bg-forest p-7 text-cream sm:p-9">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-rose">
            The clinically studied dose
          </p>
          <div className="mt-6 grid gap-5">
            <Dose amount="300-400mg" label="Magnesium glycinate, evening." />
            <Dose amount="600mg" label="KSM-66 ashwagandha, daytime stress load." />
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-16 lg:px-10">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-4xl font-normal">
              Three things this week
            </h2>
            <div className="mt-7 grid gap-5">
              {[
                "Daylight within thirty minutes of waking.",
                "Thirty grams of protein at breakfast.",
                "Magnesium glycinate in the evening.",
              ].map((item, index) => (
                <div key={item} className="grid grid-cols-[3rem_1fr] gap-4">
                  <span className="font-display text-4xl text-sage">
                    {index + 1}
                  </span>
                  <p className="text-lg leading-8 text-forest/76">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-line bg-cream p-7">
            <h2 className="font-display text-4xl font-normal">
              Related questions
            </h2>
            <div className="mt-5 divide-y divide-line">
              {related.map((item) => (
                <p key={item} className="py-4 text-base text-forest/78">
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 text-center">
        <h2 className="font-display text-5xl font-normal">Start here</h2>
        <p className="mx-auto mt-4 max-w-xl text-lg leading-8 text-forest/74">
          Is it perimenopause? Find out in 5 minutes. No email needed to see
          your stage.
        </p>
        <Link
          href="/quiz"
          className="mt-8 inline-flex min-h-12 items-center rounded bg-forest px-8 text-sm font-medium text-white"
        >
          Begin the quiz
        </Link>
      </section>

      <SiteFooter note="Educational content only." />
    </main>
  );
}

function Dose({ amount, label }: { amount: string; label: string }) {
  return (
    <div>
      <p className="font-display text-5xl text-rose">{amount}</p>
      <p className="mt-2 text-base leading-7 text-cream/78">{label}</p>
    </div>
  );
}
