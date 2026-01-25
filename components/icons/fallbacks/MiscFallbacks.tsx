"use client";

import { forwardRef } from "react";
import type { LucideIcon, LucideProps } from "lucide-react";

/* -----------------------------
   MISCELLANEOUS ICONS
----------------------------- */
export const RecycleSvg: LucideIcon = forwardRef<SVGSVGElement, LucideProps>(
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
      <path d="M3 12h6l-2-2" />
      <path d="M21 12h-6l2 2" />
      <path d="M12 3v6" />
    </svg>
  ),
);

export const PawFallback: LucideIcon = forwardRef<SVGSVGElement, LucideProps>(
  (props, ref) => (
    <svg
      {...props}
      ref={ref}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      role="img"
    >
      <path d="M12 13c2.5 0 4.5 1.5 4.5 3.5S14.5 20 12 20s-4.5-1.5-4.5-3.5S9.5 13 12 13z" />
      <path d="M7 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM17 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
    </svg>
  ),
);

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

export const SolarFallback: LucideIcon = forwardRef<SVGSVGElement, LucideProps>(
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
      <rect x="3" y="12" width="18" height="6" rx="1" />
      <path d="M3 12l6-6 6 6 6-6" />
    </svg>
  ),
);

export const SmartSvg: LucideIcon = forwardRef<SVGSVGElement, LucideProps>(
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
      <path d="M12 2v6" />
      <path d="M8 8l8 8" />
    </svg>
  ),
);

export const CraneFallback: LucideIcon = forwardRef<SVGSVGElement, LucideProps>(
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
      <path d="M3 21h18" />
      <path d="M6 21V8h8" />
      <path d="M14 8V5" />
      <path d="M14 5h6" />
      <path d="M11 12h6" />
    </svg>
  ),
);
