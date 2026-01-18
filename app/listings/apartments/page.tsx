import { SITE_NAME, SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import { baseAlternates, defaultOpenGraph, defaultTwitter } from "@/app/seo/seoConfig";
import ApartmentsPageClient from "./ApartmentsPageClient";

export const metadata: Metadata = {
  title: `Apartment Listings • ${SITE_NAME}`,
  description: `Apartments, flats, and residential units across Zimbabwe.`,
  metadataBase: new URL(SITE_URL),
  alternates: {
    ...baseAlternates,
    canonical: `${SITE_URL}/apartments`,
    languages: {
      en: `${SITE_URL}/en/apartments`,
      "en-zw": `${SITE_URL}/en/apartments`,
      sn: `${SITE_URL}/sn/apartments`,
      "sn-zw": `${SITE_URL}/sn/apartments`,
      nd: `${SITE_URL}/nd/apartments`,
      "nd-zw": `${SITE_URL}/nd/apartments`,
      "x-default": `${SITE_URL}/apartments`,
    },
  },
  openGraph: {
    ...defaultOpenGraph,
    title: `Apartment Listings • ${SITE_NAME}`,
    description: "Browse apartments, flats, and residential units across Zimbabwe.",
    url: `${SITE_URL}/apartments`,
    images: [
      {
        url: "/og/apartments.jpg",
        width: 1200,
        height: 630,
        alt: "Apartments and residential units in Zimbabwe",
      },
    ],
  },
  twitter: {
    ...defaultTwitter,
    title: `Apartment Listings • ${SITE_NAME}`,
    description: "Find apartments, flats, and residential units across Zimbabwe.",
    images: ["/og/apartments.jpg"],
  },
};

export default function ApartmentsPage() {
  return <ApartmentsPageClient />;
}
