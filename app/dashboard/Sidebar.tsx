"use client";

import { useAuth } from "@/context/AuthContext";
import {
  Activity,
  BarChart,
  Building2,
  Heart,
  Home,
  Plus,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import Link from "next/link";

interface NavItem {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
}

interface Section {
  title: string;
  items: NavItem[];
}

export default function Sidebar() {
  const { user } = useAuth();

  // Normalize role string to avoid casing mismatches
  const role = user?.role?.toLowerCase();

  // Base items
  const baseItems: NavItem[] = [
    { label: "Overview", icon: Home, href: "/dashboard" },
  ];

  // User section
  const userItems: NavItem[] = [
    { label: "Liked Properties", icon: Heart, href: "/dashboard/liked" },
    { label: "Suggestions", icon: Sparkles, href: "/dashboard/suggestions" },
    { label: "Status", icon: Activity, href: "/dashboard/status" },
    { label: "Agents", icon: Users, href: "/dashboard/agents/suggested" },
  ];

  // Agent section
  const agentItems: NavItem[] = [
    { label: "Add Property", icon: Plus, href: "/dashboard/properties/add" },
    {
      label: "Manage Listings",
      icon: Building2,
      href: "/dashboard/properties/manage-listings",
    },
    { label: "Leads", icon: Users, href: "/dashboard/leads" },
    { label: "Performance", icon: BarChart, href: "/dashboard/performance" },
  ];

  // Admin section
  const adminItems: NavItem[] = [
    { label: "Agents", icon: Users, href: "/dashboard/agents" },
    { label: "Analytics", icon: BarChart, href: "/dashboard/analytics" },
    { label: "Admin Panel", icon: ShieldCheck, href: "/dashboard/admin" },
  ];

  // Build nav grouped by role
  const sections: Section[] = [{ title: "General", items: baseItems }];

  if (role === "user") sections.push({ title: "Your Space", items: userItems });
  if (role === "agent")
    sections.push({ title: "Agent Tools", items: agentItems });
  if (role === "admin") sections.push({ title: "Admin", items: adminItems });

  return (
    <aside className="w-64 bg-base-100 border-r border-base-300 p-4 hidden md:block">
      <h2 className="text-xl font-bold mb-6 text-primary">TreasurePal</h2>
      {sections.map((section) => (
        <div key={section.title} className="mb-6">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase mb-2">
            {section.title}
          </h3>
          <nav className="space-y-2">
            {section.items.map(({ label, icon: Icon, href }) => (
              <Link
                key={label}
                href={href}
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-base-200 transition text-sm font-medium">
                <Icon className="h-4 w-4 text-primary" />
                {label}
              </Link>
            ))}
          </nav>
        </div>
      ))}
    </aside>
  );
}
