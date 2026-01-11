"use client";

import InsightsSection from "@/components/dashboard/InsightsSection";
import Hero from "@/components/landing/hero/Hero.server";
import PropertyList from "@/components/property/PropertyList";
import { Separator } from "@/components/ui/Separator";
import AgentList from "@/components/user/AgentList";

export default function HomePage() {
  return (
    <main className="bg-base-100 text-base-content">
      {/* Hero Section */}
      <Hero />

      <Separator className="my-8" />

      {/* Featured Properties */}
      <PropertyList />

      <Separator className="my-8" />

      {/* Agent Highlights */}
      <AgentList />

      <Separator className="my-8" />

      {/* Netspace Insights */}
      <InsightsSection />
    </main>
  );
}
