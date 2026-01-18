// app/components/home/HomeContent.tsx
"use client";

import React from "react";
import PropertyFilters, { Filters } from "@/components/property/PropertyFilters";
import BlogSection from "@/components/landing/Blog";
import FaqFull from "@/components/landing/FaqFull";
import AgencySection from "@/components/user/AgencySection";
import JoinHero from "@/components/user/JoinHero";

export default function HomeContent() {
  const handleFilterChange = (filters: Filters) => {
    console.log("Filters changed:", filters);
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
