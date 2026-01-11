"use client";

import React from "react";

export function SettingRow({
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
