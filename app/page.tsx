import BlogSection from "@/components/landing/Blog";
import FaqFull from "@/components/landing/FaqFull";
import Hero from "@/components/landing/Hero";
import Navbar from "@/components/landing/Navbar/ssrWrapperNav/Navbar";
import PropertyList from "@/components/property/PropertyList";
import AgencySection from "@/components/user/AgencySection";
import JoinHero from "@/components/user/JoinHero";
import type { Metadata } from "next";

// ✅ SEO metadata for the home page
export const metadata: Metadata = {
  title: "TreasurePal | Explore Zimbabwe’s Treasures for Everyone",
  description:
    "Discover, list, and access properties and opportunities across Zimbabwe — from affordable student housing to premium estates. TreasurePal makes treasures available to all income levels, empowering communities and learners worldwide.",
  metadataBase: new URL("https://treasurepal.com"),
  alternates: {
    canonical: "https://treasurepal.com",
    languages: {
      en: "https://treasurepal.com/en",
      "en-zw": "https://treasurepal.co.zw/en",
      sn: "https://treasurepal.com/sn",
      "sn-zw": "https://treasurepal.co.zw/sn",
      nd: "https://treasurepal.com/nd",
      "nd-zw": "https://treasurepal.co.zw/nd",
    },
  },
  openGraph: {
    title: "TreasurePal | Treasures for Every Income Level",
    description:
      "From student housing to premium estates, TreasurePal opens Zimbabwe’s treasures to everyone.",
    url: "https://treasurepal.com",
    siteName: "TreasurePal",
    images: [
      {
        url: "/logo/logo.png",
        width: 1200,
        height: 630,
        alt: "TreasurePal properties for all income levels",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TreasurePal | Treasures for All",
    description:
      "Affordable, student-friendly, and premium properties — TreasurePal makes treasures accessible to everyone.",
    images: ["/og/treasurepal.jpg"],
  },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 py-8">
        <Hero />
        <PropertyList />
        {/* ✅ BlogSection should internally guard against non-array data */}
        <BlogSection />
        <FaqFull includeSchema={true} storageKey="faq.home.open" />
        <AgencySection />
        <JoinHero />
      </main>
    </div>
  );
}
