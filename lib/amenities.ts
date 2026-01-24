import {
  Bath,
  Bed,
  Briefcase,
  Building2,
  Car,
  Dumbbell,
  Flame,
  Flower2,
  Gamepad2,
  GraduationCap,
  Home,
  Landmark,
  Lock,
  Monitor,
  Mountain,
  Network,
  PartyPopper,
  Shield,
  Sofa,
  Sparkles,
  TreeDeciduous,
  Tv,
  Users,
  Utensils,
  Warehouse,
  WashingMachine,
  Waves,
  Wifi,
  Wrench,
} from "lucide-react";
import { MdElevator } from "react-icons/md";

// ✅ Amenity Types
export type AmenityItem = {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
};

export type AmenityCategory = {
  [category: string]: AmenityItem[];
};

export type AmenityMap = {
  [type: string]: AmenityCategory;
};

// ✅ Central Icon Map
export const ICON_MAP = {
  bath: Bath,
  bed: Bed,
  briefcase: Briefcase,
  building: Building2,
  car: Car,
  dumbbell: Dumbbell,
  elevator: MdElevator,
  flame: Flame,
  flower: Flower2,
  gamepad: Gamepad2,
  grad: GraduationCap,
  home: Home,
  landmark: Landmark,
  lock: Lock,
  monitor: Monitor,
  mountain: Mountain,
  network: Network,
  party: PartyPopper,
  shield: Shield,
  sofa: Sofa,
  sparkles: Sparkles,
  tree: TreeDeciduous,
  tv: Tv,
  users: Users,
  utensils: Utensils,
  warehouse: Warehouse,
  washer: WashingMachine,
  waves: Waves,
  wifi: Wifi,
  wrench: Wrench,
};

