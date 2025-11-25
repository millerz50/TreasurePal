import type { LucideIcon } from "./AmenityIcons";
import {
  Bike,
  Book,
  Coffee,
  Cpu,
  Dumbbell,
  Flame,
  GlassWater,
  Heart,
  Key,
  Package,
  Power,
  Printer,
  Refrigerator,
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

// ✅ Complete AMENITIES constant
export const AMENITIES: AmenityMap = {
  House: {
    Essentials: [
      { name: "WiFi", icon: Wifi },
      { name: "Heating", icon: Flame },
      { name: "Air Conditioning", icon: Thermometer },
      { name: "Security System", icon: Shield },
    ],
    Comfort: [
      { name: "Coffee Maker", icon: Coffee },
      { name: "TV", icon: Tv },
      { name: "Gym Access", icon: Dumbbell },
      { name: "Refrigerator", icon: Refrigerator },
    ],
    Extras: [
      { name: "Garage", icon: Package },
      { name: "Bike Storage", icon: Bike },
    ],
  },
  Apartment: {
    Essentials: [
      { name: "WiFi", icon: Wifi },
      { name: "Heating", icon: Flame },
      { name: "Air Conditioning", icon: Thermometer },
      { name: "Security System", icon: Shield },
    ],
    Services: [
      { name: "Concierge", icon: UserCheck },
      { name: "Daily Cleaning", icon: Wrench },
      { name: "Package Delivery", icon: Package },
    ],
    Entertainment: [
      { name: "Streaming Services", icon: Cpu },
      { name: "Gym Access", icon: Dumbbell },
      { name: "Library", icon: Book },
    ],
  },
  Commercial: {
    Essentials: [
      { name: "WiFi", icon: Wifi },
      { name: "Air Conditioning", icon: Thermometer },
      { name: "Heating", icon: Flame },
      { name: "Security System", icon: Shield },
    ],
    Facilities: [
      { name: "Conference Room", icon: UserCheck },
      { name: "Cafeteria", icon: Utensils },
      { name: "Water Dispenser", icon: GlassWater },
      { name: "Printer Access", icon: Printer },
      { name: "Power Backup", icon: Power },
    ],
  },
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
};
