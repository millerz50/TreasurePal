// src/lib/types.ts

export interface Property {
  title: string;
  price: string;
  type: string;
  rooms: number;
  location: string;
  description: string;
  image: string;
}

export interface Agent {
  id: number;
  name: string;
  surname: string;
  role: string;
  location: string;
  image: string;
  rating: number;
  reviews: number;
  properties: Property[];
}
