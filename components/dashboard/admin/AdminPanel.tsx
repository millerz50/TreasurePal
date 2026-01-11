"use client";

import { ShieldCheck, UserCheck } from "lucide-react";
import { useEffect, useState } from "react";

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
        const res = await fetch(
          "https://treasurepalapi.onrender.com/api/admin/users"
        );
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
      const res = await fetch(
        `https://treasurepalapi.onrender.com/api/admin/agents/${userId}/approve`,
        {
          method: "POST",
        }
      );

      if (!res.ok) throw new Error("Approval failed");

      setUsers((prev) =>
        prev.map((u) =>
          u.$id === userId ? { ...u, roles: [...u.roles, "agent"] } : u
        )
      );
    } catch {
      alert("❌ Failed to approve agent");
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
      const res = await fetch(`/api/admin/agents/${userId}/disapprove`, {
        method: "POST",
      });

      if (!res.ok) throw new Error("Disapproval failed");

      setUsers((prev) => prev.filter((u) => u.$id !== userId));
    } catch {
      alert("❌ Failed to disapprove agent");
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
