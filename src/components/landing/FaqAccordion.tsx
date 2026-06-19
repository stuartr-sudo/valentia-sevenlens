"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

type Faq = {
  question: string;
  answer: string;
};

export function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  const [open, setOpen] = useState(0);

  return (
    <div className="mx-auto max-w-3xl">
      {faqs.map((faq, index) => {
        const isOpen = open === index;

        return (
          <div key={faq.question} className="border-t border-line py-1">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? -1 : index)}
              className="flex w-full items-center justify-between gap-6 py-6 text-left"
              aria-expanded={isOpen}
            >
              <span className="font-display text-2xl leading-tight text-forest">
                {faq.question}
              </span>
              <ChevronDown
                className={`h-5 w-5 shrink-0 text-rose-deep transition ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isOpen ? (
              <p className="max-w-2xl pb-7 text-base leading-8 text-forest/80">
                {faq.answer}
              </p>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
