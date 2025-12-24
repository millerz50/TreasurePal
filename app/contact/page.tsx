import type { Metadata } from "next";

import ContactForm from "@/components/contact/ContactForm.client";
import { SITE_NAME, SITE_URL } from "@/lib/site";

/* ---------------------------
   SEO METADATA
---------------------------- */

export const metadata: Metadata = {
  title: "Contact TreasureProps | Get in Touch",
  description:
    "Contact TreasureProps for property listings, partnerships, customer support, or press inquiries. Fast responses from our Zimbabwe-based team.",
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
  openGraph: {
    title: "Contact TreasureProps",
    description:
      "Get in touch with TreasureProps for support, listings, or partnerships across Zimbabwe.",
    url: `${SITE_URL}/contact`,
    siteName: SITE_NAME,
    type: "website",
  },
};

/* ---------------------------
   CONTACT PAGE
---------------------------- */

export default function ContactPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    mainEntity: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/logo/logo.png`,
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+263770000000",
          contactType: "customer support",
          areaServed: "ZW",
          availableLanguage: ["English", "Shona", "Ndebele"],
        },
      ],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Harare",
        addressCountry: "ZW",
      },
    },
  };

  return (
    <>
      {/* STRUCTURED DATA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="bg-base-100 text-base-content">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
            {/* LEFT */}
            <section className="space-y-8">
              <header>
                <h1 className="text-4xl font-extrabold tracking-tight">
                  Get in touch
                </h1>
                <p className="mt-4 text-muted-foreground max-w-prose">
                  Whether you want to list a property, partner with us, or need
                  help, send us a message and we’ll respond within 24–48 hours.
                </p>
              </header>

              {/* OFFICE */}
              <div className="rounded-2xl border bg-base-200 p-6">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Office
                </h3>

                <address className="not-italic mt-4 space-y-2 text-sm">
                  <p>Harare, Zimbabwe</p>

                  <p>
                    <a
                      href="tel:+263770000000"
                      className="text-primary hover:underline">
                      +263 77 000 0000
                    </a>
                  </p>

                  <p>
                    <a
                      href="mailto:hello@treasureprops.com"
                      className="text-primary hover:underline">
                      hello@treasureprops.com
                    </a>
                  </p>
                </address>
              </div>

              {/* PRIVACY */}
              <p className="text-xs text-muted-foreground">
                <strong>Privacy:</strong> Your contact details are only used to
                respond to your inquiry. Read our{" "}
                <a href="/privacy" className="underline hover:text-primary">
                  privacy policy
                </a>
                .
              </p>
            </section>

            {/* RIGHT */}
            <section className="rounded-3xl border bg-white p-6 sm:p-8 shadow-sm">
              <ContactForm />
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
