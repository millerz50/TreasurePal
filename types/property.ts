export type AppwriteFile = string | { $id: string };

export type PropertyImages = {
  frontElevation?: AppwriteFile;
  southView?: AppwriteFile;
  westView?: AppwriteFile;
  eastView?: AppwriteFile;
  floorPlan?: AppwriteFile;
};

export interface BaseProperty {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  rooms?: number;
  lat: number;
  lng: number;
  images: PropertyImages;
}
