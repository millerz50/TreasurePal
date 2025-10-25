import "@/app/globals.css";
import LogoLoader from "@/components/ui/LogoLoader";
import "leaflet/dist/leaflet.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TreasurePal",
  description: "Discover and list hidden gems across Zimbabwe",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light" className={inter.variable}>
      <head>
        <link rel="icon" type="image/svg+xml" href="/logo/TREASURE.svg" />
      </head>
      <body className="bg-base-100 text-base-content font-sans">
        <LogoLoader />
        {children}
      </body>
    </html>
  );
}
