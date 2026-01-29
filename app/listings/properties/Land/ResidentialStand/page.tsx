// src/app/listings/Land/ResidentialStands/page.tsx
import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import {
  baseAlternates,
  defaultOpenGraph,
  defaultTwitter,
} from "@/app/seo/seoConfig";
import ListingsPageClient from "../../buildings/ListingsPageClient";

export const metadata: Metadata = {
  title: `Residential Stands • ${SITE_NAME}`,
  description: "Browse residential land and stands across Zimbabwe.",
  metadataBase: new URL(SITE_URL),
  alternates: {
    ...baseAlternates,
    canonical: `${SITE_URL}/listings/Land/ResidentialStands`,
  },
  openGraph: {
    ...defaultOpenGraph,
    title: `Residential Stands • ${SITE_NAME}`,
    description: "Browse residential land and stands across Zimbabwe.",
    url: `${SITE_URL}/listings/Land/ResidentialStands`,
    images: [
      {
        url: "/og/residential-stands.jpg",
        width: 1200,
        height: 630,
        alt: "Residential Stands",
      },
    ],
  },
  twitter: {
    ...defaultTwitter,
    title: `Residential Stands • ${SITE_NAME}`,
    description: "Browse residential land and stands across Zimbabwe.",
    images: ["/og/residential-stands.jpg"],
  },
};

export default function ResidentialStandsPage() {
  return (
    <ListingsPageClient
      pageTitle="Residential Stands"
      pageSubtitle="Browse residential land and stands across Zimbabwe."
      endpoint="Land/ResidentialStands"
    />
  );
}
