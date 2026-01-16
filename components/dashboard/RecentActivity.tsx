// components/dashboard/RecentActivity.tsx
"use client";

import { useAuth } from "@/context/AuthContext";
import { account } from "@/lib/appwrite";
import { useEffect, useMemo, useState } from "react";

type Activity = {
  id: string;
  message: string;
  createdAt: string;
  actorId?: string;
  actorRole?: string;
};

export default function RecentActivity() {
  const { user, loading: authLoading } = useAuth();

  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const API_BASE =
    (process.env.NEXT_PUBLIC_API_URLV2 || "").replace(/\/$/, "") +
    `/api/${process.env.NEXT_PUBLIC_API_VERSION || "v2"}`;

  /* ----------------------------------
     RESOLVE PRIMARY ROLE
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

    const fetchActivity = async () => {
      setLoading(true);
      setError(null);

      try {
        // 1️⃣ Build endpoint
        let endpoint = "/activity/recent";

        if (primaryRole === "admin") {
          endpoint += "?scope=all";
        } else if (primaryRole === "agent") {
          endpoint += `?scope=agent&agentId=${encodeURIComponent(
            user.userId
          )}`;
        } else {
          endpoint += `?scope=user&userId=${encodeURIComponent(
            user.userId
          )}`;
        }

        // 2️⃣ Create fresh Appwrite JWT
        const jwt = await account.createJWT();

        // 3️⃣ Fetch activity
        const res = await fetch(`${API_BASE}${endpoint}`, {
          headers: {
            Authorization: `Bearer ${jwt.jwt}`,
            "Content-Type": "application/json",
          },
          signal: controller.signal,
        });

        if (!res.ok) {
          throw new Error(`Failed (${res.status})`);
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
  }, [authLoading, user, primaryRole, API_BASE]);

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
