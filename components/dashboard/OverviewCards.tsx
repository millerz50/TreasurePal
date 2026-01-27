// components/dashboard/OverviewCards.tsx

type Metrics = {
  propertiesCount?: number;
  historicalMetricRecords?: number;
  averagePropertyRating?: number | null;
  leadsCount?: number;
  conversionRate?: number | null; // expressed as decimal (0.12 => 12%)
  favoritesCount?: number;
  totalAgents?: number;
  totalProperties?: number;
  [key: string]: any;
};

type Props = {
  metrics?: Metrics | null;
  role?: "agent" | "user" | "admin" | string | null;
  loading?: boolean;
};

export default function OverviewCards({
  metrics,
  role = null,
  loading = false,
}: Props) {
  const showAgentExtras = role === "agent";
  const showUserExtras = role === "user";
  const showAdminExtras = role === "admin";

  // Format numbers safely
  const formatNumber = (v?: number | null) =>
    v === undefined || v === null ? "—" : v.toString();

  // Format percentages safely
  const formatPercent = (v?: number | null) =>
    v === undefined || v === null
      ? "—"
      : `${Math.round((v ?? 0) * 10000) / 100}%`;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* Properties */}
      <div className="p-4 bg-white rounded shadow">
        <div className="text-sm text-gray-500">Properties</div>
        <div className="text-2xl font-semibold">
          {loading ? "Loading…" : formatNumber(metrics?.propertiesCount)}
        </div>
      </div>

      {/* Average Rating */}
      <div className="p-4 bg-white rounded shadow">
        <div className="text-sm text-gray-500">Avg rating</div>
        <div className="text-2xl font-semibold">
          {loading ? "Loading…" : (metrics?.averagePropertyRating ?? "—")}
        </div>
      </div>

      {/* Historical Metric Records */}
      <div className="p-4 bg-white rounded shadow">
        <div className="text-sm text-gray-500">Metric records</div>
        <div className="text-2xl font-semibold">
          {loading
            ? "Loading…"
            : formatNumber(metrics?.historicalMetricRecords)}
        </div>
      </div>

      {/* Agent-specific metrics */}
      {showAgentExtras && (
        <>
          <div className="p-4 bg-white rounded shadow">
            <div className="text-sm text-gray-500">Leads</div>
            <div className="text-2xl font-semibold">
              {loading ? "Loading…" : formatNumber(metrics?.leadsCount)}
            </div>
          </div>

          <div className="p-4 bg-white rounded shadow">
            <div className="text-sm text-gray-500">Conversion rate</div>
            <div className="text-2xl font-semibold">
              {loading ? "Loading…" : formatPercent(metrics?.conversionRate)}
            </div>
          </div>
        </>
      )}

      {/* User-specific metrics */}
      {showUserExtras && (
        <div className="p-4 bg-white rounded shadow">
          <div className="text-sm text-gray-500">Favorites</div>
          <div className="text-2xl font-semibold">
            {loading ? "Loading…" : formatNumber(metrics?.favoritesCount)}
          </div>
        </div>
      )}

      {/* Admin-specific metrics */}
      {showAdminExtras && (
        <>
          <div className="p-4 bg-white rounded shadow">
            <div className="text-sm text-gray-500">Total agents</div>
            <div className="text-2xl font-semibold">
              {loading ? "Loading…" : formatNumber(metrics?.totalAgents)}
            </div>
          </div>

          <div className="p-4 bg-white rounded shadow">
            <div className="text-sm text-gray-500">Total properties</div>
            <div className="text-2xl font-semibold">
              {loading ? "Loading…" : formatNumber(metrics?.totalProperties)}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
