"use client";

import { account } from "@/lib/appwrite"; // Your Appwrite SDK instance
import type { Metadata } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";

import { SITE_NAME, SITE_URL } from "@/lib/site";
import { baseAlternates, defaultOpenGraph, defaultTwitter } from "@/app/seo/seoConfig";

export const metadata: Metadata = {
  title: `Lodges & Hotels • ${SITE_NAME}`,
  description:
    "Short-term stays, lodges and hotels across Zimbabwe. Find comfortable stays for travel and business.",
  metadataBase: new URL(SITE_URL),
  alternates: {
    ...baseAlternates,
    canonical: `${SITE_URL}/lodges`,
  },
  openGraph: {
    ...defaultOpenGraph,
    title: `Lodges & Hotels • ${SITE_NAME}`,
    description:
      "Browse short-term stays, lodges, and hotels across Zimbabwe. Comfortable options for travel, events, and business.",
    url: `${SITE_URL}/lodges`,
    images: [
      {
        url: "/og/lodges.jpg",
        width: 1200,
        height: 630,
        alt: "Lodges and hotels in Zimbabwe",
      },
    ],
  },
  twitter: {
    ...defaultTwitter,
    title: `Lodges & Hotels • ${SITE_NAME}`,
    description:
      "Find lodges and hotels for short-term stays, travel, and business across Zimbabwe.",
    images: ["/og/lodges.jpg"],
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
    image: raw.frontElevation ?? raw.image ?? raw.photo ? toString(raw.frontElevation ?? raw.image ?? raw.photo) : null,
    slug: raw.slug ? toString(raw.slug) : raw.$id ? toString(raw.$id) : undefined,
    summary: toString(raw.summary ?? raw.description ?? ""),
  };
}

export default function LodgesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);

        // 1️⃣ Get fresh JWT
        const jwtResponse = await account.createJWT();

        // 2️⃣ Construct API URL
        const API_VERSION = (process.env.NEXT_PUBLIC_API_VERSION || "v2").trim();
        const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URLV2 ?? "").replace(/\/+$/, "");
        const url = `${API_BASE_URL}/api/${API_VERSION}/properties/lodges`;

        // 3️⃣ Fetch properties
        const res = await fetch(url, {
          headers: {
            Authorization: `Bearer ${jwtResponse.jwt}`,
          },
        });

        if (!res.ok) {
          console.error("Failed to fetch lodges", res.status);
          setProperties([]);
          return;
        }

        const data: any[] = await res.json();

        // 4️⃣ Map API response to Property type
        const mapped: Property[] = data.map((raw) => parseProperty(raw));
        setProperties(mapped);
      } catch (err) {
        console.error("Error fetching lodges:", err);
        setProperties([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  return (
    <main className="min-h-screen bg-base-200 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <header className="mb-6">
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-slate-100">
            Lodges & Hotels
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
            Short-term stays and lodges for travel, events and business.
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
          // NO LISTINGS
          <section className="rounded-lg bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 p-6 shadow-sm text-center">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              No lodges or hotels found
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 max-w-prose mx-auto">
              No short-term stays listed right now. Hoteliers and lodge owners can list to reach travelers.
            </p>

            <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/sell/new"
                className="inline-flex items-center px-5 py-3 rounded-full bg-gradient-to-r from-[#2ECC71] to-[#1E90FF] text-white font-semibold shadow-sm"
              >
                List your lodge or hotel
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
          // PROPERTY GRID
          <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {properties.map((p) => (
              <article
                key={p.id}
                className="rounded-lg bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
              >
                <div className="h-40 bg-gray-100 dark:bg-slate-700 relative">
                  {p.image ? (
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

                  {p.summary && (
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 line-clamp-2">
                      {p.summary}
                    </p>
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
  );
}

