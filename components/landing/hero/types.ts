import type { LucideIcon } from "lucide-react";

export type StatItem = {
  value: string;
  label: string;
};

export type FloatingBadgeProps = {
  icon: LucideIcon;
  text: string;
  className: string;
};
