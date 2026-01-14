// src/features/admin/components/AdminPanel.tsx
"use client";

import { ShieldCheck, UserCheck } from "lucide-react";
import { useEffect, useState } from "react";

/* ----------------------------------
   API URL SELECTION
   - Uses env var NEXT_PUBLIC_API_VERSION to pick v1 or v2.
   - If NEXT_PUBLIC_API_VERSION is not set, falls back to V2 then V1.
   - Expected env values for version: "v1" or "v2"
----------------------------------- */
function getApiUrl(): string {
  const v = process.env.NEXT_PUBLIC_API_VERSION;
  const v1 = process.env.NEXT_PUBLIC_API_URLV1;
  const v2 = process.env.NEXT_PUBLIC_API_URLV2;

  if (v === "v2" && v2) return v2;
  if (v === "v1" && v1) return v1;

  // fallback order: V2 then V1
  if (v2) return v2;
  if (v1) return v1;

  return "";
}

/* ----------------------------------
   TYPES
----------------------------------- */
type User = {
  $id: string;
  firstName: string;
  surname: string;
  email: string;
  roles: string[];
  status?: string;
};

/* ----------------------------------
   COMPONENT
----------------------------------- */
export default function AdminPanel() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  /* ----------------------------------
     FETCH USERS (ADMIN ONLY)
  ----------------------------------- */
  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      setError(null);

      try {
        const API_URL = getApiUrl();
        if (!API_URL) throw new Error("API base URL is not configured.");

        const res = await fetch(`${API_URL}/api/admin/users`);
        if (!res.ok) throw new Error("Failed to load users");

        const data = await res.json();
        setUsers(data);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Error loading users");
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  /* ----------------------------------
     APPROVE AGENT
  ----------------------------------- */
  const approveAgent = async (userId: string) => {
    setActionLoading(userId);

    try {
      const API_URL = getApiUrl();
      if (!API_URL) throw new Error("API base URL is not configured.");

      const res = await fetch(`${API_URL}/api/admin/agents/${userId}/approve`, {
        method: "POST",
      });

      if (!res.ok) throw new Error("Approval failed");

      setUsers((prev) =>
        prev.map((u) =>
          u.$id === userId
            ? { ...u, roles: Array.from(new Set([...u.roles, "agent"])) }
            : u
        )
      );
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "❌ Failed to approve agent";
      alert(msg);
    } finally {
      setActionLoading(null);
    }
  };

  /* ----------------------------------
     DISAPPROVE AGENT
  ----------------------------------- */
  const disapproveAgent = async (userId: string) => {
    setActionLoading(userId);

    try {
      const API_URL = getApiUrl();
      if (!API_URL) throw new Error("API base URL is not configured.");

      const res = await fetch(
        `${API_URL}/api/admin/agents/${userId}/disapprove`,
        {
          method: "POST",
        }
      );

      if (!res.ok) throw new Error("Disapproval failed");

      setUsers((prev) => prev.filter((u) => u.$id !== userId));
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "❌ Failed to disapprove agent";
      alert(msg);
    } finally {
      setActionLoading(null);
    }
  };

  /* ----------------------------------
     UI
  ----------------------------------- */
  return (
    <section className="p-6 bg-base-100 border border-base-300 rounded-2xl shadow-sm space-y-6">
      <div className="flex items-center gap-3">
        <ShieldCheck className="h-6 w-6 text-primary" />
        <h2 className="text-xl font-semibold">Admin Panel</h2>
      </div>

      <p className="text-sm text-muted-foreground">
        Approve agents, manage user roles, and oversee system access.
      </p>

      {/* ERROR */}
      {error && <div className="text-sm text-red-600">{error}</div>}

      {/* LOADING */}
      {loading && (
        <div className="text-sm text-muted-foreground">Loading users…</div>
      )}

      {/* USERS TABLE */}
      {!loading && (
        <div className="overflow-x-auto">
          <table className="table table-sm">
            <thead>
              <tr className="text-xs uppercase text-muted-foreground">
                <th>User</th>
                <th>Email</th>
                <th>Roles</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => {
                const isAgent = user.roles.includes("agent");

                return (
                  <tr key={user.$id}>
                    <td className="font-medium">
                      {user.firstName} {user.surname}
                    </td>
                    <td className="text-xs">{user.email}</td>
                    <td className="text-xs capitalize">
                      {user.roles.join(", ")}
                    </td>
                    <td className="text-right space-x-2">
                      {!isAgent && (
                        <button
                          onClick={() => approveAgent(user.$id)}
                          disabled={actionLoading === user.$id}
                          className="btn btn-xs btn-outline btn-primary"
                        >
                          <UserCheck className="h-4 w-4 mr-1" />
                          Approve Agent
                        </button>
                      )}

                      {isAgent && (
                        <button
                          onClick={() => disapproveAgent(user.$id)}
                          disabled={actionLoading === user.$id}
                          className="btn btn-xs btn-outline btn-danger"
                        >
                          Disapprove
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
