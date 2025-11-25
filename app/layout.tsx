import "@/app/globals.css";
import ContactChannels from "@/components/landing/ContactChannels";
import Footer from "@/components/landing/footer/Footer";
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
  title: "TreasurePal",
  description: "Discover and list hidden gems across Zimbabwe",
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
      </head>
      <body className="bg-base-100 text-base-content font-sans">
        <LogoLoader />
        <Providers>{children}</Providers>
        <ContactChannels />
        <Footer />
      </body>
    </html>
  );
}