// ✅ Amenity Map (Mutable, Type-Safe)
export const AMENITIES: AmenityMap = {
  Residential: {
    "Basic Amenities": [
      { name: "Heating and Cooling Systems", icon: ICON_MAP.home },
      { name: "Kitchen Appliances", icon: ICON_MAP.utensils },
      { name: "Laundry Facilities", icon: ICON_MAP.washer },
    ],
    "Outdoor Amenities": [
      { name: "Garden and Landscaping", icon: ICON_MAP.tree },
      { name: "Swimming Pool", icon: ICON_MAP.waves },
      { name: "BBQ Space", icon: ICON_MAP.flame },
    ],
    "Recreational Facilities": [
      { name: "Gym", icon: ICON_MAP.dumbbell },
      { name: "Playgrounds", icon: ICON_MAP.gamepad },
      { name: "Game Rooms", icon: ICON_MAP.tv },
    ],
    "Safety and Security": [
      { name: "CCTV", icon: ICON_MAP.shield },
      { name: "Smart Locks", icon: ICON_MAP.lock },
      { name: "Fenced Yard", icon: ICON_MAP.landmark },
    ],
    Technology: [
      { name: "Smart Home", icon: ICON_MAP.monitor },
      { name: "Internet", icon: ICON_MAP.wifi },
    ],
    Community: [
      { name: "Club House", icon: ICON_MAP.users },
      { name: "Event Spaces", icon: ICON_MAP.party },
    ],
    Additional: [
      { name: "Fireplace", icon: ICON_MAP.flame },
      { name: "Hot Tub", icon: ICON_MAP.waves },
      { name: "Basement", icon: ICON_MAP.warehouse },
    ],
  },

  Business: {
    "Basic Amenities": [
      { name: "Elevators", icon: ICON_MAP.elevator },
      { name: "Restrooms", icon: ICON_MAP.bath },
      { name: "Heating & Cooling", icon: ICON_MAP.home },
    ],
    "Office Amenities": [
      { name: "Conference Rooms", icon: ICON_MAP.users },
      { name: "Break Rooms", icon: ICON_MAP.utensils },
      { name: "Private Offices", icon: ICON_MAP.briefcase },
    ],
    Technology: [{ name: "High-Speed Internet", icon: ICON_MAP.wifi }],
    Recreational: [
      { name: "Fitness Center", icon: ICON_MAP.dumbbell },
      { name: "Game Room", icon: ICON_MAP.gamepad },
    ],
    Security: [
      { name: "CCTV", icon: ICON_MAP.shield },
      { name: "Fire Systems", icon: ICON_MAP.flame },
      { name: "Emergency Exits", icon: ICON_MAP.landmark },
    ],
    Parking: [
      { name: "Basement Parking", icon: ICON_MAP.car },
      { name: "Open Parking", icon: ICON_MAP.car },
    ],
    Community: [
      { name: "Networking Areas", icon: ICON_MAP.network },
      { name: "Event Spaces", icon: ICON_MAP.party },
    ],
  },

  Student: {
    "Basic Amenities": [
      { name: "Furnished Room", icon: ICON_MAP.bed },
      { name: "Shared Bathrooms", icon: ICON_MAP.bath },
      { name: "Kitchen", icon: ICON_MAP.utensils },
    ],
    "Common Areas": [
      { name: "Study Areas", icon: ICON_MAP.grad },
      { name: "Living Room", icon: ICON_MAP.sofa },
    ],
    Laundry: [{ name: "Laundry Facilities", icon: ICON_MAP.washer }],
    Internet: [{ name: "WiFi", icon: ICON_MAP.wifi }],
    Recreational: [
      { name: "Game Rooms", icon: ICON_MAP.gamepad },
      { name: "Outdoor Spaces", icon: ICON_MAP.tree },
    ],
    Safety: [
      { name: "CCTV", icon: ICON_MAP.shield },
      { name: "Security Guards", icon: ICON_MAP.shield },
    ],
    Community: [
      { name: "Events", icon: ICON_MAP.party },
      { name: "Transportation Options", icon: ICON_MAP.car },
    ],
    Support: [
      { name: "Cleaning Services", icon: ICON_MAP.washer },
      { name: "Maintenance Support", icon: ICON_MAP.wrench },
    ],
  },

  Lodges: {
    Accommodation: [
      { name: "Comfortable Rooms", icon: ICON_MAP.bed },
      { name: "Private Bathrooms", icon: ICON_MAP.bath },
      { name: "Balcony", icon: ICON_MAP.landmark },
    ],
    Recreational: [
      { name: "Fitness Center", icon: ICON_MAP.dumbbell },
      { name: "Cinema", icon: ICON_MAP.tv },
      { name: "Swimming Pool", icon: ICON_MAP.waves },
    ],
    Outdoor: [
      { name: "Hiking Trails", icon: ICON_MAP.mountain },
      { name: "Fire Pits", icon: ICON_MAP.flame },
      { name: "Garden Spaces", icon: ICON_MAP.tree },
    ],
    Wellness: [
      { name: "Massage", icon: ICON_MAP.flower },
      { name: "Hot Tub", icon: ICON_MAP.waves },
      { name: "Spa Treatments", icon: ICON_MAP.sparkles },
    ],
    Technology: [
      { name: "WiFi", icon: ICON_MAP.wifi },
      { name: "Business Center", icon: ICON_MAP.building },
    ],
    Safety: [
      { name: "Fire Alarms", icon: ICON_MAP.flame },
      { name: "CCTV", icon: ICON_MAP.shield },
      { name: "Security", icon: ICON_MAP.lock },
    ],
  },

  BookingHouse: {
    Accommodation: [
      { name: "Bedrooms", icon: ICON_MAP.bed },
      { name: "Shared Bathrooms", icon: ICON_MAP.bath },
      { name: "Kitchen", icon: ICON_MAP.utensils },
    ],
    Technology: [
      { name: "WiFi", icon: ICON_MAP.wifi },
      { name: "Smart Locks", icon: ICON_MAP.lock },
    ],
    Community: [
      { name: "Event Hosting", icon: ICON_MAP.party },
      { name: "Gathering Spaces", icon: ICON_MAP.users },
    ],
    Recreational: [
      { name: "BBQ Area", icon: ICON_MAP.flame },
      { name: "Pool", icon: ICON_MAP.waves },
      { name: "Garden", icon: ICON_MAP.tree },
    ],
    Safety: [
      { name: "CCTV", icon: ICON_MAP.shield },
      { name: "Secure Access", icon: ICON_MAP.lock },
    ],
  },
};
export const PROPERTY_TYPES = Object.keys(AMENITIES) as Array<
  keyof typeof AMENITIES
>;
