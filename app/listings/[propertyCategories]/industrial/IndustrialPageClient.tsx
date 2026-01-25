"use client";

import { useEffect, useState } from "react";
import { account } from "@/lib/appwrite";
import PropertyCard, { type Property as PropertyType } from "@/components/property/PropertyCard";

export default function IndustrialPageClient() {
  const [properties, setProperties] = useState<PropertyType[]>([]);
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
        const url = `${API_BASE_URL}/api/${API_VERSION}/properties/type/industrial`;

        // 3️⃣ Fetch properties
        const res = await fetch(url, {
          headers: {
            Authorization: `Bearer ${jwtResponse.jwt}`,
          },
        });

        if (!res.ok) {
          console.error("Failed to fetch industrial properties", res.status);
          setProperties([]);
          return;
        }

        const data: any[] = await res.json();

        // 4️⃣ Map API response to PropertyType (matches PropertyCard props)
        const mapped: PropertyType[] = data.map((raw) => ({
          id: raw.$id ?? raw.id ?? Math.random().toString(36).slice(2),
          title: raw.title ?? raw.name ?? "Untitled property",
          description: raw.description ?? raw.summary ?? "",
          price: raw.price ?? "Contact for price",
          type: raw.type ?? "industrial",
          location: raw.location ?? raw.city ?? "Unknown",
          rooms: raw.rooms ?? 0,
          amenities: Array.isArray(raw.amenities) ? raw.amenities : [],
          images: {
            frontElevation: raw.frontElevation ?? null,
            southView: raw.southView ?? null,
            westView: raw.westView ?? null,
            eastView: raw.eastView ?? null,
            floorPlan: raw.floorPlan ?? null,
          },
        }));

        setProperties(mapped);
      } catch (err) {
        console.error("Error fetching industrial properties:", err);
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
            Industrial & Commercial
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
            Warehouses, factories, offices and commercial spaces for businesses.
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
              No industrial listings
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 max-w-prose mx-auto">
              No industrial or commercial spaces listed right now. List your property to reach businesses and investors.
            </p>

            <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="/sell/new"
                className="inline-flex items-center px-5 py-3 rounded-full bg-gradient-to-r from-[#2ECC71] to-[#1E90FF] text-white font-semibold shadow-sm"
              >
                List commercial space
              </a>
              <a
                href="/support"
                className="inline-flex items-center px-5 py-3 rounded-full border border-gray-200 dark:border-slate-700 text-sm"
              >
                Need help listing?
              </a>
            </div>
          </section>
        ) : (
          // PROPERTY GRID
          <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {properties.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </section>
        )}
      </div>
    </main>
  );
}
