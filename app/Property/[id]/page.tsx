"use client";

import PropertyDetails from "@/components/property/PropertyDetails";
import type {
  PropertyType,
  PropertyImages,
} from "@/components/property/types/property";

const API_VERSION = (process.env.NEXT_PUBLIC_API_VERSION || "v2").trim();
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URLV2?.replace(/\/+$/, "") ?? "";

/* -----------------------------
   Helper to safely map images
----------------------------- */
function mapImages(property: any): PropertyImages {
  return {
    frontElevation: property.frontElevation ?? null,
    southView: property.southView ?? null,
    westView: property.westView ?? null,
    eastView: property.eastView ?? null,
    floorPlan: property.floorPlan ?? null,
  };
}

/* -----------------------------
   Page Component
----------------------------- */
export default async function PropertyPage({ params }: any) {
  const id = params?.id as string | undefined;

  if (!id) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold text-red-500">Invalid request</h2>
        <p className="text-muted-foreground mt-2">No property id provided.</p>
      </div>
    );
  }

  try {
    const res = await fetch(
      `${API_BASE_URL}/api/${API_VERSION}/properties/${encodeURIComponent(id)}`,
      { cache: "no-store" },
    );

    if (!res.ok) {
      return (
        <div className="max-w-4xl mx-auto px-4 py-12 text-center">
          <h2 className="text-2xl font-bold text-red-500">
            Property not found
          </h2>
          <p className="text-muted-foreground mt-2">
            The property you are looking for does not exist or has been removed.
          </p>
        </div>
      );
    }

    const data: any = await res.json();

    const coords: [number, number] | undefined =
      data.coordinates &&
      typeof data.coordinates.lng === "number" &&
      typeof data.coordinates.lat === "number"
        ? [data.coordinates.lng, data.coordinates.lat]
        : undefined;

    const property: PropertyType = {
      id: data.$id,
      title: data.title,
      description: data.description,
      type: data.type,
      status: data.status,
      price: data.price,
      location: data.location,
      address: data.address,
      rooms: data.rooms,
      country: data.country,
      agentId: data.agentId ?? null,
      amenities: Array.isArray(data.amenities) ? data.amenities : [],
      coordinates: coords,
      images: mapImages(data),
    };

    return <PropertyDetails property={property} />;
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
