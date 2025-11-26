import SigninForm from "@/components/auth/SigninForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TreasurePal | Sign in to Your Account",
  description:
    "Access your TreasurePal dashboard to manage properties, agencies, and opportunities. Secure sign‑in for students, families, and investors.",
  metadataBase: new URL("https://treasurepal.com"),
  alternates: {
    canonical: "https://treasurepal.com/signin",
    languages: {
      // Global English
      en: "https://treasurepal.com/en/signin",
      // Zimbabwe-specific English
      "en-zw": "https://treasurepal.co.zw/en/signin",
      // Shona
      sn: "https://treasurepal.com/sn/signin",
      "sn-zw": "https://treasurepal.co.zw/sn/signin",
      // Ndebele
      nd: "https://treasurepal.com/nd/signin",
      "nd-zw": "https://treasurepal.co.zw/nd/signin",
    },
  },
  openGraph: {
    title: "TreasurePal | Sign in",
    description:
      "Welcome back to TreasurePal. Sign in to explore treasures across Zimbabwe and worldwide.",
    url: "https://treasurepal.com/signin",
    siteName: "TreasurePal",
    images: [
      {
        url: "/og/treasurepal-signin.jpg",
        width: 1200,
        height: 630,
        alt: "TreasurePal sign in portal",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "TreasurePal | Sign in",
    description:
      "Securely access your TreasurePal account to manage properties and opportunities.",
    images: ["/og/treasurepal-signin.jpg"],
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function SigninPage() {
  return (
    <main className="min-h-[60vh]">
      <h2 className="mb-6 text-center text-2xl font-semibold">Welcome back</h2>
      <SigninForm redirectTo="/dashboard" />
    </main>
  );
}
