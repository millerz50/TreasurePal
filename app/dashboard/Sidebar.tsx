"use client";

import { useAuth } from "@/context/AuthContext";
import {
  BarChart,
  Building2,
  Heart,
  Home,
  Plus,
  ShieldCheck,
  Users,
} from "lucide-react";
import Link from "next/link";

export default function Sidebar() {
  const { user } = useAuth();

  // ✅ Base items everyone sees
  const baseItems = [{ label: "Overview", icon: Home, href: "/dashboard" }];

  // ✅ Role-specific items
  const agentItems = [
    { label: "Add Property", icon: Plus, href: "/dashboard/properties/add" },
    {
      label: "Manage Listings",
      icon: Building2,
      href: "/dashboard/properties/manage-listings",
    },
  ];

  const userItems = [
    { label: "Liked Properties", icon: Heart, href: "/dashboard/liked" },
  ];

  const adminItems = [
    { label: "Agents", icon: Users, href: "/dashboard/agents" },
    { label: "Analytics", icon: BarChart, href: "/dashboard/analytics" },
    { label: "Admin Panel", icon: ShieldCheck, href: "/dashboard/admin" },
  ];

  // ✅ Build nav dynamically
  let navItems = [...baseItems];
  if (user?.role === "agent") navItems = [...navItems, ...agentItems];
  if (user?.role === "user") navItems = [...navItems, ...userItems];
  if (user?.role === "admin") navItems = [...navItems, ...adminItems];

  return (
    <aside className="w-64 bg-base-100 border-r border-base-300 p-4 hidden md:block">
      <h2 className="text-xl font-bold mb-6 text-primary">TreasurePal</h2>
      <nav className="space-y-2">
        {navItems.map(({ label, icon: Icon, href }) => (
          <Link
            key={label}
            href={href}
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-base-200 transition text-sm font-medium">
            <Icon className="h-4 w-4 text-primary" />
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
