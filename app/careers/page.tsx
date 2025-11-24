// app/careers/page.tsx
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Careers at ${SITE_NAME}`,
  description: `Join ${SITE_NAME}. See open roles, benefits, and how we hire locally in Zimbabwe.`,
  openGraph: { title: `Careers • ${SITE_NAME}`, url: `${SITE_URL}/careers` },
};

export default function CareersPage() {
  return (
    <main className="min-h-screen bg-base-200 text-base-content py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <header className="text-center">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-slate-100">
            Careers
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">
            Build with us. We hire for product, engineering, operations and
            local field roles across Zimbabwe.
          </p>
        </header>

        <section className="grid gap-4">
          <div className="rounded-lg bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 p-4 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
              Why work at {SITE_NAME}
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
              <li>Competitive local compensation and commission plans</li>
              <li>Remote-friendly roles and local hubs in Harare</li>
              <li>Learning budget and mentorship</li>
            </ul>
          </div>

          <div className="rounded-lg bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 p-4 shadow-sm">
            <h3 className="font-semibold text-slate-800 dark:text-slate-100">
              Open roles
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">
              We update openings frequently. If you don’t see a match, send a
              short note to{" "}
              <a
                href="mailto:careers@treasurepal.example"
                className="underline text-blue-600 dark:text-blue-400">
                careers@treasurepal.example
              </a>
              .
            </p>

            <div className="mt-4 grid gap-3">
              <article className="p-3 rounded-md border border-dashed border-gray-200 dark:border-slate-700">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium">Field Agent — Harare</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Full time · Onsite
                    </p>
                  </div>
                  <a
                    href="/careers/field-agent"
                    className="text-sm text-blue-600 dark:text-blue-400 underline">
                    View
                  </a>
                </div>
              </article>

              <article className="p-3 rounded-md border border-dashed border-gray-200 dark:border-slate-700">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium">Frontend Engineer</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Remote · Hybrid
                    </p>
                  </div>
                  <a
                    href="/careers/frontend-engineer"
                    className="text-sm text-blue-600 dark:text-blue-400 underline">
                    View
                  </a>
                </div>
              </article>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
