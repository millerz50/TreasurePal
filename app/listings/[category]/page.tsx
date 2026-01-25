import { notFound } from "next/navigation";
import Link from "next/link";
import { PROPERTY_HIERARCHY } from "@/components/property/PropertyMapping/propertyHierarchy";

function formatSubTypeLabel(subType: string) {
  return subType.replace(/([A-Z])/g, " $1").trim();
}

// ✅ Explicit props interface avoids PageProps mismatch
interface CategoryPageProps {
  params: {
    category?: string;
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const categoryKey = params?.category as
    | keyof typeof PROPERTY_HIERARCHY
    | undefined;

  if (!categoryKey || !(categoryKey in PROPERTY_HIERARCHY)) {
    return notFound();
  }

  const category = PROPERTY_HIERARCHY[categoryKey];

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <header className="mb-10">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-4">
          {category.label}
        </h1>
        <p className="text-gray-600 text-lg">
          {category.subTypes.length > 0
            ? `Explore subcategories within ${category.label}.`
            : `No subcategories available for ${category.label}.`}
        </p>
      </header>

      {category.subTypes.length > 0 && (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {category.subTypes.map((subType) => (
            <Link
              key={subType}
              href={`/properties/${categoryKey.toLowerCase()}/${subType}`}
              className="group relative block rounded-xl overflow-hidden shadow-md bg-white p-6 hover:shadow-xl transition transform hover:scale-105 border border-gray-100"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-indigo-600 transition">
                {formatSubTypeLabel(subType)}
              </h2>
              <p className="text-gray-500">
                View properties under {formatSubTypeLabel(subType)}
              </p>
              <div className="absolute bottom-4 right-4 text-indigo-500 group-hover:translate-x-1 transition-transform">
                &rarr;
              </div>
            </Link>
          ))}
        </section>
      )}
    </div>
  );
}
