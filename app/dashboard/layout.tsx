"use client";

import Sidebar from "@/app/dashboard/Sidebar";
import Topbar from "@/app/dashboard/Topbar";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import React from "react";

function LayoutContent({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-muted-foreground">
        Loading dashboard…
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-red-500">
        No user found
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-base-200">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Topbar />

        {/* ✅ Role marker (supports multiple roles) */}
        <div className="px-6 py-2 bg-base-300 text-sm text-muted-foreground flex gap-2 flex-wrap">
          <span>Current role:</span>

          {user.roles.map((role) => (
            <span key={role} className="font-semibold text-primary capitalize">
              {role}
            </span>
          ))}
        </div>

        <main className="p-6 flex-1">{children}</main>
      </div>
    </div>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <LayoutContent>{children}</LayoutContent>
    </AuthProvider>
  );
}
