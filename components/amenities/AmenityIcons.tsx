// components/amenities/AmenityIcons.tsx
"use client";

import type { LucideIcon } from "lucide-react";
import {
  BatteryCharging,
  Bed,
  Bell,
  Bike,
  Book,
  BookOpen,
  Briefcase,
  Building2,
  Camera,
  CloudSun,
  Coffee,
  Cpu,
  DoorClosed,
  DoorOpen,
  Droplets,
  Dumbbell,
  Fan,
  Flame,
  GlassWater,
  Heart,
  Key,
  LayoutGrid,
  Leaf,
  Lightbulb,
  Lock,
  Mail,
  MapPin,
  Mountain,
  Package,
  Power,
  Printer,
  Refrigerator,
  Shield,
  Smile,
  Speaker,
  Star,
  Sun,
  Thermometer,
  Trash2,
  TreePine,
  Truck,
  Tv,
  UserCheck,
  Users,
  Utensils,
  Wifi,
  Wrench,
} from "lucide-react";
import { type ComponentType } from "react";

/**
 * IconComponent type used for ICON_MAP entries.
 * Accept any React component that accepts a className prop.
 */
export type IconComponent = ComponentType<{
  className?: string;
  [k: string]: any;
}>;

/* ------------------------------------------------------------------
   Inline fallback icons (no external packages required)
   - Minimal, accessible, and styled via className
   - Define fallbacks BEFORE ICON_MAP so they can be referenced safely
   ------------------------------------------------------------------ */

const RecycleSvg: IconComponent = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    role="img">
    <path d="M3 12h6l-2-2" />
    <path d="M21 12h-6l2 2" />
    <path d="M12 3v6" />
  </svg>
);

const ChairFallback: IconComponent = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    role="img">
    <rect x="4" y="7" width="16" height="8" rx="1" />
    <path d="M7 7V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2" />
    <path d="M7 20v-4" />
    <path d="M17 20v-4" />
  </svg>
);

const CraneFallback: IconComponent = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    role="img">
    <path d="M3 21h18" />
    <path d="M6 21V8h8" />
    <path d="M14 8V5" />
    <path d="M14 5h6" />
    <path d="M11 12h6" />
  </svg>
);

const WasherFallback: IconComponent = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    role="img">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <circle cx="12" cy="12" r="4" />
  </svg>
);

const DryerFallback: IconComponent = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    role="img">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const ElevatorFallback: IconComponent = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    role="img">
    <rect x="6" y="3" width="12" height="18" rx="1" />
    <path d="M9 7l3-3 3 3" />
    <path d="M9 17l3 3 3-3" />
  </svg>
);

const GrillFallback: IconComponent = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    role="img">
    <path d="M3 7h18" />
    <path d="M6 7v6a6 6 0 0 0 12 0V7" />
    <path d="M8 3v4" />
    <path d="M16 3v4" />
  </svg>
);

const PawFallback: IconComponent = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    role="img">
    <path d="M12 13c2.5 0 4.5 1.5 4.5 3.5S14.5 20 12 20s-4.5-1.5-4.5-3.5S9.5 13 12 13z" />
    <path d="M7 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM17 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
  </svg>
);

const SafeFallback: IconComponent = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    role="img">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <circle cx="12" cy="12" r="2" />
    <path d="M12 7v1" />
    <path d="M12 16v1" />
  </svg>
);

const ShowerFallback: IconComponent = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    role="img">
    <path d="M7 3h10" />
    <path d="M12 3v6" />
    <path d="M9 14v2" />
    <path d="M12 14v2" />
    <path d="M15 14v2" />
  </svg>
);

const SolarFallback: IconComponent = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    role="img">
    <rect x="3" y="12" width="18" height="6" rx="1" />
    <path d="M3 12l6-6 6 6 6-6" />
  </svg>
);

/* ------------------------------------------------------------------
   Small additional fallback used below
   ------------------------------------------------------------------ */

const SmartSvg: IconComponent = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    role="img">
    <path d="M12 2v6" />
    <path d="M8 8l8 8" />
  </svg>
);

/* ------------------------------------------------------------------
   ICON MAP
   - Use lucide-react icons where available
   - Use inline fallbacks for icons not present in lucide-react
   ------------------------------------------------------------------ */

export const ICON_MAP: Record<string, IconComponent> = {
  // basics
  wifi: Wifi,
  power: Power,
  backupPower: BatteryCharging,
  water: Droplets,
  trash: Trash2,
  recycle: RecycleSvg,

  // rooms & furniture
  bed: Bed,
  tv: Tv,
  refrigerator: Refrigerator,
  fridge: Refrigerator,
  kitchen: Utensils,
  chair: ChairFallback,
  layout: LayoutGrid,

  // comfort & appliances
  ac: Thermometer,
  heating: Flame,
  fan: Fan,
  coffee: Coffee,
  lighting: Lightbulb,
  microwave: Refrigerator,
  stove: GrillFallback,
  oven: GrillFallback,
  washer: WasherFallback,
  dryer: DryerFallback,
  washer_machine: WasherFallback,
  dryer_machine: DryerFallback,

  // outdoor & views
  garden: TreePine,
  balcony: Sun,
  view: Mountain,
  pool: CloudSun,
  patio: ChairFallback,

  // security
  security: Shield,
  cctv: Camera,
  lock: Lock,
  key: Key,
  doorClosed: DoorClosed,
  safe: SafeFallback,

  // services
  cleaning: Wrench,
  concierge: UserCheck,
  bell: Bell,
  mail: Mail,
  valet: Truck,
  maintenance: Wrench,
  laundry: WasherFallback,

  // work & business
  internet: Cpu,
  computer: Cpu,
  office: Building2,
  meeting: Users,
  work: Briefcase,
  printer: Printer,
  pos: Printer,
  mail_handling: Mail,

  // lifestyle & leisure
  gym: Dumbbell,
  bike: Bike,
  parking: Package,
  spa: Heart,
  entertainment: Smile,
  bar: GlassWater,
  restaurant: Utensils,
  bbq: GrillFallback,
  rooftop: Sun,

  // learning & community
  book: Book,
  library: BookOpen,
  users: Users,
  star: Star,
  study: Book,

  // layouts & events
  layout_grid: LayoutGrid,
  stage: Speaker,
  speaker: Speaker,
  seating: ChairFallback,

  // eco / smart / sustainability
  eco: Leaf,
  smart: SmartSvg,
  solar: SolarFallback,

  // retail / industrial
  store: Building2,
  storefront: Building2,
  truck: Truck,
  crane: CraneFallback,
  storage: Package,
  warehouse: Package,
  loading_dock: Truck,
  fence: Shield,

  // accessibility & facilities
  elevator: ElevatorFallback,
  bath: ShowerFallback,
  restroom: ShowerFallback,
  wheelchair: ElevatorFallback,

  // misc / status
  tag: Star,
  calendar: BookOpen,
  calendarCheck: BookOpen,
  child: Users,
  pet: PawFallback,
  safe_box: SafeFallback,
  phone: Mail,
  map_pin: MapPin,
  trash_bin: Trash2,
};

/* ----------------------------------
   ALIASES
----------------------------------- */

export const ExitIcon = DoorOpen;

export type { LucideIcon };
