"use client";

export default function UserFavorites() {
  return (
    <section className="p-6 bg-base-100 border border-base-300 rounded-lg shadow-sm space-y-4">
      <h2 className="text-xl font-semibold text-primary">Your Favorites</h2>
      <p className="text-sm text-muted-foreground">
        View properties you’ve liked and manage your saved searches.
      </p>

      <div className="space-y-3">
        {/* Placeholder list — replace with dynamic data */}
        <div className="p-3 border border-base-300 rounded-md hover:bg-base-200 transition">
          <strong>Luxury Villa in Borrowdale</strong>
          <p className="text-xs text-muted-foreground">Liked on Nov 15, 2025</p>
        </div>
        <div className="p-3 border border-base-300 rounded-md hover:bg-base-200 transition">
          <strong>Modern Apartment in Avondale</strong>
          <p className="text-xs text-muted-foreground">Liked on Nov 18, 2025</p>
        </div>
      </div>
    </section>
  );
}
