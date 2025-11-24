// app/privacy/page.tsx
import { SITE_NAME } from "@/lib/site";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Privacy Policy • ${SITE_NAME}`,
  description: `How ${SITE_NAME} collects, uses, and protects your data.`,
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-base-200 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-lg p-6 shadow-sm">
        <h1 className="text-2xl font-extrabold text-gray-900 dark:text-slate-100">
          Privacy Policy
        </h1>
        <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">
          We respect your privacy. This page explains what data we collect and
          how we use it.
        </p>

        <section className="mt-6 space-y-4 text-sm text-slate-700 dark:text-slate-200">
          <div>
            <h2 className="font-semibold">Data we collect</h2>
            <p className="mt-1">
              Contact info, listing details, analytics and cookies for site
              functionality.
            </p>
          </div>

          <div>
            <h2 className="font-semibold">How we use data</h2>
            <p className="mt-1">
              To provide services, communicate, and improve the product.
            </p>
          </div>

          <div>
            <h2 className="font-semibold">Your choices</h2>
            <p className="mt-1">
              You can request deletion, opt out of marketing, and manage
              cookies.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
