"use client";

import React from "react";

export function ToggleRow({
  icon: Icon,
  label,
  description,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  description: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <Icon className="h-4 w-4 text-primary" />
        <div>
          <p className="text-sm font-medium">{label}</p>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </div>
      <input type="checkbox" className="toggle toggle-primary" defaultChecked />
    </div>
  );
}
