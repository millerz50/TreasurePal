"use client";

import { useEffect, useState } from "react";
import { account } from "@/lib/appwrite";
import Image from "next/image";
import Link from "next/link";
import { SITE_URL, SITE_NAME } from "@/lib/site";

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
  return typeof v === "string" ? v : v === null ? "" : String(v);
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
    id: toString(raw.$id ?? raw.id ?? raw.slug ?? Math.random().toString(36).slice(2)),
    title: toString(raw.title ?? raw.name ?? "Untitled property"),
    location: toString(raw.location ?? raw.city ?? "Unknown"),
    price: toString(raw.price ?? raw.displayPrice ?? "Contact for price"),
    beds: toNumberOrUndefined(raw.beds ?? raw.bedrooms),
    baths: toNumberOrUndefined(raw.baths ?? raw.bathrooms),
    image:
      raw.frontElevation ?? raw.image ?? raw.photo
        ? toString(raw.frontElevation ?? raw.image ?? raw.photo)
        : null,
    slug: raw.slug ? toString(raw.slug) : raw.$id ? toString(raw.$id) : undefined,
    summary: toString(raw.summary ?? raw.description ?? ""),
  };
}

export default function SalePageClient() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        setLoading(true);

        // 1️⃣ Get fresh JWT
        const jwtResponse = await account.createJWT();

        // 2️⃣ Construct API URL
        const API_VERSION = (process.env.NEXT_PUBLIC_API_VERSION || "v2").trim();
        const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URLV2 ?? "").replace(/\/+$/, "");
        const url = `${API_BASE_URL}/api/${API_VERSION}/properties/sale`;

        // 3️⃣ Fetch properties
        const res = await fetch(url, {
          headers: { Authorization: `Bearer ${jwtResponse.jwt}` },
        });

        if (!res.ok) {
          console.error("Failed to fetch sales:", res.status);
          setProperties([]);
          return;
        }

        const data: any[] = await res.json();
        setProperties(data.map((raw) => parseProperty(raw)));
      } catch (err) {
        console.error("Error fetching sales:", err);
        setProperties([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSales();
  }, []);

  // Optional: JSON-LD structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `Properties for Sale • ${SITE_NAME}`,
    url: `${SITE_URL}/sale`,
    description: "Browse houses, stands, and commercial plots for sale across Zimbabwe.",
    hasPart: properties.map((p) => ({
      "@type": "Product",
      name: p.title,
      description: p.summary,
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
          {/* HEADER */}
          <header className="mb-6">
            <h1 className="text-2xl font-extrabold text-gray-900 dark:text-slate-100">
              For Sale
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
              Properties for sale across Zimbabwe — houses, stands and commercial plots.
            </p>
          </header>

          {/* LOADING */}
          {loading ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-64 bg-gray-100 dark:bg-slate-700 animate-pulse rounded-lg"
                />
              ))}
            </div>
          ) : properties.length === 0 ? (
            <section className="rounded-lg bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 p-6 shadow-sm text-center">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                No properties for sale yet
              </h2>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 max-w-prose mx-auto">
                We don't have sale listings right now. Be the first to list and reach local buyers.
              </p>
              <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href="/sell/new"
                  className="inline-flex items-center px-5 py-3 rounded-full bg-gradient-to-r from-[#2ECC71] to-[#1E90FF] text-white font-semibold shadow-sm"
                >
                  List your property for sale
                </Link>
                <Link
                  href="/support"
                  className="inline-flex items-center px-5 py-3 rounded-full border border-gray-200 dark:border-slate-700 text-sm"
                >
                  Need help listing?
                </Link>
              </div>
            </section>
          ) : (
            <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {properties.map((p) => (
                <article
                  key={p.id}
                  className="rounded-lg bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="h-40 bg-gray-100 dark:bg-slate-700 relative">
                    {p.image ? (
                      <Image
                        src={p.image}
                        alt={p.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-sm text-slate-500">
                        No photo
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-slate-900 dark:text-slate-100 truncate">{p.title}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                      {p.location} • {p.price}
                    </p>
                    {p.summary && (
                      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 line-clamp-2">{p.summary}</p>
                    )}
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
    </>
  );
}
