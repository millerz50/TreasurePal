"use client";

import { forwardRef } from "react";
import type { LucideIcon, LucideProps } from "lucide-react";

/* -----------------------------
   FURNITURE & SEATING ICONS
----------------------------- */
export const ChairFallback: LucideIcon = forwardRef<SVGSVGElement, LucideProps>(
  (props, ref) => (
    <svg
      {...props}
      ref={ref}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      role="img"
    >
      <rect x="4" y="7" width="16" height="8" rx="1" />
      <path d="M7 7V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2" />
      <path d="M7 20v-4" />
      <path d="M17 20v-4" />
    </svg>
  ),
);

export const PatioFallback = ChairFallback;
