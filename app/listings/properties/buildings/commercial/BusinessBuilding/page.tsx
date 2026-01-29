// src/app/listings/Commercial/BusinessBuilding/page.tsx
import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import {
  baseAlternates,
  defaultOpenGraph,
  defaultTwitter,
} from "@/app/seo/seoConfig";
import ListingsPageClient from "../../ListingsPageClient"; // Make sure path matches your folder structure

export const metadata: Metadata = {
  title: `Business Building • ${SITE_NAME}`,
  description:
    "Browse business buildings and office properties across Zimbabwe.",
  metadataBase: new URL(SITE_URL),
  alternates: {
    ...baseAlternates,
    canonical: `${SITE_URL}/listings/Commercial/BusinessBuilding`,
  },
  openGraph: {
    ...defaultOpenGraph,
    title: `Business Building • ${SITE_NAME}`,
    description:
      "Browse business buildings and office properties across Zimbabwe.",
    url: `${SITE_URL}/listings/Commercial/BusinessBuilding`,
    images: [
      {
        url: "/og/business.jpg",
        width: 1200,
        height: 630,
        alt: "Business Building",
      },
    ],
  },
  twitter: {
    ...defaultTwitter,
    title: `Business Building • ${SITE_NAME}`,
    description:
      "Browse business buildings and office properties across Zimbabwe.",
    images: ["/og/business.jpg"],
  },
};

export default function BusinessBuildingPage() {
  return (
    <ListingsPageClient
      title="Business Buildings"
      subtitle="Browse office and commercial buildings across Zimbabwe."
      endpoint="Commercial/BusinessBuilding"
    />
  );
}
