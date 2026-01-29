"use client";

import { useEffect, useState } from "react";
import { account } from "@/lib/appwrite";
import Link from "next/link";

export type RawRecord = Record<string, unknown>;
export type Property = {
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

const toString = (v: unknown, fallback = "") =>
  typeof v === "string" && v.trim() !== "" ? v : fallback;
const toNumber = (v: unknown) =>
  typeof v === "number" ? v : !Number.isNaN(Number(v)) ? Number(v) : undefined;
const parseProperty = (raw: RawRecord): Property => ({
  id: toString(raw.$id ?? raw.id ?? raw.slug, Math.random().toString(36)),
  title: toString(raw.title ?? raw.name, "Untitled property"),
  location: toString(raw.location ?? raw.city, "Zimbabwe"),
  price: toString(raw.price ?? raw.displayPrice, "Contact for price"),
  beds: toNumber(raw.beds ?? raw.bedrooms),
  baths: toNumber(raw.baths ?? raw.bathrooms),
  image:
    (raw.frontElevation ?? raw.image ?? raw.photo)
      ? toString(raw.frontElevation ?? raw.image ?? raw.photo)
      : null,
  slug: raw.slug ? toString(raw.slug) : raw.$id ? toString(raw.$id) : undefined,
  summary: toString(raw.summary ?? raw.description ?? ""),
});

export default function PropertyPageClient({ slug }: { slug: string }) {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const jwt = await account.createJWT();
        const API_VERSION = (
          process.env.NEXT_PUBLIC_API_VERSION || "v2"
        ).trim();
        const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URLV2 ?? "").replace(
          /\/+$/,
          "",
        );
        const res = await fetch(
          `${API_BASE_URL}/api/${API_VERSION}/properties/${slug.toLowerCase()}`,
          { headers: { Authorization: `Bearer ${jwt.jwt}` } },
        );
        if (!res.ok) {
          setProperties([]);
          return;
        }
        const data: any[] = await res.json();
        setProperties(data.map(parseProperty));
      } catch (err) {
        setProperties([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, [slug]);

  return (
    <main className="min-h-screen bg-base-200 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-6">
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-slate-100">
            {slug.replace(/([A-Z])/g, " $1").trim()}
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
            Browse {slug.replace(/([A-Z])/g, " $1").toLowerCase()} across
            Zimbabwe.
          </p>
        </header>

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
              No {slug} found
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 max-w-prose mx-auto">
              No {slug} listed right now. Owners can add their property.
            </p>
            <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/sell/new"
                className="inline-flex items-center px-5 py-3 rounded-full bg-gradient-to-r from-[#2ECC71] to-[#1E90FF] text-white font-semibold shadow-sm"
              >
                List property
              </Link>
              <Link
                href="/support"
                className="inline-flex items-center px-5 py-3 rounded-full border border-gray-200 dark:border-slate-700 text-sm"
              >
                Need help?
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
                      href={
                        p.slug ? `/listings/${p.slug}` : `/listings/${p.id}`
                      }
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
