import type { Metadata } from "next";
import { StructuredData } from "@/components/seo/StructuredData";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { contactPageJsonLd } from "@/lib/seo/schema";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Valentia for product questions, order support, wholesale, press, and partnerships.",
  alternates: {
    canonical: "/contact",
  },
};

const contacts = [
  { title: "General and product", email: "hello@valentia.com.au" },
  { title: "Wholesale and stockists", email: "trade@valentia.com.au" },
  { title: "Press and partnerships", email: "press@valentia.com.au" },
];

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-cream text-forest">
      <StructuredData data={contactPageJsonLd()} />
      <SiteHeader active="Contact" />

      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:py-24 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">
        <div>
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-rose-deep">
            Get in touch
          </p>
          <h1 className="font-display text-5xl font-normal leading-tight sm:text-7xl">
            Write to us. A person reads every message.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-forest/75">
            Davina formulates every product and writes every email. If you send
            a note here, it reaches her or someone on the small team, and you
            will hear back within two working days.
          </p>

          <div className="mt-9 grid gap-5">
            {contacts.map((item) => (
              <div key={item.email} className="flex gap-4">
                <div className="h-10 w-10 shrink-0 rounded-full bg-sand" />
                <div>
                  <p className="font-display text-2xl">{item.title}</p>
                  <a className="text-sm text-rose-deep" href={`mailto:${item.email}`}>
                    {item.email}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        <form className="rounded-lg border border-line bg-white p-7 sm:p-9">
          <h2 className="font-display text-4xl font-normal">Send a message</h2>
          <p className="mt-2 text-sm text-forest/60">
            We reply within two working days. No autoresponders.
          </p>
          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            <Field label="First name" />
            <Field label="Last name" />
            <Field label="Email" type="email" className="sm:col-span-2" />
            <label className="grid gap-2 text-sm text-forest/70 sm:col-span-2">
              What is this about?
              <select className="min-h-12 rounded border border-line bg-cream px-4 text-forest outline-none">
                <option>A product question</option>
                <option>My order</option>
                <option>Wholesale</option>
                <option>Something else</option>
              </select>
            </label>
            <label className="grid gap-2 text-sm text-forest/70 sm:col-span-2">
              Message
              <textarea className="min-h-40 rounded border border-line bg-cream p-4 text-forest outline-none" />
            </label>
          </div>
          <button
            type="button"
            className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded bg-forest px-6 text-sm font-medium text-white"
          >
            Send message
          </button>
          <p className="mt-4 text-xs leading-6 text-forest/55">
            By sending, you agree to our privacy policy. We never share your
            details.
          </p>
        </form>
      </section>

      <section className="bg-sand px-5 py-14 text-center">
        <blockquote className="mx-auto max-w-3xl font-display text-4xl italic leading-tight">
          If you are awake at 3am reading this, you are not the only one. Write
          to me in the morning. I will be here.
        </blockquote>
        <p className="mt-5 text-sm font-medium uppercase tracking-[0.12em] text-forest/65">
          Davina Hearne. Naturopath.
        </p>
      </section>

      <SiteFooter />
    </main>
  );
}

function Field({
  label,
  type = "text",
  className = "",
}: {
  label: string;
  type?: string;
  className?: string;
}) {
  return (
    <label className={`grid gap-2 text-sm text-forest/70 ${className}`}>
      {label}
      <input
        type={type}
        className="min-h-12 rounded border border-line bg-cream px-4 text-forest outline-none"
      />
    </label>
  );
}
