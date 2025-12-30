// lib/api/agents.ts
export type AgentPayload = {
  accountid: string; // required (Appwrite account id or your auth id)
  userId?: string | null;
  fullName?: string | null;
  email?: string | null;
  phone?: string | null;
  city?: string | null;
  licenseNumber?: string | null;
  agencyId?: string | null;
  rating?: number | null;
  verified?: boolean | null;
  message?: string | null;
};

export async function submitAgentApplication(payload: AgentPayload) {
  const res = await fetch("/api/agents/apply", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const json = await res.json().catch(() => null);
    throw new Error(
      json?.message || `Request failed with status ${res.status}`
    );
  }

  return res.json();
}
