// AmenityIcons.ts
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
  Key, // ✅ ADDED
  LayoutGrid,
  Leaf,
  Lightbulb,
  Lock,
  Mail,
  Mountain,
  Package,
  PlugZap,
  Power,
  Printer,
  Refrigerator,
  Shield,
  Smile,
  Star,
  Sun,
  Thermometer,
  Trash2,
  TreePine,
  Tv,
  UserCheck,
  Users,
  Utensils,
  Wifi,
  Wrench,
} from "lucide-react";

/* ----------------------------------
   ICON MAP (SOURCE OF TRUTH)
----------------------------------- */

export const ICON_MAP = {
  // basics
  wifi: Wifi,
  power: Power,
  backupPower: BatteryCharging,
  water: Droplets,
  trash: Trash2,

  // rooms & furniture
  bed: Bed,
  tv: Tv,
  refrigerator: Refrigerator,
  kitchen: Utensils,

  // comfort
  ac: Thermometer,
  heating: Flame,
  fan: Fan,
  coffee: Coffee,
  lighting: Lightbulb,

  // outdoor & views
  garden: TreePine,
  balcony: Sun,
  view: Mountain,

  // security
  security: Shield,
  cctv: Camera,
  lock: Lock,
  key: Key, // ✅ FIX: key now exists
  doorClosed: DoorClosed,

  // services
  cleaning: Wrench,
  concierge: UserCheck,
  bell: Bell,
  mail: Mail,

  // work & business
  internet: Cpu,
  office: Building2,
  meeting: Users,
  work: Briefcase,
  printer: Printer,

  // lifestyle
  gym: Dumbbell,
  bike: Bike,
  parking: Package,
  spa: Heart,
  entertainment: Smile,
  bar: GlassWater,
  restaurant: Utensils,

  // learning & community
  book: Book,
  library: BookOpen,
  users: Users,
  star: Star,

  // layouts & events
  layout: LayoutGrid,

  // eco / smart
  eco: Leaf,
  smart: PlugZap,
  sun: CloudSun,
} satisfies Record<string, LucideIcon>;

/* ----------------------------------
   ALIASES
----------------------------------- */

export const ExitIcon = DoorOpen;

export type { LucideIcon };
