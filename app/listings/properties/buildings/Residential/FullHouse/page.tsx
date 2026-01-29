import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import {
  baseAlternates,
  defaultOpenGraph,
  defaultTwitter,
} from "@/app/seo/seoConfig";
import FullHouseClient from "./FullHouse.client";

export const metadata: Metadata = {
  title: `Full House • ${SITE_NAME}`,
  description: "Browse full houses for sale and rent across Zimbabwe.",
  metadataBase: new URL(SITE_URL),
  alternates: {
    ...baseAlternates,
    canonical: `${SITE_URL}/listings/Residential/FullHouse`,
  },
  openGraph: {
    ...defaultOpenGraph,
    title: `Full House • ${SITE_NAME}`,
    description: "Browse full houses for sale and rent across Zimbabwe.",
    url: `${SITE_URL}/listings/Residential/FullHouse`,
    images: [
      { url: "/og/fullhouse.jpg", width: 1200, height: 630, alt: "Full House" },
    ],
  },
  twitter: {
    ...defaultTwitter,
    title: `Full House • ${SITE_NAME}`,
    description: "Browse full houses for sale and rent across Zimbabwe.",
    images: ["/og/fullhouse.jpg"],
  },
};

export default function FullHousePage() {
  return (
    <FullHouseClient
      title="Full Houses"
      subtitle="Browse full houses for sale and rent across Zimbabwe."
      endpoint="type/Residential/FullHouse"
    />
  );
}
