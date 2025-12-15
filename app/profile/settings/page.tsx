"use client";

import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import {
  Bell,
  Globe,
  Lock,
  LogOut,
  Mail,
  ShieldCheck,
  User,
} from "lucide-react";

/* ----------------------------------
   PAGE
----------------------------------- */
export default function SettingsPage() {
  const { user, loading, signOut } = useAuth();

  if (loading) {
    return (
      <div className="p-6 text-sm text-muted-foreground">Loading settings…</div>
    );
  }

  if (!user) {
    return (
      <div className="p-6 text-sm text-red-500">
        You must be logged in to view settings.
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mx-auto max-w-5xl px-4 py-6 space-y-6">
      {/* ================= HEADER ================= */}
      <header>
        <h1 className="text-2xl font-semibold">Settings</h1>
        <p className="text-sm text-muted-foreground">
          Manage your account preferences and security
        </p>
      </header>

      {/* ================= GRID ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT NAV */}
        <aside className="lg:col-span-1 space-y-2">
          <NavItem icon={User} label="Profile" />
          <NavItem icon={Lock} label="Security" />
          <NavItem icon={Bell} label="Notifications" />
          <NavItem icon={Globe} label="Preferences" />
        </aside>

        {/* RIGHT CONTENT */}
        <section className="lg:col-span-2 space-y-6">
          {/* PROFILE */}
          <Card title="Profile">
            <SettingRow
              label="Name"
              value={`${user.firstName} ${user.surname}`}
            />
            <SettingRow label="Email" value={user.email} />
            <SettingRow label="Role" value={user.role} />
          </Card>

          {/* SECURITY */}
          <Card title="Security">
            <SettingRow
              label="Account Status"
              value={user.status}
              icon={ShieldCheck}
            />

            <ActionButton
              icon={Lock}
              label="Change Password"
              description="Update your account password"
            />
          </Card>

          {/* NOTIFICATIONS */}
          <Card title="Notifications">
            <ToggleRow
              icon={Mail}
              label="Email notifications"
              description="Receive important updates via email"
            />
            <ToggleRow
              icon={Bell}
              label="Push notifications"
              description="Get notified about activity"
            />
          </Card>

          {/* ACCOUNT */}
          <Card title="Account">
            <ActionButton
              icon={LogOut}
              label="Sign out"
              description="Log out from this device"
              danger
              onClick={signOut}
            />
          </Card>
        </section>
      </div>
    </motion.div>
  );
}

/* ----------------------------------
   COMPONENTS
----------------------------------- */

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border bg-base-100 p-5 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold">{title}</h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function NavItem({
  icon: Icon,
  label,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border bg-base-100 px-4 py-3 shadow-sm hover:bg-base-200 transition">
      <Icon className="h-4 w-4 text-primary" />
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}

function SettingRow({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        {Icon && <Icon className="h-4 w-4 text-primary" />}
        <span className="text-sm text-muted-foreground">{label}</span>
      </div>
      <span className="text-sm font-medium break-all">{value}</span>
    </div>
  );
}

function ActionButton({
  icon: Icon,
  label,
  description,
  danger,
  onClick,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  description: string;
  danger?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full rounded-xl border px-4 py-3 text-left transition flex items-center gap-4 ${
        danger
          ? "border-red-500/30 bg-red-500/10 hover:bg-red-500/20"
          : "bg-base-100 hover:bg-base-200"
      }`}>
      <Icon className={`h-5 w-5 ${danger ? "text-red-500" : "text-primary"}`} />
      <div>
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </button>
  );
}

function ToggleRow({
  icon: Icon,
  label,
  description,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  description: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <Icon className="h-4 w-4 text-primary" />
        <div>
          <p className="text-sm font-medium">{label}</p>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </div>

      <input type="checkbox" className="toggle toggle-primary" defaultChecked />
    </div>
  );
}
