// amenities.ts
import type { LucideIcon } from "./AmenityIcons";
import { ICON_MAP } from "./AmenityIcons";

/* ----------------------------------
   TYPES
----------------------------------- */

export interface AmenityItem {
  name: string;
  icon: LucideIcon;
}

export type AmenityCategory = Record<string, AmenityItem[]>;

export interface AmenityMap {
  [propertyType: string]: AmenityCategory;
}

/* ----------------------------------
   AMENITIES MAP (CORRECTED)
----------------------------------- */

export const AMENITIES: AmenityMap = {
  StudentHousing: {
    Essentials: [
      { name: "Furnished Room", icon: ICON_MAP.bed },
      { name: "Wi-Fi", icon: ICON_MAP.wifi },
      { name: "Electricity & Water", icon: ICON_MAP.power },
      { name: "Shared Kitchen", icon: ICON_MAP.kitchen },
    ],
    Study: [
      { name: "Study Room", icon: ICON_MAP.book },
      { name: "Library Access", icon: ICON_MAP.library },
      { name: "Quiet Zones", icon: ICON_MAP.layout },
    ],
    Safety: [
      { name: "CCTV", icon: ICON_MAP.cctv },
      { name: "Secure Entry", icon: ICON_MAP.lock },
      { name: "On-Site Security", icon: ICON_MAP.security },
    ],
    Community: [
      { name: "Common Lounge", icon: ICON_MAP.users },
      { name: "Student Events", icon: ICON_MAP.star },
      { name: "Laundry Services", icon: ICON_MAP.cleaning },
    ],
  },

  Lodge: {
    Essentials: [
      { name: "Private Room", icon: ICON_MAP.bed },
      { name: "Wi-Fi", icon: ICON_MAP.wifi },
      { name: "Hot Water", icon: ICON_MAP.water },
      { name: "Air Conditioning", icon: ICON_MAP.ac },
    ],
    Hospitality: [
      { name: "Room Service", icon: ICON_MAP.bell },
      { name: "Daily Housekeeping", icon: ICON_MAP.cleaning },
      { name: "Reception Desk", icon: ICON_MAP.concierge },
    ],
    Leisure: [
      { name: "Scenic View", icon: ICON_MAP.view },
      { name: "Garden", icon: ICON_MAP.garden },
      { name: "Lounge Area", icon: ICON_MAP.users },
    ],
    Security: [
      { name: "CCTV", icon: ICON_MAP.cctv },
      { name: "Secure Access", icon: ICON_MAP.lock },
    ],
  },

  BookingHouse: {
    Essentials: [
      { name: "Bedrooms", icon: ICON_MAP.bed },
      { name: "Wi-Fi", icon: ICON_MAP.wifi },
      { name: "Kitchen", icon: ICON_MAP.kitchen },
      { name: "Water & Electricity", icon: ICON_MAP.power },
    ],
    Comfort: [
      { name: "Living Room", icon: ICON_MAP.users },
      { name: "Television", icon: ICON_MAP.tv },
      { name: "Balcony", icon: ICON_MAP.balcony },
    ],
    Outdoor: [
      { name: "Garden", icon: ICON_MAP.garden },
      { name: "Parking", icon: ICON_MAP.parking },
    ],
    Security: [
      { name: "CCTV", icon: ICON_MAP.cctv },
      { name: "Gated Access", icon: ICON_MAP.doorClosed },
    ],
  },

  BusinessBuilding: {
    Infrastructure: [
      { name: "High-Speed Internet", icon: ICON_MAP.internet },
      { name: "Backup Power", icon: ICON_MAP.backupPower },
      { name: "Air Conditioning", icon: ICON_MAP.ac },
      { name: "Heating", icon: ICON_MAP.heating },
    ],
    OfficeFacilities: [
      { name: "Private Offices", icon: ICON_MAP.office },
      { name: "Meeting Rooms", icon: ICON_MAP.meeting },
      { name: "Open Workspace", icon: ICON_MAP.work },
      { name: "Printer & Copier", icon: ICON_MAP.printer },
    ],
    Services: [
      { name: "Reception Desk", icon: ICON_MAP.bell },
      { name: "Cleaning Service", icon: ICON_MAP.cleaning },
      { name: "Security Personnel", icon: ICON_MAP.security },
    ],
  },

  Hotel: {
    Essentials: [
      { name: "24/7 Check-In", icon: ICON_MAP.key },
      { name: "Wi-Fi", icon: ICON_MAP.wifi },
      { name: "Air Conditioning", icon: ICON_MAP.ac },
      { name: "Daily Housekeeping", icon: ICON_MAP.cleaning },
    ],
    Hospitality: [
      { name: "Room Service", icon: ICON_MAP.bell },
      { name: "Concierge", icon: ICON_MAP.concierge },
      { name: "Luggage Storage", icon: ICON_MAP.parking },
    ],
    Leisure: [
      { name: "Spa & Wellness", icon: ICON_MAP.spa },
      { name: "Gym", icon: ICON_MAP.gym },
      { name: "Entertainment Lounge", icon: ICON_MAP.entertainment },
    ],
    Dining: [
      { name: "Restaurant", icon: ICON_MAP.restaurant },
      { name: "Bar", icon: ICON_MAP.bar },
      { name: "Breakfast Included", icon: ICON_MAP.coffee },
    ],
    Security: [
      { name: "CCTV", icon: ICON_MAP.cctv },
      { name: "Secure Room Access", icon: ICON_MAP.lock },
    ],
  },

  FullHouseRent: {
    Essentials: [
      { name: "Entire House", icon: ICON_MAP.layout },
      { name: "Wi-Fi", icon: ICON_MAP.wifi },
      { name: "Water & Electricity", icon: ICON_MAP.power },
      { name: "Kitchen", icon: ICON_MAP.kitchen },
    ],
    Comfort: [
      { name: "Living Area", icon: ICON_MAP.users },
      { name: "Television", icon: ICON_MAP.tv },
      { name: "Air Conditioning", icon: ICON_MAP.ac },
    ],
    Outdoor: [
      { name: "Garden", icon: ICON_MAP.garden },
      { name: "Parking", icon: ICON_MAP.parking },
    ],
    Security: [
      { name: "Gated Access", icon: ICON_MAP.doorClosed },
      { name: "Security System", icon: ICON_MAP.security },
    ],
  },

  OneRoom: {
    Essentials: [
      { name: "Private Room", icon: ICON_MAP.bed },
      { name: "Wi-Fi", icon: ICON_MAP.wifi },
      { name: "Electricity & Water", icon: ICON_MAP.power },
    ],
    Comfort: [
      { name: "Television", icon: ICON_MAP.tv },
      { name: "Ceiling Fan", icon: ICON_MAP.fan },
    ],
    Security: [
      { name: "Secure Door", icon: ICON_MAP.lock },
      { name: "CCTV", icon: ICON_MAP.cctv },
    ],
  },

  EventBuilding: {
    Essentials: [
      { name: "Large Hall", icon: ICON_MAP.layout },
      { name: "Electricity", icon: ICON_MAP.power },
      { name: "Water Supply", icon: ICON_MAP.water },
    ],
    Facilities: [
      { name: "Stage & Lighting", icon: ICON_MAP.lighting },
      { name: "Seating Area", icon: ICON_MAP.users },
    ],
    Services: [
      { name: "Security Personnel", icon: ICON_MAP.security },
      { name: "Cleaning Service", icon: ICON_MAP.cleaning },
      { name: "Parking", icon: ICON_MAP.parking },
    ],
  },
};

export const PROPERTY_TYPES = Object.keys(AMENITIES) as Array<
  keyof typeof AMENITIES
>;
