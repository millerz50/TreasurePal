import { SITE_NAME, SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import { baseAlternates, defaultOpenGraph, defaultTwitter } from "@/app/seo/seoConfig";
import IndustrialPageClient from "./IndustrialPageClient";

export const metadata: Metadata = {
  title: `Industrial & Commercial listings • ${SITE_NAME}`,
  description: `Warehouses, factories, offices and commercial spaces across Zimbabwe.`,
  metadataBase: new URL(SITE_URL),
  alternates: {
    ...baseAlternates,
    canonical: `${SITE_URL}/industrial`,
    languages: {
      en: `${SITE_URL}/en/industrial`,
      "en-zw": `${SITE_URL}/en/industrial`,
      sn: `${SITE_URL}/sn/industrial`,
      "sn-zw": `${SITE_URL}/sn/industrial`,
      nd: `${SITE_URL}/nd/industrial`,
      "nd-zw": `${SITE_URL}/nd/industrial`,
      "x-default": `${SITE_URL}/industrial`,
    },
  },
  openGraph: {
    ...defaultOpenGraph,
    title: `Industrial & Commercial listings • ${SITE_NAME}`,
    description:
      "Explore warehouses, factories, offices, and commercial spaces available for businesses across Zimbabwe.",
    url: `${SITE_URL}/industrial`,
    images: [
      {
        url: "/og/industrial.jpg",
        width: 1200,
        height: 630,
        alt: "Industrial and commercial properties in Zimbabwe",
      },
    ],
  },
  twitter: {
    ...defaultTwitter,
    title: `Industrial & Commercial listings • ${SITE_NAME}`,
    description:
      "Warehouses, factories, offices, and commercial spaces for businesses across Zimbabwe.",
    images: ["/og/industrial.jpg"],
  },
};

export default function IndustrialPage() {
  return <IndustrialPageClient />;
}
