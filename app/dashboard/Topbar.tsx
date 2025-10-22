"use client";

import { useAuth } from "@/context/AuthContext";
import { CircleUserRound, LogOut, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Topbar() {
  const { agent } = useAuth();
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("agentToken");
    router.push("/agent/signin");
  };

  const handleEdit = () => {
    router.push("/agent/profile/edit");
  };

  return (
    <header className="bg-base-100 border-b border-base-300 px-6 py-4 flex justify-between items-center">
      <h1 className="text-lg font-semibold text-primary">Dashboard</h1>

      <div className="flex items-center gap-4 relative">
        <button className="btn btn-sm btn-outline">Theme</button>

        {agent && (
          <div className="relative group">
            {/* Avatar with hover tooltip */}
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 hover:bg-base-200 px-2 py-1 rounded-md">
              <CircleUserRound className="h-6 w-6 text-primary" />
              <span className="text-sm text-muted-foreground hidden sm:inline">
                Agent
              </span>
            </button>

            {/* Tooltip on hover */}
            <div className="absolute top-full left-0 mt-1 bg-base-200 text-xs text-muted-foreground px-2 py-1 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
              {agent.email ?? "No email"}
            </div>

            {/* Dropdown menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-background border border-base-300 rounded shadow-lg z-50">
                <div className="px-4 py-2 text-sm text-muted-foreground">
                  <strong>User ID:</strong>
                  <br />
                  {agent.userId ?? "Unknown"}
                </div>
                <hr className="border-base-300" />
                <button
                  onClick={handleEdit}
                  className="w-full text-left px-4 py-2 hover:bg-base-200 flex items-center gap-2">
                  <Pencil className="h-4 w-4" />
                  Edit Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-base-200 flex items-center gap-2 text-red-500">
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
