"use client";

import Sidebar from "@/app/dashboard/Sidebar";
import Topbar from "@/app/dashboard/Topbar";
import { AuthProvider, useAuth } from "@/context/AuthContext";

function LayoutContent({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="text-center py-10">Loading dashboard...</div>;
  }

  if (!user) {
    return <div className="text-center py-10">No user found</div>;
  }

  return (
    <div className="flex min-h-screen bg-base-200">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        {/* ✅ Role marker */}
        <div className="px-6 py-2 bg-base-300 text-sm text-muted-foreground">
          Current role:{" "}
          <span className="font-semibold text-primary">{user.role}</span>
        </div>
        <main className="p-6">{children}</main>
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
