"use client";

import AdminPanel from "@/components/dashboard/admin/AdminPanel";
import AgentTools from "@/components/dashboard/agent/AgentTools";
import OverviewCards from "@/components/dashboard/OverviewCards";
import QuickActions from "@/components/dashboard/QuickActions";
import RecentActivity from "@/components/dashboard/RecentActivity";
import UserFavorites from "@/components/dashboard/user/UserFavorites";
import { useAuth } from "@/context/AuthContext";
import { fetchAgentMetrics } from "@/lib/api/dashboard";
import React, { useEffect, useMemo, useState } from "react";

/* ----------------------------------
   TYPES
----------------------------------- */
export type Metrics = {
  agentId?: string;
  propertiesCount?: number;
  historicalMetricRecords?: number;
  averagePropertyRating?: number | null;
  leadsCount?: number;
  conversionRate?: number | null;
  favoritesCount?: number;
  totalAgents?: number;
  totalProperties?: number;
  lastComputedAt?: string;
  [key: string]: any;
};

const DashboardClientWrapper: React.FC = () => {
  const { user, loading } = useAuth();

  const [ready, setReady] = useState(false);
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loadingMetrics, setLoadingMetrics] = useState(false);

  /* ----------------------------------
     RESOLVE PRIMARY ROLE
  ----------------------------------- */
  const primaryRole = useMemo<"admin" | "agent" | "user" | null>(() => {
    if (!user?.roles?.length) return null;
    if (user.roles.includes("admin")) return "admin";
    if (user.roles.includes("agent")) return "agent";
    return "user";
  }, [user?.roles]);

  /* ----------------------------------
     READY STATE
  ----------------------------------- */
  useEffect(() => {
    if (loading) return;

    if (!user?.userId) {
      setReady(false);
      return;
    }

    const t = setTimeout(() => setReady(true), 0);
    return () => clearTimeout(t);
  }, [user, loading]);

  /* ----------------------------------
     AGENT METRICS
  ----------------------------------- */
  useEffect(() => {
    if (!ready || loading) return;
    if (!user?.userId) return;
    if (primaryRole !== "agent") return;

    const load = async () => {
      setLoadingMetrics(true);
      setError(null);

      try {
        const res = await fetchAgentMetrics(user.userId);
        const data = res?.metrics ?? res;
        setMetrics(data ?? null);
      } catch (err: any) {
        console.error("Failed to load agent metrics:", err);
        setError(err?.message ?? "Failed to load metrics");
        setMetrics(null);
      } finally {
        setLoadingMetrics(false);
      }
    };

    load();
  }, [ready, loading, user?.userId, primaryRole]);

  /* ----------------------------------
     LOADING STATE
  ----------------------------------- */
  if (loading || !ready) {
    return <div className="text-center py-10">Loading dashboard...</div>;
  }

  /* ----------------------------------
     RENDER
  ----------------------------------- */
  return (
    <div className="space-y-6">
      <OverviewCards
        metrics={metrics}
        role={primaryRole}
        loading={loadingMetrics}
      />

      <RecentActivity />

      {error && <div className="text-sm text-red-600">{error}</div>}

      {primaryRole === "agent" && (
        <AgentTools metrics={metrics} loading={loadingMetrics} />
      )}

      {primaryRole === "user" && <UserFavorites />}

      {primaryRole === "admin" && (
        <>
          <QuickActions role={primaryRole} loading={loadingMetrics} />
          <AdminPanel />
        </>
      )}
    </div>
  );
};

export default DashboardClientWrapper;
