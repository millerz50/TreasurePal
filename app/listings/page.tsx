// app/listings/page.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Listings • TreasurePal",
  description:
    "Browse property listings across Zimbabwe. Filter by location, price, and type.",
};

export default function ListingsPage() {
  // Replace with real data fetching or client component
  return (
    <main className="min-h-screen bg-base-200 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-6">
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-slate-100">
            Listings
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
            Find rooms, houses, commercial spaces and more.
          </p>
        </header>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <article
              key={i}
              className="rounded-lg bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 overflow-hidden shadow-sm">
              <div className="h-40 bg-gray-100 dark:bg-slate-700" />
              <div className="p-4">
                <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                  Property {i + 1}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                  Harare • ZWL 50,000
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <a
                    href={`/listings/${i + 1}`}
                    className="text-sm text-blue-600 dark:text-blue-400 underline">
                    View
                  </a>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    3 beds • 2 baths
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
