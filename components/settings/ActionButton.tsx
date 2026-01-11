"use client";

import React from "react";

export function ActionButton({
  icon: Icon,
  label,
  description,
  danger,
  onClick,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  description: string;
  danger?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full rounded-xl border px-4 py-3 text-left transition flex items-center gap-4 ${
        danger
          ? "border-red-500/30 bg-red-500/10 hover:bg-red-500/20"
          : "bg-base-100 hover:bg-base-200"
      }`}>
      <Icon className={`h-5 w-5 ${danger ? "text-red-500" : "text-primary"}`} />
      <div>
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </button>
  );
}
