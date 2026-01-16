"use client";

import { ShieldCheck, UserCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { account } from "@/lib/appwrite";

/* =========================
   TYPES
========================= */
type AgentApplication = {
  $id: string;
  userId: string;
  fullname: string;
  message: string;
  verified: boolean;
};

type UserMap = Record<string, string>; // accountid -> email

/* =========================
   API ENV
========================= */
const API_VERSION = (process.env.NEXT_PUBLIC_API_VERSION || "v2").trim();
const API_BASE_V1 =
  process.env.NEXT_PUBLIC_API_URLV1?.replace(/\/+$/, "") ?? "";
const API_BASE_V2 =
  process.env.NEXT_PUBLIC_API_URLV2?.replace(/\/+$/, "") ?? "";

const API_BASE =
  API_VERSION === "v2" && API_BASE_V2
    ? `${API_BASE_V2}/api/v2`
    : `${API_BASE_V1}/api/v1`;

export default function AdminPanel() {
  const [applications, setApplications] = useState<AgentApplication[]>([]);
  const [emails, setEmails] = useState<UserMap>({});
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  /* =========================
     API HELPER (JWT)
  ========================= */
  const apiRequest = async (
    url: string,
    method: "GET" | "POST" = "GET",
    body?: any
  ) => {
    const jwtResponse = await account.createJWT();

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtResponse.jwt}`,
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!res.ok) {
      throw new Error(await res.text());
    }

    return res.json();
  };

  /* =========================
     FETCH PENDING APPLICATIONS
  ========================= */
  const fetchApplications = async () => {
    setLoading(true);
    setError(null);

    try {
      // 1️⃣ Get pending agent applications
      const res = await apiRequest(
        `${API_BASE}/agents/applications/pending`
      );

      const apps: AgentApplication[] = res.data || [];
      setApplications(apps);

      // 2️⃣ Fetch user emails for each accountid
const emailMap: UserMap = {};

await Promise.all(
  apps.map(async (app) => {
    // ✅ agent_profiles uses userId (Appwrite account ID)
    const accountId = app.userId;

    if (!accountId) {
      console.warn("Missing userId in agent profile:", app);
      return;
    }

    try {
      // ✅ matches: router.get("/:id", verifyTokenAndAdmin)
      const userRes = await apiRequest(
        `${API_BASE}/users/${accountId}`
      );

      emailMap[accountId] = userRes.data?.email ?? "—";
    } catch (err) {
      console.error("Failed to fetch user for agent:", accountId, err);
      emailMap[accountId] = "—";
    }
  })
);

setEmails(emailMap);



    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  /* =========================
     ACTIONS
  ========================= */
  const approveAgent = async (applicationId: string) => {
    setActionLoading(applicationId);
    try {
      await apiRequest(
        `${API_BASE}/agents/${applicationId}/approve`,
        "POST",
        { reviewNotes: "Approved via Admin Panel" }
      );

      setApplications((prev) =>
        prev.map((a) =>
          a.$id === applicationId ? { ...a, verified: true } : a
        )
      );
    } catch {
      alert("❌ Failed to approve agent");
    } finally {
      setActionLoading(null);
    }
  };

  const rejectAgent = async (applicationId: string) => {
    setActionLoading(applicationId);
    try {
      await apiRequest(
        `${API_BASE}/agents/${applicationId}/reject`,
        "POST",
        { reviewNotes: "Rejected via Admin Panel" }
      );

      setApplications((prev) =>
        prev.map((a) =>
          a.$id === applicationId ? { ...a, verified: false } : a
        )
      );
    } catch {
      alert("❌ Failed to reject agent");
    } finally {
      setActionLoading(null);
    }
  };

  /* =========================
     UI
  ========================= */
  return (
    <section className="p-6 bg-base-100 border border-base-300 rounded-2xl shadow-sm space-y-6">
      <div className="flex items-center gap-3">
        <ShieldCheck className="h-6 w-6 text-primary" />
        <h2 className="text-xl font-semibold">Admin Panel</h2>
      </div>

      <p className="text-sm text-muted-foreground">
        Review and approve agent applications.
      </p>

      {error && <div className="text-sm text-red-600">{error}</div>}
      {loading && (
        <div className="text-sm text-muted-foreground">
          Loading applications…
        </div>
      )}

      {!loading && applications.length > 0 && (
        <div className="overflow-x-auto">
          <table className="table table-sm">
            <thead>
              <tr className="text-xs uppercase text-muted-foreground">
                <th>Full Name</th>
                <th>Email</th>
                <th>Verified</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app.$id}>
                  <td className="font-medium">{app.fullname}</td>
                  <td className="text-xs">
                    {emails[app.accountid] ?? "—"}
                  </td>
                  <td className="text-xs">
                    {app.verified ? "Yes" : "No"}
                  </td>
                  <td className="text-right space-x-2">
                    {!app.verified && (
                      <button
                        onClick={() => approveAgent(app.$id)}
                        disabled={actionLoading === app.$id}
                        className="btn btn-xs btn-outline btn-primary"
                      >
                        <UserCheck className="h-4 w-4 mr-1" />
                        Approve
                      </button>
                    )}
                    {app.verified && (
                      <button
                        onClick={() => rejectAgent(app.$id)}
                        disabled={actionLoading === app.$id}
                        className="btn btn-xs btn-outline btn-error"
                      >
                        Reject
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && applications.length === 0 && !error && (
        <div className="text-sm text-muted-foreground">
          No pending applications.
        </div>
      )}
    </section>
  );
}


