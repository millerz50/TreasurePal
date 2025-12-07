// components/dashboard/agent/AgentTools.tsx
"use client";

type Metrics = {
  agentId?: string;
  propertiesCount?: number;
  historicalMetricRecords?: number;
  averagePropertyRating?: number | null;
  leadsCount?: number;
  conversionRate?: number | null;
  [key: string]: any;
};

type Props = {
  metrics?: Metrics | null;
  loading?: boolean;
};

export default function AgentTools({ metrics, loading = false }: Props) {
  return (
    <section className="p-6 bg-base-100 border border-base-300 rounded-lg shadow-sm space-y-4">
      <h2 className="text-xl font-semibold text-primary">Agent Tools</h2>
      <p className="text-sm text-muted-foreground">
        Add new properties, manage listings, and track your portfolio
        performance.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button className="btn btn-outline w-full">Add Property</button>
        <button className="btn btn-outline w-full">Manage Listings</button>
        <button className="btn btn-outline w-full">View Inquiries</button>
        <button className="btn btn-outline w-full">Track Performance</button>
      </div>

      <div className="pt-4">
        <h3 className="text-sm font-medium text-gray-700">Snapshot</h3>
        {loading ? (
          <div className="text-sm text-gray-500">Loading metrics…</div>
        ) : (
          <div className="text-sm text-gray-700 space-y-1 mt-2">
            <div>Properties: {metrics?.propertiesCount ?? "—"}</div>
            <div>Avg rating: {metrics?.averagePropertyRating ?? "—"}</div>
            <div>Records: {metrics?.historicalMetricRecords ?? "—"}</div>
            <div>Leads: {metrics?.leadsCount ?? "—"}</div>
            <div>
              Conversion:{" "}
              {metrics?.conversionRate == null
                ? "—"
                : `${Math.round((metrics.conversionRate ?? 0) * 10000) / 100}%`}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
