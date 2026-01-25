import * as Lucide from "lucide-react";
import {
  WasherFallback,
  DryerFallback,
  GrillFallback,
} from "@/components/icons/fallbacks/ApplianceFallbacks";
import {
  ChairFallback,
  PatioFallback,
} from "@/components/icons/fallbacks/FurnitureFallbacks";
import {
  SafeFallback,
  ElevatorFallback,
  ShowerFallback,
} from "@/components/icons/fallbacks/SafetyFallbacks";
import {
  RecycleSvg,
  PawFallback,
  SolarFallback,
  SmartSvg,
  CraneFallback,
} from "@/components/icons/fallbacks/MiscFallbacks";

/* -----------------------------
   ICON MAP
----------------------------- */
export const APPLIANCE_ICONS: Record<string, Lucide.LucideIcon> = {
  stove: GrillFallback,
  oven: GrillFallback,
  washer: WasherFallback,
  dryer: DryerFallback,
  kitchen: Lucide.Utensils,
  coffee: Lucide.Coffee,
  refrigerator: Lucide.Refrigerator,
  fridge: Lucide.Refrigerator,
};

export const FURNITURE_ICONS: Record<string, Lucide.LucideIcon> = {
  chair: ChairFallback,
  seating: ChairFallback,
  patio: PatioFallback,
  bed: Lucide.Bed,
  layout: Lucide.LayoutGrid,
  lighting: Lucide.Lightbulb,
};

export const SAFETY_ICONS: Record<string, Lucide.LucideIcon> = {
  safe: SafeFallback,
  elevator: ElevatorFallback,
  bath: ShowerFallback,
  security: Lucide.Shield,
  lock: Lucide.Lock,
  key: Lucide.Key,
  cctv: Lucide.Camera,
};

export const MISC_ICONS: Record<string, Lucide.LucideIcon> = {
  recycle: RecycleSvg,
  pet: PawFallback,
  solar: SolarFallback,
  smart: SmartSvg,
  crane: CraneFallback,
  truck: Lucide.Truck,
  storage: Lucide.Package,
  rooftop: Lucide.Sun,
  garden: Lucide.TreePine,
  view: Lucide.Mountain,
  pool: Lucide.CloudSun,
  balcony: Lucide.Sun,
};

export const UTILITY_ICONS: Record<string, Lucide.LucideIcon> = {
  wifi: Lucide.Wifi,
  power: Lucide.Power,
  backupPower: Lucide.BatteryCharging,
  water: Lucide.Droplets,
  trash: Lucide.Trash2,
  mail: Lucide.Mail,
  phone: Lucide.Mail,
  internet: Lucide.Cpu,
  computer: Lucide.Cpu,
  office: Lucide.Building2,
  store: Lucide.Building2,
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
  book: Lucide.Book,
  library: Lucide.BookOpen,
  users: Lucide.Users,
  star: Lucide.Star,
  calendar: Lucide.BookOpen,
  child: Lucide.Users,
  bell: Lucide.Bell,
  concierge: Lucide.UserCheck,
  maintenance: Lucide.Wrench,
  cleaning: Lucide.Wrench,
  map_pin: Lucide.MapPin,
  doorClosed: Lucide.DoorClosed,
};

/* -----------------------------
   MERGED ICON MAP
----------------------------- */
export const ICON_MAP = {
  ...APPLIANCE_ICONS,
  ...FURNITURE_ICONS,
  ...SAFETY_ICONS,
  ...MISC_ICONS,
  ...UTILITY_ICONS,
};
