import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { StructuredData } from "@/components/seo/StructuredData";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { tradeProducts, wholesaleBenefits } from "@/lib/pages";
import { wholesalePageJsonLd } from "@/lib/seo/schema";

export const metadata: Metadata = {
  title: "Wholesale",
  description:
    "Wholesale and practitioner partnerships for Valentia stockists, clinics, pharmacies and considered retailers.",
  alternates: {
    canonical: "/wholesale",
  },
};

export default function WholesalePage() {
  return (
    <main className="min-h-screen bg-cream text-forest">
      <StructuredData data={wholesalePageJsonLd()} />
      <SiteHeader active="Wholesale" />

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:py-24 lg:grid-cols-[0.9fr_1.1fr] lg:px-10 lg:items-center">
        <div>
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-rose-deep">
            Wholesale and practitioner partnerships
          </p>
          <h1 className="font-display text-5xl font-normal leading-tight sm:text-7xl">
            Stock a range your clients can actually trust.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-forest/75">
            Valentia is built for practitioners: clinically meaningful doses,
            disclosed on every label, and educational materials you can hand a
            client without a disclaimer.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#apply"
              className="inline-flex min-h-12 items-center rounded bg-rose px-7 text-sm font-medium text-forest"
            >
              Apply to stock Valentia
            </a>
            <Link
              href="/wholesale/portal"
              className="inline-flex min-h-12 items-center rounded border border-sand px-7 text-sm font-medium text-forest"
            >
              Stockist login
            </Link>
          </div>
        </div>
        <div className="relative min-h-[480px] overflow-hidden rounded-lg sm:min-h-[620px]">
          <Image
            src="/valentia/brand/packaging.png"
            alt="Valentia wholesale range packaging"
            fill
            sizes="(min-width: 1024px) 48vw, 92vw"
            className="object-cover"
            priority
          />
        </div>
      </section>

      <section className="bg-white px-5 py-16 lg:px-10">
        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2 lg:grid-cols-4">
          {wholesaleBenefits.map((benefit) => (
            <article key={benefit.title} className="rounded-lg bg-cream p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-rose-deep">
                {benefit.label}
              </p>
              <h2 className="mt-4 font-display text-3xl">{benefit.title}</h2>
              <p className="mt-3 text-sm leading-7 text-forest/72">
                {benefit.copy}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 lg:px-10">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-rose-deep">
          The trade range
        </p>
        <h2 className="font-display text-5xl font-normal">
          The full catalog, at trade.
        </h2>
        <p className="mt-3 max-w-xl text-base leading-7 text-forest/72">
          Full pricing, stock levels and ordering unlock inside the stockist
          portal.
        </p>
        <div className="mt-9 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {tradeProducts.map((product) => (
            <article key={product.name} className="rounded-lg border border-line bg-white p-5">
              <div className="relative mb-5 aspect-square overflow-hidden rounded bg-cream">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(min-width: 1024px) 22vw, 46vw"
                  className="object-cover"
                />
              </div>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-sage">
                {product.category}
              </p>
              <h3 className="mt-2 font-display text-3xl">{product.name}</h3>
              <p className="mt-1 text-sm text-forest/60">{product.detail}</p>
              <div className="mt-5 flex justify-between text-sm">
                <span>{product.rrp}</span>
                <span className="font-medium">{product.trade}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="apply" className="bg-sand px-5 py-16 lg:px-10">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#7b5431]">
              Apply to stock
            </p>
            <h2 className="font-display text-5xl font-normal">
              Open a trade account.
            </h2>
            <p className="mt-4 text-base leading-8 text-forest/78">
              Tell us about your practice or store. We review every application
              personally and reply within three working days with pricing and
              portal access.
            </p>
          </div>
          <form className="rounded-lg bg-white p-7 sm:p-9">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Business / practice name" />
              <Field label="Contact name" />
              <Field label="Email" type="email" />
              <Field label="Phone" />
              <Field label="Business type" />
              <Field label="Practitioner reg. no. (if any)" />
              <label className="grid gap-2 text-sm text-forest/70 sm:col-span-2">
                Tell us about your practice and clients
                <textarea className="min-h-36 rounded border border-line bg-cream p-4 outline-none" />
              </label>
            </div>
            <button className="mt-6 min-h-12 w-full rounded bg-forest px-6 text-sm font-medium text-white" type="button">
              Submit application
            </button>
            <p className="mt-4 text-xs text-forest/55">
              Reviewed personally. Reply within three working days.
            </p>
          </form>
        </div>
      </section>

      <SiteFooter note="Trade terms available on request." />
    </main>
  );
}

function Field({
  label,
  type = "text",
}: {
  label: string;
  type?: string;
}) {
  return (
    <label className="grid gap-2 text-sm text-forest/70">
      {label}
      <input
        type={type}
        className="min-h-12 rounded border border-line bg-cream px-4 outline-none"
      />
    </label>
  );
}
