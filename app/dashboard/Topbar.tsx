"use client";

import { useAuth } from "@/context/AuthContext";
import {
  BarChart,
  Building2,
  CircleUserRound,
  LogOut,
  Pencil,
  Plus,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Topbar() {
  const { user } = useAuth();
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    router.push("/signin");
  };

  const handleEdit = () => {
    router.push("/profile/edit");
  };

  // Role‑specific quick actions
  const roleActions = () => {
    if (!user) return null;

    switch (user.role) {
      case "agent":
        return (
          <>
            <button
              onClick={() => router.push("/dashboard/properties/add")}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2">
              <Plus className="h-4 w-4 text-green-600" />
              Add Property
            </button>
            <button
              onClick={() =>
                router.push("/dashboard/properties/manage-listings")
              }
              className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2">
              <Building2 className="h-4 w-4 text-blue-600" />
              Manage Listings
            </button>
          </>
        );
      case "admin":
        return (
          <>
            <button
              onClick={() => router.push("/dashboard/analytics")}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2">
              <BarChart className="h-4 w-4 text-purple-600" />
              Analytics
            </button>
            <button
              onClick={() => router.push("/dashboard/admin")}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2">
              <CircleUserRound className="h-4 w-4 text-red-600" />
              Admin Panel
            </button>
          </>
        );
      case "user":
      default:
        return (
          <>
            <button
              onClick={() => router.push("/dashboard/liked")}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2">
              <CircleUserRound className="h-4 w-4 text-pink-600" />
              Liked Properties
            </button>
          </>
        );
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 flex justify-between items-center shadow-sm">
      {/* Logo + Title */}
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center text-white font-bold text-sm">
          TP
        </div>
        <h1 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">
          Treasure Pal
        </h1>
      </div>

      {/* Right side controls */}
      <div className="flex items-center gap-4 relative">
        <button className="btn btn-sm btn-outline hidden sm:inline-block">
          Theme
        </button>

        {user && (
          <div className="relative group">
            {/* Avatar + Role */}
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 hover:bg-gray-100 px-2 py-1 rounded-md transition">
              <CircleUserRound className="h-6 w-6 text-green-600" />
              <span className="text-sm font-medium text-gray-700 hidden sm:inline">
                {user.role ?? "User"}
              </span>
            </button>

            {/* Tooltip */}
            <div className="absolute top-full left-0 mt-1 bg-gray-100 text-xs text-gray-600 px-2 py-1 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
              {user.email ?? "No email"}
            </div>

            {/* Dropdown */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded shadow-lg z-50">
                <div className="px-4 py-2 text-sm text-gray-600">
                  <strong>User ID:</strong>
                  <br />
                  {user.userId ?? "Unknown"}
                </div>
                <div className="px-4 py-2 text-sm text-gray-600">
                  <strong>Role:</strong> {user.role ?? "User"}
                </div>
                <hr className="border-gray-200" />

                {/* Role‑specific actions */}
                {roleActions()}

                {/* Common actions */}
                <button
                  onClick={handleEdit}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2">
                  <Pencil className="h-4 w-4" />
                  Edit Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 text-red-500">
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
