import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { baseAlternates, defaultOpenGraph, defaultTwitter } from "@/app/seo/seoConfig";
import SalePageClient from "./SalePageClient";

export const metadata: Metadata = {
  title: `For Sale • ${SITE_NAME}`,
  description: `Properties for sale across Zimbabwe on ${SITE_NAME}. Find houses, stands and commercial plots.`,
  metadataBase: new URL(SITE_URL),
  alternates: {
    ...baseAlternates,
    canonical: `${SITE_URL}/sale`,
  },
  openGraph: {
    ...defaultOpenGraph,
    title: `For Sale • ${SITE_NAME}`,
    description: "Browse houses, stands, and commercial plots for sale across Zimbabwe on TreasurePal.",
    url: `${SITE_URL}/sale`,
    images: [
      {
        url: "/og/sale.jpg",
        width: 1200,
        height: 630,
        alt: "Properties for sale in Zimbabwe",
      },
    ],
  },
  twitter: {
    ...defaultTwitter,
    title: `For Sale • ${SITE_NAME}`,
    description: "Find houses, stands, and commercial plots for sale across Zimbabwe.",
    images: ["/og/sale.jpg"],
  },
};

export default function SalePage() {
  return <SalePageClient />;
}

