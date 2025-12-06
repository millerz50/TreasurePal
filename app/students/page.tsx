import { SITE_NAME, SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import Image from "next/image"; // ✅ Use Next.js Image
import Link from "next/link";

import {
  baseAlternates,
  defaultOpenGraph,
  defaultTwitter,
} from "@/app/seo/seoConfig";

export const metadata: Metadata = {
  title: `Student Housing • ${SITE_NAME}`,
  description: `Student rooms and shared housing across Zimbabwe. Find affordable student accommodation.`,
  metadataBase: new URL(SITE_URL),
  alternates: {
    ...baseAlternates,
    canonical: `${SITE_URL}/students`,
  },
  openGraph: {
    ...defaultOpenGraph,
    title: `Student Housing • ${SITE_NAME}`,
    description:
      "Affordable student rooms and shared housing across Zimbabwe. Find accommodation near universities and colleges.",
    url: `${SITE_URL}/students`,
    images: [
      {
        url: "/og/students.jpg",
        width: 1200,
        height: 630,
        alt: "Student housing in Zimbabwe",
      },
    ],
  },
  twitter: {
    ...defaultTwitter,
    title: `Student Housing • ${SITE_NAME}`,
    description:
      "Find affordable student accommodation across Zimbabwe. Rooms, shared housing, and near-campus stays.",
    images: ["/og/students.jpg"],
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

function toString(v: unknown): string {
  return typeof v === "string" ? v : v == null ? "" : String(v);
}

function toNumberOrUndefined(v: unknown): number | undefined {
  if (typeof v === "number") return v;
  if (typeof v === "string" && v.trim() !== "" && !Number.isNaN(Number(v))) {
    return Number(v);
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

async function fetchByType(typePath: string): Promise<Property[]> {
  try {
    const API_BASE = process.env.NEXT_PUBLIC_API_URL;
    const url = `${API_BASE}/api/properties/${typePath}`;
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) {
      console.error("API error:", res.status, url);
      return [];
    }
    const data = await res.json();
    if (!Array.isArray(data)) return [];
    return data.map((p) => parseProperty(p as RawRecord));
  } catch (err) {
    console.error("Fetch failed:", err);
    return [];
  }
}

// ✅ Just export async function, not React.FC
export default async function StudentsPage() {
  const listings = await fetchByType("students");

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `Student Housing • ${SITE_NAME}`,
    url: `${SITE_URL}/students`,
    description: `Affordable student rooms and shared housing across Zimbabwe.`,
    hasPart: listings.map((p) => ({
      "@type": "Accommodation",
      name: p.title,
      description: p.summary,
      address: {
        "@type": "PostalAddress",
        addressLocality: p.location,
        addressCountry: "ZW",
      },
      offers: {
        "@type": "Offer",
        price: p.price,
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        url: p.slug
          ? `${SITE_URL}/listings/${p.slug}`
          : `${SITE_URL}/listings/${p.id}`,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <main className="min-h-screen bg-base-200 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <header className="mb-6">
            <h1 className="text-2xl font-extrabold text-gray-900 dark:text-slate-100">
              Student Housing
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
              Affordable rooms and shared housing for students across Zimbabwe.
            </p>
          </header>

          {listings.length === 0 ? (
            <section className="rounded-lg bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 p-6 shadow-sm text-center">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                No student listings
              </h2>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 max-w-prose mx-auto">
                No student accommodations found right now. Landlords and agents
                can list rooms quickly to reach students.
              </p>

              <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href="/sell/new"
                  className="inline-flex items-center px-5 py-3 rounded-full bg-gradient-to-r from-[#2ECC71] to-[#1E90FF] text-white font-semibold shadow-sm">
                  List a student room
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
    </>
  );
}
