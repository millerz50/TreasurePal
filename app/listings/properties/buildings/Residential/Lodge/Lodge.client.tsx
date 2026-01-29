"use client";

import { useEffect, useState } from "react";
import PropertyCard, {
  type Property,
} from "@/components/property/PropertyCard";
import PropertyMap from "@/components/property/PropertyMap";
import PropertyFilters, {
  type Filters,
} from "@/components/property/PropertyFilters";

type Props = {
  title: string;
  subtitle: string;
  endpoint: string;
};

export default function LodgeClient({ title, subtitle, endpoint }: Props) {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filters, setFilters] = useState<Filters>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      setError(null);

      try {
        const urlBase = process.env.NEXT_PUBLIC_API_URLV2;
        if (!urlBase) throw new Error("API base URL not set");

        let url = `${urlBase}/api/v2/properties/${endpoint}`;
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
        if (!res.ok) throw new Error("Failed to fetch properties");

        const data: Property[] = await res.json();
        setProperties(data);
      } catch (err: any) {
        setError(err.message ?? "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [filters, endpoint]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-4">{title}</h1>
      <p className="text-gray-600 mb-8">{subtitle}</p>

      <PropertyFilters onFilterChange={setFilters} />

      {loading && <p className="py-6 text-center">Loading properties…</p>}
      {error && <p className="py-6 text-center text-red-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>

      {properties[0]?.lat && properties[0]?.lng && (
        <div className="mt-10">
          <PropertyMap coordinates={[properties[0].lat, properties[0].lng]} />
        </div>
      )}
    </div>
  );
}
