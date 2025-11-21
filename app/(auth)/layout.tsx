// app/(auth)/layout.tsx
import React from "react";
import AuthShell from "./AuthShell"; // client component

export const metadata = {
  title: "Treasure Pal — Become a Property Agent or Find Property Worldwide",
  description:
    "Treasure Pal helps property agents and buyers discover, list, and transact properties worldwide. Geo-targeted listings, easy agent onboarding, and modern tools for agents and buyers.",
  keywords:
    "property agent, real estate agent signup, buy property, worldwide property listings, geo-based property search, Treasure Pal",
  openGraph: {
    title: "Treasure Pal — Property Agents & Global Buyers",
    description:
      "Join Treasure Pal as an agent or find property across the world using geo-based search and modern agent tools.",
    url: "treasure-pal.vercel.app/",
    siteName: "Treasure Pal",
    images: [
      {
        url: "reasure-pal.vercel.app/logo/logo.png",
        width: 1200,
        height: 630,
        alt: "Treasure Pal logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Treasure Pal — Agents & Buyers",
    description:
      "Geo-targeted property listings and agent onboarding for buyers and real estate professionals worldwide.",
    creator: "@YourTwitterHandle",
    images: ["https://your-domain.com/logo/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
  alternates: {
    canonical: "https://your-domain.com/",
    languages: {
      "en-US": "https://your-domain.com/",
      "en-GB": "https://your-domain.com/gb/",
    },
  },
};
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthShell>{children}</AuthShell>;
}
