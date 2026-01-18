import type { Metadata } from "next";
import Hero from "@/components/landing/hero/Hero.server";
import HomeContent from "@/components/home/HomeContent";

export const metadata: Metadata = {
  title: "TreasureProps | Explore Properties Across Zimbabwe",
  description:
    "Discover, list, and access properties across Zimbabwe — from affordable student housing to premium estates.",
  metadataBase: new URL("https://treasureprops.com"),
};

export default function Home() {
  return (
    <div className="min-h-screen bg-base-200">
      <Hero />
      <HomeContent />
    </div>
  );
}

