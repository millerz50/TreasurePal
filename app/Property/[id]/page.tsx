// app/property/[id]/page.tsx
import PropertyDetails from "@/components/property/PropertyDetails";

export default async function PropertyPage(props: any) {
  const { params } = props;
  const id = params?.id;

  if (!id) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold text-red-500">Invalid request</h2>
        <p className="text-muted-foreground mt-2">No property id provided.</p>
      </div>
    );
  }

  // Call your Express API (adjust base URL to match your backend)
  const base = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ?? "";
  const url = `${base}/api/properties/${encodeURIComponent(id)}`;

  const res = await fetch(url, {
    cache: "no-store", // always fetch fresh data
  });

  if (!res.ok) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold text-red-500">Property not found</h2>
        <p className="text-muted-foreground mt-2">
          The property you are looking for does not exist or has been removed in
          our database.
        </p>
      </div>
    );
  }

  const property = await res.json();

  // Safely map coordinates into a tuple [lng, lat]
  let coords: [number, number] | undefined;
  if (
    property?.coordinates &&
    typeof property.coordinates.lng === "number" &&
    typeof property.coordinates.lat === "number"
  ) {
    coords = [property.coordinates.lng, property.coordinates.lat];
  }

  // Map raw API response into the shape PropertyDetails expects
  const mapped = {
    id: String(property.$id ?? ""),
    title: String(property.title ?? ""),
    description: String(property.description ?? ""),
    type: String(property.type ?? ""),
    status: String(property.status ?? ""),
    price: Number(property.price ?? 0),
    location: String(property.location ?? ""),
    address: String(property.address ?? ""),
    rooms: Number(property.rooms ?? 0),
    country: String(property.country ?? ""),
    agentId: property.agentId ? String(property.agentId) : null,
    amenities: Array.isArray(property.amenities)
      ? (property.amenities as string[])
      : [],
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
}
