import Image from "next/image";
import Link from "next/link";
import {
  Bot,
  Check,
  Leaf,
  ShieldCheck,
  Star,
  Store,
} from "lucide-react";
import { FaqAccordion } from "@/components/landing/FaqAccordion";
import { FoundingListForm } from "@/components/landing/FoundingListForm";
import { PlanSelector } from "@/components/landing/PlanSelector";
import { siteJsonLd } from "@/lib/seo/schema";
import {
  benefitCards,
  faqs,
  ingredientRows,
  navLinks,
  platformPillars,
  ritualSteps,
  testimonials,
} from "@/lib/site";

const press = ["Allure", "Vogue", "Byrdie", "mindbodygreen", "goop", "Refinery29"];

const uspIcons = [
  { src: "/valentia/brand/usp-organic.png", alt: "Organic formulation icon" },
  { src: "/valentia/brand/usp-vegan.png", alt: "Vegan formulation icon" },
  { src: "/valentia/brand/usp-nontoxic.png", alt: "Non-toxic formulation icon" },
  { src: "/valentia/brand/usp-sustainable.png", alt: "Sustainable packaging icon" },
];

const checklistIn = [
  "Best bioavailable botanicals",
  "Cold-pressed plant oils",
  "Concentrations that do the work",
  "Recyclable amber glass",
];

const checklistOut = [
  "Parabens",
  "Silicones",
  "Synthetic fragrance",
  "Drying alcohols and fillers",
];

