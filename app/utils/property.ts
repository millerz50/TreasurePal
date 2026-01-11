// utils/property.ts
export function getAmenities(type: string): string[] {
  const amenitiesByType: Record<string, string[]> = {
    House: ["Garden", "Garage", "Kitchen", "Wi-Fi", "Laundry", "Parking"],
    Studio: ["Wi-Fi", "Bed", "Desk", "Wardrobe", "Shared Kitchen"],
    Apartment: ["Balcony", "Elevator", "Wi-Fi", "Laundry", "Parking"],
    Loft: ["Rooftop Access", "Open Plan", "Wi-Fi", "Laundry"],
    Townhouse: ["Courtyard", "Garage", "Wi-Fi", "Laundry"],
    Bungalow: ["Garden", "Veranda", "Wi-Fi", "Parking"],
    Condo: ["Gym", "Pool", "Wi-Fi", "Elevator", "Security"],
    Cabin: ["Fireplace", "Wood Interior", "Nature Views"],
    Estate: ["Acreage", "Guest House", "Private Drive", "Security"],
    Duplex: ["Private Garden", "Separate Entrance", "Wi-Fi"],
    Lodge: ["Fireplace", "Wi-Fi", "Nature Views", "Private Area"],
    Hotel: ["Reception", "Wi-Fi", "Room Service", "Pool"],
    Warehouse: ["Loading Dock", "Security", "Power Supply", "Parking"],
    Factory: ["Production Floor", "Power Supply", "Security", "Parking"],
    Stand: ["Serviced", "Title Deed", "Water Access", "Electricity"],
  };
  return amenitiesByType[type] || [];
}

export function getCoordinates(location: string): [number, number] {
  const coords: Record<string, [number, number]> = {
    Harare: [31.0522, -17.8292],
    Bindura: [31.3304, -17.9306],
    Bulawayo: [28.5873, -20.15],
    Mutare: [32.6099, -18.9707],
    Gweru: [29.8123, -19.45],
    Beatrice: [30.85, -18.2833],
    "Mashonaland West": [30.0, -17.5],
  };
  return coords[location] || [30.0, -18.0];
}
