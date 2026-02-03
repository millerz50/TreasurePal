// app/faq/page.tsx
import React from "react";
import FaqFull, { FaqItem } from "@/components/landing/FaqFull";
import type { Metadata } from "next";

/* ================= SEO METADATA ================= */

export const metadata: Metadata = {
  title: "TreasurePal FAQ | Frequently Asked Questions",
  description:
    "Frequently asked questions about TreasurePal, including sign-up, security, investment opportunities, and more.",
  alternates: {
    canonical: "https://treasurepal.co.zw/faq",
  },
  openGraph: {
    title: "TreasurePal FAQ | Frequently Asked Questions",
    description:
      "Frequently asked questions about TreasurePal, including sign-up, security, investment opportunities, and more.",
    url: "https://treasurepal.co.zw/faq",
    siteName: "TreasurePal",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TreasurePal FAQ",
    description:
      "Frequently asked questions about TreasurePal, including sign-up, security, investment opportunities, and more.",
  },
};

/* ================= DATA ================= */

const FAQ_ITEMS: FaqItem[] = [
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

/* ================= PAGE ================= */

export default function FaqPage({ items }: { items: FaqItem[] }) {
  return <FaqFull items={items} defaultOpenIndex={0} />;
}

/* ================= SSG ================= */

export async function getStaticProps() {
  // In future, you can fetch FAQs from CMS or database here
  return {
    props: {
      items: FAQ_ITEMS,
    },
    revalidate: 86400, // Rebuild at most once per day
  };
}
