"use client";

import { ShieldCheck, UserCheck, CheckSquare } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
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
  accountid: string;
};

type Property = {
  $id: string;
  title: string;
  status: string;
  published: boolean;
  agentId: string;
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

/* =========================
   COMPONENT
========================= */
export default function AdminPanel() {
  const [applications, setApplications] = useState<AgentApplication[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);
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
    body?: any,
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
     FETCH PENDING AGENTS & PROPERTIES
  ========================= */
  const fetchApplications = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // 1️⃣ Get pending agent applications
      const res = await apiRequest(`${API_BASE}/agents/applications/pending`);
      const apps: AgentApplication[] = res.data || [];
      setApplications(apps);

      // 2️⃣ Fetch user emails for each accountid
      const emailMap: UserMap = {};
      await Promise.all(
        apps.map(async (app) => {
          const accountId = app.userId;
          if (!accountId) return;
          try {
            const userRes = await apiRequest(`${API_BASE}/users/${accountId}`);
            emailMap[accountId] = userRes.data?.email ?? "—";
          } catch {
            emailMap[accountId] = "—";
          }
        }),
      );
      setEmails(emailMap);

      // 3️⃣ Fetch pending properties
      const propRes = await apiRequest(`${API_BASE}/properties/pending`);
      const pendingProps: Property[] = (propRes.data || []).filter(
        (p: Property) => !p.published || p.status === "pending",
      );
      setProperties(pendingProps);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to load data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  /* =========================
     ACTIONS
  ========================= */
  const approveAgent = async (applicationId: string) => {
    setActionLoading(applicationId);
    try {
      await apiRequest(
        `${API_BASE}/agents/applications/${applicationId}/approve`,
        "POST",
        {
          reviewNotes: "Approved via Admin Panel",
        },
      );
      setApplications((prev) =>
        prev.map((a) =>
          a.$id === applicationId ? { ...a, verified: true } : a,
        ),
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
        `${API_BASE}/agents/applications/${applicationId}/reject`,
        "POST",
        {
          reviewNotes: "Rejected via Admin Panel",
        },
      );
      setApplications((prev) =>
        prev.map((a) =>
          a.$id === applicationId ? { ...a, verified: false } : a,
        ),
      );
    } catch {
      alert("❌ Failed to reject agent");
    } finally {
      setActionLoading(null);
    }
  };

  const approveProperty = async (propertyId: string) => {
    setActionLoading(propertyId);
    try {
      await apiRequest(`${API_BASE}/admin/approve/${propertyId}`, "POST");
      setProperties((prev) =>
        prev.map((p) =>
          p.$id === propertyId
            ? { ...p, status: "Active", published: true }
            : p,
        ),
      );
    } catch {
      alert("❌ Failed to approve property");
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
        Review and approve agent applications and properties.
      </p>

      {error && <div className="text-sm text-red-600">{error}</div>}
      {loading && <div className="text-sm text-muted-foreground">Loading…</div>}

      {/* -------------------- AGENT APPLICATIONS -------------------- */}
      {!loading && applications.length > 0 && (
        <div className="overflow-x-auto">
          <h3 className="text-sm font-medium mb-2">Agent Applications</h3>
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
                  <td className="text-xs">{emails[app.accountid] ?? "—"}</td>
                  <td className="text-xs">{app.verified ? "Yes" : "No"}</td>
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

      {/* -------------------- PROPERTIES -------------------- */}
      {!loading && properties.length > 0 && (
        <div className="overflow-x-auto mt-4">
          <h3 className="text-sm font-medium mb-2">Pending Properties</h3>
          <table className="table table-sm">
            <thead>
              <tr className="text-xs uppercase text-muted-foreground">
                <th>Title</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {properties.map((prop) => (
                <tr key={prop.$id}>
                  <td className="font-medium">{prop.title}</td>
                  <td className="text-xs">{prop.status}</td>
                  <td className="text-right">
                    {!prop.published && (
                      <button
                        onClick={() => approveProperty(prop.$id)}
                        disabled={actionLoading === prop.$id}
                        className="btn btn-xs btn-outline btn-primary"
                      >
                        <CheckSquare className="h-4 w-4 mr-1" />
                        Approve
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading &&
        applications.length === 0 &&
        properties.length === 0 &&
        !error && (
          <div className="text-sm text-muted-foreground">
            No pending applications or properties.
          </div>
        )}
    </section>
  );
}
