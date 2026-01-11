"use client";

import SettingsClient from "./SettingsClient";
import { useAuth } from "@/context/AuthContext";

export default function SettingsPage() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="p-6 text-sm text-muted-foreground">
        Loading settings…
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-6 text-sm text-red-500">
        You must be logged in to view settings.
      </div>
    );
  }

  return <SettingsClient user={user} />;
}
