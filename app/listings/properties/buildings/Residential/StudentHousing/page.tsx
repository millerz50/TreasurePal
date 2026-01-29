// src/components/PropertyPageTemplate.tsx
"use client";

import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import {
  baseAlternates,
  defaultOpenGraph,
  defaultTwitter,
} from "@/app/seo/seoConfig";
import ListingsPageClient from "../../ListingsPageClient"; // fixed relative path

/**
 * Helper to create consistent metadata for any property page
 */
export const createPageMetadata = (
  title: string,
  description: string,
  category: "Residential" | "Commercial" | "Hospitality" | "Institutional",
  slug: string,
  ogImage: string,
): Metadata => ({
  title: `${title} • ${SITE_NAME}`,
  description,
  metadataBase: new URL(SITE_URL),
  alternates: {
    ...baseAlternates,
    canonical: `${SITE_URL}/listings/${category}/${slug}`,
  },
  openGraph: {
    ...defaultOpenGraph,
    title: `${title} • ${SITE_NAME}`,
    description,
    url: `${SITE_URL}/listings/${category}/${slug}`,
    images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
  },
  twitter: {
    ...defaultTwitter,
    title: `${title} • ${SITE_NAME}`,
    description,
    images: [ogImage],
  },
});

/**
 * Reusable Property Page Component using ListingsPageClient
 */
interface PropertyPageProps {
  slug: string;
  title: string;
  description: string;
  ogImage: string;
  category: "Residential" | "Commercial" | "Hospitality" | "Institutional";
}

export default function PropertyPage({
  slug,
  title,
  description,
  ogImage,
  category,
}: PropertyPageProps) {
  return (
    <ListingsPageClient
      title={title}
      subtitle={description}
      endpoint={`${category}/${slug}`}
    />
  );
}
