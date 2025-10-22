// components/ui/SafeLucideIcon.tsx
"use client";

import { type LucideIcon } from "lucide-react";

type Props = {
  icon: LucideIcon;
  className?: string;
};

export default function SafeLucideIcon({ icon: Icon, className }: Props) {
  return <Icon className={className} />;
}
