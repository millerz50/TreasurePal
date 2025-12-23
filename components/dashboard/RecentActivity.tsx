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

export default function RecentActivity() {
  const { user, loading: authLoading } = useAuth();

  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const API_BASE = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/$/, "");

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

        const token = localStorage.getItem("token");
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
        if (err.name === "AbortError") return;
        console.error("❌ Failed to fetch recent activity:", err);
        setError("Could not load activity");
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
