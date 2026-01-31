import type { Metadata } from "next";
import ContactPageClient from "./ContactPageClient";
import { SITE_NAME, SITE_URL } from "@/lib/site";

/* ---------------------------
   SEO METADATA
---------------------------- */
export const metadata: Metadata = {
  title: "Contact TreasurePal | Property Listings & Real Estate Support",
  description:
    "Reach out to TreasurePal for property listings, partnerships, or customer support across Zimbabwe. Fast responses guaranteed.",
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
  openGraph: {
    title: "Contact TreasurePal",
    description:
      "Get in touch with TreasurePal for support, listings, or partnerships across Zimbabwe.",
    url: `${SITE_URL}/contact`,
    siteName: SITE_NAME,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact TreasurePal",
    description:
      "Get in touch with TreasurePal for support, listings, or partnerships across Zimbabwe.",
    site: "@TreasurePal",
  },
};

/* ---------------------------
   CONTACT PAGE (SERVER)
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
          telephone: "+263777768431",
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

      {/* CLIENT-SIDE CONTACT PAGE */}
      <ContactPageClient />
    </>
  );
}
