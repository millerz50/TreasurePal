"use client";

import { useEffect, useState } from "react";

type Activity = {
  id: string;
  message: string;
  createdAt: string;
};

export default function RecentActivity() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const API_BASE = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchActivity = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_BASE}/api/activity/recent`);
        if (!res.ok) {
          throw new Error(`Failed to fetch recent activity (${res.status})`);
        }
        const data = await res.json();
        // Expecting backend to return an array of { id, message, createdAt }
        setActivities(data);
      } catch (err) {
        console.error("❌ Failed to fetch recent activity:", err);
        setError("Could not load activity");
      } finally {
        setLoading(false);
      }
    };

    fetchActivity();
  }, [API_BASE]);

  return (
    <div className="card bg-base-100 shadow-sm border border-base-300">
      <div className="card-body">
        <h3 className="card-title text-sm text-muted-foreground">
          Recent Activity
        </h3>

        {loading ? (
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
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
