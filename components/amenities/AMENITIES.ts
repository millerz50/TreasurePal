// components/amenities/AmenityMap.ts
import type { AmenityMap } from "@/components/property/PropertyMapping/propertyTypes";

export const AMENITIES: AmenityMap = {
  /* ------------------------ RESIDENTIAL ------------------------ */
  FullHouse: {
    Kitchen: [
      { name: "Oven", icon: "oven" },
      { name: "Microwave", icon: "oven" },
      { name: "Refrigerator", icon: "refrigerator" },
      { name: "Dishwasher", icon: "refrigerator" },
      { name: "Coffee Machine", icon: "coffee" },
      { name: "Cooking Range", icon: "stove" },
    ],
    Bathroom: [
      { name: "Shower", icon: "shower" },
      { name: "Bathtub", icon: "bath" },
      { name: "Heated Floors", icon: "power" },
      { name: "Water Heater", icon: "water" },
    ],
    Bedroom: [
      { name: "Beds", icon: "bed" },
      { name: "Wardrobe", icon: "storage" },
      { name: "Desk", icon: "layout" },
    ],
    LivingRoom: [
      { name: "Sofa", icon: "chair" },
      { name: "TV", icon: "smart" },
      { name: "Bookshelf", icon: "book" },
    ],
    Utilities: [
      { name: "WiFi", icon: "wifi" },
      { name: "Power Backup", icon: "backupPower" },
      { name: "Air Conditioning", icon: "power" },
      { name: "Heating", icon: "power" },
      { name: "Water Supply", icon: "water" },
    ],
    Outdoor: [
      { name: "Garage", icon: "parking" },
      { name: "Garden", icon: "garden" },
      { name: "Balcony", icon: "balcony" },
      { name: "Swimming Pool", icon: "pool" },
    ],
    Security: [
      { name: "CCTV", icon: "cctv" },
      { name: "Alarm System", icon: "safe" },
      { name: "Gate", icon: "doorClosed" },
    ],
  },

  Apartment: {
    Kitchen: [
      { name: "Refrigerator", icon: "refrigerator" },
      { name: "Microwave", icon: "oven" },
    ],
    Bedroom: [{ name: "Bed", icon: "bed" }],
    Bathroom: [{ name: "Shower", icon: "shower" }],
    LivingRoom: [
      { name: "Sofa", icon: "chair" },
      { name: "TV", icon: "smart" },
    ],
    Utilities: [
      { name: "WiFi", icon: "wifi" },
      { name: "Power Backup", icon: "backupPower" },
      { name: "Water Supply", icon: "water" },
    ],
    Outdoor: [{ name: "Balcony", icon: "balcony" }],
    Security: [
      { name: "CCTV", icon: "cctv" },
      { name: "Intercom", icon: "phone" },
    ],
  },

  OneRoom: {
    Bedroom: [{ name: "Bed", icon: "bed" }],
    LivingArea: [
      { name: "Desk", icon: "layout" },
      { name: "Chair", icon: "chair" },
    ],
    Utilities: [
      { name: "WiFi", icon: "wifi" },
      { name: "Electricity", icon: "power" },
    ],
    Security: [{ name: "CCTV", icon: "cctv" }],
  },

  Lodge: {
    Bedroom: [{ name: "Bed", icon: "bed" }],
    Utilities: [{ name: "WiFi", icon: "wifi" }],
  },

  StudentHousing: {
    Bedroom: [{ name: "Bed", icon: "bed" }],
    StudyArea: [{ name: "Desk", icon: "layout" }],
    Utilities: [{ name: "WiFi", icon: "wifi" }],
  },

  BookingHouse: {
    Bedroom: [{ name: "Bed", icon: "bed" }],
    Bathroom: [{ name: "Shower", icon: "shower" }],
    Utilities: [{ name: "WiFi", icon: "wifi" }],
  },

  /* ------------------------ HOSPITALITY ------------------------ */
  Hotel: {
    Room: [
      { name: "Beds", icon: "bed" },
      { name: "Desk", icon: "layout" },
      { name: "TV", icon: "smart" },
      { name: "WiFi", icon: "wifi" },
    ],
    Amenities: [
      { name: "Swimming Pool", icon: "pool" },
      { name: "Gym", icon: "gym" },
      { name: "Spa", icon: "spa" },
      { name: "Bar", icon: "bar" },
      { name: "Restaurant", icon: "restaurant" },
      { name: "Conference Hall", icon: "office" },
      { name: "Parking", icon: "parking" },
    ],
    Security: [
      { name: "CCTV", icon: "cctv" },
      { name: "Fire Safety", icon: "safe" },
    ],
    Services: [
      { name: "Room Service", icon: "bell" },
      { name: "Laundry", icon: "washer" },
      { name: "Reception", icon: "concierge" },
    ],
  },

  GuestHouse: {
    Bedroom: [{ name: "Beds", icon: "bed" }],
    Kitchen: [{ name: "Coffee Machine", icon: "coffee" }],
    Utilities: [
      { name: "WiFi", icon: "wifi" },
      { name: "Power", icon: "power" },
    ],
    Outdoor: [{ name: "Parking", icon: "parking" }],
  },

  /* ------------------------ COMMERCIAL ------------------------ */
  BusinessBuilding: {
    Office: [
      { name: "Desks", icon: "layout" },
      { name: "Chairs", icon: "chair" },
      { name: "WiFi", icon: "wifi" },
      { name: "Printer", icon: "printer" },
      { name: "Projector", icon: "smart" },
    ],
    Utilities: [
      { name: "Power", icon: "power" },
      { name: "Backup Power", icon: "backupPower" },
    ],
    Security: [
      { name: "CCTV", icon: "cctv" },
      { name: "Fire Safety", icon: "safe" },
    ],
    Parking: [{ name: "Parking Lot", icon: "parking" }],
  },

  OfficeBlock: {
    Office: [
      { name: "Desks", icon: "layout" },
      { name: "Chairs", icon: "chair" },
      { name: "WiFi", icon: "wifi" },
      { name: "Conference Rooms", icon: "office" },
    ],
    Utilities: [
      { name: "Power", icon: "power" },
      { name: "Backup Power", icon: "backupPower" },
    ],
    Security: [
      { name: "CCTV", icon: "cctv" },
      { name: "Access Control", icon: "lock" },
    ],
    Parking: [{ name: "Parking Lot", icon: "parking" }],
  },

  RetailShop: {
    ShopFloor: [
      { name: "Cash Register", icon: "pos" },
      { name: "Shelves", icon: "layout" },
    ],
    Utilities: [
      { name: "WiFi", icon: "wifi" },
      { name: "Power", icon: "power" },
    ],
    Security: [{ name: "CCTV", icon: "cctv" }],
    Parking: [{ name: "Parking Lot", icon: "parking" }],
  },

  Industrial: {
    Machinery: [
      { name: "Crane", icon: "crane" },
      { name: "Forklift", icon: "crane" },
    ],
    Storage: [{ name: "Storage Racks", icon: "storage" }],
    Utilities: [
      { name: "Power", icon: "power" },
      { name: "Backup Power", icon: "backupPower" },
    ],
    Safety: [
      { name: "CCTV", icon: "cctv" },
      { name: "Fire Safety", icon: "safe" },
      { name: "Protective Gear", icon: "locker" },
    ],
    Parking: [{ name: "Truck Parking", icon: "parking" }],
  },

  Warehouse: {
    Storage: [{ name: "Storage Racks", icon: "storage" }],
    Utilities: [{ name: "Power", icon: "power" }],
    Safety: [
      { name: "CCTV", icon: "cctv" },
      { name: "Fire Safety", icon: "safe" },
    ],
    Parking: [{ name: "Truck Parking", icon: "parking" }],
  },

  Factory: {
    Machinery: [{ name: "Industrial Machines", icon: "crane" }],
    Utilities: [
      { name: "Power", icon: "power" },
      { name: "Backup Power", icon: "backupPower" },
    ],
    Safety: [
      { name: "CCTV", icon: "cctv" },
      { name: "Fire Safety", icon: "safe" },
    ],
    Parking: [{ name: "Truck Parking", icon: "parking" }],
  },

  /* ------------------------ LAND & SPECIAL PURPOSE ------------------------ */
  ResidentialStand: {
    Utilities: [
      { name: "Electricity", icon: "power" },
      { name: "Water", icon: "water" },
    ],
    Security: [{ name: "Fence", icon: "lock" }],
  },

  CommercialStand: {
    Utilities: [
      { name: "Electricity", icon: "power" },
      { name: "Water", icon: "water" },
    ],
    Security: [{ name: "CCTV", icon: "cctv" }],
    Parking: [{ name: "Lot", icon: "parking" }],
  },

  IndustrialStand: {
    Utilities: [{ name: "Power", icon: "power" }],
    Safety: [{ name: "CCTV", icon: "cctv" }],
    Parking: [{ name: "Truck Lot", icon: "parking" }],
  },
  SpecialPurposeProperty: {
    Amenities: [
      { name: "Solar Power", icon: "solar" },
      { name: "Parking", icon: "parking" },
      { name: "Backup Generator", icon: "backupPower" },
    ],
  },

  RecreationalFacility: {
    // <- rename key
    Amenities: [
      { name: "Pool", icon: "pool" },
      { name: "Gym", icon: "gym" },
      { name: "Garden", icon: "garden" },
      { name: "Parking", icon: "parking" },
    ],
  },

  AgriculturalLand: {
    // <- rename key
    LandUse: [
      { name: "Irrigation", icon: "water" },
      { name: "Storage", icon: "storage" },
      { name: "Solar Power", icon: "solar" },
    ],
    Utilities: [{ name: "Power", icon: "power" }],
  },
};
