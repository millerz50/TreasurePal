"use client";

import { Heart, Share, Trash2 } from "lucide-react";

export default function UserFavorites() {
  const favorites = [
    {
      id: 1,
      title: "Luxury Villa in Borrowdale",
      location: "Borrowdale, Harare",
      price: "$350,000",
      likedOn: "Nov 15, 2025",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80", // villa
    },
    {
      id: 2,
      title: "Modern Apartment in Avondale",
      location: "Avondale, Harare",
      price: "$850 / month",
      likedOn: "Nov 18, 2025",
      image:
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80", // apartment
    },
    {
      id: 3,
      title: "Townhouse in Highlands",
      location: "Highlands, Harare",
      price: "$1,200 / month",
      likedOn: "Nov 20, 2025",
      image:
        "https://images.unsplash.com/photo-1599423300746-b62533397364?auto=format&fit=crop&w=800&q=80", // townhouse
    },
  ];

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
            className="border border-base-300 rounded-lg overflow-hidden shadow hover:shadow-lg transition transform hover:scale-[1.02]">
            <img
              src={fav.image}
              alt={fav.title}
              className="h-48 w-full object-cover"
            />
            <div className="p-4 space-y-2">
              <h3 className="font-semibold text-lg">{fav.title}</h3>
              <p className="text-sm text-muted-foreground">{fav.location}</p>
              <p className="text-sm font-medium text-primary">{fav.price}</p>
              <p className="text-xs text-muted-foreground">
                Liked on {fav.likedOn}
              </p>

              {/* Actions */}
              <div className="flex gap-3 mt-3">
                <button className="flex items-center gap-1 text-red-500 hover:text-red-600 text-sm">
                  <Trash2 className="h-4 w-4" /> Remove
                </button>
                <button className="flex items-center gap-1 text-blue-500 hover:text-blue-600 text-sm">
                  <Share className="h-4 w-4" /> Share
                </button>
                <button className="flex items-center gap-1 text-green-600 hover:text-green-700 text-sm">
                  <Heart className="h-4 w-4" /> Contact Agent
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
