// src/app/listings/Residential/OneRoom/page.tsx
import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import {
  baseAlternates,
  defaultOpenGraph,
  defaultTwitter,
} from "@/app/seo/seoConfig";
import ListingsPageClient from "../../ListingsPageClient"; // adjust path if needed

export const metadata: Metadata = {
  title: `One Room • ${SITE_NAME}`,
  description:
    "Browse one-room residential properties and rentals across Zimbabwe.",
  metadataBase: new URL(SITE_URL),
  alternates: {
    ...baseAlternates,
    canonical: `${SITE_URL}/listings/Residential/OneRoom`,
  },
  openGraph: {
    ...defaultOpenGraph,
    title: `One Room • ${SITE_NAME}`,
    description:
      "Browse one-room residential properties and rentals across Zimbabwe.",
    url: `${SITE_URL}/listings/Residential/OneRoom`,
    images: [
      { url: "/og/oneroom.jpg", width: 1200, height: 630, alt: "One Room" },
    ],
  },
  twitter: {
    ...defaultTwitter,
    title: `One Room • ${SITE_NAME}`,
    description:
      "Browse one-room residential properties and rentals across Zimbabwe.",
    images: ["/og/oneroom.jpg"],
  },
};

export default function OneRoomPage() {
  return (
    <ListingsPageClient
      title="One Room Properties"
      subtitle="Browse one-room residential properties and rentals across Zimbabwe."
      endpoint="type/Residential/OneRoom"
    />
  );
}
