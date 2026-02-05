"use client";

import React, { useEffect, useId, useMemo, useState } from "react";
import { Plus, Minus } from "lucide-react";

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
  },
  {
    q: "How do I sign up?",
    a: (
      <>
        Click{" "}
        <a
          href="/auth/signup"
          className="text-primary underline underline-offset-4"
        >
          Sign up
        </a>{" "}
        and complete the short registration form.
      </>
    ),
  },
  {
    q: "Is my data secure?",
    a: "We use industry practices for encryption and secure storage. Sensitive tokens are stored in HttpOnly cookies on the server.",
  },
  {
    q: "How can I join TreasurePal as an agent?",
    a: (
      <>
        Visit the Join page or{" "}
        <a
          href="/auth/signup"
          className="text-primary underline underline-offset-4"
        >
          Join Us
        </a>
        .
      </>
    ),
  },
  {
    q: "What is our WhatsApp channel?",
    a: (
      <a
        href="https://www.whatsapp.com/channel/0029VbBYnEc9WtC1xlxVZe2K"
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary underline underline-offset-4"
      >
        Follow our WhatsApp channel
      </a>
    ),
  },
  {
    q: "Who is the CEO?",
    a: "The CEO of TreasurePal is Johannes Zemba.",
  },
  {
    q: "Is TreasurePal available in other countries?",
    a: (
      <>
        Yes — also available on{" "}
        <a
          href="https://www.treasureprops.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline underline-offset-4"
        >
          treasureprops.com
        </a>
        .
      </>
    ),
  },
  {
    q: "Can I contribute as a developer?",
    a: (
      <>
        Yes! Contribute on{" "}
        <a
          href="https://github.com/millerz50/TreasurePal"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline underline-offset-4"
        >
          GitHub
        </a>
        .
      </>
    ),
  },
  {
    q: "Do I need an agent as a house owner?",
    a: "No. You can manage listings yourself and act as your own agent.",
  },
  {
    q: "Can I invest through TreasurePal?",
    a: "Yes. TreasurePal is expanding toward curated investment opportunities.",
  },
];

/* ================= COMPONENT ================= */

const FaqFull: React.FC<FaqProps> = ({
  items,
  includeSchema = true,
  storageKey = "treasurepal.faq.open",
  defaultOpenIndex = null,
}) => {
  const idBase = useId();
  const list = items?.length ? items : DEFAULT_ITEMS;

  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    try {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      setReducedMotion(mq.matches);
    } catch {}
  }, []);

  const toggleIndex = (i: number) => {
    setOpenIndex((prev) => (prev === i ? null : i));
  };

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

  return (
    <section
      aria-labelledby={`${idBase}-faq-heading`}
      className="max-w-4xl mx-auto px-4 py-14"
    >
      <h2
        id={`${idBase}-faq-heading`}
        className="text-3xl md:text-4xl font-bold mb-10"
      >
        Frequently asked questions
      </h2>

      <div className="space-y-5">
        {list.map((it, i) => {
          const isOpen = openIndex === i;

          return (
            <div
              key={it.id ?? i}
              className={`
                rounded-2xl
                bg-background/70
                backdrop-blur-xl
                shadow-sm
                transition
                hover:shadow-md
              `}
            >
              <button
                aria-expanded={isOpen}
                onClick={() => toggleIndex(i)}
                className="w-full px-6 py-5 flex items-center justify-between text-left"
              >
                <span className="text-base md:text-lg font-semibold">
                  {it.q}
                </span>

                <span className="ml-4 flex-shrink-0 text-muted-foreground">
                  {isOpen ? (
                    <Minus className="h-5 w-5" />
                  ) : (
                    <Plus className="h-5 w-5" />
                  )}
                </span>
              </button>

              <div
                className={`px-6 overflow-hidden transition-all ${
                  isOpen
                    ? "max-h-[40rem] opacity-100 pb-5"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="text-muted-foreground leading-relaxed pt-1">
                  {it.a}
                </div>
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
