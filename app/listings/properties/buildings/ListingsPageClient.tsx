// src/components/listings/ListingsPageClient.tsx
"use client";

import { useEffect, useState, useMemo } from "react";
import { account } from "@/lib/appwrite";
import Link from "next/link";
import { domainConfig } from "@/components/config/site_domains/domains";

type RawRecord = Record<string, unknown>;

export type Property = {
  id: string;
  title: string;
  location?: string;
  price?: string;
  rooms?: number;
  image?: string | null;
  slug?: string;
  description?: string;
};

type ListingsPageClientProps = {
  title?: string;
  subtitle?: string;
  endpoint: string;
  domain?: string; // optional domain override
};

const toString = (v: unknown, fallback = "") =>
  typeof v === "string" && v.trim() !== "" ? v : fallback;

const toNumber = (v: unknown) =>
  typeof v === "number" ? v : !Number.isNaN(Number(v)) ? Number(v) : undefined;

const parseProperty = (raw: RawRecord): Property => ({
  id: toString(raw.$id ?? raw.id),
  title: toString(raw.title, "Untitled property"),
  location: toString(raw.location ?? raw.country, "Zimbabwe"),
  price: raw.price != null ? String(raw.price) : "Contact for price",
  rooms: toNumber(raw.rooms),
  image: raw.frontElevation ? toString(raw.frontElevation) : null,
  slug: raw.$id ? toString(raw.$id) : undefined,
  description: toString(raw.description ?? ""),
});

export default function ListingsPageClient({
  title,
  subtitle,
  endpoint,
  domain,
}: ListingsPageClientProps) {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  // Determine domain-specific config
  const currentDomain =
    domainConfig[domain ?? "default"] || domainConfig.default;
  const displayTitle = title ?? currentDomain.name;
  const displaySubtitle = subtitle ?? currentDomain.description;

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const jwt = await account.createJWT();
        const API_VERSION = (
          process.env.NEXT_PUBLIC_API_VERSION || "v2"
        ).trim();
        const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URLV2 ?? "").replace(
          /\/+$/,
          "",
        );

        const res = await fetch(
          `${API_BASE_URL}/api/${API_VERSION}/properties/${endpoint}`,
          {
            headers: { Authorization: `Bearer ${jwt.jwt}` },
          },
        );

        if (!res.ok) {
          setProperties([]);
          return;
        }

        const data: any[] = await res.json();
        setProperties(data.map(parseProperty));
      } catch {
        setProperties([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [endpoint]);

  return (
    <main className="min-h-screen bg-base-200 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-6">
          <h1 className="text-2xl font-extrabold">{displayTitle}</h1>
          <p className="text-sm text-slate-600">{displaySubtitle}</p>
        </header>

        {/* Loading State */}
        {loading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-64 animate-pulse bg-gray-200 rounded-lg"
              />
            ))}
          </div>
        ) : properties.length === 0 ? (
          <div className="p-6 text-center bg-white rounded-lg">
            <h2 className="font-semibold">No listings found</h2>
            <Link
              href="/sell/new"
              className="mt-4 inline-block text-blue-600 underline"
            >
              List a property
            </Link>
          </div>
        ) : (
          <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {properties.map((p) => (
              <article key={p.id} className="bg-white rounded-lg shadow">
                <div className="h-40 bg-gray-100">
                  {p.image && (
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-full object-cover rounded-t-lg"
                    />
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold truncate">{p.title}</h3>
                  <p className="text-sm text-slate-600">
                    {p.location} • {p.price}
                  </p>
                  <Link
                    href={`/listings/${p.slug}`}
                    className="text-blue-600 underline text-sm mt-2 inline-block"
                  >
                    View
                  </Link>
                </div>
              </article>
            ))}
          </section>
        )}
      </div>
    </main>
  );
}
