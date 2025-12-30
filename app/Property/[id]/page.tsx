// app/property/[id]/page.tsx
import PropertyDetails from "@/components/property/PropertyDetails";

type PageProps = {
  params: { id: string };
};

export default async function PropertyPage({ params }: PageProps) {
  const { id } = params;

  // Call your Express API (adjust base URL to match your backend)
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/property/${id}`, {
    cache: "no-store", // always fetch fresh data
  });

  if (!res.ok) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold text-red-500">Property not found</h2>
        <p className="text-muted-foreground mt-2">
          The property you are looking for does not exist or has been removed.
        </p>
      </div>
    );
  }

  const property = await res.json();

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
    agentId: property.agentId,
    amenities: property.amenities || [],
    coordinates: property.coordinates
      ? [property.coordinates.lng, property.coordinates.lat]
      : undefined,
    images: {
      frontElevation: property.frontElevation,
      southView: property.southView,
      westView: property.westView,
      eastView: property.eastView,
      floorPlan: property.floorPlan,
    },
  };

  return <PropertyDetails property={mapped} />;
}
