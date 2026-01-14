// components/dashboard/RecentActivity.tsx
"use client";

import { useAuth } from "@/context/AuthContext";
import { useEffect, useMemo, useState } from "react";

type Activity = {
  id: string;
  message: string;
  createdAt: string;
  actorId?: string;
  actorRole?: string;
  [key: string]: any;
};

/* ----------------------------------
   API URL SELECTION
   - Uses env var NEXT_PUBLIC_API_VERSION to pick v1 or v2.
   - Falls back to NEXT_PUBLIC_API_URL if provided.
   - If none are set, returns an empty string.
----------------------------------- */
function getApiUrl(): string {
  const v = process.env.NEXT_PUBLIC_API_VERSION;
  const v1 = process.env.NEXT_PUBLIC_API_URLV1;
  const v2 = process.env.NEXT_PUBLIC_API_URLV2;
  const legacy = process.env.NEXT_PUBLIC_API_URL;

  if (v === "v2" && v2) return v2;
  if (v === "v1" && v1) return v1;
  if (v2) return v2;
  if (v1) return v1;
  if (legacy) return legacy;
  return "";
}

export default function RecentActivity() {
  const { user, loading: authLoading } = useAuth();

  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const API_BASE = getApiUrl() ? getApiUrl().replace(/\/$/, "") : "";

  /* ----------------------------------
     RESOLVE PRIMARY ROLE (FROM roles[])
  ----------------------------------- */
  const primaryRole = useMemo(() => {
    if (!user?.roles?.length) return "user";
    if (user.roles.includes("admin")) return "admin";
    if (user.roles.includes("agent")) return "agent";
    return "user";
  }, [user?.roles]);

  useEffect(() => {
    if (authLoading || !user) return;

    const controller = new AbortController();
    const signal = controller.signal;

    const fetchActivity = async () => {
      setLoading(true);
      setError(null);

      try {
        if (!API_BASE) throw new Error("API base URL is not configured");

        let endpoint = "/api/activity/recent";

        if (primaryRole === "admin") {
          endpoint = "/api/activity/recent?scope=all";
        } else if (primaryRole === "agent") {
          endpoint = `/api/activity/recent?scope=agent&agentId=${encodeURIComponent(
            user.userId
          )}`;
        } else {
          endpoint = `/api/activity/recent?scope=user&userId=${encodeURIComponent(
            user.userId
          )}`;
        }

        const token =
          typeof window !== "undefined" ? localStorage.getItem("token") : null;
        if (!token) throw new Error("Not authenticated");

        const res = await fetch(`${API_BASE}${endpoint}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          signal,
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch recent activity (${res.status})`);
        }

        const data = await res.json();
        setActivities(Array.isArray(data) ? data : []);
      } catch (err: any) {
        if (err?.name === "AbortError") return;
        console.error("❌ Failed to fetch recent activity:", err);
        setError(
          err instanceof Error ? err.message : "Could not load activity"
        );
        setActivities([]);
      } finally {
        setLoading(false);
      }
    };

    fetchActivity();

    return () => controller.abort();
  }, [API_BASE, user?.userId, primaryRole, authLoading]);

  return (
    <div className="card bg-base-100 shadow-sm border border-base-300">
      <div className="card-body">
        <h3 className="card-title text-sm text-muted-foreground">
          Recent Activity
        </h3>

        {loading || authLoading ? (
          <p className="text-sm text-muted-foreground pt-2">
            Loading activity…
          </p>
        ) : error ? (
          <p className="text-sm text-red-500 pt-2">{error}</p>
        ) : activities.length === 0 ? (
          <p className="text-sm text-muted-foreground pt-2">
            No recent activity found.
          </p>
        ) : (
          <ul className="text-sm space-y-2 pt-2">
            {activities.map((act) => (
              <li key={act.id}>
                {act.message}{" "}
                <span className="text-xs text-muted-foreground">
                  ({new Date(act.createdAt).toLocaleDateString()})
                </span>
                {act.actorRole && (
                  <span className="ml-2 text-xs text-muted-foreground">
                    • {act.actorRole}
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
