// src/app/listings/Commercial/MixedUse/page.tsx
import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import {
  baseAlternates,
  defaultOpenGraph,
  defaultTwitter,
} from "@/app/seo/seoConfig";
import ListingsPageClient from "../../ListingsPageClient"; // Update path if needed

export const metadata: Metadata = {
  title: `Mixed Use • ${SITE_NAME}`,
  description: "Browse mixed-use commercial developments across Zimbabwe.",
  metadataBase: new URL(SITE_URL),
  alternates: {
    ...baseAlternates,
    canonical: `${SITE_URL}/listings/Commercial/MixedUse`,
  },
  openGraph: {
    ...defaultOpenGraph,
    title: `Mixed Use • ${SITE_NAME}`,
    description: "Browse mixed-use commercial developments across Zimbabwe.",
    url: `${SITE_URL}/listings/Commercial/MixedUse`,
    images: [
      { url: "/og/mixeduse.jpg", width: 1200, height: 630, alt: "Mixed Use" },
    ],
  },
  twitter: {
    ...defaultTwitter,
    title: `Mixed Use • ${SITE_NAME}`,
    description: "Browse mixed-use commercial developments across Zimbabwe.",
    images: ["/og/mixeduse.jpg"],
  },
};

export default function MixedUsePage() {
  return (
    <ListingsPageClient
      title="Mixed Use"
      subtitle="Browse mixed-use commercial developments across Zimbabwe."
      endpoint="Commercial/MixedUse"
    />
  );
}
