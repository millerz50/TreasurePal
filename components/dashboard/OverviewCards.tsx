"use client";

import { useEffect, useState } from "react";

type OverviewStats = {
  totalListings: number;
  activeAgents: number;
  viewsThisWeek: number;
};

export default function OverviewCards() {
  const [stats, setStats] = useState<OverviewStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const API_BASE = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_BASE}/api/overview`);
        if (!res.ok) {
          throw new Error(`Failed to fetch overview stats (${res.status})`);
        }
        const data = await res.json();
        // Expecting backend to return { totalListings, activeAgents, viewsThisWeek }
        setStats(data);
      } catch (err) {
        console.error("❌ Failed to fetch overview stats:", err);
        setError("Could not load stats");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [API_BASE]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {loading ? (
        <div className="col-span-3 text-center py-6">Loading stats...</div>
      ) : error ? (
        <div className="col-span-3 text-center text-red-500 py-6">{error}</div>
      ) : stats ? (
        <>
          <div className="card bg-base-100 shadow-sm border border-base-300">
            <div className="card-body">
              <h3 className="card-title text-sm text-muted-foreground">
                Total Listings
              </h3>
              <p className="text-2xl font-bold text-primary">
                {stats.totalListings}
              </p>
            </div>
          </div>
          <div className="card bg-base-100 shadow-sm border border-base-300">
            <div className="card-body">
              <h3 className="card-title text-sm text-muted-foreground">
                Active Agents
              </h3>
              <p className="text-2xl font-bold text-primary">
                {stats.activeAgents}
              </p>
            </div>
          </div>
          <div className="card bg-base-100 shadow-sm border border-base-300">
            <div className="card-body">
              <h3 className="card-title text-sm text-muted-foreground">
                Views This Week
              </h3>
              <p className="text-2xl font-bold text-primary">
                {stats.viewsThisWeek}
              </p>
            </div>
          </div>
        </>
      ) : (
        <div className="col-span-3 text-center py-6">
          No stats available yet.
        </div>
      )}
    </div>
  );
}
