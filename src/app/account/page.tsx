import type { Metadata } from "next";
import Link from "next/link";
import { LockKeyhole, ShieldCheck, UserRound } from "lucide-react";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Customer Account",
  description:
    "Valentia customer account foundation for founding-list members, retail customers, and wholesale-approved buyers.",
  alternates: {
    canonical: "/account",
  },
};

const levels = [
  {
    icon: <UserRound className="h-5 w-5" />,
    title: "Retail customer",
    copy: "Founding-list status, order history, addresses, quiz results, and support records.",
  },
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    title: "Wholesale buyer",
    copy: "Business membership, stockist pricing, wholesale order drafts, and account approval state.",
  },
  {
    icon: <LockKeyhole className="h-5 w-5" />,
    title: "Internal operator",
    copy: "Role-scoped access for inventory, content, SEO, ads, support, finance, and administration.",
  },
];

export default function AccountPage() {
  return (
    <main className="min-h-screen bg-cream text-forest">
      <section className="mx-auto max-w-5xl px-5 py-16 sm:py-24">
        <Link href="/" className="text-sm font-medium text-rose-deep">
          Back to Valentia
        </Link>

        <div className="mt-10 max-w-3xl">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-rose-deep">
            Account foundation
          </p>
          <h1 className="font-display text-6xl font-normal leading-tight">
            Customer and business access, separated by role.
          </h1>
          <p className="mt-6 text-lg leading-8 text-forest/75">
            This route is ready for Supabase Auth. The database migration defines
            profiles, business memberships, RLS policies, and security levels so
            the same application can support customers, wholesale clients, and
            internal operators without mixing permissions.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {levels.map((level) => (
            <article key={level.title} className="rounded-lg border border-line bg-white p-7">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded bg-forest text-white">
                {level.icon}
              </div>
              <h2 className="font-display text-3xl">{level.title}</h2>
              <p className="mt-3 text-base leading-7 text-forest/72">
                {level.copy}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-12 rounded-lg border border-line bg-white p-7">
          <h2 className="font-display text-3xl">Next connection step</h2>
          <p className="mt-3 max-w-3xl text-base leading-7 text-forest/72">
            Add `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and
            `SUPABASE_SERVICE_ROLE_KEY`, then wire the login forms to Supabase
            Auth. The schema is already prepared for least-privilege account
            access.
          </p>
          <p className="mt-4 text-sm text-forest/55">{siteConfig.contactEmail}</p>
        </div>
      </section>
    </main>
  );
}
