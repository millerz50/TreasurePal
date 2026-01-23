// app/page.tsx
import type { Metadata } from "next";
import { headers } from "next/headers";

import Hero from "@/components/landing/hero/Hero.server";
import HomeContent from "@/components/home/HomeContent";
import { domainConfig } from "@/components/landing/Navbar/ssrWrapperNav/domains";

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers(); // ✅ FIX HERE

  const host =
    headersList.get("x-forwarded-host") || headersList.get("host") || "";

  // Remove port (localhost:3000 → localhost)
  const domain = host.replace(/:\d+$/, "");

  const config = domainConfig[domain] ?? domainConfig.default;

  const baseUrl =
    domain === "treasurepal.co.zw"
      ? "https://treasurepal.co.zw"
      : domain === "treasureprops.com"
        ? "https://treasureprops.com"
        : "https://treasurepal.co.zw";

  return {
    title: `${config.name} | Explore Properties`,
    description: config.description,
    metadataBase: new URL(baseUrl),

    openGraph: {
      title: `${config.name} | Property Marketplace`,
      description: config.description,
      url: baseUrl,
      siteName: config.name,
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: config.name,
      description: config.description,
    },
  };
}

export default function Home() {
  return (
    <div className="min-h-screen bg-base-200">
      <Hero />
      <HomeContent />
    </div>
  );
}
