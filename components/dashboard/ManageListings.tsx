"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/Separator";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

/* =========================
   TYPES (MATCH API SCHEMA)
========================= */
type Property = {
  $id: string;
  title: string;
  type: string;
  subType: string;
  property_status: string; // pending | approved | rejected | etc
  price: number | null;
  location: string | null;
  address: string | null;
  rooms: number | null;
  description: string | null;
  country: string | null;
  accountId?: string | null;
  companyId?: string | null;
  published: boolean;
  approvedBy?: string | null;
  approvedAt?: string | null;
  $createdAt: string;
  $updatedAt: string;
};

/* =========================
   JWT HELPER
========================= */
const getAccountIdFromToken = (): string | null => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return null;

    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.accountId ?? payload.sub ?? null;
  } catch {
    return null;
  }
};

/* =========================
   COMPONENT
========================= */
export default function ManageListings() {
  const router = useRouter();

  const [properties, setProperties] = useState<Property[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [accountId, setAccountId] = useState<string | null>(null);

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
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to fetch listings");

      const data = await res.json();
      setProperties(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("❌ Fetch error", err);
      setProperties([]);
    } finally {
      setLoading(false);
    }
  }, [API_BASE]);

  /* =========================
     DELETE PROPERTY
  ========================= */
  const handleDelete = async (id: string) => {
    if (!confirm("Delete this listing?")) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Not authenticated");

      const res = await fetch(`${API_BASE}/properties/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Delete failed");

      setProperties((prev) => prev.filter((p) => p.$id !== id));
    } catch (err) {
      console.error("❌ Delete error", err);
    }
  };

  /* =========================
     EFFECTS
  ========================= */
  useEffect(() => {
    setAccountId(getAccountIdFromToken());
    fetchListings();
  }, [fetchListings]);

  /* =========================
     FILTER (ALL STATUSES)
     👉 ONLY filter by owner + search
  ========================= */
  const filtered = useMemo(() => {
    const q = search.toLowerCase();

    return properties.filter((p) => {
      const matchesOwner = !accountId || p.accountId === accountId;
      const matchesSearch = p.title?.toLowerCase().includes(q);

      return matchesOwner && matchesSearch;
    });
  }, [properties, search, accountId]);

  /* =========================
     STATUS STYLES
  ========================= */
  const statusStyles = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "rejected":
        return "bg-red-100 text-red-700";
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
        <h1 className="text-2xl font-semibold">My Property Listings</h1>
        <p className="text-sm text-muted-foreground">
          All properties created by your account
        </p>
      </div>

      <Separator />

      <div className="flex justify-between gap-4">
        <Input
          placeholder="Search by title..."
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
          No properties found.
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
                  <td className="px-4 py-3">{p.location ?? "—"}</td>
                  <td className="px-4 py-3">
                    {p.price !== null ? `$${p.price.toLocaleString()}` : "—"}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusStyles(
                        p.property_status,
                      )}`}
                    >
                      {p.property_status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        router.push(`/dashboard/properties/edit/${p.$id}`)
                      }
                    >
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
