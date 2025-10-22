// components/amenities/AmenityMap.ts
import type { LucideIcon } from "./AmenityIcons";
import {
  Coffee,
  Cpu,
  Dumbbell,
  Flame,
  GlassWater,
  Heart,
  Key,
  Package,
  Shield,
  Thermometer,
  Tv,
  UserCheck,
  Utensils,
  Wifi,
  Wrench,
} from "./AmenityIcons";

export interface AmenityItem {
  name: string;
  icon: LucideIcon;
}

export type AmenityCategory = Record<string, AmenityItem[]>;
export interface AmenityMap {
  [type: string]: AmenityCategory;
}

// ✅ The complete AMENITIES constant
export const AMENITIES: AmenityMap = {
  Hotels: {
    Essentials: [
      { name: "WiFi", icon: Wifi },
      { name: "Air Conditioning", icon: Thermometer },
      { name: "Heating", icon: Flame },
      { name: "24/7 Check-in", icon: Key },
      { name: "Security System", icon: Shield },
    ],
    Hospitality: [
      { name: "Room Service", icon: Coffee },
      { name: "Daily Cleaning", icon: Wrench },
      { name: "Concierge", icon: UserCheck },
      { name: "Luggage Storage", icon: Package },
    ],
    Entertainment: [
      { name: "TV", icon: Tv },
      { name: "Streaming Services", icon: Cpu },
      { name: "Gym Access", icon: Dumbbell },
      { name: "Spa", icon: Heart },
    ],
    Dining: [
      { name: "Restaurant", icon: Utensils },
      { name: "Breakfast Included", icon: Coffee },
      { name: "Bar", icon: GlassWater },
    ],
  },
  // ... (keep the rest of your types as-is)
};
