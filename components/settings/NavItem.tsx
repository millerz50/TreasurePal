"use client";

import React from "react";

export function NavItem({
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
