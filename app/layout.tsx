// app/layout.tsx
import "@/app/globals.css";
import "leaflet/dist/leaflet.css";

import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import Providers from "./providers";

import ContactChannels from "@/components/landing/ContactChannels";
import Navbar from "@/components/landing/Navbar/ssrWrapperNav/Navbar";
import Footer from "@/components/landing/footer/Footer";
import { Hreflang } from "@/components/seo/Hreflang";
import LogoLoader from "@/components/ui/LogoLoader";

import AdsLoader from "@/components/AdsLoader";
import AdsCarousel from "@/components/AdsCarousel";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

/* --------------------------------
   GLOBAL SEO (PRIMARY: ZIMBABWE)
--------------------------------- */
export const metadata: Metadata = {
  title: "TreasurePal | Explore Zimbabwe’s Treasures for Everyone",
  description:
    "Discover, list, and access properties and opportunities across Zimbabwe — from affordable student housing to premium estates.",
  metadataBase: new URL("https://treasurepal.co.zw"),

  alternates: {
    canonical: "https://treasurepal.co.zw",
    languages: {
      en: "https://treasurepal.co.zw/en",
      sn: "https://treasurepal.co.zw/sn",
      nd: "https://treasurepal.co.zw/nd",
      "en-int": "https://treasureprops.com",
    },
  },

  openGraph: {
    title: "TreasurePal | Zimbabwe’s Property & Opportunity Marketplace",
    description:
      "From student housing to premium estates, TreasurePal opens access to Zimbabwe’s treasures for everyone.",
    url: "https://treasurepal.co.zw",
    siteName: "TreasurePal",
    images: [
      {
        url: "/logo/logo.png",
        width: 1200,
        height: 630,
        alt: "TreasurePal Zimbabwe marketplace",
      },
    ],
    type: "website",
    locale: "en_ZW",
  },

  twitter: {
    card: "summary_large_image",
    title: "TreasurePal Zimbabwe",
    description:
      "Affordable, student-friendly, and premium properties across Zimbabwe.",
    images: ["/logo/logo.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-theme="light"
      className={poppins.variable}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" type="image/svg+xml" href="/logo/TREASURE.svg" />
        <Hreflang path="" />
      </head>

      <body className="bg-base-100 text-base-content font-sans">
        {/* Global loader */}
        <LogoLoader />

        <Providers>
          {/* Splash ad (once per session) */}
          <AdsLoader />

          <Navbar />

          <main className="min-h-screen pt-20">
            {children}

            {/* Inline rotating ad */}
            <div className="my-8">
              <AdsCarousel />
            </div>
          </main>
        </Providers>

        <ContactChannels />
        <Footer />
      </body>
    </html>
  );
}
