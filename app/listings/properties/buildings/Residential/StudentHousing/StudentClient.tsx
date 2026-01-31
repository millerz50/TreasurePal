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

export default function StudentClient({ title, subtitle, endpoint }: Props) {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchProperties = async () => {
      try {
        setLoading(true);
        setError(null);

        const API_BASE = process.env.NEXT_PUBLIC_API_URLV2;
        if (!API_BASE) throw new Error("API base URL not configured");

        const res = await fetch(`${API_BASE}/api/v2/properties/${endpoint}`);
        if (!res.ok)
          throw new Error(`Failed to fetch properties (${res.status})`);

        const data: Property[] = await res.json();
        if (isMounted) setProperties(data);
      } catch (err: any) {
        if (isMounted) setError(err.message ?? "Failed to fetch properties");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchProperties();

    return () => {
      isMounted = false;
    };
  }, [endpoint]);

  const firstWithCoords = properties.find(
    (p: any) => typeof p.lat === "number" && typeof p.lng === "number",
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-4">{title}</h1>
      <p className="text-gray-600 mb-8">{subtitle}</p>

      {loading && <p className="py-10 text-center">Loading properties…</p>}
      {error && <p className="py-10 text-center text-red-500">{error}</p>}

      {!loading && !error && properties.length === 0 && (
        <p className="py-10 text-center text-gray-500">No properties found.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>

      {firstWithCoords && (
        <div className="mt-12">
          <PropertyMap
            coordinates={[firstWithCoords.lat, firstWithCoords.lng]}
          />
        </div>
      )}
    </div>
  );
}
