// app/page.tsx
import type { Metadata } from "next";
import { headers } from "next/headers";

import Hero from "@/components/landing/hero/Hero.server";
import HomeContent from "@/components/home/HomeContent";
import { domainConfig } from "@/components/landing/Navbar/ssrWrapperNav/domains";

// ✅ Make the function async
export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers(); // ✅ Await here

  const host =
    headersList.get("x-forwarded-host") || headersList.get("host") || "";

  const domain = host.replace(/:\d+$/, "");

  const config = domainConfig[domain] ?? domainConfig.default;

  const baseUrl = (() => {
    switch (domain) {
      case "treasurepal.co.zw":
        return "https://treasurepal.co.zw";
      case "treasureprops.com":
        return "https://treasureprops.com";
      default:
        return "https://treasurepal.co.zw";
    }
  })();

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
