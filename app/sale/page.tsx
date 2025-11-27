import { SITE_NAME, SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import {
  baseAlternates,
  defaultOpenGraph,
  defaultTwitter,
} from "@/app/seo/seoConfig";

export const metadata: Metadata = {
  title: `For Sale • ${SITE_NAME}`,
  description: `Properties for sale across Zimbabwe on ${SITE_NAME}. Find houses, stands and commercial plots.`,
  metadataBase: new URL(SITE_URL),
  alternates: {
    ...baseAlternates,
    canonical: `${SITE_URL}/sale`, // 👈 should point to /sale
  },
  openGraph: {
    ...defaultOpenGraph,
    title: `For Sale • ${SITE_NAME}`,
    description:
      "Browse houses, stands, and commercial plots for sale across Zimbabwe on TreasurePal.",
    url: `${SITE_URL}/sale`,
    images: [
      {
        url: "/og/sale.jpg",
        width: 1200,
        height: 630,
        alt: "Properties for sale in Zimbabwe",
      },
    ],
  },
  twitter: {
    ...defaultTwitter,
    title: `For Sale • ${SITE_NAME}`,
    description:
      "Find houses, stands, and commercial plots for sale across Zimbabwe.",
    images: ["/og/sale.jpg"],
  },
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

// ✅ Use unknown instead of any, then narrow
async function fetchByType(typePath: string): Promise<Property[]> {
  try {
    const url = `https://treasurepal-backened.onrender.com/api/properties/${typePath}`;
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) {
      console.error("API error", res.status, url);
      return [];
    }
    const data: unknown = await res.json();
    if (!Array.isArray(data)) return [];

    return data.map((raw) => {
      const p = raw as Record<string, unknown>;
      return {
        id: String(
          p.id ?? p._id ?? p.slug ?? Math.random().toString(36).slice(2)
        ),
        title: (p.title as string) ?? (p.name as string) ?? "Untitled property",
        location: (p.location as string) ?? (p.city as string) ?? "Unknown",
        price:
          p.price !== undefined
            ? String(p.price)
            : (p.displayPrice as string) ?? "Contact for price",
        beds: (p.beds as number) ?? (p.bedrooms as number) ?? undefined,
        baths: (p.baths as number) ?? (p.bathrooms as number) ?? undefined,
        image: (p.image as string) ?? (p.photo as string) ?? null,
        slug: (p.slug as string) ?? (p.id as string) ?? undefined,
        summary: (p.summary as string) ?? (p.description as string) ?? "",
      };
    });
  } catch (err) {
    console.error("Fetch failed:", err);
    return [];
  }
}

export default async function SalePage() {
  const listings = await fetchByType("sale");

  return (
    <main className="min-h-screen bg-base-200 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-6">
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-slate-100">
            For Sale
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
            Properties for sale across Zimbabwe — houses, stands and commercial
            plots.
          </p>
        </header>

        {listings.length === 0 ? (
          <section className="rounded-lg bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 p-6 shadow-sm text-center">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              No properties for sale yet
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 max-w-prose mx-auto">
              We don&apos;t have sale listings in this category right now. Be
              the first to list and reach local buyers.
            </p>

            <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/sell/new"
                className="inline-flex items-center px-5 py-3 rounded-full bg-gradient-to-r from-[#2ECC71] to-[#1E90FF] text-white font-semibold shadow-sm">
                List your property for sale
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
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw,
                             (max-width: 1200px) 50vw,
                             33vw"
                      priority={false}
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
