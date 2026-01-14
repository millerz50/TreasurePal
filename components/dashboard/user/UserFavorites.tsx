// src/features/user/components/UserFavorites.tsx
"use client";

import { Heart, Share, Trash2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

type Favorite = {
  id: number;
  title: string;
  location: string;
  price: string;
  likedOn: string;
  image: string;
};

/* ----------------------------------
   API URL SELECTION
   - Uses env var NEXT_PUBLIC_API_VERSION to pick v1 or v2.
   - If NEXT_PUBLIC_API_VERSION is not set, falls back to V2 then V1.
   - Expected env values for version: "v1" or "v2"
----------------------------------- */
function getApiUrl(): string {
  const v = process.env.NEXT_PUBLIC_API_VERSION;
  const v1 = process.env.NEXT_PUBLIC_API_URLV1;
  const v2 = process.env.NEXT_PUBLIC_API_URLV2;

  if (v === "v2" && v2) return v2;
  if (v === "v1" && v1) return v1;

  // fallback order: V2 then V1
  if (v2) return v2;
  if (v1) return v1;

  return "";
}

export default function UserFavorites() {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Not authenticated");

        const API_URL = getApiUrl();
        if (!API_URL) throw new Error("API base URL is not configured.");

        const res = await fetch(`${API_URL}/favorites`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to load favorites");
        }

        const data: Favorite[] = await res.json();
        setFavorites(data);
      } catch (err: unknown) {
        console.error("❌ Favorites fetch error:", err);
        setFavorites([]);
        setError(
          err instanceof Error ? err.message : "Failed to load favorites"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  if (loading) {
    return <p>Loading favorites...</p>;
  }

  if (error) {
    return <p className="text-sm text-red-600">Error: {error}</p>;
  }

  if (favorites.length === 0) {
    return <p>No favorites found.</p>;
  }

  return (
    <section className="p-6 bg-base-100 border border-base-300 rounded-lg shadow-sm space-y-6">
      <h2 className="text-xl font-semibold text-primary">Your Favorites</h2>
      <p className="text-sm text-muted-foreground">
        Manage properties you’ve saved and revisit them anytime.
      </p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {favorites.map((fav) => (
          <div
            key={fav.id}
            className="border border-base-300 rounded-lg overflow-hidden shadow hover:shadow-lg transition transform hover:scale-[1.02]"
          >
            <Image
              src={fav.image}
              alt={fav.title}
              width={600}
              height={400}
              className="h-48 w-full object-cover"
            />
            <div className="p-4 space-y-2">
              <h3 className="font-semibold text-lg">{fav.title}</h3>
              <p className="text-sm text-muted-foreground">{fav.location}</p>
              <p className="text-sm font-medium text-primary">{fav.price}</p>
              <p className="text-xs text-muted-foreground">
                Liked on {fav.likedOn}
              </p>

              <div className="flex gap-3 mt-3">
                <button className="flex items-center gap-1 text-red-500 hover:text-red-600 text-sm">
                  <Trash2 className="h-4 w-4" /> Remove
                </button>
                <button className="flex items-center gap-1 text-blue-500 hover:text-blue-600 text-sm">
                  <Share className="h-4 w-4" /> Share
                </button>
                <button className="flex items-center gap-1 text-green-600 hover:text-green-700 text-sm">
                  <Heart className="h-4 w-4" /> Contact Agents
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
