// src/app/listings/Land/CommercialStands/page.tsx
import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import {
  baseAlternates,
  defaultOpenGraph,
  defaultTwitter,
} from "@/app/seo/seoConfig";
import ListingsPageClient from "../../buildings/ListingsPageClient";

export const metadata: Metadata = {
  title: `Commercial Stands • ${SITE_NAME}`,
  description: "Browse commercial land and stands across Zimbabwe.",
  metadataBase: new URL(SITE_URL),
  alternates: {
    ...baseAlternates,
    canonical: `${SITE_URL}/listings/Land/CommercialStands`,
  },
  openGraph: {
    ...defaultOpenGraph,
    title: `Commercial Stands • ${SITE_NAME}`,
    description: "Browse commercial land and stands across Zimbabwe.",
    url: `${SITE_URL}/listings/Land/CommercialStands`,
    images: [
      {
        url: "/og/commercial-stands.jpg",
        width: 1200,
        height: 630,
        alt: "Commercial Stands",
      },
    ],
  },
  twitter: {
    ...defaultTwitter,
    title: `Commercial Stands • ${SITE_NAME}`,
    description: "Browse commercial land and stands across Zimbabwe.",
    images: ["/og/commercial-stands.jpg"],
  },
};

export default function CommercialStandsPage() {
  return (
    <ListingsPageClient
      title="Commercial Stands"
      subtitle="Browse commercial land and stands across Zimbabwe."
      endpoint="Land/CommercialStands"
    />
  );
}
