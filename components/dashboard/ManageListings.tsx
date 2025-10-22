"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/Separator";
import { useEffect, useState } from "react";

type Property = {
  _id: string;
  title: string;
  price: string;
  location: string;
  status: string;
  type: string;
};

export default function ManageListings() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchListings = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/properties");
      const data = await res.json();
      setProperties(data);
    } catch (err) {
      console.error("❌ Failed to fetch listings", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/properties/${id}`, {
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
  }, []);

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
                  <td className="text-right space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => console.log("Edit", property._id)}>
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
