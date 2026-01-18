import type { Metadata } from "next";

import BlogSection from "@/components/landing/Blog";
import FaqFull from "@/components/landing/FaqFull";
import Hero from "@/components/landing/hero/Hero.server";
import PropertyFilters from "@/components/property/PropertyFilters"; // ✅ Correct import
import AgencySection from "@/components/user/AgencySection";
import JoinHero from "@/components/user/JoinHero";

/* ---------------------------
   SEO METADATA (HOME)
---------------------------- */

export const metadata: Metadata = {
  title: "TreasureProps | Explore Properties Across Zimbabwe",
  description:
    "Discover, list, and access properties across Zimbabwe — from affordable student housing to premium estates. TreasureProps makes property discovery simple, trusted, and inclusive.",

  metadataBase: new URL("https://treasureprops.com"),

  alternates: {
    canonical: "https://treasureprops.com",
    languages: {
      en: "https://treasureprops.com",
      "en-ZW": "https://treasureprops.com/sn",
      nd: "https://treasureprops.com/nd",
    },
  },

  openGraph: {
    title: "TreasureProps | Zimbabwe’s Smart Property Marketplace",
    description:
      "From student housing to premium estates, TreasureProps helps you find properties across Zimbabwe with ease.",
    url: "https://treasureprops.com",
    siteName: "TreasureProps",
    images: [
      {
        url: "/logo/logo.png",
        width: 1200,
        height: 630,
        alt: "TreasureProps Zimbabwe property marketplace",
      },
    ],
    type: "website",
    locale: "en_ZW",
  },

  twitter: {
    card: "summary_large_image",
    title: "TreasureProps | Find Property in Zimbabwe",
    description:
      "Affordable rentals, student housing, and premium estates — all in one Zimbabwean marketplace.",
    images: ["/logo/logo.png"],
  },
};

/* ---------------------------
   HOME PAGE
---------------------------- */

export default function Home() {
  // Dummy handler for filters
  const handleFilterChange = (filters: Record<string, any>) => {
    console.log("Filters changed:", filters);
  };

 "use client";

import React from "react";
import type { Metadata } from "next";

import Hero from "@/components/landing/hero/Hero.server";
import BlogSection from "@/components/landing/Blog";
import FaqFull from "@/components/landing/FaqFull";
import PropertyFilters, { Filters } from "@/components/property/PropertyFilters";
import AgencySection from "@/components/user/AgencySection";
import JoinHero from "@/components/user/JoinHero";

export const metadata: Metadata = {
  title: "TreasureProps | Explore Properties Across Zimbabwe",
  description:
    "Discover, list, and access properties across Zimbabwe — from affordable student housing to premium estates. TreasureProps makes property discovery simple, trusted, and inclusive.",
  metadataBase: new URL("https://treasureprops.com"),
};

export default function Home() {
  // ✅ Client-side handler
  const handleFilterChange = (filters: Filters) => {
    console.log("Filters changed:", filters);
    // You can add state or API calls here to filter properties dynamically
  };

  return (
    <div className="min-h-screen bg-base-200">
      {/* HERO — full width */}
      <Hero />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-20 py-16">
        {/* Property Filters Section */}
        <PropertyFilters onFilterChange={handleFilterChange} />

        {/* Blog Section */}
        <BlogSection />

        {/* FAQ Section */}
        <FaqFull includeSchema storageKey="faq.home.open" />

        {/* Agency & Join */}
        <AgencySection />
        <JoinHero />
      </main>
    </div>
  );
}
