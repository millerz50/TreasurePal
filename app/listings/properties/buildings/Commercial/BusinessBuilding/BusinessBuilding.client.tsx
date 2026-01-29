// src/app/listings/Commercial/BusinessBuilding/BusinessBuilding.client.tsx
"use client";

import { useEffect, useState } from "react";
import PropertyCard, {
  type Property,
} from "@/components/property/PropertyCard";
import PropertyMap from "@/components/property/PropertyMap";

type Props = {
  title: string;
  subtitle: string;
  endpoint: string;
};

export default function BusinessBuildingClient({
  title,
  subtitle,
  endpoint,
}: Props) {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        setError(null);

        const API_BASE = process.env.NEXT_PUBLIC_API_URLV2;
        if (!API_BASE) throw new Error("API base URL not configured");

        const res = await fetch(`${API_BASE}/api/v2/properties/${endpoint}`);

        if (!res.ok) {
          throw new Error(`Failed to fetch properties (${res.status})`);
        }

        const data: Property[] = await res.json();
        setProperties(data);
      } catch (err: any) {
        setError(err.message ?? "Failed to fetch properties");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [endpoint]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-2">{title}</h1>
      <p className="mb-8 text-gray-600">{subtitle}</p>

      {loading && <p className="text-center py-10">Loading properties…</p>}

      {error && <p className="text-center py-10 text-red-500">{error}</p>}

      {!loading && !error && properties.length === 0 && (
        <p className="text-center py-10 text-gray-500">No properties found.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {properties.map((prop) => (
          <PropertyCard key={prop.id} property={prop} />
        ))}
      </div>

      {properties[0]?.lat && properties[0]?.lng && (
        <div className="mt-12">
          <PropertyMap coordinates={[properties[0].lat, properties[0].lng]} />
        </div>
      )}
    </div>
  );
}
