import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { beliefs, credentials } from "@/lib/pages";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet Valentia founder Davina Hearne and the practitioner-led philosophy behind the brand.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-cream text-forest">
      <SiteHeader active="About" />

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:py-24 lg:grid-cols-[0.95fr_1.05fr] lg:px-10 lg:items-center">
        <div>
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-rose-deep">
            A practitioner-led wellness brand
          </p>
          <h1 className="font-display text-5xl font-normal leading-tight sm:text-7xl">
            For the woman who knows something is off, and has been told she is
            fine.
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-forest/75">
            For women 35 to 55. Founded by a naturopath of fifteen years, now in
            perimenopause herself.
          </p>
        </div>
        <div className="relative min-h-[440px] overflow-hidden rounded-lg sm:min-h-[620px]">
          <Image
            src="/valentia/brand/photo-2.jpg"
            alt="Valentia founder and product story"
            fill
            sizes="(min-width: 1024px) 46vw, 92vw"
            className="object-cover"
            priority
          />
        </div>
      </section>

      <section className="bg-white px-5 py-16 sm:py-24 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-rose-deep">
            The philosophy
          </p>
          <h2 className="mb-10 font-display text-5xl font-normal">
            What we believe.
          </h2>
          <div className="grid gap-5 md:grid-cols-2">
            {beliefs.map((belief) => (
              <p
                key={belief}
                className="rounded-lg border border-line bg-cream p-7 text-base leading-8 text-forest/78"
              >
                {belief}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="grid bg-sand lg:grid-cols-[0.9fr_1.1fr]">
        <div className="relative min-h-[460px] lg:min-h-[760px]">
          <Image
            src="/valentia/brand/founder.jpg"
            alt="Davina Hearne, Valentia founder"
            fill
            sizes="(min-width: 1024px) 42vw, 100vw"
            className="object-cover object-top"
          />
        </div>
        <div className="px-5 py-16 sm:px-10 sm:py-24 lg:px-16">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-[#7b5431]">
            The founder
          </p>
          <h2 className="font-display text-5xl font-normal">About Davina.</h2>
          <div className="mt-8 grid gap-5 text-lg leading-9 text-forest/82">
            <p>
              I am a naturopath. Fifteen years in practice. Forty-two now, and
              in perimenopause myself.
            </p>
            <p>
              The first sign was the sleep. I would fall asleep fine and wake at
              3am, every night, wide awake. I cut the wine and the wake-ups
              continued.
            </p>
            <p>
              I had every textbook on the subject, and I still walked through it
              convinced something else was wrong with me. That is how
              perimenopause works.
            </p>
            <p className="font-display text-3xl italic leading-10 text-forest">
              Small. Practitioner-formulated. Doses you can read on the label.
            </p>
          </div>
          <p className="mt-8 font-display text-3xl italic text-rose-deep">
            Davina Hearne, Naturopath (Diploma, NZ)
          </p>
        </div>
      </section>

      <section className="bg-forest px-5 py-16 text-cream sm:py-24 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-rose">
            The reassurance
          </p>
          <h2 className="mb-10 font-display text-5xl font-normal">
            Qualifications.
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {credentials.map((credential) => (
              <article key={credential.title} className="bg-white/8 p-7">
                <h3 className="font-display text-3xl">{credential.title}</h3>
                <p className="mt-3 text-sm leading-7 text-cream/75">
                  {credential.copy}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 text-center sm:py-24 lg:px-10">
        <h2 className="font-display text-5xl font-normal">Ready?</h2>
        <p className="mx-auto mt-4 max-w-xl text-lg leading-8 text-forest/72">
          The quiz is the best place to start. Five minutes, immediate result,
          no email required to see your answer.
        </p>
        <Link
          href="/quiz"
          className="mt-8 inline-flex min-h-12 items-center rounded bg-forest px-8 text-sm font-medium text-white transition hover:bg-sage"
        >
          Begin the quiz
        </Link>
      </section>

      <SiteFooter />
    </main>
  );
}
