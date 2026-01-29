// src/app/listings/Hospitality/EventBuilding/page.tsx
import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import {
  baseAlternates,
  defaultOpenGraph,
  defaultTwitter,
} from "@/app/seo/seoConfig";
import ListingsPageClient from "../../ListingsPageClient"; // Adjust path if needed

export const metadata: Metadata = {
  title: `Event Building • ${SITE_NAME}`,
  description: "Browse event buildings and venues across Zimbabwe.",
  metadataBase: new URL(SITE_URL),
  alternates: {
    ...baseAlternates,
    canonical: `${SITE_URL}/listings/Hospitality/EventBuilding`,
  },
  openGraph: {
    ...defaultOpenGraph,
    title: `Event Building • ${SITE_NAME}`,
    description: "Browse event buildings and venues across Zimbabwe.",
    url: `${SITE_URL}/listings/Hospitality/EventBuilding`,
    images: [
      { url: "/og/event.jpg", width: 1200, height: 630, alt: "Event Building" },
    ],
  },
  twitter: {
    ...defaultTwitter,
    title: `Event Building • ${SITE_NAME}`,
    description: "Browse event buildings and venues across Zimbabwe.",
    images: ["/og/event.jpg"],
  },
};

export default function EventBuildingPage() {
  return (
    <ListingsPageClient
      title="Event Buildings"
      subtitle="Browse event buildings and venues across Zimbabwe."
      endpoint="Hospitality/EventBuilding"
    />
  );
}
