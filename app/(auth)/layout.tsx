// app/(auth)/layout.tsx
import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";

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
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-green-100 via-white to-blue-100">
      <div className="mx-auto max-w-2xl px-4 py-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}>
          <div className="flex flex-col items-center">
            <div className="mb-6 flex items-center gap-3">
              <Image
                src="/logo/logo.png"
                alt="TreasurePal logo"
                width={40}
                height={40}
                className="rounded-md shadow-sm"
              />

              <div className="leading-tight">
                <h1 className="text-2xl font-bold">
                  <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                    Treasure Pal
                  </span>
                </h1>
                <p className="text-xs uppercase tracking-wider text-green-700">
                  Affordable.Properties
                </p>
              </div>
            </div>

            <div className="w-full rounded-xl bg-white p-6 shadow-xl ring-1 ring-black/5">
              {children}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
