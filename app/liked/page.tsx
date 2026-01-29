"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import PropertyCard, { Property } from "@/components/property/PropertyCard";

export default function LikedPropertiesPage() {
  const { user, loading: authLoading } = useAuth();
  const [likedProperties, setLikedProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading || !user) return;

    const fetchLikedProperties = async () => {
      try {
        setLoading(true);

        const API_BASE = process.env.NEXT_PUBLIC_API_URLV2;
        if (!API_BASE) throw new Error("API base URL not configured");

        const jwt = localStorage.getItem("token"); // or Appwrite JWT
        if (!jwt) throw new Error("Not authenticated");

        const res = await fetch(`${API_BASE}/api/v2/properties/liked`, {
          headers: { Authorization: `Bearer ${jwt}` },
        });

        if (!res.ok)
          throw new Error(`Failed to fetch liked properties (${res.status})`);

        const data = await res.json();

        const mapped: Property[] = Array.isArray(data)
          ? data.map((doc: any) => ({
              id: doc.$id,
              title: doc.title,
              description: doc.description,
              price: doc.price,
              type: doc.type,
              location: doc.location,
              rooms: doc.rooms,
              amenities: Array.isArray(doc.amenities) ? doc.amenities : [],
              images: {
                frontElevation: doc.frontElevation,
                southView: doc.southView,
                westView: doc.westView,
                eastView: doc.eastView,
                floorPlan: doc.floorPlan,
              },
              lat: doc.lat ?? 0, // ✅ Added lat with fallback
              lng: doc.lng ?? 0, // ✅ Added lng with fallback
            }))
          : [];

        setLikedProperties(mapped);
      } catch (err) {
        console.error("Failed to fetch liked properties:", err);
        setLikedProperties([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLikedProperties();
  }, [user, authLoading]);

  return (
    <section className="bg-base-100 px-6 py-12 animate-in fade-in duration-700">
      <h1 className="text-2xl font-bold mb-6">Your Liked Properties</h1>
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading ? (
          [...Array(6)].map((_, i) => (
            <div
              key={i}
              className="animate-pulse bg-gray-200 h-72 rounded-lg"
            />
          ))
        ) : likedProperties.length > 0 ? (
          likedProperties.map((prop) => (
            <PropertyCard key={prop.id} property={prop} />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">
            You have no liked properties yet.
          </div>
        )}
      </div>
    </section>
  );
}
