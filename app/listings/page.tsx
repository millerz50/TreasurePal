import { SITE_NAME, SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: `Listings • ${SITE_NAME}`,
  description:
    "Browse property listings across Zimbabwe. Filter by location, price, and type.",
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: `${SITE_URL}/listings`,
    languages: {
      // Global English
      en: `${SITE_URL}/en/listings`,
      // Zimbabwe-specific English
      "en-zw": "https://treasurepal.co.zw/en/listings",
      // Shona
      sn: `${SITE_URL}/sn/listings`,
      "sn-zw": "https://treasurepal.co.zw/sn/listings",
      // Ndebele
      nd: `${SITE_URL}/nd/listings`,
      "nd-zw": "https://treasurepal.co.zw/nd/listings`,
    },
  },
  openGraph: {
    title: `Listings • ${SITE_NAME}`,
    description:
      "Find rooms, houses, commercial spaces, and more across Zimbabwe. Filter by location, price, and type.",
    url: `${SITE_URL}/listings`,
    siteName: SITE_NAME,
    images: [
      {
        url: "/og/listings.jpg", // place a branded OG image in /public/og/
        width: 1200,
        height: 630,
        alt: "Property listings in Zimbabwe",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Listings • ${SITE_NAME}`,
    description:
      "Browse property listings across Zimbabwe. Rooms, houses, and commercial spaces available.",
    images: ["/og/listings.jpg"],
  },
};

type RawRecord = Record<string, unknown>;

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

function toString(v: unknown) {
  return typeof v === "string" ? v : v == null ? "" : String(v);
}
function toNumberOrUndefined(v: unknown) {
  return typeof v === "number"
    ? v
    : typeof v === "string" && v.trim() !== "" && !Number.isNaN(Number(v))
    ? Number(v)
    : undefined;
}
function parseProperty(raw: RawRecord): Property {
  return {
    id: toString(
      raw.id ?? raw._id ?? raw.slug ?? Math.random().toString(36).slice(2)
    ),
    title: toString(raw.title ?? raw.name ?? "Untitled property"),
    location: toString(raw.location ?? raw.city ?? "Unknown"),
    price: raw.price
      ? toString(raw.price)
      : toString(raw.displayPrice ?? "Contact for price"),
    beds: toNumberOrUndefined(raw.beds ?? raw.bedrooms),
    baths: toNumberOrUndefined(raw.baths ?? raw.bathrooms),
    image: raw.image
      ? toString(raw.image)
      : raw.photo
      ? toString(raw.photo)
      : null,
    slug: raw.slug ? toString(raw.slug) : raw.id ? toString(raw.id) : undefined,
    summary: toString(raw.summary ?? raw.description ?? ""),
  };
}

async function fetchListings(): Promise<Property[]> {
  try {
    const res = await fetch(
      "https://treasurepal-backened.onrender.com/api/properties/all",
      { next: { revalidate: 60 } }
    );
    if (!res.ok) {
      console.error("Listings API error", res.status);
      return [];
    }
    const data = await res.json();
    if (!Array.isArray(data)) return [];
    return data.map((item: RawRecord) => parseProperty(item));
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
            Find rooms, houses, commercial spaces and more.
          </p>
        </header>

        {listings.length === 0 ? (
          <section className="grid gap-6">
            {/* ... your "No listings yet" section unchanged ... */}
          </section>
        ) : (
          <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {listings.map((p) => (
              <article
                key={p.id}
                className="rounded-lg bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 overflow-hidden shadow-sm"
              >
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
                      href={p.slug ? `/listings/${p.slug}` : `/listings/${p.id}`}
                      className="text-sm text-blue-600 dark:text-blue-400 underline"
                    >
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

