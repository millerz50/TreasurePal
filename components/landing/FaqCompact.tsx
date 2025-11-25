"use client";

import React, { useEffect, useId, useState } from "react";

export type FaqItem = {
  id?: string;
  q: string;
  a: string | React.ReactNode;
  updatedAt?: string;
};

type Props = {
  items?: FaqItem[];
  storageKey?: string | null;
  defaultOpenIndex?: number | null;
};

const DEFAULT: FaqItem[] = [
  {
    q: "What is TreasurePal?",
    a: "TreasurePal connects local businesses with customers via listings and agents.",
  },
  {
    q: "How do I sign up?",
    a: (
      <>
        <a className="text-primary underline dark:text-accent" href="/signup">
          Sign up
        </a>{" "}
        and complete the form.
      </>
    ),
  },
  {
    q: "Is my data secure?",
    a: "We follow standard encryption and store sensitive tokens server-side in HttpOnly cookies.",
  },
];

const usePrefersReducedMotion = (): boolean => {
  const getInitial = () => {
    if (typeof window === "undefined") return false;
    try {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch {
      return false;
    }
  };

  const [reduced, setReduced] = useState<boolean>(getInitial);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = () => setReduced(mq.matches);
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);

  return reduced;
};

const AccordionItem: React.FC<{
  idBase: string;
  index: number;
  item: FaqItem;
  isOpen: boolean;
  onToggle: (i: number) => void;
  prefersReducedMotion: boolean;
}> = ({ idBase, index, item, isOpen, onToggle, prefersReducedMotion }) => {
  const headerId = `${idBase}-h-${index}`;
  const panelId = `${idBase}-p-${index}`;

  return (
    <div className="border border-primary/30 dark:border-accent/40 rounded-lg overflow-hidden bg-base-100 dark:bg-slate-800 shadow-md">
      <h3>
        <button
          id={headerId}
          aria-controls={panelId}
          aria-expanded={isOpen}
          onClick={() => onToggle(index)}
          className="w-full text-left px-4 py-4 flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:focus-visible:ring-accent transition-colors">
          <span className="text-lg font-semibold text-base-content dark:text-slate-100">
            {item.q}
          </span>
          <svg
            className={`w-5 h-5 transform transition-transform duration-200 ${
              prefersReducedMotion ? "" : isOpen ? "rotate-180" : "rotate-0"
            } text-primary dark:text-accent`}
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            aria-hidden="true">
            <path
              d="M6 8l4 4 4-4"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </h3>

      <div
        id={panelId}
        role="region"
        aria-labelledby={headerId}
        className={`px-4 pb-5 transition-[max-height,opacity] duration-300 ease-in-out overflow-hidden ${
          isOpen ? "max-h-[36rem] opacity-100" : "max-h-0 opacity-0"
        }`}>
        <div className="pt-3 text-base-content dark:text-slate-200 text-sm whitespace-pre-wrap">
          {item.a}
        </div>
      </div>
    </div>
  );
};

const Faq: React.FC<Props> = ({
  items,
  storageKey = "faq.open",
  defaultOpenIndex = 0,
}) => {
  const idBase = useId();
  const list = items && items.length ? items : DEFAULT;
  const prefersReducedMotion = usePrefersReducedMotion();

  const getInitialOpenIndex = (): number | null => {
    if (typeof window === "undefined") return defaultOpenIndex ?? null;
    if (!storageKey) return defaultOpenIndex ?? null;
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (raw === null) return defaultOpenIndex ?? null;
      const idx = Number(raw);
      return !Number.isNaN(idx) && idx >= 0 && idx < list.length ? idx : null;
    } catch {
      return defaultOpenIndex ?? null;
    }
  };

  const [openIndex, setOpenIndex] = useState<number | null>(
    getInitialOpenIndex
  );

  useEffect(() => {
    if (!storageKey) return;
    try {
      if (openIndex === null) window.localStorage.removeItem(storageKey);
      else window.localStorage.setItem(storageKey, String(openIndex));
    } catch {
      // ignore storage errors
    }
  }, [openIndex, storageKey]);

  const toggle = (i: number) => setOpenIndex((prev) => (prev === i ? null : i));

  return (
    <section
      aria-labelledby={`${idBase}-title`}
      className="max-w-3xl mx-auto px-4 py-10">
      <h2
        id={`${idBase}-title`}
        className="text-2xl sm:text-3xl font-extrabold mb-6 text-primary dark:text-accent">
        Frequently asked questions
      </h2>
      <div className="space-y-3">
        {list.map((it, i) => (
          <AccordionItem
            key={it.id ?? i}
            idBase={idBase}
            index={i}
            item={it}
            isOpen={i === openIndex}
            onToggle={toggle}
            prefersReducedMotion={prefersReducedMotion}
          />
        ))}
      </div>

      {list.length === 0 && (
        <div className="mt-6 text-center">
          <p className="text-base-content dark:text-slate-300">No FAQs yet.</p>
          <a
            href="/contact"
            className="mt-3 inline-block text-primary underline dark:text-accent">
            Contact us
          </a>
        </div>
      )}
    </section>
  );
};

export default Faq;
