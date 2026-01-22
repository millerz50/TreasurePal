import type { ComponentType } from "react";

/* =========================
   Property Image Types
========================= */
export type PropertyImages = {
  frontElevation?: string | null;
  southView?: string | null;
  westView?: string | null;
  eastView?: string | null;
  floorPlan?: string | null;
};

/* =========================
   Property Main Type
========================= */
export type PropertyType = {
  id: string;
  title: string;
  description: string;
  type: string;
  status: string;
  price: number;
  location: string;
  address: string;
  rooms: number;
  country: string;
  agentId: string | null;
  amenities: string[];
  coordinates?: [number, number]; // [lng, lat]
  images: PropertyImages;
};

/* =========================
   Amenity Icons Mapping
========================= */
import { BedDouble, MapPin, ShieldCheck, Sparkles, Wifi } from "lucide-react";
import { MdOutlineHome } from "react-icons/md";

export const iconMap: Record<string, ComponentType<{ className?: string }>> = {
  "Wi-Fi": Wifi,
  Kitchen: MdOutlineHome,
  Parking: MapPin,
  "Smart Security": ShieldCheck,
  "Swimming Pool": Sparkles,
  "Room Service": BedDouble,
};
