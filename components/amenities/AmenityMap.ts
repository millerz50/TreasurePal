// components/amenities/amenities.ts
import { ICON_MAP } from "./AmenityIcons";

/* ----------------------------------
   TYPES
----------------------------------- */

/**
 * `icon` is a key into ICON_MAP so it's strongly typed and safe to use
 * when rendering icons in the UI.
 */
export interface AmenityItem {
  name: string;
  icon: keyof typeof ICON_MAP;
}

export type AmenityCategory = Record<string, AmenityItem[]>;

export interface AmenityMap {
  [propertyType: string]: AmenityCategory;
}

/* ----------------------------------
   AMENITIES MAP (CORRECTED & TYPED)
   - `icon` values are keys from ICON_MAP
   - Removed references to icons that weren't defined
   - Use consistent, user-facing category names
----------------------------------- */

export const AMENITIES: AmenityMap = {
  StudentHousing: {
    Essentials: [
      { name: "Furnished Room", icon: "bed" },
      { name: "Wi‑Fi", icon: "wifi" },
      { name: "Electricity & Water", icon: "power" },
      { name: "Shared Kitchen", icon: "kitchen" },
      { name: "Heating", icon: "heating" },
      { name: "Hot Water", icon: "water" },
      { name: "Laundry Facilities", icon: "laundry" },
      { name: "On‑Site Maintenance", icon: "maintenance" },
    ],
    StudyFacilities: [
      { name: "Study Room", icon: "study" },
      { name: "Library Access", icon: "library" },
      { name: "Quiet Zones", icon: "layout" },
      { name: "Computer Lab", icon: "computer" },
      { name: "High‑Speed Internet", icon: "internet" },
    ],
    Safety: [
      { name: "CCTV", icon: "cctv" },
      { name: "Secure Entry", icon: "lock" },
      { name: "On‑Site Security", icon: "security" },
      { name: "Smoke Detectors", icon: "tag" },
      { name: "Fire Extinguishers", icon: "tag" },
    ],
    Community: [
      { name: "Common Lounge", icon: "users" },
      { name: "Student Events", icon: "star" },
      { name: "Shared TV / Media Room", icon: "tv" },
      { name: "Bicycle Storage", icon: "bike" },
      { name: "Laundry Services", icon: "laundry" },
    ],
    Policies: [
      { name: "Flexible Lease Terms", icon: "calendar" },
      { name: "No Smoking", icon: "tag" },
      { name: "Guest Policy", icon: "users" },
    ],
  },

  Lodge: {
    Essentials: [
      { name: "Private Room", icon: "bed" },
      { name: "Wi‑Fi", icon: "wifi" },
      { name: "Hot Water", icon: "water" },
      { name: "Air Conditioning", icon: "ac" },
      { name: "Heating", icon: "heating" },
    ],
    Hospitality: [
      { name: "Room Service", icon: "bell" },
      { name: "Daily Housekeeping", icon: "cleaning" },
      { name: "Reception Desk", icon: "concierge" },
    ],
    Leisure: [
      { name: "Scenic View", icon: "view" },
      { name: "Garden", icon: "garden" },
      { name: "Lounge Area", icon: "users" },
      { name: "Swimming Pool", icon: "pool" },
      { name: "Outdoor Seating", icon: "chair" },
    ],
    Accessibility: [
      { name: "Wheelchair Accessible", icon: "wheelchair" },
      { name: "Elevator", icon: "elevator" },
      { name: "Accessible Bathroom", icon: "bath" },
    ],
    Security: [
      { name: "CCTV", icon: "cctv" },
      { name: "Secure Access", icon: "lock" },
      { name: "Safe Deposit Box", icon: "safe" },
    ],
    Policies: [
      { name: "Pet Friendly", icon: "pet" },
      { name: "Free Cancellation", icon: "calendarCheck" },
    ],
  },

  BookingHouse: {
    Essentials: [
      { name: "Bedrooms", icon: "bed" },
      { name: "Wi‑Fi", icon: "wifi" },
      { name: "Kitchen", icon: "kitchen" },
      { name: "Water & Electricity", icon: "power" },
      { name: "Hot Water", icon: "water" },
    ],
    Comfort: [
      { name: "Living Room", icon: "users" },
      { name: "Television", icon: "tv" },
      { name: "Balcony", icon: "balcony" },
      { name: "Air Conditioning", icon: "ac" },
      { name: "Heating", icon: "heating" },
    ],
    Outdoor: [
      { name: "Garden", icon: "garden" },
      { name: "Parking", icon: "parking" },
      { name: "BBQ / Grill", icon: "bbq" },
    ],
    Appliances: [
      { name: "Refrigerator", icon: "fridge" },
      { name: "Oven / Stove", icon: "stove" },
      { name: "Microwave", icon: "microwave" },
      { name: "Washing Machine", icon: "washer" },
      { name: "Dryer", icon: "dryer" },
    ],
    Security: [
      { name: "CCTV", icon: "cctv" },
      { name: "Gated Access", icon: "doorClosed" },
      { name: "Alarm System", icon: "tag" },
    ],
    Family: [
      { name: "Child‑Friendly", icon: "child" },
      { name: "Crib / High Chair", icon: "seating" },
    ],
  },

  BusinessBuilding: {
    Infrastructure: [
      { name: "High‑Speed Internet", icon: "internet" },
      { name: "Backup Power", icon: "backupPower" },
      { name: "Air Conditioning", icon: "ac" },
      { name: "Heating", icon: "heating" },
      { name: "Elevator", icon: "elevator" },
    ],
    OfficeFacilities: [
      { name: "Private Offices", icon: "office" },
      { name: "Meeting Rooms", icon: "meeting" },
      { name: "Open Workspace", icon: "work" },
      { name: "Printer & Copier", icon: "printer" },
      { name: "Reception Desk", icon: "bell" },
    ],
    Services: [
      { name: "Cleaning Service", icon: "cleaning" },
      { name: "Security Personnel", icon: "security" },
      { name: "Mail Handling", icon: "mail_handling" },
    ],
    Accessibility: [
      { name: "Wheelchair Accessible", icon: "wheelchair" },
      { name: "Parking", icon: "parking" },
    ],
    Sustainability: [
      { name: "Solar Panels", icon: "solar" },
      { name: "Energy Efficient Lighting", icon: "lighting" },
    ],
  },

  Hotel: {
    Essentials: [
      { name: "24/7 Check‑In", icon: "key" },
      { name: "Wi‑Fi", icon: "wifi" },
      { name: "Air Conditioning", icon: "ac" },
      { name: "Daily Housekeeping", icon: "cleaning" },
      { name: "Laundry Service", icon: "laundry" },
    ],
    Hospitality: [
      { name: "Room Service", icon: "bell" },
      { name: "Concierge", icon: "concierge" },
      { name: "Luggage Storage", icon: "valet" },
      { name: "Valet Parking", icon: "valet" },
    ],
    Leisure: [
      { name: "Spa & Wellness", icon: "spa" },
      { name: "Gym", icon: "gym" },
      { name: "Swimming Pool", icon: "pool" },
      { name: "Entertainment Lounge", icon: "entertainment" },
    ],
    Dining: [
      { name: "Restaurant", icon: "restaurant" },
      { name: "Bar", icon: "bar" },
      { name: "Breakfast Included", icon: "coffee" },
      { name: "Room Dining", icon: "bell" },
    ],
    Business: [
      { name: "Conference Rooms", icon: "meeting" },
      { name: "Business Center", icon: "computer" },
    ],
    Security: [
      { name: "CCTV", icon: "cctv" },
      { name: "Secure Room Access", icon: "lock" },
      { name: "Safe in Room", icon: "safe" },
    ],
  },

  FullHouseRent: {
    Essentials: [
      { name: "Entire House", icon: "layout" },
      { name: "Wi‑Fi", icon: "wifi" },
      { name: "Water & Electricity", icon: "power" },
      { name: "Kitchen", icon: "kitchen" },
      { name: "Hot Water", icon: "water" },
    ],
    Comfort: [
      { name: "Living Area", icon: "users" },
      { name: "Television", icon: "tv" },
      { name: "Air Conditioning", icon: "ac" },
      { name: "Heating", icon: "heating" },
    ],
    Outdoor: [
      { name: "Garden", icon: "garden" },
      { name: "Private Pool", icon: "pool" },
      { name: "Parking", icon: "parking" },
      { name: "Patio / Deck", icon: "chair" },
    ],
    Appliances: [
      { name: "Refrigerator", icon: "fridge" },
      { name: "Oven / Stove", icon: "stove" },
      { name: "Microwave", icon: "microwave" },
      { name: "Washing Machine", icon: "washer" },
      { name: "Dryer", icon: "dryer" },
    ],
    Family: [
      { name: "Child‑Friendly", icon: "child" },
      { name: "Pet Friendly", icon: "pet" },
    ],
    Security: [
      { name: "Gated Access", icon: "doorClosed" },
      { name: "Security System", icon: "security" },
    ],
  },

  OneRoom: {
    Essentials: [
      { name: "Private Room", icon: "bed" },
      { name: "Wi‑Fi", icon: "wifi" },
      { name: "Electricity & Water", icon: "power" },
      { name: "Hot Water", icon: "water" },
    ],
    Comfort: [
      { name: "Television", icon: "tv" },
      { name: "Ceiling Fan", icon: "fan" },
      { name: "Air Conditioning", icon: "ac" },
    ],
    Appliances: [
      { name: "Mini Fridge", icon: "fridge" },
      { name: "Microwave", icon: "microwave" },
    ],
    Security: [
      { name: "Secure Door", icon: "lock" },
      { name: "CCTV", icon: "cctv" },
    ],
    Policies: [
      { name: "Short‑Term Stays Allowed", icon: "calendar" },
      { name: "Long‑Term Discounts", icon: "tag" },
    ],
  },

  EventBuilding: {
    Essentials: [
      { name: "Large Hall", icon: "layout" },
      { name: "Electricity", icon: "power" },
      { name: "Water Supply", icon: "water" },
      { name: "Restrooms", icon: "bath" },
    ],
    Facilities: [
      { name: "Stage & Lighting", icon: "lighting" },
      { name: "Seating Area", icon: "seating" },
      { name: "Sound System", icon: "speaker" },
      { name: "Catering Kitchen", icon: "kitchen" },
    ],
    Services: [
      { name: "Security Personnel", icon: "security" },
      { name: "Cleaning Service", icon: "cleaning" },
      { name: "Parking", icon: "parking" },
      { name: "Event Staff", icon: "users" },
    ],
    Accessibility: [
      { name: "Wheelchair Accessible", icon: "wheelchair" },
      { name: "Elevator", icon: "elevator" },
    ],
  },

  Industrial: {
    Essentials: [
      { name: "Large Floor Area", icon: "layout" },
      { name: "High Power Supply", icon: "power" },
      { name: "Loading Dock", icon: "loading_dock" },
      { name: "Heavy Vehicle Access", icon: "truck" },
    ],
    Facilities: [
      { name: "Cranes / Hoists", icon: "crane" },
      { name: "Office Space", icon: "office" },
      { name: "Storage Yard", icon: "storage" },
    ],
    Safety: [
      { name: "Fire Suppression", icon: "tag" },
      { name: "CCTV", icon: "cctv" },
      { name: "Security Fencing", icon: "fence" },
    ],
    Services: [
      { name: "24/7 Access", icon: "calendar" },
      { name: "Waste Management", icon: "trash" },
    ],
  },

  Retail: {
    Essentials: [
      { name: "Street Frontage", icon: "store" },
      { name: "Display Windows", icon: "storefront" },
      { name: "Electricity", icon: "power" },
    ],
    Facilities: [
      { name: "Storage Room", icon: "storage" },
      { name: "Fitting Rooms", icon: "chair" },
      { name: "Point of Sale", icon: "pos" },
    ],
    Services: [
      { name: "Security", icon: "security" },
      { name: "Cleaning", icon: "cleaning" },
    ],
  },

  MixedUse: {
    Essentials: [
      { name: "Residential Units", icon: "layout" },
      { name: "Commercial Units", icon: "store" },
      { name: "Parking", icon: "parking" },
    ],
    Amenities: [
      { name: "Gym", icon: "gym" },
      { name: "Rooftop Terrace", icon: "view" },
      { name: "Concierge", icon: "concierge" },
    ],
    Sustainability: [
      { name: "Solar Panels", icon: "solar" },
      { name: "Recycling Facilities", icon: "recycle" },
    ],
  },
};

/* ----------------------------------
   ROUTE → PROPERTY TYPE MAP
   - Use this to map your nav/listing routes to the AMENITIES keys
----------------------------------- */

export const ROUTE_TO_PROPERTY_TYPE: Record<string, keyof typeof AMENITIES> = {
  "/listings/students": "StudentHousing",
  "/listings/lodges": "Lodge",
  "/listings/houses": "FullHouseRent",
  "/listings/apartments": "OneRoom",
  "/listings/industrial": "Industrial",
  "/listings/hotels": "Hotel",
  "/listings/event-venues": "EventBuilding",
  "/listings/booking-houses": "BookingHouse",
  "/listings/retail": "Retail",
  "/listings/business": "BusinessBuilding",
  "/listings/mixed-use": "MixedUse",
};

/* ----------------------------------
   EXPORTS
----------------------------------- */

export const PROPERTY_TYPES = Object.keys(AMENITIES) as Array<
  keyof typeof AMENITIES
>;
