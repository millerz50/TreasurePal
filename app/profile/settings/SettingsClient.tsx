"use client";

import type { UserPayload } from "@/context/AuthContext";
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

import { ActionButton } from "@/components/settings/ActionButton";
import { Card } from "@/components/settings/Card";
import { NavItem } from "@/components/settings/NavItem";
import { SettingRow } from "@/components/settings/SettingRow";
import { ToggleRow } from "@/components/settings/ToggleRow";

export default function SettingsClient({ user }: { user: UserPayload }) {
  const { signOut } = useAuth();

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mx-auto max-w-5xl px-4 py-6 space-y-6">
      {/* HEADER */}
      <header>
        <h1 className="text-2xl font-semibold">Settings</h1>
        <p className="text-sm text-muted-foreground">
          Manage your account preferences and security
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <aside className="space-y-2">
          <NavItem icon={User} label="Profile" />
          <NavItem icon={Lock} label="Security" />
          <NavItem icon={Bell} label="Notifications" />
          <NavItem icon={Globe} label="Preferences" />
        </aside>

        <section className="lg:col-span-2 space-y-6">
          <Card title="Profile">
            <SettingRow
              label="Name"
              value={`${user.firstName} ${user.surname}`}
            />
            <SettingRow label="Email" value={user.email} />
            <SettingRow label="Role" value={user.role} />
          </Card>

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
