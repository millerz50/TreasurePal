"use client";

import { useEffect, useState } from "react";
import { account } from "@/lib/appwrite";
import Link from "next/link";

type Property = {
  id: string;
  title: string;
  location?: string;
  price?: string;
  size?: string | number;
  image?: string | null;
  slug?: string;
  summary?: string;
};

export default function HousesPageClient() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const jwtResponse = await account.createJWT();
        const API_VERSION = (process.env.NEXT_PUBLIC_API_VERSION || "v2").trim();
        const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URLV2 ?? "").replace(/\/+$/, "");
        const url = `${API_BASE_URL}/api/${API_VERSION}/properties/houses`;

        const res = await fetch(url, {
          headers: { Authorization: `Bearer ${jwtResponse.jwt}` },
        });

        if (!res.ok) {
          console.error("Failed to fetch house properties", res.status);
          setProperties([]);
          return;
        }

        const data: any[] = await res.json();
        const mapped: Property[] = data.map((raw) => ({
          id: raw.$id ?? raw.id ?? Math.random().toString(36).slice(2),
          title: raw.title ?? raw.name ?? "Untitled property",
          location: raw.location ?? raw.city ?? "Unknown",
          price: raw.price ?? raw.displayPrice ?? "Contact for price",
          size: raw.size ?? raw.area,
          image: raw.frontElevation ?? raw.photo ?? null,
          slug: raw.slug ?? raw.$id,
          summary: raw.description ?? raw.summary ?? "",
        }));

        setProperties(mapped);
      } catch (err) {
        console.error("Error fetching house properties:", err);
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
        <header className="mb-6">
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-slate-100">
            Houses & Family Homes
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
            Browse houses, family homes, and residential properties across Zimbabwe.
          </p>
        </header>

        {loading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-100 dark:bg-slate-700 animate-pulse rounded-lg" />
            ))}
          </div>
        ) : properties.length === 0 ? (
          <section className="rounded-lg bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 p-6 shadow-sm text-center">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">No houses listed</h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 max-w-prose mx-auto">
              No houses are listed right now. List your property to reach potential buyers or tenants.
            </p>
            <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/sell/new"
                className="inline-flex items-center px-5 py-3 rounded-full bg-gradient-to-r from-[#2ECC71] to-[#1E90FF] text-white font-semibold shadow-sm"
              >
                List your house
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
                    <img src={p.image} alt={p.title} className="object-cover w-full h-full" loading="lazy" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-sm text-slate-500">No photo</div>
                  )}
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100 truncate">{p.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{p.location} • {p.price}</p>
                  {p.size && <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Size: {p.size}</p>}
                  {p.summary && <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 line-clamp-2">{p.summary}</p>}
                  <div className="mt-3 flex items-center justify-between">
                    <Link href={p.slug ? `/listings/${p.slug}` : `/listings/${p.id}`} className="text-sm text-blue-600 dark:text-blue-400 underline">
                      View
                    </Link>
                    <span className="text-xs text-slate-500 dark:text-slate-400">{p.size ?? "-"}</span>
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

