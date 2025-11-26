import SignupForm from "@/components/auth/SignupForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TreasurePal | Create Your Account",
  description:
    "Join TreasurePal today to explore properties, agencies, and opportunities across Zimbabwe and worldwide. Sign up for free — students, families, and investors are all welcome.",
  metadataBase: new URL("https://treasurepal.com"),
  alternates: {
    canonical: "https://treasurepal.com/signup",
    languages: {
      // Global English
      en: "https://treasurepal.com/en/signup",
      // Zimbabwe-specific English
      "en-zw": "https://treasurepal.co.zw/en/signup",
      // Shona
      sn: "https://treasurepal.com/sn/signup",
      "sn-zw": "https://treasurepal.co.zw/sn/signup",
      // Ndebele
      nd: "https://treasurepal.com/nd/signup",
      "nd-zw": "https://treasurepal.co.zw/nd/signup",
    },
  },
  openGraph: {
    title: "TreasurePal | Sign up",
    description:
      "Create your TreasurePal account to access treasures for every income level — from student housing to premium estates.",
    url: "https://treasurepal.com/signup", // canonical stays .com
    siteName: "TreasurePal",
    images: [
      {
        url: "/og/treasurepal-signup.jpg",
        width: 1200,
        height: 630,
        alt: "TreasurePal signup portal",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "TreasurePal | Sign up",
    description:
      "Join TreasurePal to explore treasures across Zimbabwe and worldwide. Students, families, and investors welcome.",
    images: ["/og/treasurepal-signup.jpg"],
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function SignupPage() {
  return (
    <main className="min-h-[60vh]">
      <h2 className="mb-6 text-center text-2xl font-semibold">
        Create an account
      </h2>
      <SignupForm redirectTo="/signin" />
    </main>
  );
}
