import type { AmenityMap } from "@/components/property/PropertyMapping/propertyTypes";

export const AMENITIES: AmenityMap = {
  FullHouse: {
    Kitchen: [
      { name: "Oven", icon: "oven" },
      { name: "Refrigerator", icon: "refrigerator" },
      { name: "Coffee Machine", icon: "coffee" },
    ],
    Bathroom: [
      { name: "Shower", icon: "shower" },
      { name: "Bathtub", icon: "bath" },
    ],
    LivingRoom: [
      { name: "Sofa", icon: "chair" },
      { name: "TV", icon: "smart" },
    ],
    Utilities: [
      { name: "WiFi", icon: "wifi" },
      { name: "Power Backup", icon: "backupPower" },
    ],
  },
  Lodge: {
    Bedroom: [{ name: "Bed", icon: "bed" }],
    Utilities: [{ name: "WiFi", icon: "wifi" }],
  },
  Apartment: {
    Bedroom: [{ name: "Bed", icon: "bed" }],
    Kitchen: [{ name: "Refrigerator", icon: "refrigerator" }],
  },
  StudentHousing: {
    Bedroom: [{ name: "Bed", icon: "bed" }],
    StudyArea: [{ name: "Desk", icon: "layout" }],
    Utilities: [{ name: "WiFi", icon: "wifi" }],
  },
  Hotel: {
    Room: [{ name: "Bed", icon: "bed" }],
    Amenities: [
      { name: "Pool", icon: "pool" },
      { name: "Gym", icon: "gym" },
    ],
    Security: [{ name: "CCTV", icon: "cctv" }],
  },
  BusinessBuilding: {
    Office: [
      { name: "Seating", icon: "chair" },
      { name: "WiFi", icon: "wifi" },
    ],
    Utilities: [{ name: "Power", icon: "power" }],
  },
  RetailShop: {
    ShopFloor: [{ name: "Cash Register", icon: "pos" }],
    Utilities: [{ name: "WiFi", icon: "wifi" }],
  },
  EventBuilding: {
    Hall: [{ name: "Seating", icon: "chair" }],
    Utilities: [{ name: "Lighting", icon: "lighting" }],
  },
  // Add more subtypes with amenities as needed...
};
