"use client";

import OverviewCards from "@/components/dashboard/OverviewCards";
import QuickActions from "@/components/dashboard/QuickActions";
import RecentActivity from "@/components/dashboard/RecentActivity";
import { useAuth } from "@/context/AuthContext";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const { agent, loading } = useAuth();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!loading) {
      if (!agent?.userId) {
        notFound();
      } else {
        const timeout = setTimeout(() => setReady(true), 0);
        return () => clearTimeout(timeout);
      }
    }
  }, [agent, loading]);

  if (loading || !ready) {
    return <div className="text-center py-10">Loading dashboard...</div>;
  }

  return (
    <div className="space-y-6">
      <OverviewCards />
      <QuickActions />
      <RecentActivity />
    </div>
  );
}
