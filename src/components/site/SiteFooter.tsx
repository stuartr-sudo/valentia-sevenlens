import Link from "next/link";

const explore = [
  { href: "/about", label: "About" },
  { href: "/journal", label: "Journal" },
  { href: "/contact", label: "Contact" },
  { href: "/hormonal-skin-check-in", label: "Quiz" },
];

const trade = [
  { href: "/wholesale", label: "Wholesale" },
  { href: "/wholesale/portal", label: "Stockist login" },
  { href: "/valentia/brand/BrandGuidelines.pdf", label: "Brand guidelines" },
];

export function SiteFooter({
  note = "Always speak to your healthcare provider about your symptoms.",
}: {
  note?: string;
}) {
  return (
    <footer className="bg-forest px-5 py-14 text-cream lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 border-b border-sand/30 pb-10 md:grid-cols-[1.4fr_0.8fr_0.8fr]">
          <div>
            <p className="text-xl font-semibold uppercase tracking-[0.24em]">
              Valentia
            </p>
            <p className="mt-4 max-w-sm font-display text-3xl italic text-rose">
              Wellness built on patience.
            </p>
          </div>

          <FooterColumn title="Explore" links={explore} />
          <FooterColumn title="Trade" links={trade} />
        </div>

        <p className="pt-6 text-sm leading-7 text-cream/60">
          Formulated by Davina Hearne, Naturopath (Diploma, NZ). {note}
          <br />
          2026 Valentia. Privacy. Terms. Shipping and returns.
        </p>
      </div>
    </footer>
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
        {links.map((link) => (
          <Link key={link.href} href={link.href}>
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
