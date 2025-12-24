import type { Metadata } from "next";
import HeroClient from "./Hero.client";

export const metadata: Metadata = {
  title: "Find Property Without the Stress",
  description:
    "Discover homes, rentals, and commercial properties across multiple cities using one trusted platform.",
  openGraph: {
    title: "Find Property Without the Stress",
    description:
      "Homes, rentals, and commercial spaces — all in one trusted platform.",
    images: ["/heroimg.jpg"],
  },
};

export default function Hero() {
  return <HeroClient />;
}
