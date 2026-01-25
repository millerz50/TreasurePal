"use client";

import { forwardRef } from "react";
import type { LucideIcon, LucideProps } from "lucide-react";

/* -----------------------------
   SAFETY & SECURITY ICONS
----------------------------- */

export const ElevatorFallback: LucideIcon = forwardRef<
  SVGSVGElement,
  LucideProps
>((props, ref) => (
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
    <rect x="6" y="3" width="12" height="18" rx="1" />
    <path d="M9 7l3-3 3 3" />
    <path d="M9 17l3 3 3-3" />
  </svg>
));

export const SafeFallback: LucideIcon = forwardRef<SVGSVGElement, LucideProps>(
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
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="12" cy="12" r="2" />
      <path d="M12 7v1" />
      <path d="M12 16v1" />
    </svg>
  ),
);

/* -----------------------------
   SHOWER ICON
----------------------------- */
export const ShowerFallback: LucideIcon = forwardRef<
  SVGSVGElement,
  LucideProps
>((props, ref) => (
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
    <path d="M7 3h10" />
    <path d="M12 3v6" />
    <path d="M9 14v2" />
    <path d="M12 14v2" />
    <path d="M15 14v2" />
  </svg>
));
