// app/contact/page.tsx
import ContactForm from "@/components/contact/ContactForm.client";
import { SITE_NAME, SITE_URL } from "@/lib/site"; // optional constants file
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact TreasurePal — Get in touch",
  description:
    "Contact TreasurePal for listings, partnerships, support, or press. Fast replies from our local team in Zimbabwe.",
  openGraph: {
    title: "Contact TreasurePal",
    description:
      "Contact TreasurePal for listings, partnerships, support, or press. Fast replies from our local team in Zimbabwe.",
    url: `${SITE_URL}/contact`,
    siteName: SITE_NAME,
    images: [
      {
        url: `${SITE_URL}/og/contact.png`,
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact TreasurePal",
    description:
      "Contact TreasurePal for listings, partnerships, support, or press. Fast replies from our local team in Zimbabwe.",
    images: [`${SITE_URL}/og/contact.png`],
  },
};

const ContactPage = async () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    mainEntity: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/logo.png`,
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+263-77-000-0000",
          contactType: "customer service",
          areaServed: "ZW",
          availableLanguage: ["English"],
        },
      ],
    },
  };

  return (
    <main className="min-h-screen bg-base-200 text-base-content py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        <section className="space-y-6">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-slate-100">
            Get in touch
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-300 max-w-prose">
            Whether you want to list a property, partner with TreasurePal, or
            need support, send us a message and we’ll respond within 48 hours.
          </p>

          <div className="rounded-lg border border-gray-100 dark:border-slate-700 bg-white dark:bg-slate-800 p-4 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">
              Office
            </h3>
            <address className="not-italic text-sm text-slate-600 dark:text-slate-300 mt-2">
              Harare, Zimbabwe
              <br />
              <a
                href="tel:+263770000000"
                className="text-blue-600 dark:text-blue-400 underline">
                +263 77 000 0000
              </a>
              <br />
              <a
                href="mailto:hello@treasurepal.example"
                className="text-blue-600 dark:text-blue-400 underline">
                hello@treasurepal.example
              </a>
            </address>
          </div>

          <div className="text-xs text-slate-500 dark:text-slate-400">
            <strong>Privacy</strong> We only use your contact details to respond
            to your inquiry. See our{" "}
            <a
              href="/privacy"
              className="underline text-blue-600 dark:text-blue-400">
              privacy policy
            </a>
            .
          </div>
        </section>

        <section>
          <ContactForm />
        </section>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  );
};

export default ContactPage;
