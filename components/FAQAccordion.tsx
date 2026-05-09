"use client";

import { useState } from "react";

type FAQ = { question: string; answer: string };

export default function FAQAccordion({ faqs }: { faqs: FAQ[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {faqs.map((faq, idx) => {
        const isOpen = open === idx;
        return (
          <div
            key={faq.question}
            className={`group overflow-hidden rounded-2xl border transition-all duration-300 ${
              isOpen ? "border-primary/50 bg-panel/80" : "border-line bg-panel/40 hover:border-primary/30"
            }`}
          >
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : idx)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
            >
              <span className="flex items-center gap-3">
                <span
                  aria-hidden
                  className={`inline-flex h-7 w-7 items-center justify-center rounded-full border text-[11px] font-bold transition-all duration-300 ${
                    isOpen
                      ? "border-primary bg-primary/20 text-leaf"
                      : "border-line text-muted group-hover:border-primary/40 group-hover:text-leaf"
                  }`}
                >
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <span className="text-sm font-semibold text-bright md:text-base">
                  {faq.question}
                </span>
              </span>
              <span
                aria-hidden
                className={`relative inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                  isOpen ? "border-primary bg-primary/20 text-leaf rotate-45" : "border-line text-soft"
                }`}
              >
                <span className="absolute h-3 w-px bg-current" />
                <span className="absolute h-px w-3 bg-current" />
              </span>
            </button>
            <div
              className={`grid transition-[grid-template-rows] duration-500 ease-out ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-5 text-sm leading-relaxed text-soft">{faq.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
