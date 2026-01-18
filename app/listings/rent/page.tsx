import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { baseAlternates, defaultOpenGraph, defaultTwitter } from "@/app/seo/seoConfig";
import RentPageClient from "./RentPageClient";

export const metadata: Metadata = {
  title: `Rentals • ${SITE_NAME}`,
  description: `Browse rental properties across Zimbabwe on ${SITE_NAME}. Rooms, houses and short-term stays.`,
  metadataBase: new URL(SITE_URL),
  alternates: {
    ...baseAlternates,
    canonical: `${SITE_URL}/rent`,
  },
  openGraph: {
    ...defaultOpenGraph,
    title: `Rentals • ${SITE_NAME}`,
    description: "Browse rental listings across Zimbabwe — rooms, houses, and short-term stays.",
    url: `${SITE_URL}/rent`,
    images: [
      {
        url: "/og/rent.jpg",
        width: 1200,
        height: 630,
        alt: "Rental properties in Zimbabwe",
      },
    ],
  },
  twitter: {
    ...defaultTwitter,
    title: `Rentals • ${SITE_NAME}`,
    description: "Browse rental properties across Zimbabwe. Rooms, houses and short-term stays.",
    images: ["/og/rent.jpg"],
  },
};

export default function RentPage() {
  return <RentPageClient />;
}

