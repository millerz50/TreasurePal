"use client";

import React, { useEffect, useId, useMemo, useState } from "react";

export type FaqItem = {
  id?: string;
  q: string;
  a: string | React.ReactNode;
  updatedAt?: string;
};

export type FaqProps = {
  items?: FaqItem[];
  includeSchema?: boolean;
  storageKey?: string | null;
  defaultOpenIndex?: number | null;
};

const DEFAULT_ITEMS: FaqItem[] = [
  {
    q: "What is TreasurePal?",
    a: "TreasurePal is a platform that connects local businesses with customers via listings, bookings and a network of local agents.",
    updatedAt: "2025-01-01",
  },
  {
    q: "How do I sign up?",
    a: (
      <>
        Click{" "}
        <a
          className="text-blue-600 underline dark:text-blue-400"
          href="/signup">
          Sign up
        </a>{" "}
        and complete the short registration form.
      </>
    ),
    updatedAt: "2025-01-03",
  },
  {
    q: "Is my data secure?",
    a: "We use industry practices for encryption and secure storage. Sensitive tokens are stored in HttpOnly cookies on the server.",
    updatedAt: "2025-02-11",
  },
  {
    q: "How can I join TreasurePal as an agent?",
    a: (
      <>
        Visit the Join page and complete the agent application or click{" "}
        <a
          className="text-blue-600 underline dark:text-blue-400"
          href="/signup">
          Join Us
        </a>
        .
      </>
    ),
    updatedAt: "2025-03-01",
  },
];

const FaqFull: React.FC<FaqProps> = ({
  items,
  includeSchema = true,
  storageKey = "treasurepal.faq.open",
  defaultOpenIndex = 0,
}) => {
  const idBase = useId();
  const list = items && items.length ? items : DEFAULT_ITEMS;

  const prefersReducedMotion = usePrefersReducedMotion();

  const getInitialOpenIndex = (): number | null => {
    if (typeof window === "undefined") return defaultOpenIndex ?? null;
    if (!storageKey) return defaultOpenIndex ?? null;
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (raw === null) return defaultOpenIndex ?? null;
      const parsed = Number(raw);
      return !Number.isNaN(parsed) && parsed >= 0 && parsed < list.length
        ? parsed
        : null;
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

  const headerRefs: React.RefObject<HTMLButtonElement | null>[] = useMemo(
    () =>
      Array.from({ length: list.length }).map(() =>
        React.createRef<HTMLButtonElement>()
      ),
    [list.length]
  );

  const toggleIndex = (i: number) =>
    setOpenIndex((prev) => (prev === i ? null : i));

  const faqSchema = useMemo(() => {
    if (!includeSchema) return null;
    const mainEntity = list.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: typeof it.a === "string" ? it.a : stripTextFromNode(it.a),
      },
    }));
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity,
    } as Record<string, unknown>;
  }, [includeSchema, list]);

  return (
    <section
      aria-labelledby={`${idBase}-faq-heading`}
      className="max-w-4xl mx-auto px-4 py-12">
      <h2
        id={`${idBase}-faq-heading`}
        className="text-3xl font-extrabold text-gray-900 dark:text-slate-100 mb-6">
        Frequently asked questions
      </h2>

      <div className="space-y-3">
        {list.map((it, i) => {
          const headerId = `${idBase}-faq-${i}-header`;
          const panelId = `${idBase}-faq-${i}-panel`;
          const isOpen = i === openIndex;
          const maxHClass = isOpen ? "max-h-[40rem]" : "max-h-0";

          return (
            <div
              key={it.id ?? i}
              className="border border-gray-200 dark:border-slate-700 rounded-lg overflow-hidden bg-white dark:bg-slate-800 shadow-sm">
              <h3>
                <button
                  id={headerId}
                  ref={headerRefs[i] as React.RefObject<HTMLButtonElement>}
                  aria-controls={panelId}
                  aria-expanded={isOpen}
                  onClick={() => toggleIndex(i)}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowDown") {
                      e.preventDefault();
                      focusHeader(headerRefs, i + 1);
                    } else if (e.key === "ArrowUp") {
                      e.preventDefault();
                      focusHeader(headerRefs, i - 1);
                    } else if (e.key === "Home") {
                      e.preventDefault();
                      focusHeader(headerRefs, 0);
                    } else if (e.key === "End") {
                      e.preventDefault();
                      focusHeader(headerRefs, list.length - 1);
                    }
                  }}
                  className="w-full text-left px-4 sm:px-5 py-4 flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 dark:focus-visible:ring-blue-300">
                  <span className="text-lg sm:text-xl font-medium text-gray-900 dark:text-slate-100">
                    {it.q}
                  </span>

                  <div className="flex items-center gap-3">
                    {it.updatedAt ? (
                      <time
                        className="text-xs text-gray-400 hidden sm:inline dark:text-slate-400"
                        dateTime={it.updatedAt}
                        aria-hidden={!it.updatedAt}>
                        Updated {new Date(it.updatedAt).toLocaleDateString()}
                      </time>
                    ) : null}

                    <svg
                      className={`w-5 h-5 transform transition-transform duration-200 ${
                        prefersReducedMotion
                          ? ""
                          : isOpen
                          ? "rotate-180"
                          : "rotate-0"
                      } text-gray-500 dark:text-slate-300`}
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
                  </div>
                </button>
              </h3>

              <div
                id={panelId}
                role="region"
                aria-labelledby={headerId}
                className={`px-4 sm:px-5 pb-5 transition-[max-height,opacity] duration-300 ease-in-out overflow-hidden ${maxHClass} ${
                  isOpen ? "opacity-100" : "opacity-0"
                }`}>
                <div className="pt-3 text-gray-700 dark:text-slate-200 text-sm sm:text-base break-words whitespace-pre-wrap">
                  {it.a}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {list.length === 0 && (
        <div className="mt-6 text-center">
          <p className="text-gray-600 dark:text-slate-300">
            No FAQs available yet.
          </p>
          <a
            href="/contact"
            className="mt-3 inline-block text-blue-600 underline dark:text-blue-400">
            Contact us
          </a>
        </div>
      )}

      {faqSchema ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      ) : null}
    </section>
  );
};

