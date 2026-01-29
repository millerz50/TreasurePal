// src/app/listings/Commercial/BusinessBuilding/page.tsx
"use client";

import { useState, useEffect } from "react";
import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import PropertyCard, {
  type Property,
} from "@/components/property/PropertyCard";
import PropertyMap from "@/components/property/PropertyMap";
import PropertyFilters, {
  type Filters,
} from "@/components/property/PropertyFilters";

// Page metadata
export const metadata: Metadata = {
  title: `Business Building • ${SITE_NAME}`,
  description:
    "Browse business buildings and office properties across Zimbabwe.",
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: `Business Building • ${SITE_NAME}`,
    description:
      "Browse business buildings and office properties across Zimbabwe.",
    url: `${SITE_URL}/listings/Commercial/BusinessBuilding`,
    images: [
      {
        url: "/og/business.jpg",
        width: 1200,
        height: 630,
        alt: "Business Buildings",
      },
    ],
  },
  twitter: {
    title: `Business Building • ${SITE_NAME}`,
    description:
      "Browse business buildings and office properties across Zimbabwe.",
    images: ["/og/business.jpg"],
  },
};

// ✅ Updated Props type
type Props = {
  initialProperties?: Property[];
  title?: string;
  subtitle?: string;
  endpoint?: string;
};

export default function BusinessBuildingPage({
  initialProperties = [],
  title = "Business Buildings",
  subtitle = "Browse office and commercial buildings across Zimbabwe.",
  endpoint = "type/Commercial/BusinessBuilding",
}: Props) {
  const [properties, setProperties] = useState<Property[]>(initialProperties);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<Filters>({});

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      setError(null);

      try {
        if (!process.env.NEXT_PUBLIC_API_URLV2) {
          throw new Error("API base URL not set");
        }

        let url = `${process.env.NEXT_PUBLIC_API_URLV2}/api/v2/properties/${endpoint}`;
        const params = new URLSearchParams();

        if (filters.location) params.append("location", filters.location);
        if (filters.type) params.append("subType", filters.type);
        if (filters.minPrice)
          params.append("minPrice", filters.minPrice.toString());
        if (filters.maxPrice)
          params.append("maxPrice", filters.maxPrice.toString());
        if (filters.rooms) params.append("rooms", filters.rooms.toString());

        if (params.toString()) url += `?${params.toString()}`;

        const res = await fetch(url);
        if (!res.ok)
          throw new Error(`Failed to fetch properties (${res.status})`);

        const data: Property[] = await res.json();
        setProperties(data);
      } catch (err: any) {
        setError(err.message ?? "Failed to fetch properties");
      } finally {
        setLoading(false);
      }
    };

    // Only fetch when filters change
    if (Object.keys(filters).length > 0) {
      fetchProperties();
    }
  }, [filters, endpoint]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-8">{title}</h1>
      <p className="mb-6 text-gray-600">{subtitle}</p>

      {/* Filters */}
      <PropertyFilters onFilterChange={setFilters} />

      {/* Loading / Error */}
      {loading && <p className="text-center py-6">Loading properties…</p>}
      {error && <p className="text-center py-6 text-red-500">{error}</p>}

      {/* Property Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {properties.map((prop) => (
          <PropertyCard key={prop.id} property={prop} />
        ))}
      </div>

      {/* Map */}
      {properties.length > 0 && properties[0].lat && properties[0].lng && (
        <div className="mt-10">
          <PropertyMap coordinates={[properties[0].lat, properties[0].lng]} />
        </div>
      )}
    </div>
  );
}
