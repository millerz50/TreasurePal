// src/lib/propertyMapper.ts

export type RawProperty = {
  $id: string;
  title: string;
  description: string;
  price: number;
  type: string;
  location: string;
  rooms: number;
  amenities: string[];
  images: any;
  lat: number;
  lng: number;
};

export function mapProperty(raw: RawProperty) {
  return {
    ...raw,
    id: raw.$id, // map $id -> id
  };
}

export function mapProperties(rawList: RawProperty[]) {
  return rawList.map(mapProperty);
}
