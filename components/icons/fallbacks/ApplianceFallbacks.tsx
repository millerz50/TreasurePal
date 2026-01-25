"use client";

import { forwardRef } from "react";
import type { LucideIcon, LucideProps } from "lucide-react";

/* -----------------------------
   APPLIANCE FALLBACK ICONS
----------------------------- */
export const WasherFallback: LucideIcon = forwardRef<
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
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <circle cx="12" cy="12" r="4" />
  </svg>
));

export const DryerFallback: LucideIcon = forwardRef<SVGSVGElement, LucideProps>(
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
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
);

export const GrillFallback: LucideIcon = forwardRef<SVGSVGElement, LucideProps>(
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
      <path d="M3 7h18" />
      <path d="M6 7v6a6 6 0 0 0 12 0V7" />
      <path d="M8 3v4" />
      <path d="M16 3v4" />
    </svg>
  ),
);
