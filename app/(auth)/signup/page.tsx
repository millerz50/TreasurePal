import SignupForm from "@/components/auth/SignupForm";
import type { Metadata } from "next";
import Head from "next/head";

export const metadata: Metadata = {
  title: "TreasurePal | Create Your Account",
  description:
    "Join TreasurePal today to explore properties, agencies, and opportunities across Zimbabwe and worldwide. Sign up for free — students, families, and investors are all welcome.",
  // ✅ Use TreasureProps as the global base
  metadataBase: new URL("https://www.treasureprops.com"),
  alternates: {
    canonical: "https://www.treasureprops.com/signup",
    languages: {
      // Global English
      en: "https://www.treasureprops.com/en/signup",
      // Zimbabwe-specific English
      "en-zw": "https://treasurepal.co.zw/en/signup",
      // Shona
      sn: "https://www.treasureprops.com/sn/signup",
      "sn-zw": "https://treasurepal.co.zw/sn/signup",
      // Ndebele
      nd: "https://www.treasureprops.com/nd/signup",
      "nd-zw": "https://treasurepal.co.zw/nd/signup",
      // Global fallback
      "x-default": "https://www.treasureprops.com/signup",
    },
  },
  openGraph: {
    title: "TreasurePal | Sign up",
    description:
      "Create your TreasurePal account to access treasures for every income level — from student housing to premium estates.",
    url: "https://www.treasureprops.com/signup",
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
    index: false, // ✅ prevent indexing of signup page
    follow: true,
  },
};

export default function SignupPage() {
  // ✅ Structured Data JSON-LD for Signup page
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "TreasurePal Signup",
    url: "https://www.treasureprops.com/signup",
    description:
      "Signup portal for TreasurePal users to create accounts and access dashboards.",
    inLanguage: ["en", "sn", "nd"],
    isPartOf: {
      "@type": "WebSite",
      name: "TreasureProps",
      url: "https://www.treasureprops.com/",
    },
  };

  return (
    <>
      <Head>
        {/* Inject structured data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>
      <main className="min-h-[60vh]">
        <h2 className="mb-6 text-center text-2xl font-semibold">
          Create an account
        </h2>
        <SignupForm redirectTo="/signin" />
      </main>
    </>
  );
}
