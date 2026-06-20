import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { LockKeyhole, Minus, Plus } from "lucide-react";
import { StructuredData } from "@/components/seo/StructuredData";
import { SiteHeader } from "@/components/site/SiteHeader";
import { cartPageJsonLd } from "@/lib/seo/schema";

export const metadata: Metadata = {
  title: "Cart",
  description: "Valentia cart for serum subscription and one-time orders.",
  alternates: {
    canonical: "/cart",
  },
};

export default function CartPage() {
  return (
    <main className="min-h-screen bg-cream text-forest">
      <StructuredData data={cartPageJsonLd()} />
      <SiteHeader compact />

      <section className="mx-auto max-w-6xl px-5 py-14 sm:py-20 lg:px-10">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-sage">
          Cart
        </p>
        <h1 className="font-display text-5xl font-normal sm:text-6xl">
          Your cart.
        </h1>
        <p className="mt-3 text-base text-forest/65">
          Free shipping over $60. Patience over promises; cancel a subscription
          in two clicks, any time.
        </p>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_24rem] lg:items-start">
          <div className="rounded-lg border border-line bg-white p-5 sm:p-7">
            <div className="mb-6 rounded bg-cream p-5">
              <h2 className="font-display text-3xl">
                Subscribe and save 20%
              </h2>
              <p className="mt-2 text-sm text-forest/68">
                Delivered monthly. Skip, change or cancel any time.
              </p>
            </div>

            <div className="grid gap-5 border-b border-line pb-6 sm:grid-cols-[8rem_1fr_auto] sm:items-center">
              <div className="relative aspect-square overflow-hidden rounded bg-cream">
                <Image
                  src="/valentia/brand/product-vitc.png"
                  alt="Valentia Vitamin C Serum"
                  fill
                  sizes="128px"
                  className="object-contain p-3"
                />
              </div>
              <div>
                <h2 className="font-display text-3xl">Vitamin C Serum</h2>
                <p className="mt-1 text-sm text-forest/60">
                  Monthly delivery. 30ml.
                </p>
                <button className="mt-4 text-sm text-forest/55" type="button">
                  Remove
                </button>
              </div>
              <div className="flex items-center gap-3">
                <button className="flex h-9 w-9 items-center justify-center rounded border border-line" type="button">
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-6 text-center">1</span>
                <button className="flex h-9 w-9 items-center justify-center rounded border border-line" type="button">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between rounded bg-cream p-5">
              <div>
                <p className="font-display text-2xl">Travel-size serum</p>
                <p className="text-sm text-forest/60">
                  A gift with your first subscription.
                </p>
              </div>
              <p className="font-medium">Free</p>
            </div>

            <Link href="/#pricing" className="mt-6 inline-flex text-sm text-forest/65">
              Continue shopping
            </Link>
          </div>

          <aside className="rounded-lg border border-line bg-white p-7">
            <h2 className="font-display text-3xl">Order summary</h2>
            <label className="mt-6 grid gap-2 text-sm text-forest/70">
              Discount code
              <div className="flex gap-2">
                <input className="min-h-11 min-w-0 flex-1 rounded border border-line bg-cream px-3 outline-none" />
                <button className="rounded bg-forest px-4 text-sm text-white" type="button">
                  Apply
                </button>
              </div>
            </label>
            <SummaryRow label="Subtotal" value="$38.00" />
            <SummaryRow label="Subscription saving" value="-$6.00" />
            <SummaryRow label="Shipping" value="Free" />
            <div className="mt-5 flex justify-between border-t border-line pt-5 font-medium">
              <span>Total</span>
              <span>$32.00</span>
            </div>
            <Link
              href="/checkout"
              className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded bg-rose px-6 text-sm font-medium text-forest"
            >
              Checkout
            </Link>
            <p className="mt-4 flex items-center justify-center gap-2 text-xs text-forest/55">
              <LockKeyhole className="h-4 w-4" />
              Secure checkout powered by Stripe
            </p>
          </aside>
        </div>
      </section>
    </main>
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
