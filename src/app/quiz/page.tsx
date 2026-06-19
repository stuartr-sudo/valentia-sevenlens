import type { Metadata } from "next";
import Link from "next/link";
import { FoundingListForm } from "@/components/landing/FoundingListForm";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { quizOutcomes, quizSignals } from "@/lib/pages";

export const metadata: Metadata = {
  title: "Hormonal Symptom Quiz",
  description:
    "A free 5-minute self-audit from Valentia founder and naturopath Davina Hearne.",
  alternates: {
    canonical: "/quiz",
  },
};

const questions = [
  "Are you waking between 2am and 4am more than twice a week?",
  "Has your mood changed without an obvious life event?",
  "Has your skin suddenly become drier, reactive, or breakout-prone?",
  "Do you feel less tolerant of stress than you did five years ago?",
  "Have you been told your labs are normal while your symptoms are not?",
];

export default function QuizPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-cream text-forest">
      <SiteHeader compact />

      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:py-24 lg:grid-cols-[0.9fr_1.1fr] lg:px-10 lg:items-center">
        <div>
          <p className="mb-5 max-w-[20rem] text-xs font-semibold uppercase leading-5 tracking-[0.16em] text-rose-deep sm:max-w-none">
            <span className="sm:hidden">A free 5-minute self-audit</span>
            <span className="hidden sm:inline">
              A free 5-minute self-audit from a naturopath
            </span>
          </p>
          <h1 className="max-w-[20rem] font-display text-4xl font-normal leading-tight sm:max-w-none sm:text-7xl">
            Are these symptoms hormonal?
          </h1>
          <p className="mt-6 max-w-[20rem] text-base leading-8 text-forest/75 sm:max-w-xl sm:text-lg">
            <span className="sm:hidden">
              Ten questions. The same diagnostic Davina would give you in
              clinic.
            </span>
            <span className="hidden sm:inline">
              Five minutes. Ten questions. The same diagnostic Davina would give
              you in clinic, without the $500 consultation.
            </span>
          </p>
          <a
            href="#quiz-form"
            className="mt-8 inline-flex min-h-12 items-center rounded bg-rose px-8 text-sm font-medium text-forest transition hover:bg-rose-deep hover:text-white"
          >
            Begin the quiz
          </a>
          <p className="mt-4 text-sm text-forest/55">
            Free. About 5 minutes. No email needed to see your stage.
          </p>
        </div>

        <div className="max-w-[21.75rem] overflow-hidden rounded-lg border border-line bg-white p-7 sm:max-w-none sm:p-9">
          <h2 className="font-display text-3xl font-normal leading-tight sm:text-4xl">
            If you have said any of these out loud.
          </h2>
          <div className="mt-6 grid gap-4">
            {quizSignals.map((signal) => (
              <blockquote
                key={signal}
                className="rounded bg-cream p-5 font-display text-xl italic leading-8 text-forest sm:text-2xl"
              >
                {signal}
              </blockquote>
            ))}
          </div>
          <p className="mt-6 text-base leading-7 text-forest/72">
            If any of those landed, the audit will name it. Five minutes, and
            you will know what stage, or that it is not perimenopause and you
            need to look elsewhere.
          </p>
        </div>
      </section>

      <section className="bg-white px-5 py-16 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-rose-deep">
            No charge
          </p>
          <h2 className="font-display text-5xl font-normal">
            What it tells you.
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {quizOutcomes.map((outcome, index) => (
              <article key={outcome.title} className="rounded-lg bg-cream p-7">
                <p className="font-display text-5xl text-sage">{index + 1}</p>
                <h3 className="mt-5 font-display text-3xl">
                  {outcome.title}
                </h3>
                <p className="mt-3 text-base leading-7 text-forest/72">
                  {outcome.copy}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="quiz-form" className="mx-auto grid max-w-6xl gap-8 px-5 py-16 lg:grid-cols-[1fr_1fr] lg:px-10 lg:items-start">
        <div className="rounded-lg bg-forest p-7 text-cream sm:p-9">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-rose">
            Your result
          </p>
          <h2 className="mt-4 font-display text-5xl font-normal">
            See your stage on screen. Get the full report by email.
          </h2>
          <p className="mt-5 text-base leading-8 text-cream/75">
            Your stage shows immediately. The full personalised result, your
            dominant cluster, and three tailored actions land as a welcome
            email, followed by Davina&apos;s free 5-day sleep reset.
          </p>
          <div className="mt-8">
            <FoundingListForm source="quiz" />
          </div>
        </div>

        <form className="rounded-lg border border-line bg-white p-7 sm:p-9">
          <h2 className="font-display text-4xl font-normal">
            Quick self-audit
          </h2>
          <div className="mt-6 grid gap-4">
            {questions.map((question) => (
              <label
                key={question}
                className="flex gap-3 rounded border border-line bg-cream p-4 text-sm leading-6 text-forest/80"
              >
                <input type="checkbox" className="mt-1 h-4 w-4 accent-forest" />
                <span>{question}</span>
              </label>
            ))}
          </div>
          <button
            type="button"
            className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded bg-forest px-6 text-sm font-medium text-white"
          >
            Show my result
          </button>
          <p className="mt-4 text-xs leading-6 text-forest/55">
            Two-click unsubscribe. We never share your details.
          </p>
        </form>
      </section>

      <section className="bg-sand px-5 py-16 lg:px-10">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-display text-5xl font-normal">
            About the person who built this.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-9 text-forest/80">
            Davina is a naturopath of fifteen years, forty-two, and in
            perimenopause herself. The framework in this audit is the one she
            uses with clients in the first twenty minutes of every initial
            appointment.
          </p>
          <Link href="/about" className="mt-6 inline-flex text-sm font-medium text-forest">
            Read Davina&apos;s story
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
