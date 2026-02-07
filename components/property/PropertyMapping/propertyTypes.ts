import { ICON_MAP } from "@/components/icons/maps/ICON_MAP";

/* ----------------------------------
   PROPERTY CATEGORIES (RUNTIME + TYPE)
----------------------------------- */
export const PROPERTY_CATEGORIES = [
  "Residential",
  "Commercial",
  "Hospitality",
  "Institutional",
  "Recreational",
  "Agricultural",
  "Land",
  "SpecialPurpose",
] as const;

export type PropertyCategory = (typeof PROPERTY_CATEGORIES)[number];

/* ----------------------------------
   PROPERTY SUB TYPES (GROUPED)
----------------------------------- */
export const PROPERTY_SUBTYPES = {
  Residential: [
    "FullHouse",
    "Apartment",
    "OneRoom",
    "Bedsitter",
    "StudentHousing",
  ],
  Commercial: [
    "BusinessBuilding",
    "OfficeBlock",
    "RetailShop",
    "ShoppingMall",
    "MixedUse",
    "Industrial",
    "Warehouse",
    "Factory",
  ],
  Hospitality: [
    "Hotel",
    "GuestHouse",
    "Lodge",
    "BookingHouse",
    "EventBuilding",
  ],
  Institutional: ["School", "Hospital", "GovernmentBuilding"],
  Recreational: ["RecreationalFacility"],
  Agricultural: ["AgriculturalLand"],
  Land: ["ResidentialStand", "CommercialStand", "IndustrialStand"],
  SpecialPurpose: ["SpecialPurposeProperty"],
} as const;

/* ----------------------------------
   SUBTYPE TYPE (CATEGORY-SAFE)
----------------------------------- */
export type PropertySubType =
  (typeof PROPERTY_SUBTYPES)[PropertyCategory][number];

/* ----------------------------------
   AMENITIES TYPES
----------------------------------- */
export interface AmenityItem {
  name: string;
  icon: keyof typeof ICON_MAP;
}

export type AmenityCategory = Record<string, AmenityItem[]>;

export type AmenityMap = {
  [K in PropertySubType]?: AmenityCategory;
};

/* ----------------------------------
   PROPERTY MODEL
----------------------------------- */
export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  type: PropertyCategory;
  subType: PropertySubType;
  location: string;
  rooms?: number;
  lat: number;
  lng: number;
  status: "active" | "pending" | "sold";
  images: {
    frontElevation?: string;
    southView?: string;
    westView?: string;
    eastView?: string;
    floorPlan?: string;
  };
}
/* ----------------------------------
   PROPERTY SETUP MAP (CATEGORY SAFE)
----------------------------------- */
export type PropertySetupMap = {
  label: string;
  subTypes: Partial<Record<PropertySubType, AmenityCategory>>;
};
