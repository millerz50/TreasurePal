export const PROPERTY_CATEGORIES = [
  "Room Rent",
  "Full House Rent",
  "Lodges & Hotels",
  "Industrial & Commercial",
  "Buy Property",
] as const;

export type PropertyCategory = (typeof PROPERTY_CATEGORIES)[number];
