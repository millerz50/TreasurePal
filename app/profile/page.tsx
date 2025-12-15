"use client";

import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import {
  Briefcase,
  Calendar,
  Mail,
  MapPin,
  ShieldCheck,
  User,
} from "lucide-react";

/* ----------------------- */
/* PAGE */
/* ----------------------- */

export default function ProfilePage() {
  const { user, loading } = useAuth();

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

  const role = user.role?.toLowerCase();

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

            {role && (
              <span className="inline-block mt-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary capitalize">
                {role}
              </span>
            )}
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

      {/* ================= ROLE SECTIONS ================= */}
      {role === "agent" && (
        <RoleSection
          title="Agent Profile"
          items={[
            {
              label: "Agent ID",
              value: user.agentId ?? "—",
              icon: Briefcase,
            },
          ]}
        />
      )}

      {role === "admin" && (
        <RoleSection
          title="Admin Privileges"
          items={[
            {
              label: "Access Level",
              value: "Full system access",
              icon: ShieldCheck,
            },
          ]}
        />
      )}
    </motion.div>
  );
}

/* ----------------------- */
/* COMPONENTS */
/* ----------------------- */

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

      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-medium break-words">{value}</p>
      </div>
    </div>
  );
}

function RoleSection({
  title,
  items,
}: {
  title: string;
  items: {
    label: string;
    value: string | number;
    icon: React.ComponentType<{ className?: string }>;
  }[];
}) {
  return (
    <section className="rounded-2xl border bg-base-100 p-5 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold">{title}</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.map(({ label, value, icon: Icon }) => (
          <div key={label} className="flex items-center gap-3 text-sm">
            <Icon className="h-4 w-4 text-primary shrink-0" />
            <span className="text-muted-foreground">{label}:</span>
            <span className="font-medium break-all">{value}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
