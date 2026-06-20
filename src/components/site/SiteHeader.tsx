import Link from "next/link";

const links = [
  { href: "/about", label: "About" },
  { href: "/journal", label: "Journal" },
  { href: "/#formula", label: "The formula" },
  { href: "/wholesale", label: "Wholesale" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader({
  active,
  compact = false,
}: {
  active?: string;
  compact?: boolean;
}) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-sand/70 bg-cream/95 backdrop-blur">
      <nav
        className={`mx-auto flex max-w-7xl items-center justify-between gap-5 px-5 lg:px-10 ${
          compact ? "py-4" : "py-5"
        }`}
      >
        <Link
          href="/"
          className="shrink-0 text-lg font-semibold uppercase tracking-[0.22em] text-forest sm:text-xl"
        >
          Valentia
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium tracking-[0.04em] transition hover:text-rose-deep ${
                active === link.label ? "text-forest" : "text-forest/68"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <Link
          href="/quiz"
          className="hidden min-h-10 shrink-0 items-center rounded bg-rose px-6 text-sm font-medium text-forest transition hover:bg-rose-deep hover:text-white lg:inline-flex"
        >
          Begin the self-audit
        </Link>
      </nav>
      <div className="border-t border-sand/50 px-5 pb-4 lg:hidden">
        <Link
          href="/quiz"
          className="inline-flex min-h-10 items-center rounded bg-rose px-4 text-sm font-medium text-forest"
        >
          Self-audit
        </Link>
      </div>
    </header>
  );
}
