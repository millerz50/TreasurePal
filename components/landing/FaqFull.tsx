"use client";

import React, { useEffect, useId, useMemo, useState } from "react";

/* ================= TYPES ================= */

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

/* ================= DATA ================= */

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
          href="/auth/signup"
        >
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
        Visit the Join page or{" "}
        <a
          className="text-blue-600 underline dark:text-blue-400"
          href="/auth/signup"
        >
          Join Us
        </a>
        .
      </>
    ),
    updatedAt: "2025-03-01",
  },
  {
    q: "What is our WhatsApp channel?",
    a: (
      <a
        href="https://www.whatsapp.com/channel/0029VbBYnEc9WtC1xlxVZe2K"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline dark:text-blue-400"
      >
        Follow our WhatsApp channel here
      </a>
    ),
    updatedAt: "2025-04-01",
  },
  {
    q: "Who is the CEO?",
    a: "The CEO of TreasurePal is Johannes Zemba.",
    updatedAt: "2025-04-05",
  },
  {
    q: "Is TreasurePal available in other countries?",
    a: (
      <>
        Yes, you can also access it on{" "}
        <a
          href="https://www.treasureprops.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline dark:text-blue-400"
        >
          treasureprops.com
        </a>
        .
      </>
    ),
    updatedAt: "2025-04-10",
  },
  {
    q: "Can I contribute as a developer?",
    a: (
      <>
        Yes! You can contribute to TreasurePal’s development on{" "}
        <a
          href="https://github.com/millerz50/TreasurePal"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline dark:text-blue-400"
        >
          GitHub
        </a>
        .
      </>
    ),
    updatedAt: "2025-04-15",
  },
  {
    q: "Do I need an agent as a house owner?",
    a: "No, you don't need an agent. You can become your own agent and manage listings directly.",
    updatedAt: "2025-04-20",
  },
  {
    q: "Can I invest through TreasurePal?",
    a: "Yes, TreasurePal is forward-looking for investment opportunities. You can explore and invest in various property projects.",
    updatedAt: "2025-04-25",
  },
];

/* ================= COMPONENT ================= */

const FaqFull: React.FC<FaqProps> = ({
  items,
  includeSchema = true,
  storageKey = "treasurepal.faq.open",
  defaultOpenIndex = null, // ⬅ SSR-safe default
}) => {
  const idBase = useId();
  const list = items?.length ? items : DEFAULT_ITEMS;

  /* 🔒 SSR-SAFE initial state */
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);
  const [reducedMotion, setReducedMotion] = useState(false);

  /* ✅ Client-only hydration logic */
  useEffect(() => {
    // restore open index
    if (storageKey) {
      try {
        const raw = localStorage.getItem(storageKey);
        const parsed = raw !== null ? Number(raw) : null;
        if (parsed !== null && parsed >= 0 && parsed < list.length) {
          setOpenIndex(parsed);
        }
      } catch {}
    }

    // reduced motion
    try {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      setReducedMotion(mq.matches);
    } catch {}
  }, [storageKey, list.length]);

  /* persist state */
  useEffect(() => {
    if (!storageKey) return;
    try {
      if (openIndex === null) localStorage.removeItem(storageKey);
      else localStorage.setItem(storageKey, String(openIndex));
    } catch {}
  }, [openIndex, storageKey]);

  const headerRefs = useMemo(
    () =>
      Array.from({ length: list.length }, () =>
        React.createRef<HTMLButtonElement>(),
      ),
    [list.length],
  );

  const toggleIndex = (i: number) => {
    setOpenIndex((prev) => (prev === i ? null : i));
  };

  /* ================= SCHEMA ================= */

  const faqSchema = useMemo(() => {
    if (!includeSchema) return null;
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: list.map((it) => ({
        "@type": "Question",
        name: it.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: typeof it.a === "string" ? it.a : stripTextFromNode(it.a),
        },
      })),
    };
  }, [includeSchema, list]);

  /* ================= RENDER ================= */

  return (
    <section
      aria-labelledby={`${idBase}-faq-heading`}
      className="max-w-4xl mx-auto px-4 py-12"
    >
      <h2 id={`${idBase}-faq-heading`} className="text-3xl font-extrabold mb-6">
        Frequently asked questions
      </h2>

      <div className="space-y-3">
        {list.map((it, i) => {
          const isOpen = openIndex === i;
          const headerId = `${idBase}-faq-${i}-header`;
          const panelId = `${idBase}-faq-${i}-panel`;

          return (
            <div key={it.id ?? i} className="border rounded-lg overflow-hidden">
              <h3>
                <button
                  ref={headerRefs[i]}
                  id={headerId}
                  aria-controls={panelId}
                  aria-expanded={isOpen}
                  onClick={() => toggleIndex(i)}
                  className="w-full px-4 py-4 flex justify-between items-center"
                >
                  <span className="font-semibold">{it.q}</span>

                  <svg
                    className={`w-5 h-5 transition-transform ${
                      reducedMotion ? "" : isOpen ? "rotate-180" : "rotate-0"
                    }`}
                    viewBox="0 0 20 20"
                    aria-hidden
                  >
                    <path
                      d="M6 8l4 4 4-4"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      fill="none"
                    />
                  </svg>
                </button>
              </h3>

              <div
                id={panelId}
                role="region"
                aria-labelledby={headerId}
                className={`px-4 pb-4 transition-all ${
                  isOpen ? "max-h-[40rem] opacity-100" : "max-h-0 opacity-0"
                } overflow-hidden`}
              >
                <div className="pt-3">{it.a}</div>
              </div>
            </div>
          );
        })}
      </div>

      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
    </section>
  );
};

export default FaqFull;

/* ================= HELPERS ================= */

function stripTextFromNode(node: React.ReactNode): string {
  if (node == null) return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(stripTextFromNode).join(" ");
  if (React.isValidElement(node)) return stripTextFromNode(node.props.children);
  return "";
}
