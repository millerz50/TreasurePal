import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { baseAlternates, defaultOpenGraph, defaultTwitter } from "@/app/seo/seoConfig";
import ListingsPageClient from "./ListingsPageClient";

export const metadata: Metadata = {
  title: `Listings • ${SITE_NAME}`,
  description: "Browse property listings across Zimbabwe. Filter by location, price, and type.",
  metadataBase: new URL(SITE_URL),
  alternates: {
    ...baseAlternates,
    canonical: `${SITE_URL}/listings`,
  },
  openGraph: {
    ...defaultOpenGraph,
    title: `Listings • ${SITE_NAME}`,
    description: "Find rooms, houses, commercial spaces, and more across Zimbabwe. Filter by location, price, and type.",
    url: `${SITE_URL}/listings`,
    images: [
      {
        url: "/og/listings.jpg",
        width: 1200,
        height: 630,
        alt: "Property listings in Zimbabwe",
      },
    ],
  },
  twitter: {
    ...defaultTwitter,
    title: `Listings • ${SITE_NAME}`,
    description: "Browse property listings across Zimbabwe. Rooms, houses, and commercial spaces available.",
    images: ["/og/listings.jpg"],
  },
};

export default function ListingsPage() {
  return <ListingsPageClient />;
}

