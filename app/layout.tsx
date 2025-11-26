import "@/app/globals.css";
import ContactChannels from "@/components/landing/ContactChannels";
import Footer from "@/components/landing/footer/Footer";
import { Hreflang } from "@/components/seo/Hreflang";
import LogoLoader from "@/components/ui/LogoLoader";
import "leaflet/dist/leaflet.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Providers from "./providers";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TreasurePal | Explore Zimbabwe’s Treasures for Everyone",
  description:
    "Discover, list, and access properties and opportunities across Zimbabwe — from affordable student housing to premium estates. TreasurePal makes treasures available to all income levels, empowering communities and learners worldwide.",
  metadataBase: new URL("https://treasurepal.com"),
  alternates: {
    canonical: "https://treasurepal.com",
    languages: {
      // Safe ISO 639-1 codes only
      en: "https://treasurepal.com/en",
      "en-zw": "https://treasurepal.co.zw/en",
      sn: "https://treasurepal.com/sn", // Shona
      "sn-zw": "https://treasurepal.co.zw/sn",
      nd: "https://treasurepal.com/nd", // Ndebele
      "nd-zw": "https://treasurepal.co.zw/nd",
      ny: "https://treasurepal.com/ny", // Chewa
      "ny-zw": "https://treasurepal.co.zw/ny",
      st: "https://treasurepal.com/st", // Sotho
      "st-zw": "https://treasurepal.co.zw/st",
      ts: "https://treasurepal.com/ts", // Tsonga/Shangani
      "ts-zw": "https://treasurepal.co.zw/ts",
      tn: "https://treasurepal.com/tn", // Tswana
      "tn-zw": "https://treasurepal.co.zw/tn",
      ve: "https://treasurepal.com/ve", // Venda
      "ve-zw": "https://treasurepal.co.zw/ve",
      xh: "https://treasurepal.com/xh", // Xhosa
      "xh-zw": "https://treasurepal.co.zw/xh",
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
    images: ["/logo/logo.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light" className={poppins.variable}>
      <head>
        <link rel="icon" type="image/svg+xml" href="/logo/TREASURE.svg" />
        {/* Inject hreflang tags for unsupported languages */}
        <Hreflang path="" />
      </head>
      <body className="bg-base-100 text-base-content font-sans">
        <LogoLoader />
        <Providers>
          <main>{children}</main>
        </Providers>
        <ContactChannels />
        <Footer />
      </body>
    </html>
  );
}
