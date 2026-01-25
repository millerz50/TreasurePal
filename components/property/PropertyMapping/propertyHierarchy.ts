import type { PropertyCategory, PropertySubType } from "./propertyTypes";

/* ----------------------------------
   PROPERTY HIERARCHY
----------------------------------- */
export const PROPERTY_HIERARCHY: Record<
  PropertyCategory,
  {
    label: string;
    subTypes: PropertySubType[];
  }
> = {
  Residential: {
    label: "Residential Properties",
    subTypes: [
      "StudentHousing",
      "Lodge",
      "BookingHouse",
      "FullHouse",
      "OneRoom",
    ],
  },
  Commercial: {
    label: "Commercial Properties",
    subTypes: ["BusinessBuilding", "RetailShop", "MixedUse"],
  },
  Hospitality: {
    label: "Hospitality Properties",
    subTypes: ["Hotel", "EventBuilding"],
  },
  Institutional: {
    label: "Institutional Properties",
    subTypes: ["School", "Hospital", "GovernmentBuilding"],
  },
  Recreational: {
    label: "Recreational Properties",
    subTypes: [],
  },
  Agricultural: {
    label: "Agricultural Properties",
    subTypes: [],
  },
  Land: {
    label: "Land Properties",
    subTypes: ["ResidentialStand", "CommercialStand", "IndustrialStand"],
  },
  SpecialPurpose: {
    label: "Special Purpose Properties",
    subTypes: [],
  },
};
