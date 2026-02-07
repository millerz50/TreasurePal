// app/listings/page.tsx
import PropertyCard from "@/components/property/PropertyCard";
import { mapProperties } from "@/lib/propertyMapper";

export const revalidate = 60;

export const metadata = {
  title: "All Property Listings | TreasurePal",
  description:
    "Explore all available properties for sale and rent. Find residential, commercial, and industrial properties in Zimbabwe.",
  openGraph: {
    title: "All Property Listings | TreasurePal",
    description:
      "Explore all available properties for sale and rent. Find residential, commercial, and industrial properties in Zimbabwe.",
    type: "website",
    url: "https://www.treasurepal.co.zw/listings",
  },
};

export default async function ListingsPage() {
  // Fetch all properties from API
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URLV2}/api/v2/properties/all`,
    { cache: "force-cache" },
  );

  const raw = await res.json();

  // Map to correct structure
  const mapped = mapProperties(raw);
  const properties = Array.isArray(mapped) ? mapped : [];

  return (
    <main className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">All Properties</h1>
      <p className="mb-6 text-gray-600">
        Browse all available residential, commercial, and industrial properties
        for sale or rent.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.length > 0 ? (
          properties.map((p) => <PropertyCard key={p.id} property={p} />)
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No properties found.
          </p>
        )}
      </div>
    </main>
  );
}
