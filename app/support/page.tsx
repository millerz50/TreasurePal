import ContactForm from "@/components/contact/ContactForm.client";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import type { Metadata } from "next";

import {
  baseAlternates,
  defaultOpenGraph,
  defaultTwitter,
} from "@/app/seo/seoConfig";

export const metadata: Metadata = {
  title: `Support • ${SITE_NAME}`,
  description: `Support and help center for ${SITE_NAME}. Get help with listings, accounts, and payments.`,
  metadataBase: new URL(SITE_URL),
  alternates: {
    ...baseAlternates,
    canonical: `${SITE_URL}/support`,
  },
  openGraph: {
    ...defaultOpenGraph,
    title: `Support • ${SITE_NAME}`,
    description: `Support and help center for ${SITE_NAME}. Get help with listings, accounts, and payments.`,
    url: `${SITE_URL}/support`,
    images: [
      {
        url: "/og/support.jpg",
        width: 1200,
        height: 630,
        alt: "Support and help center",
      },
    ],
  },
  twitter: {
    ...defaultTwitter,
    title: `Support • ${SITE_NAME}`,
    description: `Support and help center for ${SITE_NAME}. Get help with listings, accounts, and payments.`,
    images: ["/og/support.jpg"],
  },
};

export default function SupportPage() {
  // ✅ Structured Data JSON-LD for Support page
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `Support • ${SITE_NAME}`,
    url: `${SITE_URL}/support`,
    description: `Support and help center for ${SITE_NAME}. Get help with listings, accounts, and payments.`,
    mainEntity: {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "How to create a listing?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You can create a listing by visiting the 'Sell' section and filling out the property details form.",
          },
        },
        {
          "@type": "Question",
          name: "How do payments and commissions work?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Payments are processed securely and commissions are transparently displayed before confirmation.",
          },
        },
        {
          "@type": "Question",
          name: "How do I verify my account?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Account verification requires uploading identification documents and confirming your email address.",
          },
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <main className="min-h-screen bg-base-200 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h1 className="text-2xl font-extrabold text-gray-900 dark:text-slate-100">
              Support
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Need help? Search our help articles or send us a message and our
              team will respond.
            </p>

            <div className="rounded-lg bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 p-4 shadow-sm">
              <h2 className="font-semibold">Popular topics</h2>
              <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-200">
                <li>
                  <a
                    href="/support/listing-help"
                    className="underline text-blue-600 dark:text-blue-400">
                    How to create a listing
                  </a>
                </li>
                <li>
                  <a
                    href="/support/payments"
                    className="underline text-blue-600 dark:text-blue-400">
                    Payments and commissions
                  </a>
                </li>
                <li>
                  <a
                    href="/support/account"
                    className="underline text-blue-600 dark:text-blue-400">
                    Account & verification
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div>
            <ContactForm />
          </div>
        </div>
      </main>
    </>
  );
}
