"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  MagnifyingGlassIcon,
  NewspaperIcon,
  QuestionMarkCircleIcon,
  BuildingOffice2Icon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";

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
    const params = new URLSearchParams();

    if (filters.location) params.set("location", filters.location);
    if (filters.category) params.set("category", filters.category);
    if (filters.subType) params.set("subType", filters.subType);
    if (filters.search) params.set("q", filters.search);

    router.push(`/property-filter?${params.toString()}`);
  };

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 space-y-28">
      {/* PROPERTY SEARCH */}
      <section className="space-y-6">
        <SectionHeader
          icon={MagnifyingGlassIcon}
          title="Find properties"
          subtitle="Search homes, rentals, and commercial spaces across Zimbabwe"
        />
        <PropertyFilters onFilterChange={handleFilterChange} />
      </section>

      {/* BLOG */}
      <section className="space-y-6">
        <SectionHeader
          icon={NewspaperIcon}
          title="Latest insights"
          subtitle="Guides, updates, and property trends"
        />
        <BlogSection />
      </section>

      {/* FAQ */}
      <section className="space-y-6">
        <SectionHeader
          icon={QuestionMarkCircleIcon}
          title="Frequently asked questions"
          subtitle="Everything you need to know about TreasurePal"
        />
        <FaqFull includeSchema storageKey="faq.home.open" />
      </section>

      {/* AGENCIES */}
      <section className="space-y-6">
        <SectionHeader
          icon={BuildingOffice2Icon}
          title="Agencies & partners"
          subtitle="Work with trusted agents and companies"
        />
        <AgencySection />
      </section>

      {/* JOIN */}
      <section className="space-y-6">
        <SectionHeader
          icon={UserPlusIcon}
          title="Join TreasurePal"
          subtitle="Become an agent, owner, or contributor"
        />
        <JoinHero />
      </section>
    </main>
  );
}

/* ===============================
   SECTION HEADER (REUSABLE & THEME-AWARE)
================================ */

function SectionHeader({
  icon: Icon,
  title,
  subtitle,
}: {
  icon: React.ElementType;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-xl bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-gray-100">
        <Icon className="h-5 w-5" />
      </div>

      <div>
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
