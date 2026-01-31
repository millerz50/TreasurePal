import type { Metadata } from "next";
import PricingPageClient from "./PricingPageClient";

/* ---------------------------
   SEO METADATA
---------------------------- */

export const metadata: Metadata = {
  title: "Pricing | TreasureProps – Coins, Premium & Unlimited Agents",
  description:
    "Flexible pricing for everyone. Buy coins to post properties, go Unlimited as an Agent, or upgrade to Premium for an ad-free experience.",
  metadataBase: new URL("https://treasureprops.com"),
  alternates: {
    canonical: "https://treasureprops.com/pricing",
  },
  openGraph: {
    title: "TreasureProps Pricing – Coins, Premium & Unlimited",
    description:
      "Post properties using coins, go Unlimited as an Agent, or enjoy an ad-free Premium experience.",
    url: "https://treasureprops.com/pricing",
    siteName: "TreasureProps",
    images: [
      {
        url: "/og/pricing.jpg",
        width: 1200,
        height: 630,
        alt: "TreasureProps pricing plans",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TreasureProps Pricing",
    description:
      "Coins for agents. Unlimited plans. Premium users. Built for Zimbabwe & global users.",
    images: ["/og/pricing.jpg"],
  },
};

export default function PricingPage() {
  return <PricingPageClient />;
}
