// app/dashboard/pageClient.tsx
"use client";

import AdminPanel from "@/components/dashboard/admin/AdminPanel";
import AgentTools from "@/components/dashboard/agent/AgentTools";
import OverviewCards from "@/components/dashboard/OverviewCards";
import QuickActions from "@/components/dashboard/QuickActions";
import RecentActivity from "@/components/dashboard/RecentActivity";
import UserFavorites from "@/components/dashboard/user/UserFavorites";
import { useAuth } from "@/context/AuthContext";
import React, { useEffect, useState } from "react";

const DashboardPageClient: React.FC = () => {
  const { user, loading } = useAuth();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!loading) {
      if (!user?.userId) {
        return;
      }
      const t = setTimeout(() => setReady(true), 0);
      return () => clearTimeout(t);
    }
  }, [user, loading]);

  if (loading || !ready)
    return <div className="text-center py-10">Loading dashboard...</div>;

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
