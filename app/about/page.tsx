import { SITE_NAME, SITE_URL } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `About ${SITE_NAME}`,
  description: `${SITE_NAME} connects local businesses, students, and customers across Zimbabwe with modern, transparent property tools.`,
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: `${SITE_URL}/about`,
    languages: {
      en: `${SITE_URL}/en/about`,
      "en-zw": "https://treasurepal.co.zw/en/about",
      sn: `${SITE_URL}/sn/about`,
      "sn-zw": "https://treasurepal.co.zw/sn/about",
    },
  },
  openGraph: {
    title: `About ${SITE_NAME}`,
    description: `${SITE_NAME} empowers agents, students, families, and investors with fair property discovery across Zimbabwe.`,
    url: `${SITE_URL}/about`,
    siteName: SITE_NAME,
    images: [
      {
        url: "/og/about.jpg", // place a branded OG image in /public/og/
        width: 1200,
        height: 630,
        alt: "About TreasurePal",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `About ${SITE_NAME}`,
    description:
      "Learn about TreasurePal’s mission, values, and founder Johannes Zemba — building modern property tools for Zimbabwe and beyond.",
    images: ["/og/about.jpg"],
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-base-200 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <header className="text-center">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-slate-100">
            About {SITE_NAME}
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">
            Our mission is to empower local businesses and make property
            discovery simple, fair, and accessible to all income levels —
            students, families, and investors alike.
          </p>
        </header>

        <section className="grid gap-4">
          <div className="rounded-lg bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 p-6 shadow-sm">
            <h2 className="font-semibold">Our story</h2>
            <p className="mt-2 text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
              Founded locally, TreasurePal focuses on building tools for agents
              and customers to transact with trust. We believe property
              discovery should be transparent, inclusive, and efficient —
              whether you’re a student looking for affordable housing or a
              family seeking a forever home.
            </p>
          </div>

          <div className="rounded-lg bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 p-6 shadow-sm">
            <h2 className="font-semibold">Values</h2>
            <ul className="mt-2 text-sm text-slate-700 dark:text-slate-200 space-y-2">
              <li>
                <strong>Local first</strong> — we prioritize local agents and
                businesses.
              </li>
              <li>
                <strong>Transparent</strong> — clear fees and honest listings.
              </li>
              <li>
                <strong>Practical</strong> — simple tools that work on low
                bandwidth and mobile devices.
              </li>
              <li>
                <strong>Inclusive</strong> — solutions for every income level,
                from students to investors.
              </li>
            </ul>
          </div>

          <div className="rounded-lg bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 p-6 shadow-sm">
            <h2 className="font-semibold">Founder</h2>
            <p className="mt-2 text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
              TreasurePal was founded by <strong>Johannes Zemba</strong>, a
              visionary entrepreneur committed to modernizing Zimbabwe’s
              property market. His focus is on building inclusive digital tools
              that empower communities, support students, and connect local
              businesses with global opportunities.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
