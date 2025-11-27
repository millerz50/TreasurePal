import { SITE_NAME, SITE_URL } from "@/lib/site";
import type { Metadata } from "next";

import {
  baseAlternates,
  defaultOpenGraph,
  defaultTwitter,
} from "@/app/seo/seoConfig";

export const metadata: Metadata = {
  title: `Privacy Policy • ${SITE_NAME}`,
  description: `Learn how ${SITE_NAME} collects, uses, and protects your data. Transparent practices for users in Zimbabwe and worldwide.`,
  metadataBase: new URL(SITE_URL),
  alternates: {
    ...baseAlternates,
    canonical: `${SITE_URL}/privacy`, // 👈 should point to /privacy
  },
  openGraph: {
    ...defaultOpenGraph,
    title: `Privacy Policy • ${SITE_NAME}`,
    description: `How ${SITE_NAME} collects, uses, and protects your data. Transparent practices for all users.`,
    url: `${SITE_URL}/privacy`,
    images: [
      {
        url: "/og/privacy.jpg",
        width: 1200,
        height: 630,
        alt: "Privacy Policy",
      },
    ],
  },
  twitter: {
    ...defaultTwitter,
    title: `Privacy Policy • ${SITE_NAME}`,
    description: `Learn how ${SITE_NAME} collects, uses, and protects your data.`,
    images: ["/og/privacy.jpg"],
  },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-base-200 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-lg p-6 shadow-sm">
        <h1 className="text-2xl font-extrabold text-gray-900 dark:text-slate-100">
          Privacy Policy
        </h1>
        <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">
          We respect your privacy. This page explains what data we collect, how
          we use it, and the choices you have.
        </p>

        <section className="mt-6 space-y-6 text-sm text-slate-700 dark:text-slate-200">
          <div>
            <h2 className="font-semibold">Data we collect</h2>
            <p className="mt-1">
              We collect contact information, property listing details,
              analytics data, and cookies to ensure site functionality and
              improve user experience.
            </p>
          </div>

          <div>
            <h2 className="font-semibold">How we use data</h2>
            <p className="mt-1">
              Your data helps us provide services, communicate with you,
              personalize experiences, and improve TreasurePal. We never sell
              personal data to third parties.
            </p>
          </div>

          <div>
            <h2 className="font-semibold">Security</h2>
            <p className="mt-1">
              We use encryption, secure servers, and regular audits to protect
              your information. Access is restricted to authorized personnel
              only.
            </p>
          </div>

          <div>
            <h2 className="font-semibold">Your choices</h2>
            <p className="mt-1">
              You can request deletion of your data, opt out of marketing
              communications, and manage cookies through your browser settings.
            </p>
          </div>

          <div>
            <h2 className="font-semibold">Children’s privacy</h2>
            <p className="mt-1">
              TreasurePal does not knowingly collect data from children under
              13. If you believe a child has provided us information, please
              contact us to remove it.
            </p>
          </div>

          <div>
            <h2 className="font-semibold">International compliance</h2>
            <p className="mt-1">
              We follow global privacy standards including GDPR and CCPA. Users
              in Zimbabwe and worldwide have rights to access, correct, and
              delete their data.
            </p>
          </div>

          <div>
            <h2 className="font-semibold">Contact us</h2>
            <p className="mt-1">
              For privacy inquiries, email{" "}
              <a
                href="mailto:privacy@treasurepal.example"
                className="underline text-blue-600 dark:text-blue-400">
                privacy@treasurepal.example
              </a>
              .
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
