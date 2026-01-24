"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/Separator";
import { useCallback, useEffect, useMemo, useState } from "react";

/* =========================
   TYPES
========================= */
type Property = {
  $id: string;
  title: string;
  price: number | string;
  location: string;
  address: string;
  rooms: number;
  description: string;
  type: string;
  status: string;
  country: string;
  agentId?: string | null;
  published?: boolean;
  approvedBy?: string | null;
  approvedAt?: string | null;
  $createdAt?: string;
  $updatedAt?: string;
};

/* =========================
   CONSTANT (TEMP)
   👉 Replace with logged-in user id
========================= */
const AGENT_ID = "356a9dd7-cca7-4685-a74f-0169e71aa99b";

/* =========================
   COMPONENT
========================= */
export default function ManageListings() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  /* =========================
     API CONFIG
  ========================= */
  const API_VERSION = (process.env.NEXT_PUBLIC_API_VERSION || "v2").trim();

  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URLV2?.replace(/\/+$/, "") ?? "";

  const API_BASE = `${API_BASE_URL}/api/${API_VERSION}`;

  /* =========================
     FETCH LISTINGS
  ========================= */
  const fetchListings = useCallback(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Not authenticated");

      const res = await fetch(`${API_BASE}/properties/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch listings (${res.status})`);
      }

      const data = await res.json();
      setProperties(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("❌ Failed to fetch listings", err);
      setProperties([]);
    } finally {
      setLoading(false);
    }
  }, [API_BASE]);

  /* =========================
     DELETE PROPERTY
  ========================= */
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this listing?")) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Not authenticated");

      const res = await fetch(`${API_BASE}/properties/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to delete property");

      setProperties((prev) => prev.filter((p) => p.$id !== id));
    } catch (err) {
      console.error("❌ Delete error", err);
    }
  };

  /* =========================
     EFFECT
  ========================= */
  useEffect(() => {
    fetchListings();
  }, [fetchListings]);

  /* =========================
     FILTER (AGENT + SEARCH)
  ========================= */
  const filtered = useMemo(() => {
    const q = search.toLowerCase();

    return properties.filter((p) => {
      return (
        p.agentId === AGENT_ID && // 👈 agent specific
        p.title?.toLowerCase().includes(q) &&
        p.type === "industrial" && // optional
        p.status === "pending" // optional
      );
    });
  }, [properties, search]);

  /* =========================
     STATUS STYLES
  ========================= */
  const statusStyles = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
      case "available":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  /* =========================
     RENDER
  ========================= */
  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">
          My Pending Industrial Listings
        </h1>
        <p className="text-sm text-muted-foreground">
          Properties submitted by you and awaiting approval
        </p>
      </div>

      <Separator />

      <div className="flex justify-between gap-4">
        <Input
          placeholder="Search title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
        <Button onClick={fetchListings} disabled={loading}>
          {loading ? "Refreshing…" : "Refresh"}
        </Button>
      </div>

      {loading && (
        <p className="text-center py-12 text-muted-foreground">
          Loading listings…
        </p>
      )}

      {!loading && filtered.length === 0 && (
        <p className="text-center py-12 text-muted-foreground">
          No listings found for this agent.
        </p>
      )}

      {!loading && filtered.length > 0 && (
        <div className="rounded-lg border overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.$id} className="border-t hover:bg-muted/40">
                  <td className="px-4 py-3 font-medium">{p.title}</td>
                  <td className="px-4 py-3">{p.location}</td>
                  <td className="px-4 py-3">${p.price}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusStyles(
                        p.status,
                      )}`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right space-x-2">
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(p.$id)}
                    >
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
