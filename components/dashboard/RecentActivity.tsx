"use client";

import { useAuth } from "@/context/AuthContext";
import { account } from "@/lib/appwrite";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Coins,
  UserPlus,
  BadgeCheck,
  LogIn,
  Activity as ActivityIcon,
} from "lucide-react";

/* =========================
   TYPES
========================= */
type Activity = {
  id: string;
  message: string;
  createdAt: string;
  actorId?: string;
  action?: string;
};

/* =========================
   ICON RESOLVER
========================= */
function getActivityIcon(action?: string) {
  switch (action) {
    case "credits_added":
    case "credits_deducted":
      return Coins;
    case "signin_bonus":
    case "login":
      return LogIn;
    case "user_created":
      return UserPlus;
    case "agent_approved":
      return BadgeCheck;
    default:
      return ActivityIcon;
  }
}

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
        let endpoint = "/activity/recent";

        // 🔒 Admin sees all, others see only their own activity
        if (primaryRole === "admin") {
          endpoint += "?scope=all";
        } else {
          endpoint += `?scope=user&actorId=${encodeURIComponent(user.accountid)}`;
        }

        // Create fresh Appwrite JWT
        const jwt = await account.createJWT();

        const res = await fetch(`${API_BASE}${endpoint}`, {
          headers: {
            Authorization: `Bearer ${jwt.jwt}`,
            "Content-Type": "application/json",
          },
          signal: controller.signal,
        });

        if (!res.ok) throw new Error(`Failed (${res.status})`);

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
    <div className="rounded-2xl border border-base-300 bg-base-100 shadow-sm">
      <div className="p-4">
        <h3 className="text-sm font-semibold text-muted-foreground">
          Recent Activity
        </h3>

        {loading || authLoading ? (
          <p className="mt-3 text-sm text-muted-foreground">
            Loading activity…
          </p>
        ) : error ? (
          <p className="mt-3 text-sm text-red-500">{error}</p>
        ) : activities.length === 0 ? (
          <p className="mt-3 text-sm text-muted-foreground">
            You have no recent activity.
          </p>
        ) : (
          <ul className="mt-3 space-y-2">
            <AnimatePresence>
              {activities.map((act) => {
                const Icon = getActivityIcon(act.action);
                return (
                  <motion.li
                    key={act.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="flex items-start gap-3 rounded-xl border border-base-200 bg-base-50 px-3 py-2"
                  >
                    <div className="mt-0.5 rounded-lg bg-primary/10 p-1.5 text-primary">
                      <Icon className="h-4 w-4" />
                    </div>

                    <div className="flex-1">
                      <p className="text-sm">{act.message}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(act.createdAt).toLocaleString()}
                        {primaryRole === "admin" && act.actorId && (
                          <> • Actor: {act.actorId}</>
                        )}
                      </p>
                    </div>
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </ul>
        )}
      </div>
    </div>
  );
}
