"use client";

import { forwardRef } from "react";
import type { LucideIcon, LucideProps } from "lucide-react";
import * as Lucide from "lucide-react";

/* -----------------------------
   Fallback Icons
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

/* -----------------------------
   ICON MAP
----------------------------- */
export const ICON_MAP: Record<string, LucideIcon> = {
  wifi: Lucide.Wifi,
  power: Lucide.Power,
  backupPower: Lucide.BatteryCharging,
  water: Lucide.Droplets,
  trash: Lucide.Trash2,
  recycle: RecycleSvg,
  bed: Lucide.Bed,
  tv: Lucide.Tv,
  refrigerator: Lucide.Refrigerator,
  fridge: Lucide.Refrigerator,
  kitchen: Lucide.Utensils,
  chair: ChairFallback,
  layout: Lucide.LayoutGrid,
  ac: Lucide.Thermometer,
  heating: Lucide.Flame,
  fan: Lucide.Fan,
  coffee: Lucide.Coffee,
  lighting: Lucide.Lightbulb,
  stove: GrillFallback,
  oven: GrillFallback,
  washer: WasherFallback,
  dryer: DryerFallback,
  garden: Lucide.TreePine,
  balcony: Lucide.Sun,
  view: Lucide.Mountain,
  pool: Lucide.CloudSun,
  patio: ChairFallback,
  security: Lucide.Shield,
  cctv: Lucide.Camera,
  lock: Lucide.Lock,
  key: Lucide.Key,
  doorClosed: Lucide.DoorClosed,
  safe: SafeFallback,
  cleaning: Lucide.Wrench,
  concierge: Lucide.UserCheck,
  bell: Lucide.Bell,
  mail: Lucide.Mail,
  valet: Lucide.Truck,
  maintenance: Lucide.Wrench,
  internet: Lucide.Cpu,
  computer: Lucide.Cpu,
  office: Lucide.Building2,
  meeting: Lucide.Users,
  work: Lucide.Briefcase,
  printer: Lucide.Printer,
  pos: Lucide.Printer,
  gym: Lucide.Dumbbell,
  bike: Lucide.Bike,
  parking: Lucide.Package,
  spa: Lucide.Heart,
  entertainment: Lucide.Smile,
  bar: Lucide.GlassWater,
  restaurant: Lucide.Utensils,
  bbq: GrillFallback,
  rooftop: Lucide.Sun,
  book: Lucide.Book,
  library: Lucide.BookOpen,
  users: Lucide.Users,
  star: Lucide.Star,
  seating: ChairFallback,
  eco: Lucide.Leaf,
  smart: SmartSvg,
  solar: SolarFallback,
  store: Lucide.Building2,
  storefront: Lucide.Building2,
  truck: Lucide.Truck,
  crane: CraneFallback,
  storage: Lucide.Package,
  loading_dock: Lucide.Truck,
  fence: Lucide.Shield,
  elevator: ElevatorFallback,
  bath: ShowerFallback,
  restroom: ShowerFallback,
  wheelchair: ElevatorFallback,
  tag: Lucide.Star,
  calendar: Lucide.BookOpen,
  child: Lucide.Users,
  pet: PawFallback,
  safe_box: SafeFallback,
  phone: Lucide.Mail,
  map_pin: Lucide.MapPin,
  trash_bin: Lucide.Trash2,
};

/* Aliases */
export const ExitIcon = Lucide.DoorOpen;

export type { LucideIcon };
