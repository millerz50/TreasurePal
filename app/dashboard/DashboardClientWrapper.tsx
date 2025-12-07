"use client";

import AdminPanel from "@/components/dashboard/admin/AdminPanel";
import AgentTools from "@/components/dashboard/agent/AgentTools";
import OverviewCards from "@/components/dashboard/OverviewCards";
import QuickActions from "@/components/dashboard/QuickActions";
import RecentActivity from "@/components/dashboard/RecentActivity";
import UserFavorites from "@/components/dashboard/user/UserFavorites";
import { useAuth } from "@/context/AuthContext";
import { fetchAgentMetrics } from "@/lib/api/dashboard";
import React, { useEffect, useState } from "react";

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

  useEffect(() => {
    if (loading) return;

    if (!user?.userId) {
      setReady(false);
      return;
    }

    const t = setTimeout(() => setReady(true), 0);
    return () => clearTimeout(t);
  }, [user, loading]);

  useEffect(() => {
    if (!ready || loading) return;
    if (!user?.userId) return;

    const load = async () => {
      if (user.role !== "agent") return;
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
  }, [ready, loading, user]);

  if (loading || !ready) {
    return <div className="text-center py-10">Loading dashboard...</div>;
  }

  return (
    <div className="space-y-6">
      <OverviewCards
        metrics={metrics}
        role={user?.role ?? null}
        loading={loadingMetrics}
      />
      <RecentActivity />

      {error && <div className="text-sm text-red-600">{error}</div>}

      {user?.role === "agent" && (
        <AgentTools metrics={metrics} loading={loadingMetrics} />
      )}

      {user?.role === "user" && <UserFavorites />}

      {user?.role === "admin" && (
        <>
          <QuickActions role={user.role} loading={loadingMetrics} />
          <AdminPanel />
        </>
      )}
    </div>
  );
};

export default DashboardClientWrapper;
