"use client";

import { ShieldCheck, UserCheck } from "lucide-react";
import { useEffect, useState } from "react";

/* ----------------------------------
   TYPES
----------------------------------- */
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
        const res = await fetch("/api/admin/users");
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
     APPROVE AGENT (set verified = true)
  ----------------------------------- */
  const approveAgent = async (userId: string) => {
    setActionLoading(userId);

    try {
      const res = await fetch(`/api/admin/agents/${userId}/approve`, {
        method: "POST",
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

  /* ----------------------------------
     DISAPPROVE AGENT (set verified = false)
  ----------------------------------- */
  const disapproveAgent = async (userId: string) => {
    setActionLoading(userId);

    try {
      const res = await fetch(`/api/admin/agents/${userId}/disapprove`, {
        method: "POST",
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

  /* ----------------------------------
     UIs
  ----------------------------------- */
  return (
    <section className="p-6 bg-base-100 border border-base-300 rounded-2xl shadow-sm space-y-6">
      <div className="flex items-center gap-3">
        <ShieldCheck className="h-6 w-6 text-primary" />
        <h2 className="text-xl font-semibold">Admin Panel</h2>
      </div>

      <p className="text-sm text-muted-foreground">
        Approve agents, manage verification, and oversee system access.
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
                        className="btn btn-xs btn-outline btn-danger"
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
    </section>
  );
}
