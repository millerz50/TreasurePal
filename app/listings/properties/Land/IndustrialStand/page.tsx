// src/app/listings/Land/IndustrialStands/page.tsx
import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import {
  baseAlternates,
  defaultOpenGraph,
  defaultTwitter,
} from "@/app/seo/seoConfig";
import ListingsPageClient from "../../buildings/ListingsPageClient";

export const metadata: Metadata = {
  title: `Industrial Stands • ${SITE_NAME}`,
  description: "Browse industrial land and stands across Zimbabwe.",
  metadataBase: new URL(SITE_URL),
  alternates: {
    ...baseAlternates,
    canonical: `${SITE_URL}/listings/Land/IndustrialStands`,
  },
  openGraph: {
    ...defaultOpenGraph,
    title: `Industrial Stands • ${SITE_NAME}`,
    description: "Browse industrial land and stands across Zimbabwe.",
    url: `${SITE_URL}/listings/Land/IndustrialStands`,
    images: [
      {
        url: "/og/industrial-stands.jpg",
        width: 1200,
        height: 630,
        alt: "Industrial Stands",
      },
    ],
  },
  twitter: {
    ...defaultTwitter,
    title: `Industrial Stands • ${SITE_NAME}`,
    description: "Browse industrial land and stands across Zimbabwe.",
    images: ["/og/industrial-stands.jpg"],
  },
};

export default function IndustrialStandsPage() {
  return (
    <ListingsPageClient
      title="Industrial Stands"
      subtitle="Browse industrial land and stands across Zimbabwe."
      endpoint="Land/IndustrialStands"
    />
  );
}
