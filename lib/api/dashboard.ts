// src/lib/api/dashboard.ts
const API_BASE = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/$/, "");

export async function fetchAgentMetrics(agentId: string) {
  if (!agentId) throw new Error("agentId is required");
  const url = `${API_BASE}/api/dashboard/agent/${encodeURIComponent(agentId)}`;
  const res = await fetch(url, {
    method: "GET",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to fetch agent metrics: ${res.status} ${text}`);
  }
  return res.json();
}

export async function postAgentMetricsRecord(agentId: string, payload?: any) {
  if (!agentId) throw new Error("agentId is required");
  const url = `${API_BASE}/api/dashboard/agent/${encodeURIComponent(
    agentId
  )}/record`;
  const res = await fetch(url, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ metrics: payload ?? null }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to record agent metrics: ${res.status} ${text}`);
  }
  return res.json();
}
