"use client";

import OverviewCards from "@/components/dashboard/OverviewCards";
import QuickActions from "@/components/dashboard/QuickActions";
import RecentActivity from "@/components/dashboard/RecentActivity";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";

// Example role-specific components
import AdminPanel from "@/components/dashboard/admin/AdminPanel";
import AgentTools from "@/components/dashboard/agent/AgentTools";
import UserFavorites from "@/components/dashboard/user/UserFavorites";

export default function DashboardPageClient() {
  const { user, loading } = useAuth();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!loading) {
      if (!user?.userId) {
        // client-only fallback; actual redirect/guard is in app/dashboard/page.tsx
        return;
      } else {
        const timeout = setTimeout(() => setReady(true), 0);
        return () => clearTimeout(timeout);
      }
    }
  }, [user, loading]);

  if (loading || !ready) {
    return <div className="text-center py-10">Loading dashboard...</div>;
  }

  return (
    <div className="space-y-6">
      <OverviewCards />
      <RecentActivity />

      {user?.role === "agent" && <AgentTools />}
      {user?.role === "user" && <UserFavorites />}
      {user?.role === "admin" && (
        <>
          <QuickActions />
          <AdminPanel />
        </>
      )}
    </div>
  );
}
