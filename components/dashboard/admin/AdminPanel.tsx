"use client";

import { ShieldCheck, UserCheck } from "lucide-react";
import { useEffect, useState } from "react";

type User = {
  $id: string;
  userId: string;
  fullname: string;
  email: string;
  verified?: boolean;
  rating?: number;
  message?: string;
  agentId?: string;
};

/* ----------------------------------
   API versioning env
----------------------------------- */
const API_VERSION = (process.env.NEXT_PUBLIC_API_VERSION || "v1").trim();

const API_BASE_V1 =
  process.env.NEXT_PUBLIC_API_URLV1?.replace(/\/+$/, "") ?? "";
const API_BASE_V2 =
  process.env.NEXT_PUBLIC_API_URLV2?.replace(/\/+$/, "") ?? "";

const API_BASE =
  API_VERSION === "v2" && API_BASE_V2
    ? `${API_BASE_V2}/api/v2`
    : `${API_BASE_V1}/api/v1`;

export default function AdminPanel() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // 🔑 Get JWT from localStorage (or however you store it after login)
  const jwt =
    typeof window !== "undefined" ? localStorage.getItem("jwt") : null;

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`${API_BASE}/agents/applications/pending`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            ...(jwt ? { Authorization: `Bearer ${jwt}` } : {}),
          },
        });
        if (!res.ok) throw new Error("Failed to load users");

        const data = await res.json();
        // backend returns { success: true, data: [...] }
        setUsers(data.data || []);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Error loading users");
      } finally {
        setLoading(false);
      }
    };

    if (jwt) {
      loadUsers();
    } else {
      setError("No JWT token found. Please log in as admin.");
    }
  }, [jwt]);

  const approveAgent = async (userId: string) => {
    setActionLoading(userId);
    try {
      const res = await fetch(`${API_BASE}/agents/${userId}/approve`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          ...(jwt ? { Authorization: `Bearer ${jwt}` } : {}),
        },
        body: JSON.stringify({ reviewNotes: "Approved via Admin Panel" }),
      });
      if (!res.ok) throw new Error("Approval failed");

      setUsers((prev) =>
        prev.map((u) => (u.$id === userId ? { ...u, verified: true } : u))
      );
    } catch {
      alert("❌ Failed to approve agent");
    } finally {
      setActionLoading(null);
    }
  };

  const disapproveAgent = async (userId: string) => {
    setActionLoading(userId);
    try {
      const res = await fetch(`${API_BASE}/agents/${userId}/disapprove`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          ...(jwt ? { Authorization: `Bearer ${jwt}` } : {}),
        },
        body: JSON.stringify({ reviewNotes: "Disapproved via Admin Panel" }),
      });
      if (!res.ok) throw new Error("Disapproval failed");

      setUsers((prev) =>
        prev.map((u) => (u.$id === userId ? { ...u, verified: false } : u))
      );
    } catch {
      alert("❌ Failed to disapprove agent");
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <section className="p-6 bg-base-100 border border-base-300 rounded-2xl shadow-sm space-y-6">
      <div className="flex items-center gap-3">
        <ShieldCheck className="h-6 w-6 text-primary" />
        <h2 className="text-xl font-semibold">Admin Panel</h2>
      </div>

      <p className="text-sm text-muted-foreground">
        Approve agents, manage verification, and oversee system access.
      </p>

      {error && <div className="text-sm text-red-600">{error}</div>}
      {loading && (
        <div className="text-sm text-muted-foreground">Loading users…</div>
      )}

      {!loading && users.length > 0 && (
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
              {users.map((user) => (
                <tr key={user.$id}>
                  <td className="font-medium">{user.fullname}</td>
                  <td className="text-xs">{user.email}</td>
                  <td className="text-xs">{user.verified ? "Yes" : "No"}</td>
                  <td className="text-right space-x-2">
                    {!user.verified && (
                      <button
                        onClick={() => approveAgent(user.$id)}
                        disabled={actionLoading === user.$id}
                        className="btn btn-xs btn-outline btn-primary"
                      >
                        <UserCheck className="h-4 w-4 mr-1" />
                        Approve Agent
                      </button>
                    )}
                    {user.verified && (
                      <button
                        onClick={() => disapproveAgent(user.$id)}
                        disabled={actionLoading === user.$id}
                        className="btn btn-xs btn-outline btn-error"
                      >
                        Disapprove
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && users.length === 0 && !error && (
        <div className="text-sm text-muted-foreground">No pending applications.</div>
      )}
    </section>
  );
}
