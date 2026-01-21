// app/property/[id]/page.tsx
import PropertyDetails from "@/components/property/PropertyDetails";
import { cookies } from "next/headers";

const API_VERSION = (process.env.NEXT_PUBLIC_API_VERSION || "v2").trim();
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URLV2?.replace(/\/+$/, "") ?? "";

type Property = {
  $id: string;
  title: string;
  description: string;
  type: string;
  status: string;
  price: number;
  location: string;
  address: string;
  rooms: number;
  country: string;
  agentId: string | null;
  amenities: string[];
  coordinates?: { lng: number; lat: number };
  frontElevation?: string | null;
  southView?: string | null;
  westView?: string | null;
  eastView?: string | null;
  floorPlan?: string | null;
};

export default async function PropertyPage({ params }: { params: { id?: string } }) {
  const id = params?.id;

  if (!id) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold text-red-500">Invalid request</h2>
        <p className="text-muted-foreground mt-2">No property id provided.</p>
      </div>
    );
  }

  try {
    // 1️⃣ Get JWT from cookies
    const cookieStore = cookies();
    const jwt = cookieStore.get("jwt")?.value;

    if (!jwt) {
      throw new Error("Unauthorized: No token found");
    }

    // 2️⃣ Fetch the user profile to verify authentication
    const profileRes = await fetch(`${API_BASE_URL}/api/${API_VERSION}/users/me`, {
      headers: { Authorization: `Bearer ${jwt}` },
      cache: "no-store",
    });

    if (!profileRes.ok) {
      throw new Error("Unauthorized: Invalid token");
    }

    const profile = await profileRes.json();

    // 3️⃣ Fetch property details securely
    const propertyRes = await fetch(`${API_BASE_URL}/api/${API_VERSION}/properties/${encodeURIComponent(id)}`, {
      headers: { Authorization: `Bearer ${jwt}` },
      cache: "no-store",
    });

    if (!propertyRes.ok) {
      return (
        <div className="max-w-4xl mx-auto px-4 py-12 text-center">
          <h2 className="text-2xl font-bold text-red-500">Property not found</h2>
          <p className="text-muted-foreground mt-2">
            The property you are looking for does not exist or has been removed in our database.
          </p>
        </div>
      );
    }

    const property: Property = await propertyRes.json();

    // Safely map coordinates into a tuple [lng, lat]
    const coords: [number, number] | undefined =
      property.coordinates &&
      typeof property.coordinates.lng === "number" &&
      typeof property.coordinates.lat === "number"
        ? [property.coordinates.lng, property.coordinates.lat]
        : undefined;

    // Map raw API response into the shape PropertyDetails expects
    const mapped = {
      id: property.$id,
      title: property.title,
      description: property.description,
      type: property.type,
      status: property.status,
      price: property.price,
      location: property.location,
      address: property.address,
      rooms: property.rooms,
      country: property.country,
      agentId: property.agentId ?? null,
      amenities: Array.isArray(property.amenities) ? property.amenities : [],
      coordinates: coords,
      images: {
        frontElevation: property.frontElevation ?? null,
        southView: property.southView ?? null,
        westView: property.westView ?? null,
        eastView: property.eastView ?? null,
        floorPlan: property.floorPlan ?? null,
      },
    };

    return <PropertyDetails property={mapped} />;
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold text-red-500">Error</h2>
        <p className="text-muted-foreground mt-2">{message}</p>
      </div>
    );
  }
}


