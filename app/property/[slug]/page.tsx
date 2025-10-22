import { getAmenities, getCoordinates } from "@/app/utils/property";
import PropertyDetails from "@/components/property/PropertyDetails";
import { properties } from "@/data/properties";
import { notFound } from "next/navigation";

export default async function PropertyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const property = properties.find(
    (p) => p.title.toLowerCase().replace(/\s+/g, "-") === slug
  );

  if (!property) return notFound();

  return (
    <PropertyDetails
      title={property.title}
      description={property.description}
      image={property.image}
      price={property.price}
      type={property.type}
      location={property.location}
      rooms={property.rooms}
      amenities={getAmenities(property.type)}
      coordinates={getCoordinates(property.location)}
    />
  );
}