export default FaqFull;

/* Helpers */

function focusHeader(
  refs: React.RefObject<HTMLButtonElement | null>[],
  index: number
) {
  const clamped = Math.max(0, Math.min(refs.length - 1, index));
  const ref = refs[clamped];
  if (ref?.current) ref.current.focus();
}

function stripTextFromNode(node: React.ReactNode): string {
  if (node == null) return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (typeof node === "boolean" || typeof node === "bigint") return "";
  if (Array.isArray(node)) return node.map(stripTextFromNode).join(" ");
  if (React.isValidElement(node)) {
    const element = node as React.ReactElement<{ children?: React.ReactNode }>;
    return stripTextFromNode(element.props.children);
  }

  if (isIterable(node)) {
    try {
      return Array.from(node as Iterable<unknown>)
        .map((n) => stripTextFromNode(n as React.ReactNode))
        .join(" ");
    } catch {
      return "";
    }
  }

  return "";
}

function isIterable(u: unknown): u is Iterable<unknown> {
  return (
    typeof u === "object" && u !== null && Symbol.iterator in (u as object)
  );
}

function usePrefersReducedMotion(): boolean {
  const getInitial = (): boolean => {
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
    try {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      const onChange = () => setReduced(mq.matches);
      if (mq.addEventListener) mq.addEventListener("change", onChange);
      else mq.addListener(onChange);
      return () => {
        if (mq.removeEventListener) mq.removeEventListener("change", onChange);
        else mq.removeListener(onChange);
      };
    } catch {
      // ignore
    }
  }, []);

  return reduced;
}
