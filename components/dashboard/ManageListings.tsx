"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/Separator";
import { useCallback, useEffect, useState } from "react";

// Full property type aligned with backend schema
type Property = {
  _id: string;
  title: string;
  price: string;
  location: string;
  address: string;
  rooms: number;
  description: string;
  type: string;
  status: string;
  country: string;
  amenities: string[];
  locationLat?: number | null;
  locationLng?: number | null;
  agentId?: string | null;
  frontElevation?: string | null;
  southView?: string | null;
  westView?: string | null;
  eastView?: string | null;
  floorPlan?: string | null;
  published?: boolean;
  approvedBy?: string | null;
  approvedAt?: string | null;
  $createdAt?: string;
  $updatedAt?: string;
};

export default function ManageListings() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const API_BASE = process.env.NEXT_PUBLIC_API_URL;

  // ✅ Memoize fetchListings so ESLint is happy
  const fetchListings = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/properties`);
      const data = await res.json();
      setProperties(data);
    } catch (err) {
      console.error("❌ Failed to fetch listings", err);
    } finally {
      setLoading(false);
    }
  }, [API_BASE]);

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`${API_BASE}/api/properties/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setProperties((prev) => prev.filter((p) => p._id !== id));
      } else {
        console.error("❌ Failed to delete property");
      }
    } catch (err) {
      console.error("❌ Delete error", err);
    }
  };

  useEffect(() => {
    fetchListings();
  }, [fetchListings]); // ✅ include fetchListings in deps

  const filtered = properties.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 md:p-8 space-y-6 font-sans">
      <h1 className="text-2xl font-bold text-primary">Manage Listings</h1>
      <Separator />

      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
        <Input
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/2"
        />
        <Button onClick={fetchListings} disabled={loading}>
          {loading ? "Refreshing..." : "Refresh"}
        </Button>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center text-muted-foreground py-12">
          <p>No listings found.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full text-sm sm:text-base">
            <thead>
              <tr>
                <th>Title</th>
                <th>Location</th>
                <th>Price</th>
                <th>Status</th>
                <th>Type</th>
                <th>Rooms</th>
                <th>Country</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((property) => (
                <tr key={property._id}>
                  <td>{property.title}</td>
                  <td>{property.location}</td>
                  <td>${property.price}</td>
                  <td>
                    <span
                      className={`badge ${
                        property.status === "Available"
                          ? "badge-success"
                          : "badge-warning"
                      }`}>
                      {property.status}
                    </span>
                  </td>
                  <td>{property.type}</td>
                  <td>{property.rooms}</td>
                  <td>{property.country}</td>
                  <td className="text-right space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => console.warn("Edit", property._id)}>
                      Edit
                    </Button>

                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(property._id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
