// src/lib/api/dashboard.ts
const RAW_API_BASE = process.env.NEXT_PUBLIC_API_URL || "";
export const API_BASE = RAW_API_BASE.replace(/\/$/, "") || "";

/**
 * Build a full URL for the API. If API_BASE is empty, returns a relative path.
 */
function buildUrl(path: string) {
  if (!API_BASE) return path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE}${path.startsWith("/") ? path : `/${path}`}`;
}

type ApiError = Error & { status?: number; body?: any };

/**
 * Fetch helper that parses JSON/text and throws an Error with .status and .body when response is not ok.
 */
async function fetchJson(url: string, opts: RequestInit = {}) {
  const res = await fetch(url, opts);
  const text = await res.text().catch(() => "");
  let body: any = null;
  try {
    body = text ? JSON.parse(text) : null;
  } catch {
    body = text;
  }

  if (!res.ok) {
    const err: ApiError = new Error(
      `Request failed: ${res.status} ${res.statusText}`
    );
    err.status = res.status;
    err.body = body;
    throw err;
  }

  return body;
}

/**
 * GET /api/dashboard/agent/:id
 */
export async function fetchAgentMetrics(agentId: string) {
  if (!agentId) throw new Error("agentId is required");
  const url = buildUrl(`/api/dashboard/agent/${encodeURIComponent(agentId)}`);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  return fetchJson(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
}

/**
 * POST /api/dashboard/agent/:id/record
 */
export async function postAgentMetricsRecord(agentId: string, payload?: any) {
  if (!agentId) throw new Error("agentId is required");
  const url = buildUrl(
    `/api/dashboard/agent/${encodeURIComponent(agentId)}/record`
  );

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  return fetchJson(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ metrics: payload ?? null }),
  });
}
