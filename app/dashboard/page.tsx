"use client";

import OverviewCards from "@/components/dashboard/OverviewCards";
import QuickActions from "@/components/dashboard/QuickActions";
import RecentActivity from "@/components/dashboard/RecentActivity";
import { useAuth } from "@/context/AuthContext";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";

// Example role-specific components
import AdminPanel from "@/components/dashboard/admin/AdminPanel";
import AgentTools from "@/components/dashboard/agent/AgentTools";
import UserFavorites from "@/components/dashboard/user/UserFavorites";

export default function DashboardPage() {
  const { user, loading } = useAuth(); // ✅ use `user` instead of `agent`
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!loading) {
      if (!user?.userId) {
        notFound();
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
      {/* ✅ Shared components for all roles */}
      <OverviewCards />
      <RecentActivity />

      {/* ✅ Role-specific sections */}
      {/* Role-specific sections */}
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
