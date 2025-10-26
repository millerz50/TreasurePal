"use client";

import PropertyCard from "@/components/property/PropertyCard";
import { useEffect, useState } from "react";

type Property = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  price: string;
  type: string;
  location: string;
  rooms: number;
  amenities: string[];
};

export default function PropertyList() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/properties/all")
      .then((res) => res.json())
      .then((data) => setProperties(data))
      .catch((err) => console.error("❌ Failed to fetch properties:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="bg-base-100 px-6 py-12 animate-in fade-in duration-700">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-primary">
            Featured Properties
          </h2>
          <p className="text-sm text-muted-foreground">
            Handpicked listings across Zimbabwe’s top cities—from student pods
            to industrial investments
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <span className="loading loading-spinner text-primary" />
          </div>
        ) : properties.length === 0 ? (
          <div className="text-center py-12 text-base-content/70">
            <h2 className="text-lg font-semibold">No properties found</h2>
            <p className="text-sm">
              Try adjusting your filters or check back later.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
