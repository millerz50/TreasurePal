"use client";

import { useEffect, useState } from "react";
import PropertyCard, { Property } from "./PropertyCard";

/* ----------------------------------
   API URL SELECTION
   - Uses env var NEXT_PUBLIC_API_VERSION to pick v1 or v2.
   - Falls back to NEXT_PUBLIC_API_URL if provided.
----------------------------------- */
function getApiUrl(): string {
  const v = process.env.NEXT_PUBLIC_API_VERSION;
  const v1 = process.env.NEXT_PUBLIC_API_URLV1;
  const v2 = process.env.NEXT_PUBLIC_API_URLV2;
  const legacy = process.env.NEXT_PUBLIC_API_URL;

  if (v === "v2" && v2) return v2;
  if (v === "v1" && v1) return v1;
  if (v2) return v2;
  if (v1) return v1;
  if (legacy) return legacy;
  return "";
}

export default function PropertyList() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        const API_BASE = getApiUrl();
        if (!API_BASE) throw new Error("API base URL is not configured");

        const token =
          typeof window !== "undefined" ? localStorage.getItem("token") : null;
        if (!token) throw new Error("Not authenticated");

        const res = await fetch(
          `${API_BASE.replace(/\/$/, "")}/api/properties/all`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!res.ok)
          throw new Error(`Failed to fetch properties (${res.status})`);

        const data = await res.json();

        // Map raw API data into Property type
        const mapped: Property[] = Array.isArray(data)
          ? data.map((doc: any) => ({
              id: String(doc.$id ?? doc.id ?? ""),
              title: String(doc.title ?? ""),
              description: String(doc.description ?? ""),
              price: doc.price ?? "",
              type: String(doc.type ?? ""),
              location: String(doc.location ?? ""),
              rooms:
                typeof doc.rooms === "number"
                  ? doc.rooms
                  : Number(doc.rooms) || 0,
              amenities: Array.isArray(doc.amenities) ? doc.amenities : [],
              images: {
                frontElevation: doc.frontElevation ?? null,
                southView: doc.southView ?? null,
                westView: doc.westView ?? null,
                eastView: doc.eastView ?? null,
                floorPlan: doc.floorPlan ?? null,
              },
            }))
          : [];

        setProperties(mapped);
      } catch (err) {
        console.error("Failed to fetch properties:", err);
        setProperties([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  return (
    <section className="bg-base-100 px-6 py-12 animate-in fade-in duration-700">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading
          ? [...Array(6)].map((_, i) => (
              <div
                key={i}
                className="animate-pulse bg-gray-200 h-72 rounded-lg"
              />
            ))
          : properties.map((prop) => (
              <PropertyCard key={prop.id} property={prop} />
            ))}
      </div>
    </section>
  );
}
