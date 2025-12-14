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
      className="max-w-4xl mx-auto p-6 space-y-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}>
      {/* HEADER */}
      <section className="bg-base-100 border border-base-300 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="h-6 w-6 text-primary" />
          </div>

          <div>
            <h1 className="text-xl font-semibold">
              {user.firstName} {user.surname}
            </h1>
            <p className="text-sm text-muted-foreground">{user.email}</p>

            <span className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
              {role}
            </span>
          </div>
        </div>
      </section>

      {/* BASIC INFO */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InfoCard icon={Mail} label="Email" value={user.email} />

        <InfoCard
          icon={ShieldCheck}
          label="Status"
          value={user.status ?? "Active"}
        />

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

      {/* ROLE-SPECIFIC SECTIONS */}
      {role === "agent" && (
        <RoleSection
          title="Agent Profile"
          items={[
            {
              label: "Agent ID",
              value: user.agentId ?? "—",
              icon: Briefcase,
            },
            {
              label: "Listings",
              value: user.propertiesCount ?? "—",
              icon: Home,
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
/* REUSABLE COMPONENTS */
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
    <div className="bg-base-100 border border-base-300 rounded-xl p-4 flex items-start gap-3 shadow-sm">
      <Icon className="h-5 w-5 text-primary mt-0.5" />
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-medium">{value}</p>
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
    <section className="bg-base-100 border border-base-300 rounded-2xl p-6 shadow-sm">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.map(({ label, value, icon: Icon }) => (
          <div key={label} className="flex items-center gap-3 text-sm">
            <Icon className="h-4 w-4 text-primary" />
            <span className="text-muted-foreground">{label}:</span>
            <span className="font-medium">{value}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