export default function Home() {
  return (
    <main className="overflow-x-hidden bg-cream text-forest">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd()) }}
      />

      <div className="bg-forest px-5 py-3 text-center text-xs font-medium uppercase leading-5 tracking-[0.14em] text-cream sm:text-sm">
        <span className="sm:hidden">Free shipping $60+.</span>
        <span className="hidden sm:inline">
          Free shipping over $60. Founding-list members receive the Hormone Reset Guide.
        </span>
      </div>

      <header className="sticky top-0 z-50 border-b border-sand/75 bg-cream/95 backdrop-blur">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-5 py-4 lg:px-10">
          <div className="hidden flex-1 items-center gap-7 lg:flex">
            {navLinks.slice(0, 3).map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium tracking-[0.04em] text-forest transition hover:text-rose-deep"
              >
                {link.label}
              </a>
            ))}
          </div>

          <a
            href="#top"
            className="shrink-0 text-xl font-semibold uppercase tracking-[0.22em]"
          >
            Valentia
          </a>

          <div className="flex flex-1 items-center justify-end gap-3 sm:gap-5">
            {navLinks.slice(3).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hidden text-sm font-medium tracking-[0.04em] text-forest transition hover:text-rose-deep sm:inline"
              >
                {link.label}
              </Link>
            ))}
            <a
              href="/quiz"
              className="hidden min-h-10 items-center rounded bg-rose px-6 text-sm font-medium text-forest transition hover:bg-rose-deep hover:text-white sm:inline-flex"
            >
              Take the quiz
            </a>
          </div>
        </nav>
      </header>

      <section
        id="top"
        className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 sm:py-20 lg:grid-cols-[0.92fr_1.08fr] lg:px-10 lg:py-24"
      >
        <div className="w-full max-w-[21rem] sm:max-w-xl">
          <p className="mb-7 text-xs font-semibold uppercase tracking-[0.18em] text-rose-deep">
            Naturopath-formulated skincare
          </p>
          <h1 className="font-display text-5xl font-normal leading-[0.98] text-forest sm:text-7xl lg:text-[5.6rem]">
            One serum.
            <br />
            One ritual.
            <br />
            <span className="italic text-rose-deep">
              Returned to,
              <br className="sm:hidden" /> daily.
            </span>
          </h1>
          <p className="mt-7 max-w-[20rem] text-base leading-8 text-forest/80 sm:max-w-lg sm:text-lg">
            A plant-led vitamin C serum formulated around long-term skin balance.
            Kakadu plum, ferulic acid, and cold-pressed botanical oils; nothing
            that does not need to be there.
          </p>

          <div className="mt-8 flex max-w-[20rem] flex-wrap items-center gap-3 sm:max-w-lg">
            <div className="flex text-rose-deep" aria-label="Five star rating">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star key={index} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <span className="min-w-0 flex-1 text-xs leading-5 text-forest/65 sm:text-sm">
              Loved by women who value patience over promises
            </span>
          </div>

          <div className="mt-8 grid max-w-[21rem] grid-cols-2 gap-3 sm:flex sm:max-w-none sm:flex-wrap">
            <a
              href="#pricing"
              className="inline-flex min-h-12 items-center justify-center rounded bg-rose px-4 text-sm font-medium text-forest transition hover:bg-rose-deep hover:text-white sm:px-7"
            >
              Shop the serum
            </a>
            <a
              href="#ingredients"
              className="inline-flex min-h-12 items-center justify-center rounded border border-sand px-4 text-sm font-medium text-forest transition hover:border-forest sm:px-7"
            >
              <span className="sm:hidden">See inside</span>
              <span className="hidden sm:inline">See what is inside</span>
            </a>
          </div>

          <p className="mt-6 max-w-[20rem] text-xs font-medium uppercase leading-5 tracking-[0.12em] text-sage sm:max-w-lg">
            Cruelty-free. Vegan. Every dose disclosed. 60-day guarantee.
          </p>
        </div>

        <div className="relative w-full max-w-[21.75rem] sm:mx-auto sm:max-w-2xl">
          <div className="absolute inset-[7%] rounded-full bg-rose/35 blur-2xl" />
          <Image
            src="/valentia/allisonharp_valentiaseptember-64-mqk5osc8.jpeg"
            alt="Valentia Vitamin C Serum bottle held in warm daylight"
            width={1320}
            height={1980}
            priority
            sizes="(min-width: 1024px) 48vw, 92vw"
            className="relative z-10 aspect-[4/5] w-full rounded-md object-cover object-center shadow-[0_34px_80px_-44px_rgba(40,61,33,0.55)]"
          />
        </div>
      </section>

      <section className="overflow-hidden bg-forest py-6 text-cream">
        <div className="marquee-track flex w-max items-center gap-16 whitespace-nowrap">
          {[...press, ...press].map((name, index) => (
            <span
              key={`${name}-${index}`}
              className="font-display text-3xl opacity-80"
            >
              {name}
            </span>
          ))}
        </div>
      </section>

      <section className="bg-white px-5 py-12">
        <div className="mx-auto grid max-w-5xl grid-cols-2 items-center gap-6 sm:grid-cols-4">
          {uspIcons.map((icon) => (
            <div key={icon.src} className="flex justify-center">
              <Image
                src={icon.src}
                alt={icon.alt}
                width={116}
                height={116}
                className="h-24 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </section>

      <section id="benefits" className="px-5 py-20 sm:py-24 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-rose-deep">
              Why one serum is enough
            </p>
            <h2 className="font-display text-5xl font-normal leading-tight text-forest sm:text-6xl">
              Everything your skin needs, in a single bottle
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {benefitCards.map((card, index) => (
              <article
                key={card.title}
                className="rounded-lg border border-line bg-white p-8"
              >
                <p className="font-display text-4xl text-sage">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-5 font-display text-3xl font-medium leading-tight">
                  {card.title}
                </h3>
                <p className="mt-3 text-base leading-7 text-forest/75">
                  {card.copy}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="ingredients" className="bg-forest text-cream">
        <div className="grid lg:grid-cols-2">
          <div className="relative min-h-[420px] lg:min-h-[680px]">
            <Image
              src="/valentia/brand/vitc-lifestyle1.png"
              alt="Valentia serum texture and botanical ingredients"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="px-5 py-20 sm:px-10 lg:px-16 lg:py-24">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-rose">
              What is inside
            </p>
            <h2 className="font-display text-5xl font-normal leading-tight">
              Botanicals with nothing to hide
            </h2>
            <p className="mt-5 max-w-lg text-base leading-8 text-cream/75">
              Every ingredient is real, traceable, and chosen for a reason. No
              fillers, no synthetic fragrance, no proprietary blends.
            </p>

            <div className="mt-10 divide-y divide-sand/35 border-y border-sand/35">
              {ingredientRows.map((row) => (
                <div
                  key={row.name}
                  className="grid gap-3 py-5 sm:grid-cols-[0.8fr_1fr] sm:items-start"
                >
                  <h3 className="font-display text-3xl">{row.name}</h3>
                  <p className="text-sm leading-6 text-cream/75 sm:text-right">
                    {row.copy}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-20 sm:py-24 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="mb-14 text-center">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-rose-deep">
              The daily ritual
            </p>
            <h2 className="font-display text-5xl font-normal leading-tight sm:text-6xl">
              Three drops. Every morning.
            </h2>
          </div>

          <div className="grid gap-5 lg:grid-cols-[1.15fr_0.95fr_0.95fr_0.95fr]">
            <div className="relative min-h-80 overflow-hidden rounded-lg">
              <Image
                src="/valentia/brand/photo-3.jpg"
                alt="Valentia serum morning ritual"
                fill
                sizes="(min-width: 1024px) 30vw, 100vw"
                className="object-cover"
              />
            </div>
            {ritualSteps.map((step, index) => (
              <article key={step.title} className="rounded-lg bg-cream p-8">
                <p className="font-display text-5xl text-sage">{index + 1}</p>
                <h3 className="mt-5 font-display text-3xl font-medium">
                  {step.title}
                </h3>
                <p className="mt-3 text-base leading-7 text-forest/75">
                  {step.copy}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:py-24 lg:px-10">
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-rose-deep">
              Nothing to hide
            </p>
            <h2 className="font-display text-5xl font-normal leading-tight">
              Formulated by a naturopath, not a marketing team
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <Checklist title="What goes in" items={checklistIn} tone="in" />
            <Checklist title="What we leave out" items={checklistOut} tone="out" />
          </div>
        </div>
      </section>

      <section id="story" className="bg-sand">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative min-h-[460px] lg:min-h-[620px]">
            <Image
              src="/valentia/brand/founder.jpg"
              alt="Valentia founder Davina Hearne"
              fill
              sizes="(min-width: 1024px) 42vw, 100vw"
              className="object-cover object-top"
            />
          </div>
          <div className="flex flex-col justify-center px-5 py-20 sm:px-10 lg:px-16">
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.18em] text-[#7b5431]">
              From the founder
            </p>
            <h2 className="font-display text-5xl font-normal leading-tight">
              Wellness built on patience, not promises.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-9 text-forest/82">
              Valentia began with a simple belief: what you put on your skin
              should be as considered as what you put in your body. The formula
              is built around clinical dosing and long-term health, with
              botanicals chosen for what they do over months, not days.
            </p>
            <p className="mt-5 max-w-xl text-lg leading-9 text-forest/82">
              Every dose is disclosed. Nothing is added that does not need to be
              there.
            </p>
            <p className="mt-7 font-display text-3xl italic text-rose-deep">
              Davina Hearne, Naturopath
            </p>
          </div>
        </div>
      </section>

      <section id="reviews" className="bg-white px-5 py-20 sm:py-24 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <p className="mb-5 text-sm uppercase tracking-[0.2em] text-rose-deep">
              Five star customer notes
            </p>
            <h2 className="font-display text-5xl font-normal">
              What women tell us
            </h2>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <article
                key={testimonial.name}
                className="rounded-lg border border-line bg-cream p-8"
              >
                <p className="mb-5 text-sm uppercase tracking-[0.18em] text-rose-deep">
                  Five stars
                </p>
                <blockquote className="font-display text-2xl leading-8">
                  {testimonial.quote}
                </blockquote>
                <p className="mt-6 text-xs font-medium uppercase tracking-[0.12em] text-sage">
                  {testimonial.name} - Verified buyer
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:py-24 lg:px-10">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div>
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-rose-deep">
              Built for one product, ready for scale
            </p>
            <h2 className="font-display text-5xl font-normal leading-tight">
              A clean commerce and content backbone for customers, stockists,
              and search.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-forest/75">
              The public site starts with one serum, while the backend is shaped
              for inventory, customer accounts, wholesale clients, advertising,
              SEO data, media, schema, and programmatic pages.
            </p>
          </div>
          <div className="grid gap-4">
            {platformPillars.map((pillar, index) => {
              const icons = [
                <Store key="store" className="h-5 w-5" />,
                <ShieldCheck key="shield" className="h-5 w-5" />,
                <Bot key="bot" className="h-5 w-5" />,
              ];

              return (
                <article
                  key={pillar.title}
                  className="grid gap-3 rounded-lg border border-line bg-white p-6 sm:grid-cols-[auto_1fr]"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded bg-forest text-white">
                    {icons[index]}
                  </div>
                  <div>
                    <h3 className="font-display text-3xl">{pillar.title}</h3>
                    <p className="mt-2 text-base leading-7 text-forest/72">
                      {pillar.copy}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="pricing" className="px-5 py-20 sm:py-24 lg:px-10">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:items-center">
          <div className="relative">
            <div className="absolute inset-[10%] rounded-full bg-rose/35 blur-2xl" />
            <Image
              src="/valentia/6o9a2691-edit-mqk5nl6r.jpg"
              alt="Valentia Vitamin C Serum packaging"
              width={1200}
              height={1500}
              sizes="(min-width: 1024px) 45vw, 92vw"
              className="relative z-10 aspect-[4/5] w-full rounded-md object-cover shadow-[0_28px_70px_-42px_rgba(40,61,33,0.55)]"
            />
          </div>

          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-rose-deep">
              One-product line
            </p>
            <h2 className="font-display text-5xl font-normal leading-tight">
              Vitamin C Serum
            </h2>
            <p className="mt-3 text-base text-forest/65">
              With Kakadu plum and ferulic acid. 1 fl oz / 30 ml.
            </p>
            <div className="mt-8">
              <PlanSelector />
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="bg-white px-5 py-20 sm:py-24 lg:px-10">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-12 text-center font-display text-5xl font-normal">
            Questions, answered
          </h2>
          <FaqAccordion faqs={faqs} />
        </div>
      </section>

      <footer className="bg-forest px-5 py-16 text-cream lg:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 border-b border-sand/30 pb-12 lg:grid-cols-[1.4fr_0.8fr_0.8fr_1.4fr]">
            <div>
              <p className="text-2xl font-semibold uppercase tracking-[0.24em]">
                Valentia
              </p>
              <p className="mt-5 font-display text-3xl italic text-rose">
                Wellness built on patience.
              </p>
            </div>
            <FooterColumn
              title="Shop"
              links={[
                { href: "#pricing", label: "Vitamin C Serum" },
                { href: "#join", label: "Founding list" },
                { href: "/wholesale", label: "Wholesale" },
              ]}
            />
            <FooterColumn
              title="Learn"
              links={[
                { href: "#ingredients", label: "Ingredients" },
                { href: "#story", label: "Our story" },
                { href: "#faq", label: "FAQ" },
              ]}
            />
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-rose">
                Join the founding list
              </p>
              <p className="mb-4 text-sm leading-6 text-cream/75">
                First access, formulation notes, and exclusive pricing at launch.
              </p>
              <FoundingListForm source="footer" compact />
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4 pt-7 text-sm text-cream/65">
            <p>2026 Valentia. All rights reserved.</p>
            <div className="flex gap-5">
              <Link href="/account">Account</Link>
              <Link href="/wholesale">Wholesale</Link>
              <a href="/llms.txt">AI summary</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

function Checklist({
  title,
  items,
  tone,
}: {
  title: string;
  items: string[];
  tone: "in" | "out";
}) {
  return (
    <article className="rounded-lg border border-line bg-white p-8 sm:p-10">
      <h3 className="font-display text-3xl font-medium">{title}</h3>
      <div className="mt-6 grid gap-4">
        {items.map((item) => (
          <div key={item} className="flex gap-3 text-base text-forest/82">
            {tone === "in" ? (
              <Check className="mt-1 h-4 w-4 shrink-0 text-sage" />
            ) : (
              <Leaf className="mt-1 h-4 w-4 shrink-0 text-rose-deep" />
            )}
            <span>{item}</span>
          </div>
        ))}
      </div>
    </article>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: Array<{ href: string; label: string }>;
}) {
  return (
    <div>
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-rose">
        {title}
      </p>
      <div className="grid gap-3 text-sm text-cream/78">
        {links.map((link) =>
          link.href.startsWith("/") ? (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ) : (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ),
        )}
      </div>
    </div>
  );
}
