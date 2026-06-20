import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { LockKeyhole } from "lucide-react";
import { StructuredData } from "@/components/seo/StructuredData";
import { checkoutPageJsonLd } from "@/lib/seo/schema";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Valentia secure checkout layout for Stripe payments.",
  alternates: {
    canonical: "/checkout",
  },
};

export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-cream text-forest">
      <StructuredData data={checkoutPageJsonLd()} />
      <header className="border-b border-line bg-white px-5 py-5">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Link href="/" className="text-lg font-semibold uppercase tracking-[0.22em]">
            Valentia
          </Link>
          <span className="flex items-center gap-2 text-sm text-forest/60">
            <LockKeyhole className="h-4 w-4" />
            Secure
          </span>
        </div>
      </header>

      <section className="mx-auto grid max-w-6xl gap-8 px-5 py-10 lg:grid-cols-[1fr_24rem] lg:px-10">
        <div className="rounded-lg border border-line bg-white p-6 sm:p-8">
          <div className="grid gap-3 sm:grid-cols-2">
            <button className="min-h-12 rounded bg-forest text-sm font-medium text-white" type="button">
              Pay with Link
            </button>
            <button className="min-h-12 rounded border border-line text-sm font-medium" type="button">
              G Pay
            </button>
          </div>

          <div className="my-8 flex items-center gap-4 text-xs uppercase tracking-[0.12em] text-forest/45">
            <span className="h-px flex-1 bg-line" />
            Or pay with card
            <span className="h-px flex-1 bg-line" />
          </div>

          <CheckoutSection title="Contact">
            <input className="field" placeholder="Email" type="email" />
          </CheckoutSection>

          <CheckoutSection title="Delivery">
            <div className="grid gap-3 sm:grid-cols-2">
              <input className="field" placeholder="First name" />
              <input className="field" placeholder="Last name" />
              <input className="field sm:col-span-2" placeholder="Address" />
              <input className="field" placeholder="City" />
              <input className="field" placeholder="Postcode" />
            </div>
            <div className="mt-4 rounded border border-line bg-cream p-4 text-sm">
              Standard. 3-5 working days.
            </div>
          </CheckoutSection>

          <CheckoutSection title="Payment">
            <p className="mb-3 text-sm text-forest/60">
              All transactions are secure and encrypted.
            </p>
            <input className="field" placeholder="Card number" />
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <input className="field" placeholder="MM / YY" />
              <input className="field" placeholder="CVC" />
            </div>
          </CheckoutSection>

          <button className="mt-8 min-h-12 w-full rounded bg-rose px-6 text-sm font-medium text-forest" type="button">
            Pay
          </button>
          <p className="mt-4 text-center text-xs text-forest/50">
            Powered by Stripe. Terms. Privacy.
          </p>
        </div>

        <aside className="rounded-lg border border-line bg-white p-6">
          <div className="flex gap-4 border-b border-line pb-5">
            <div className="relative h-20 w-20 overflow-hidden rounded bg-cream">
              <Image
                src="/valentia/brand/product-vitc.png"
                alt="Valentia serum"
                fill
                sizes="80px"
                className="object-contain p-2"
              />
            </div>
            <div className="flex-1">
              <h2 className="font-display text-2xl">Vitamin C Serum</h2>
              <p className="text-sm text-forest/60">Monthly delivery</p>
              <p className="mt-2 font-medium">$32.00</p>
            </div>
          </div>
          <div className="mt-5 rounded bg-cream p-4">
            <p className="font-display text-2xl">Travel-size serum</p>
            <p className="text-sm text-forest/60">First-subscription gift.</p>
          </div>
          <SummaryRow label="Subtotal" value="$38.00" />
          <SummaryRow label="Subscription saving" value="-$6.00" />
          <SummaryRow label="Shipping" value="Free" />
          <div className="mt-5 flex justify-between border-t border-line pt-5 font-medium">
            <span>Total</span>
            <span>$32.00 NZD</span>
          </div>
          <p className="mt-6 text-sm leading-6 text-forest/65">
            A naturopath formulated this, and a person packs it. If it is not
            right, our 60-day guarantee has you covered.
          </p>
        </aside>
      </section>
    </main>
  );
}

function CheckoutSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-8">
      <h2 className="mb-4 font-display text-3xl">{title}</h2>
      {children}
    </section>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="mt-4 flex justify-between text-sm text-forest/70">
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}
