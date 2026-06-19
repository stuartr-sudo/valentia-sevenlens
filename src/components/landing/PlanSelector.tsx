"use client";

import { Check, ShoppingBag } from "lucide-react";
import { useState } from "react";

const plans = {
  subscribe: {
    label: "Deliver monthly",
    price: "$32",
    suffix: "/mo",
    detail: "Founding price. Pause or change anytime.",
    cta: "Reserve monthly delivery - $32/mo",
  },
  onetime: {
    label: "One-time",
    price: "$38",
    suffix: "",
    detail: "A single bottle.",
    cta: "Reserve one bottle - $38",
  },
};

export function PlanSelector() {
  const [plan, setPlan] = useState<keyof typeof plans>("subscribe");
  const selected = plans[plan];

  return (
    <div>
      <div className="mb-7 grid gap-3 sm:grid-cols-2">
        {(Object.keys(plans) as Array<keyof typeof plans>).map((key) => {
          const item = plans[key];
          const isActive = key === plan;

          return (
            <button
              key={key}
              type="button"
              onClick={() => setPlan(key)}
              className={`min-h-40 rounded-lg border-2 bg-white p-5 text-left text-forest transition ${
                isActive
                  ? "border-forest shadow-[0_18px_40px_-28px_rgba(40,61,33,0.6)]"
                  : "border-line hover:border-sand"
              }`}
              aria-pressed={isActive}
            >
              <span className="mb-2 block text-sm font-medium tracking-[0.04em]">
                {item.label}
              </span>
              <span className="font-display text-4xl leading-none">
                {item.price}
                {item.suffix ? (
                  <span className="font-sans text-base text-forest/60">
                    {item.suffix}
                  </span>
                ) : null}
              </span>
              <span className="mt-3 block text-sm leading-5 text-forest/65">
                {item.detail}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mb-8 grid gap-3 text-sm text-forest/85">
        {[
          "Free shipping on orders over $60",
          "60-day money-back guarantee",
          "Founding-list members receive the Hormone Reset Guide",
        ].map((item) => (
          <div key={item} className="flex items-center gap-3">
            <Check className="h-4 w-4 shrink-0 text-sage" />
            <span>{item}</span>
          </div>
        ))}
      </div>

      <a
        href="/cart"
        className="inline-flex min-h-14 w-full items-center justify-center gap-3 rounded bg-rose px-6 py-4 text-center font-medium text-forest transition hover:bg-rose-deep hover:text-white"
      >
        <ShoppingBag className="h-5 w-5" />
        {selected.cta}
      </a>
    </div>
  );
}
