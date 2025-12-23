"use client";

import { useAuth } from "@/context/AuthContext";
import { hasRole } from "@/lib/auth/role";
import { motion } from "framer-motion";
import {
  Briefcase,
  Calendar,
  Mail,
  MapPin,
  ShieldCheck,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";

/* ----------------------------------
   TYPES
----------------------------------- */
type Agent = {
  agentId: string;
  agencyName?: string;
  licenseNumber?: string;
  experienceYears?: number;
};

/* ----------------------------------
   PAGE
----------------------------------- */
export default function ProfilePage() {
  const { user, loading } = useAuth();
  const [agent, setAgent] = useState<Agent | null>(null);
  const [agentLoading, setAgentLoading] = useState(false);

  /* ----------------------------------
     FETCH AGENT DETAILS (ROLE-BASED)
  ----------------------------------- */
  useEffect(() => {
    if (!user || !hasRole(user, "agent") || !user.userId) return;

    const fetchAgents = async () => {
      setAgentLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/users/agents`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!res.ok) {
          throw new Error(`Failed to fetch agents: ${res.status}`);
        }

        const agents: Agent[] = await res.json();

        const matchedAgent = agents.find((a) => a.agentId === user.userId);

        setAgent(matchedAgent ?? null);
      } catch (err) {
        console.error("❌ Error fetching agent profile:", err);
        setAgent(null);
      } finally {
        setAgentLoading(false);
      }
    };

    fetchAgents();
  }, [user]);

  /* ----------------------------------
     LOADING / GUARDS
  ----------------------------------- */
  if (loading) {
    return (
      <div className="p-6 text-sm text-muted-foreground">Loading profile…</div>
    );
  }

  if (!user) {
    return (
      <div className="p-6 text-sm text-red-500">
        You must be logged in to view this page.
      </div>
    );
  }

  const isAgent = hasRole(user, "agent");
  const isAdmin = hasRole(user, "admin");

  /* ----------------------------------
     UI
  ----------------------------------- */
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="mx-auto max-w-4xl px-4 py-6 space-y-6">
      {/* ================= HEADER ================= */}
      <section className="rounded-2xl border bg-base-100 p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="h-7 w-7 text-primary" />
          </div>

          <div className="flex-1">
            <h1 className="text-xl font-semibold leading-tight">
              {user.firstName} {user.surname}
            </h1>

            <p className="text-sm text-muted-foreground break-all">
              {user.email}
            </p>

            <div className="flex flex-wrap gap-2 mt-2">
              {user.roles.map((r) => (
                <span
                  key={r}
                  className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary capitalize">
                  {r}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= BASIC INFO ================= */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InfoCard icon={Mail} label="Email" value={user.email} />
        <InfoCard icon={ShieldCheck} label="Status" value={user.status} />

        {user.country && (
          <InfoCard icon={MapPin} label="Country" value={user.country} />
        )}

        {user.dateOfBirth && (
          <InfoCard
            icon={Calendar}
            label="Date of Birth"
            value={user.dateOfBirth}
          />
        )}
      </section>

      {/* ================= AGENT PROFILE ================= */}
      {isAgent && (
        <section className="rounded-2xl border bg-base-100 p-5 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold">Agent Profile</h2>

          {agentLoading ? (
            <p className="text-sm text-muted-foreground">
              Loading agent details…
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <AgentRow label="Agent ID" value={user.userId} />
              <AgentRow label="Agency" value={agent?.agencyName ?? "—"} />
              <AgentRow
                label="License Number"
                value={agent?.licenseNumber ?? "—"}
              />
              <AgentRow
                label="Experience"
                value={
                  agent?.experienceYears
                    ? `${agent.experienceYears} years`
                    : "—"
                }
              />
            </div>
          )}
        </section>
      )}

      {/* ================= ADMIN ================= */}
      {isAdmin && (
        <section className="rounded-2xl border bg-base-100 p-5 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold">Admin Privileges</h2>
          <div className="flex items-center gap-3 text-sm">
            <ShieldCheck className="h-4 w-4 text-primary" />
            <span>Full system access</span>
          </div>
        </section>
      )}
    </motion.div>
  );
}

/* ----------------------------------
   COMPONENTS
----------------------------------- */

function InfoCard({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border bg-base-100 p-4 shadow-sm flex gap-3">
      <Icon className="h-5 w-5 text-primary mt-0.5 shrink-0" />
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-medium break-words">{value}</p>
      </div>
    </div>
  );
}

function AgentRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-3">
      <Briefcase className="h-4 w-4 text-primary shrink-0" />
      <span className="text-muted-foreground">{label}:</span>
      <span className="font-medium break-all">{value}</span>
    </div>
  );
}
