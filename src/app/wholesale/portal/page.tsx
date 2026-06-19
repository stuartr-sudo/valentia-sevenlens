import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
import { Minus, Plus } from "lucide-react";
import { OwnerAccessForm } from "@/components/wholesale/OwnerAccessForm";
import {
  ownerAccessConfig,
  verifyOwnerSessionCookie,
} from "@/lib/owner-access";
import { tradeProducts } from "@/lib/pages";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Stockist Portal",
  description:
    "Valentia stockist login and wholesale ordering portal preview.",
  alternates: {
    canonical: "/wholesale/portal",
  },
};

export default async function WholesalePortalPage() {
  const cookieStore = await cookies();
  const ownerSession = verifyOwnerSessionCookie(
    cookieStore.get(ownerAccessConfig.cookieName)?.value,
  );
  const hasOwnerAccess = Boolean(ownerSession);

  return (
    <main className="min-h-screen bg-cream text-forest">
      <section className="grid min-h-screen lg:grid-cols-[0.9fr_1.1fr]">
        <div className="relative hidden overflow-hidden lg:block">
          <Image
            src="/valentia/brand/photo-2.jpg"
            alt="Valentia trade portal"
            fill
            sizes="42vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-forest/35" />
          <div className="absolute bottom-12 left-12 text-cream">
            <p className="text-2xl font-semibold uppercase tracking-[0.24em]">
              Valentia
            </p>
            <p className="mt-4 max-w-sm font-display text-4xl italic leading-tight">
              The trade portal for practitioners and stockists.
            </p>
          </div>
        </div>

        <div className="px-5 py-10 sm:px-10 lg:px-14">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-lg font-semibold uppercase tracking-[0.22em]">
              Valentia
            </Link>
            <Link href="/wholesale" className="text-sm text-rose-deep">
              Apply
            </Link>
          </div>

          <div className="mt-12 grid gap-8 xl:grid-cols-[0.8fr_1.2fr]">
            <section className="rounded-lg border border-line bg-white p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-rose-deep">
                {hasOwnerAccess ? "Owner access active" : "Owner access"}
              </p>
              <h1 className="mt-4 font-display text-5xl font-normal">
                {hasOwnerAccess ? "Welcome, Davina." : "Unlock the portal."}
              </h1>
              <p className="mt-3 text-base leading-7 text-forest/68">
                {hasOwnerAccess
                  ? "You have owner-level wholesale access for this preview. Security level 100."
                  : "Enter the owner username and access code to see trade pricing, stock levels and order controls."}
              </p>
              {hasOwnerAccess ? (
                <div className="mt-7 rounded bg-cream p-5">
                  <p className="text-sm font-medium text-forest">
                    Username: {ownerSession?.username}
                  </p>
                  <p className="mt-2 text-sm text-forest/65">
                    Role: wholesale owner. Session expires after 12 hours.
                  </p>
                </div>
              ) : (
                <OwnerAccessForm username={ownerAccessConfig.username} />
              )}
              <p className="mt-5 border-t border-line pt-5 text-sm text-forest/65">
                Not a stockist yet?{" "}
                <Link href="/wholesale" className="font-medium text-rose-deep">
                  Apply for a trade account
                </Link>
              </p>
            </section>

            <section className="rounded-lg border border-line bg-white p-7">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sage">
                    {hasOwnerAccess ? "Owner wholesale console" : "Locked preview"}
                  </p>
                  <h2 className="mt-3 font-display text-4xl font-normal">
                    {hasOwnerAccess ? "Place an order." : "Enter the owner code."}
                  </h2>
                  <p className="mt-2 text-sm text-forest/60">
                    {hasOwnerAccess
                      ? "Trade pricing shown. Adjust quantities by the case."
                      : "Owner access is required before trade prices and stock controls are shown."}
                  </p>
                </div>
                <div className="rounded bg-cream px-4 py-3 text-sm">
                  <p className="font-medium">
                    {hasOwnerAccess ? "Davina owner account" : "Access required"}
                  </p>
                  <p className="text-forest/60">
                    {hasOwnerAccess
                      ? "Owner. Net 30 preview. $120 credit."
                      : "Use username davinah84."}
                  </p>
                </div>
              </div>

              {hasOwnerAccess ? (
                <>
                  <div className="mt-7 grid gap-4">
                    {tradeProducts.slice(0, 3).map((product) => (
                      <div
                        key={product.name}
                        className="grid gap-4 rounded border border-line bg-cream p-4 sm:grid-cols-[4rem_1fr_auto] sm:items-center"
                      >
                        <div className="relative h-16 w-16 overflow-hidden rounded bg-white">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            sizes="64px"
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-display text-2xl">{product.name}</p>
                          <p className="text-sm text-forest/58">
                            {product.trade}. {product.detail}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <button className="flex h-9 w-9 items-center justify-center rounded border border-line bg-white" type="button">
                            <Minus className="h-4 w-4" />
                          </button>
                          <span>1</span>
                          <button className="flex h-9 w-9 items-center justify-center rounded border border-line bg-white" type="button">
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <aside className="mt-7 rounded bg-forest p-6 text-cream">
                    <h3 className="font-display text-3xl">Order summary</h3>
                    <div className="mt-4 grid gap-3 text-sm text-cream/75">
                      <div className="flex justify-between">
                        <span>18 units. 3 lines.</span>
                        <span>$342.00</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Shipping</span>
                        <span>Free</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Account credit</span>
                        <span>-$120.00</span>
                      </div>
                    </div>
                    <div className="mt-5 flex justify-between border-t border-cream/20 pt-5 font-medium">
                      <span>Total ex. GST</span>
                      <span>$222.00</span>
                    </div>
                    <button className="mt-5 min-h-12 w-full rounded bg-rose px-6 text-sm font-medium text-forest" type="button">
                      Review and submit order
                    </button>
                    <p className="mt-4 text-xs text-cream/60">
                      Net 30 invoice issued on dispatch. No card charged today.
                    </p>
                  </aside>
                </>
              ) : (
                <div className="mt-7 rounded bg-cream p-7">
                  <h3 className="font-display text-3xl">
                    Trade controls are hidden.
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-forest/65">
                    This protects wholesale pricing and owner-level business
                    data until the access code is verified.
                  </p>
                </div>
              )}
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
