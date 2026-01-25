import type { ICON_MAP } from "@/components/icons/maps/ICON_MAP";

/* ----------------------------------
   PROPERTY CATEGORIES
----------------------------------- */
export type PropertyCategory =
  | "Residential"
  | "Commercial"
  | "Hospitality"
  | "Institutional"
  | "Recreational"
  | "Agricultural"
  | "Land"
  | "SpecialPurpose";

/* ----------------------------------
   PROPERTY SUB TYPES
----------------------------------- */
export type PropertySubType =
  // Residential
  | "FullHouse"
  | "Apartment"
  | "OneRoom"
  | "Bedsitter"
  | "StudentHousing"
  | "Lodge"
  | "BookingHouse"
  | "SpecialPurposeProperty"

  // Commercial
  | "BusinessBuilding"
  | "OfficeBlock"
  | "RetailShop"
  | "ShoppingMall"
  | "MixedUse"
  | "Industrial"
  | "Warehouse"
  | "Factory"

  // Hospitality
  | "Hotel"
  | "GuestHouse"
  | "EventBuilding"

  // Institutional
  | "School"
  | "Hospital"
  | "GovernmentBuilding"

  // Land
  | "ResidentialStand"
  | "CommercialStand"
  | "IndustrialStand"

  // Additional subtypes for categories without existing subtypes
  | "RecreationalFacility" // Recreational
  | "AgriculturalLand"; // Agricultural

/* ----------------------------------
   AMENITIES TYPES
----------------------------------- */
export interface AmenityItem {
  name: string;
  icon: keyof typeof ICON_MAP;
}

export type AmenityCategory = Record<string, AmenityItem[]>;

export type AmenityMap = {
  [key in PropertySubType]?: AmenityCategory;
};

/* ----------------------------------
   PROPERTY SETUP TYPES
----------------------------------- */
export interface PropertySetupMap {
  label: string;
  subTypes: Record<PropertySubType, AmenityCategory | undefined>;
}
