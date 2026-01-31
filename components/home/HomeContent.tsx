"use client";

import React from "react";
import { useRouter } from "next/navigation";
import PropertyFilters, {
  Filters,
} from "@/components/property/PropertyFilters";
import BlogSection from "@/components/landing/Blog";
import FaqFull from "@/components/landing/FaqFull";
import AgencySection from "@/components/user/AgencySection";
import JoinHero from "@/components/user/JoinHero";

export default function HomeContent() {
  const router = useRouter();

  const handleFilterChange = (filters: Filters) => {
    // Example: filters = { location: "Bulawayo North", category: "Residential" }

    const params = new URLSearchParams();

    if (filters.location) params.set("location", filters.location);
    if (filters.category) params.set("category", filters.category);
    if (filters.subType) params.set("subType", filters.subType);
    if (filters.search) params.set("q", filters.search);

    // Redirect to property filter page with query params
    router.push(`/property-filter?${params.toString()}`);
  };

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-20 py-16">
      <PropertyFilters onFilterChange={handleFilterChange} />
      <BlogSection />
      <FaqFull includeSchema storageKey="faq.home.open" />
      <AgencySection />
      <JoinHero />
    </main>
  );
}
