// src/app/listings/Institutional/School/page.tsx
import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import {
  baseAlternates,
  defaultOpenGraph,
  defaultTwitter,
} from "@/app/seo/seoConfig";
import ListingsPageClient from "../../ListingsPageClient"; // Adjust path if needed

export const metadata: Metadata = {
  title: `School • ${SITE_NAME}`,
  description: "Browse schools and educational institutions across Zimbabwe.",
  metadataBase: new URL(SITE_URL),
  alternates: {
    ...baseAlternates,
    canonical: `${SITE_URL}/listings/Institutional/School`,
  },
  openGraph: {
    ...defaultOpenGraph,
    title: `School • ${SITE_NAME}`,
    description: "Browse schools and educational institutions across Zimbabwe.",
    url: `${SITE_URL}/listings/Institutional/School`,
    images: [
      { url: "/og/school.jpg", width: 1200, height: 630, alt: "School" },
    ],
  },
  twitter: {
    ...defaultTwitter,
    title: `School • ${SITE_NAME}`,
    description: "Browse schools and educational institutions across Zimbabwe.",
    images: ["/og/school.jpg"],
  },
};

export default function SchoolPage() {
  return (
    <ListingsPageClient
      title="Schools"
      subtitle="Browse schools and educational institutions across Zimbabwe."
      endpoint="Institutional/School"
    />
  );
}
