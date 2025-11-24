// app/terms/page.tsx
import { SITE_NAME } from "@/lib/site";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Terms of Service • ${SITE_NAME}`,
  description: `Terms of service for ${SITE_NAME}. Please read before using our platform.`,
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-base-200 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-lg p-6 shadow-sm">
        <h1 className="text-2xl font-extrabold text-gray-900 dark:text-slate-100">
          Terms of Service
        </h1>
        <p className="mt-4 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          These terms govern your use of {SITE_NAME}. By using our services you
          agree to these terms.
        </p>

        <section className="mt-6 space-y-4 text-sm text-slate-700 dark:text-slate-200">
          <div>
            <h2 className="font-semibold">1. Using the service</h2>
            <p className="mt-1">
              You must follow local laws and our policies when using the
              platform.
            </p>
          </div>

          <div>
            <h2 className="font-semibold">2. Content and listings</h2>
            <p className="mt-1">
              You are responsible for the accuracy of listings you post.
            </p>
          </div>

          <div>
            <h2 className="font-semibold">3. Liability</h2>
            <p className="mt-1">
              We provide the platform as-is. See full terms for details.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
