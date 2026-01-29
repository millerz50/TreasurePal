// src/app/listings/Institutional/GovernmentBuilding/page.tsx
import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import {
  baseAlternates,
  defaultOpenGraph,
  defaultTwitter,
} from "@/app/seo/seoConfig";
import ListingsPageClient from "../../ListingsPageClient"; // Adjust path if needed

export const metadata: Metadata = {
  title: `Government Building • ${SITE_NAME}`,
  description: "Browse government buildings across Zimbabwe.",
  metadataBase: new URL(SITE_URL),
  alternates: {
    ...baseAlternates,
    canonical: `${SITE_URL}/listings/Institutional/GovernmentBuilding`,
  },
  openGraph: {
    ...defaultOpenGraph,
    title: `Government Building • ${SITE_NAME}`,
    description: "Browse government buildings across Zimbabwe.",
    url: `${SITE_URL}/listings/Institutional/GovernmentBuilding`,
    images: [
      {
        url: "/og/government.jpg",
        width: 1200,
        height: 630,
        alt: "Government Building",
      },
    ],
  },
  twitter: {
    ...defaultTwitter,
    title: `Government Building • ${SITE_NAME}`,
    description: "Browse government buildings across Zimbabwe.",
    images: ["/og/government.jpg"],
  },
};

export default function GovernmentBuildingPage() {
  return (
    <ListingsPageClient
      title="Government Buildings"
      subtitle="Browse government buildings and public institutions across Zimbabwe."
      endpoint="Institutional/GovernmentBuilding"
    />
  );
}
