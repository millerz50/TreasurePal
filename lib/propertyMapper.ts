export type AppwriteFile = string | { $id: string };

export type RawProperty = {
  $id: string;
  title: string;
  description: string;
  price: number;
  type: string;
  subType?: string;
  location: string;
  rooms?: number;
  amenities?: string[];
  frontElevation?: AppwriteFile;
  southView?: AppwriteFile;
  westView?: AppwriteFile;
  eastView?: AppwriteFile;
  floorPlan?: AppwriteFile;
  lat?: number;
  lng?: number;
  property_status?: string;
};

/* =========================
   UI PROPERTY (single truth)
========================= */
export type Property = {
  id: string;
  title: string;
  description: string;
  price: number;
  type: string;
  subType?: string;
  location: string;
  rooms: number; // <-- REQUIRED now
  amenities: string[];
  lat: number;
  lng: number;
  status: string;
  images: {
    frontElevation?: AppwriteFile;
    southView?: AppwriteFile;
    westView?: AppwriteFile;
    eastView?: AppwriteFile;
    floorPlan?: AppwriteFile;
  };
};

/* =========================
   MAPPER
========================= */
export function mapProperty(raw: RawProperty): Property {
  return {
    id: raw.$id,
    title: raw.title,
    description: raw.description,
    price: raw.price,
    type: raw.type,
    subType: raw.subType,
    location: raw.location,
    rooms: raw.rooms ?? 0, // <-- DEFAULT VALUE
    amenities: raw.amenities ?? [],
    lat: raw.lat ?? 0,
    lng: raw.lng ?? 0,
    status: raw.property_status ?? "unknown",

    images: {
      frontElevation: raw.frontElevation,
      southView: raw.southView,
      westView: raw.westView,
      eastView: raw.eastView,
      floorPlan: raw.floorPlan,
    },
  };
}

export function mapProperties(rawList: RawProperty[]): Property[] {
  return rawList.map(mapProperty);
}
