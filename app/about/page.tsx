import type { Metadata } from "next";
import AboutPageClient from "./AboutPageClient";
import { SITE_NAME, SITE_URL } from "@/lib/site";

/* ---------------------------
   SEO METADATA
---------------------------- */
export const metadata: Metadata = {
  title: `About ${SITE_NAME}`,
  description: `${SITE_NAME} empowers local businesses, students, and customers across Zimbabwe with modern, transparent property tools.`,
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
  openGraph: {
    title: `About ${SITE_NAME}`,
    description: `${SITE_NAME} empowers local businesses, students, and customers across Zimbabwe with modern, transparent property tools.`,
    url: `${SITE_URL}/about`,
    siteName: SITE_NAME,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `About ${SITE_NAME}`,
    description: `${SITE_NAME} empowers local businesses, students, and customers across Zimbabwe with modern, transparent property tools.`,
    site: "@TreasurePal",
  },
};

/* ---------------------------
   SERVER COMPONENT
---------------------------- */
export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo/logo.png`,
    description: `${SITE_NAME} empowers local businesses, students, and customers across Zimbabwe with modern, transparent property tools.`,
  };

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Client-side interactive UI */}
      <AboutPageClient />
    </>
  );
}
