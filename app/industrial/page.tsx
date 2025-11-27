import {
  baseAlternates,
  defaultOpenGraph,
  defaultTwitter,
} from "@/app/seo/seoConfig";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: `Industrial & Commercial listings • ${SITE_NAME}`,
  description: `Warehouses, factories, offices and commercial spaces across Zimbabwe.`,
  metadataBase: new URL(SITE_URL),
  alternates: {
    ...baseAlternates,
    canonical: `${SITE_URL}/industrial`,
    languages: {
      en: `${SITE_URL}/en/industrial`,
      "en-zw": "https://treasurepal.co.zw/en/industrial",
      sn: `${SITE_URL}/sn/industrial`,
      "sn-zw": "https://treasurepal.co.zw/sn/industrial",
      nd: `${SITE_URL}/nd/industrial`,
      "nd-zw": "https://treasurepal.co.zw/nd/industrial", // 👈 fixed closing quote
    },
  },

  openGraph: {
    ...defaultOpenGraph,
    title: `Industrial & Commercial listings • ${SITE_NAME}`,
    description:
      "Explore warehouses, factories, offices, and commercial spaces available for businesses across Zimbabwe.",
    url: `${SITE_URL}/industrial`,
    images: [
      {
        url: "/og/industrial.jpg",
        width: 1200,
        height: 630,
        alt: "Industrial and commercial properties in Zimbabwe",
      },
    ],
  },
  twitter: {
    ...defaultTwitter,
    title: `Industrial & Commercial listings • ${SITE_NAME}`,
    description:
      "Warehouses, factories, offices, and commercial spaces for businesses across Zimbabwe.",
    images: ["/og/industrial.jpg"],
  },
};

type RawRecord = Record<string, unknown>;

type Property = {
  id: string;
  title: string;
  location?: string;
  price?: string;
  size?: string | number | undefined;
  image?: string | null;
  slug?: string;
  summary?: string;
};

function toString(v: unknown): string {
  return typeof v === "string" ? v : v == null ? "" : String(v);
}

function toStringOrNumber(v: unknown): string | number | undefined {
  if (typeof v === "number") return v;
  if (typeof v === "string") {
    const trimmed = v.trim();
    if (trimmed === "") return undefined;
    if (!Number.isNaN(Number(trimmed))) return Number(trimmed);
    return trimmed;
  }
  return undefined;
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
    size: toStringOrNumber(raw.size ?? raw.area ?? undefined),
    image: raw.image
      ? toString(raw.image)
      : raw.photo
      ? toString(raw.photo)
      : null,
    slug: raw.slug ? toString(raw.slug) : raw.id ? toString(raw.id) : undefined,
    summary: toString(raw.summary ?? raw.description ?? ""),
  };
}

async function fetchByType(typePath: string): Promise<Property[]> {
  try {
    const url = `https://treasurepal-backened.onrender.com/api/properties/${typePath}`;
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) {
      console.error("API error", res.status, url);
      return [];
    }
    const data = await res.json();
    if (!Array.isArray(data)) return [];
    return data.map((p: RawRecord) => parseProperty(p));
  } catch (err) {
    console.error("Fetch failed:", err);
    return [];
  }
}

export default async function IndustrialPage() {
  const listings = await fetchByType("industrial");

  return (
    <main className="min-h-screen bg-base-200 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-6">
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-slate-100">
            Industrial & Commercial
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
            Warehouses, factories, offices and commercial spaces for businesses.
          </p>
        </header>

        {listings.length === 0 ? (
          <section className="rounded-lg bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 p-6 shadow-sm text-center">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              No industrial listings
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 max-w-prose mx-auto">
              No industrial or commercial spaces listed right now. List your
              property to reach businesses and investors.
            </p>

            <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/sell/new"
                className="inline-flex items-center px-5 py-3 rounded-full bg-gradient-to-r from-[#2ECC71] to-[#1E90FF] text-white font-semibold shadow-sm">
                List commercial space
              </Link>
              <Link
                href="/support"
                className="inline-flex items-center px-5 py-3 rounded-full border border-gray-200 dark:border-slate-700 text-sm">
                Need help listing?
              </Link>
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

                  {p.size ? (
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                      Size: {p.size}
                    </p>
                  ) : null}
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
                      {p.size ?? "-"}
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
