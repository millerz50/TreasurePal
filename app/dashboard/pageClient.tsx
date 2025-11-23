// app/dashboard/pageClient.tsx
"use client";

import OverviewCards from "@/components/dashboard/OverviewCards";
import QuickActions from "@/components/dashboard/QuickActions";
import RecentActivity from "@/components/dashboard/RecentActivity";
import { useAuth } from "@/context/AuthContext";
import React, { useEffect, useState } from "react";

// Role-specific client components — ensure these are client-safe (no next/headers etc.)
import AdminPanel from "@/components/dashboard/admin/AdminPanel";
import AgentTools from "@/components/dashboard/agent/AgentTools";
import UserFavorites from "@/components/dashboard/user/UserFavorites";

const DashboardPageClient: React.FC = () => {
  const { user, loading } = useAuth();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!loading) {
      if (!user?.userId) {
        // client-only fallback; server page already guards
        return;
      }
      const t = setTimeout(() => setReady(true), 0);
      return () => clearTimeout(t);
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
};

export default DashboardPageClient;
export { DashboardPageClient };
