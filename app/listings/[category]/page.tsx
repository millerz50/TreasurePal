import { notFound } from "next/navigation";
import Link from "next/link";
import { PROPERTY_HIERARCHY } from "@/components/property/PropertyMapping/propertyHierarchy";

type Props = {
  params: { category: string };
};

export default function CategoryPage({ params }: Props) {
  const categoryKey = params.category as keyof typeof PROPERTY_HIERARCHY;
  const category = PROPERTY_HIERARCHY[categoryKey];

  if (!category) notFound();

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <h1 className="text-5xl font-extrabold text-gray-800 mb-6">
        {category.label}
      </h1>
      {category.subTypes.length > 0 ? (
        <>
          <p className="text-gray-600 mb-8 text-lg">
            Explore subcategories within {category.label}:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {category.subTypes.map((sub) => (
              <Link
                key={sub}
                href={`/properties/${categoryKey.toLowerCase()}/${sub}`}
                className="group relative block rounded-xl overflow-hidden shadow-md bg-white p-6 hover:shadow-xl transition transform hover:scale-105 border border-gray-100"
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-indigo-600 transition">
                  {sub}
                </h2>
                <p className="text-gray-500">View properties under {sub}</p>
                <div className="absolute bottom-4 right-4 text-indigo-500 group-hover:translate-x-1 transition-transform">
                  &rarr;
                </div>
              </Link>
            ))}
          </div>
        </>
      ) : (
        <p className="text-gray-600 text-lg">No subcategories available.</p>
      )}
    </div>
  );
}
