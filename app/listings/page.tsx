// app/listings/page.tsx
import { SITE_NAME } from "@/lib/site";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: `Listings • ${SITE_NAME}`,
  description:
    "Browse property listings across Zimbabwe. Filter by location, price, and type.",
};

type Property = {
  id: string;
  title: string;
  location?: string;
  price?: string;
  beds?: number;
  baths?: number;
  image?: string | null;
  slug?: string;
  summary?: string;
};

async function fetchListings(): Promise<Property[]> {
  try {
    const res = await fetch(
      "https://treasurepal-backened.onrender.com/api/properties/all",
      {
        // server-side fetch with ISR; adjust revalidate as needed
        next: { revalidate: 60 },
      }
    );
    if (!res.ok) {
      console.error("Listings API error", res.status);
      return [];
    }
    const data = await res.json();
    if (!Array.isArray(data)) return [];
    return data.map((p: any) => ({
      id: String(
        p.id ?? p._id ?? p.slug ?? Math.random().toString(36).slice(2)
      ),
      title: p.title ?? p.name ?? "Untitled property",
      location: p.location ?? p.city ?? "Unknown",
      price: p.price ? String(p.price) : p.displayPrice ?? "Contact for price",
      beds: p.beds ?? p.bedrooms ?? undefined,
      baths: p.baths ?? p.bathrooms ?? undefined,
      image: p.image ?? p.photo ?? null,
      slug: p.slug ?? p.id ?? undefined,
      summary: p.summary ?? p.description ?? "",
    }));
  } catch (err) {
    console.error("Failed to fetch listings:", err);
    return [];
  }
}

export default async function ListingsPage() {
  const listings = await fetchListings();

  return (
    <main className="min-h-screen bg-base-200 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-6">
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-slate-100">
            Listings
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
            Find rooms, houses, commercial spaces and more across Zimbabwe.
          </p>
        </header>

        {listings.length === 0 ? (
          <section className="grid gap-6">
            <div className="rounded-lg bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 p-6 shadow-sm text-center">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                No listings yet
              </h2>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 max-w-prose mx-auto">
                We don't have any active listings right now. Be the first to
                list a property and reach thousands of local buyers and renters.
              </p>

              <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href="/sell/new"
                  className="inline-flex items-center justify-center px-5 py-3 rounded-full bg-gradient-to-r from-[#2ECC71] to-[#1E90FF] text-white font-semibold shadow-sm">
                  List your property
                </Link>

                <Link
                  href="/sell/agent"
                  className="inline-flex items-center justify-center px-5 py-3 rounded-full border border-gray-200 dark:border-slate-700 text-sm">
                  Work with an agent
                </Link>
              </div>

              <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
                Tip: include clear photos, accurate location, and a competitive
                price to get faster responses.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {/* Example starter cards to inspire uploads */}
              {[
                {
                  title: "Room for rent",
                  price: "ZWL 10,000",
                  meta: "Harare • 1 bed",
                },
                {
                  title: "Family house",
                  price: "ZWL 120,000",
                  meta: "Bulawayo • 3 beds",
                },
                {
                  title: "Commercial space",
                  price: "Contact for price",
                  meta: "Mutare • 200m²",
                },
              ].map((s, i) => (
                <article
                  key={i}
                  className="rounded-lg bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 overflow-hidden shadow-sm">
                  <div className="h-36 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center text-sm text-slate-500">
                    Add photos to stand out
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                      {s.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                      {s.meta}
                    </p>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-sm text-blue-600 dark:text-blue-400 underline">
                        How to list
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        {s.price}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ) : (
          <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {listings.map((p) => (
              <article
                key={p.id}
                className="rounded-lg bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 overflow-hidden shadow-sm">
                <div className="h-40 bg-gray-100 dark:bg-slate-700 relative">
                  {p.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={p.image}
                      alt={p.title}
                      className="object-cover w-full h-full"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-sm text-slate-500">
                      No photo
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100 truncate">
                    {p.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                    {p.location} • {p.price}
                  </p>

                  {p.summary ? (
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 line-clamp-2">
                      {p.summary}
                    </p>
                  ) : null}

                  <div className="mt-3 flex items-center justify-between">
                    <Link
                      href={
                        p.slug ? `/listings/${p.slug}` : `/listings/${p.id}`
                      }
                      className="text-sm text-blue-600 dark:text-blue-400 underline">
                      View
                    </Link>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {p.beds ?? "-"} beds • {p.baths ?? "-"} baths
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </section>
        )}
      </div>
    </main>
  );
}
