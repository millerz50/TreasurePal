import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import {
  baseAlternates,
  defaultOpenGraph,
  defaultTwitter,
} from "@/app/seo/seoConfig";
import HotelClient from "./Hotel.client";

export const metadata: Metadata = {
  title: `Hotel • ${SITE_NAME}`,
  description: "Browse hotels and accommodation across Zimbabwe.",
  metadataBase: new URL(SITE_URL),
  alternates: {
    ...baseAlternates,
    canonical: `${SITE_URL}/listings/Hospitality/Hotel`,
  },
  openGraph: {
    ...defaultOpenGraph,
    title: `Hotel • ${SITE_NAME}`,
    description: "Browse hotels and accommodation across Zimbabwe.",
    url: `${SITE_URL}/listings/Hospitality/Hotel`,
    images: [{ url: "/og/hotel.jpg", width: 1200, height: 630, alt: "Hotel" }],
  },
  twitter: {
    ...defaultTwitter,
    title: `Hotel • ${SITE_NAME}`,
    description: "Browse hotels and accommodation across Zimbabwe.",
    images: ["/og/hotel.jpg"],
  },
};

export default function HotelPage() {
  return (
    <HotelClient
      title="Hotels"
      subtitle="Browse hotels and accommodation across Zimbabwe."
      endpoint="type/Hospitality/Hotel"
    />
  );
}
