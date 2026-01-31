import PropertyDetails from "@/components/property/PropertyDetails";
import type {
  PropertyType,
  PropertyImages,
} from "@/components/property/types/property";

const API_VERSION = (process.env.NEXT_PUBLIC_API_VERSION || "v2").trim();
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URLV2?.replace(/\/+$/, "");

function mapImages(property: any): PropertyImages {
  return {
    frontElevation: property.frontElevation ?? null,
    southView: property.southView ?? null,
    westView: property.westView ?? null,
    eastView: property.eastView ?? null,
    floorPlan: property.floorPlan ?? null,
  };
}

type PageProps = {
  params: {
    id: string;
  };
};

export default async function PropertyPage({ params }: PageProps) {
  if (!API_BASE_URL) {
    throw new Error("API base URL is not configured");
  }

  const { id } = params;

  try {
    const res = await fetch(
      `${API_BASE_URL}/api/${API_VERSION}/properties/${encodeURIComponent(id)}`,
      {
        cache: "no-store",
      },
    );

    if (!res.ok) {
      return (
        <div className="max-w-4xl mx-auto px-4 py-12 text-center">
          <h2 className="text-2xl font-bold text-red-500">
            Property not found
          </h2>
          <p className="text-muted-foreground mt-2">
            The property does not exist or has been removed.
          </p>
        </div>
      );
    }

    const data = await res.json();

    const coords =
      data.coordinates?.lng != null && data.coordinates?.lat != null
        ? ([data.coordinates.lng, data.coordinates.lat] as [number, number])
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
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected error";

    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold text-red-500">Error</h2>
        <p className="text-muted-foreground mt-2">{message}</p>
      </div>
    );
  }
}
