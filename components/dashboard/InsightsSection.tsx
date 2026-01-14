// src/features/insights/components/InsightsSection.tsx
"use client";

import { useEffect, useState } from "react";

type InsightPost = {
  title: string;
  date: string;
  summary: string;
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

  if (v2) return v2;
  if (v1) return v1;

  return "";
}

export default function InsightsSection() {
  const [posts, setPosts] = useState<InsightPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const API_BASE = getApiUrl();

  useEffect(() => {
    const fetchInsights = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("Not authenticated");
        }

        if (!API_BASE) {
          throw new Error(
            "API base URL is not configured. Set NEXT_PUBLIC_API_URLV1 or NEXT_PUBLIC_API_URLV2 and optionally NEXT_PUBLIC_API_VERSION."
          );
        }

        const res = await fetch(`${API_BASE}/api/insights`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch insights (${res.status})`);
        }

        const data = await res.json();
        setPosts(data);
      } catch (err: unknown) {
        console.error("❌ Failed to fetch insights:", err);
        setError(
          err instanceof Error ? err.message : "Could not load insights"
        );
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchInsights();
  }, [API_BASE]);

  return (
    <section className="max-w-7xl mx-auto px-4 py-12 space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-primary">Netspace Insights</h2>
        <p className="text-sm text-muted-foreground">
          Learn from our journey building Zimbabwe’s most trusted tech platforms
        </p>
      </div>

      {loading ? (
        <div className="text-center py-6">Loading insights...</div>
      ) : error ? (
        <div className="text-center text-red-500 py-6">{error}</div>
      ) : posts.length === 0 ? (
        <div className="text-center py-6 text-muted-foreground">
          No insights available.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, idx) => (
            <div
              key={idx}
              className="bg-base-100 border border-base-300 rounded-lg p-4 space-y-2 hover:shadow-md transition"
            >
              <h3 className="text-lg font-semibold text-primary">
                {post.title}
              </h3>
              <p className="text-xs text-muted-foreground">{post.date}</p>
              <p className="text-sm text-base-content/70">{post.summary}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
