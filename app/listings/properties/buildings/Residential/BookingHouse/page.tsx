// src/app/listings/Residential/BookingHouse/page.tsx
import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import {
  baseAlternates,
  defaultOpenGraph,
  defaultTwitter,
} from "@/app/seo/seoConfig";
import ListingsPageClient from "../../ListingsPageClient"; // adjust path if needed

export const metadata: Metadata = {
  title: `Booking House • ${SITE_NAME}`,
  description: "Browse booking houses and short-stay homes across Zimbabwe.",
  metadataBase: new URL(SITE_URL),
  alternates: {
    ...baseAlternates,
    canonical: `${SITE_URL}/listings/Residential/BookingHouse`,
  },
  openGraph: {
    ...defaultOpenGraph,
    title: `Booking House • ${SITE_NAME}`,
    description: "Browse booking houses and short-stay homes across Zimbabwe.",
    url: `${SITE_URL}/listings/Residential/BookingHouse`,
    images: [
      {
        url: "/og/bookinghouse.jpg",
        width: 1200,
        height: 630,
        alt: "Booking House",
      },
    ],
  },
  twitter: {
    ...defaultTwitter,
    title: `Booking House • ${SITE_NAME}`,
    description: "Browse booking houses and short-stay homes across Zimbabwe.",
    images: ["/og/bookinghouse.jpg"],
  },
};

export default function BookingHousePage() {
  return (
    <ListingsPageClient
      title="Booking Houses"
      subtitle="Browse booking houses and short-stay homes across Zimbabwe."
      endpoint="Residential/BookingHouse"
    />
  );
}
