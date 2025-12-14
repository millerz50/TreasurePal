import SigninForm from "@/components/auth/SigninForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TreasurePal | Sign in to Your Account",
  description:
    "Access your TreasurePal dashboard to manage properties, agencies, and opportunities. Secure sign‑in for students, families, and investors.",
  // ✅ Global canonical base set to TreasureProps
  metadataBase: new URL("https://www.treasureprops.com"),
  alternates: {
    canonical: "https://www.treasureprops.com/signin",
    languages: {
      // Global English
      en: "https://www.treasureprops.com/en/signin",
      // Zimbabwe-specific English
      "en-zw": "https://treasurepal.co.zw/en/signin",
      // Shona
      sn: "https://www.treasureprops.com/sn/signin",
      "sn-zw": "https://treasurepal.co.zw/sn/signin",
      // Ndebele
      nd: "https://www.treasureprops.com/nd/signin",
      "nd-zw": "https://treasurepal.co.zw/nd/signin",
      // Global fallback
      "x-default": "https://www.treasureprops.com/signin",
    },
  },
  openGraph: {
    title: "TreasurePal | Sign in",
    description:
      "Welcome back to TreasurePal. Sign in to explore treasures across Zimbabwe and worldwide.",
    url: "https://www.treasureprops.com/signin",
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
    index: false, // ✅ prevent indexing of login page
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
