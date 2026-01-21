"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

/* ----------------------------
   TYPES
---------------------------- */
export type AgentMetrics = {
  accountId: string;
  propertiesCount?: number;
  historicalMetricRecords?: number;
  averagePropertyRating?: number | null;
  leadsCount?: number;
  conversionRate?: number | null;
};

export default function AgentTools() {
  const { user, loading: loadingUser } = useAuth();
  const [metrics, setMetrics] = useState<AgentMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_VERSION = (process.env.NEXT_PUBLIC_API_VERSION || "v2").trim();
  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URLV2?.replace(/\/+$/, "") ?? "";

  useEffect(() => {
    if (!user?.userId) return;

    const fetchMetrics = async () => {
      setLoading(true);
      setError(null);

      try {
        // 1️⃣ Generate JWT via backend auth endpoint (if you have it)
        // Or you can directly pass Appwrite JWT from AuthProvider
        const jwtResponse = await fetch(
          `${API_BASE_URL}/api/${API_VERSION}/auth/jwt`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ accountId: user.userId }),
          }
        );

        if (!jwtResponse.ok) throw new Error("Failed to generate JWT");
        const { jwt } = await jwtResponse.json();

        // 2️⃣ Call the **existing metrics route**
        const res = await fetch(`${API_BASE_URL}/api/${API_VERSION}/agents/metrics`, {
          headers: { Authorization: `Bearer ${jwt}` },
        });

        if (!res.ok) {
          if (res.status === 404) throw new Error("Metrics not found");
          throw new Error("Failed to load metrics");
        }

        const data = await res.json();

        setMetrics({
          accountId: user.userId,
          propertiesCount: data.propertiesCount,
          averagePropertyRating: data.averagePropertyRating,
          historicalMetricRecords: data.historicalMetricRecords,
          leadsCount: data.leadsCount,
          conversionRate: data.conversionRate,
        });
      } catch (err: any) {
        console.error("Failed to load agent metrics:", err);
        setError(err.message || "Unexpected error");
        setMetrics(null);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, [user?.userId]);

  if (loadingUser) return <div>Loading user info…</div>;

  return (
    <section className="p-6 bg-base-100 border border-base-300 rounded-lg shadow-sm space-y-4">
      <h2 className="text-xl font-semibold text-primary">Agent Tools</h2>
      <p className="text-sm text-muted-foreground">
        Add new properties, manage listings, and track your portfolio performance.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button className="btn btn-outline w-full">Add Property</button>
        <button className="btn btn-outline w-full">Manage Listings</button>
        <button className="btn btn-outline w-full">View Inquiries</button>
        <button className="btn btn-outline w-full">Track Performance</button>
      </div>

      <div className="pt-4">
        <h3 className="text-sm font-medium text-gray-700">Snapshot</h3>

        {loading ? (
          <div className="text-sm text-gray-500">Loading metrics…</div>
        ) : error ? (
          <div className="text-sm text-error">{error}</div>
        ) : !metrics ? (
          <div className="text-sm text-gray-400">No metrics available</div>
        ) : (
          <div className="text-sm text-gray-700 space-y-1 mt-2">
            <div>Properties: {metrics.propertiesCount ?? "—"}</div>
            <div>Avg rating: {metrics.averagePropertyRating ?? "—"}</div>
            <div>Records: {metrics.historicalMetricRecords ?? "—"}</div>
            <div>Leads: {metrics.leadsCount ?? "—"}</div>
            <div>
              Conversion:{" "}
              {metrics.conversionRate == null
                ? "—"
                : `${Math.round(metrics.conversionRate * 10000) / 100}%`}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
