import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { baseAlternates, defaultOpenGraph, defaultTwitter } from "@/app/seo/seoConfig";
import LodgesPageClient from "./LodgesPageClient";

export const metadata: Metadata = {
  title: `Lodges & Hotels • ${SITE_NAME}`,
  description:
    "Short-term stays, lodges and hotels across Zimbabwe. Find comfortable stays for travel and business.",
  metadataBase: new URL(SITE_URL),
  alternates: {
    ...baseAlternates,
    canonical: `${SITE_URL}/lodges`,
  },
  openGraph: {
    ...defaultOpenGraph,
    title: `Lodges & Hotels • ${SITE_NAME}`,
    description:
      "Browse short-term stays, lodges, and hotels across Zimbabwe. Comfortable options for travel, events, and business.",
    url: `${SITE_URL}/lodges`,
    images: [
      {
        url: "/og/lodges.jpg",
        width: 1200,
        height: 630,
        alt: "Lodges and hotels in Zimbabwe",
      },
    ],
  },
  twitter: {
    ...defaultTwitter,
    title: `Lodges & Hotels • ${SITE_NAME}`,
    description:
      "Find lodges and hotels for short-term stays, travel, and business across Zimbabwe.",
    images: ["/og/lodges.jpg"],
  },
};

export default function LodgesPage() {
  return <LodgesPageClient />;
}


