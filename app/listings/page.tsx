// app/listings/page.tsx
import PropertyCard from "@/components/property/PropertyCard";
import { mapProperties } from "@/lib/propertyMapper";

export const revalidate = 60;

export default async function ListingsPage() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URLV2}/api/v2/properties`,
    { cache: "force-cache" },
  );

  const raw = await res.json();
  const properties = mapProperties(raw);

  return (
    <main className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Listings</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((p) => (
          <PropertyCard key={p.id} property={p} />
        ))}
      </div>
    </main>
  );
}
