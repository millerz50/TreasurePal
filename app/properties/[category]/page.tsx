import { notFound } from "next/navigation";
import Link from "next/link";
import {
  PROPERTY_CATEGORIES,
  PROPERTY_SUBTYPES,
  type PropertyCategory,
} from "@/components/property/PropertyMapping/propertyTypes";
import { CATEGORY_SEO } from "@/lib/property/categorySeo";

export const dynamic = "force-static";

/* ------------------------------
   TYPE GUARD
------------------------------- */
function isPropertyCategory(value: string): value is PropertyCategory {
  return PROPERTY_CATEGORIES.includes(value as PropertyCategory);
}

/* ------------------------------
   SSG PARAMS
------------------------------- */
export function generateStaticParams() {
  return PROPERTY_CATEGORIES.map((category) => ({
    category: category.toLowerCase(),
  }));
}

/* ------------------------------
   PAGE
------------------------------- */
export default function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const categoryParam = params.category;

  const category = PROPERTY_CATEGORIES.find(
    (c) => c.toLowerCase() === categoryParam,
  );

  if (!category || !isPropertyCategory(category)) {
    notFound();
  }

  const subTypes = PROPERTY_SUBTYPES[category];
  const seo = CATEGORY_SEO[category] || {
    title: `${category} Properties`,
    description: `Explore ${category.toLowerCase()} properties.`,
  };

  return (
    <div className="container py-8 space-y-6">
      {/* SEO-friendly headings */}
      <h1 className="text-2xl font-bold">{seo.title}</h1>
      <p className="text-sm text-gray-600">{seo.description}</p>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {subTypes.map((subType) => (
          <Link
            key={subType}
            href={`/listings/properties/${category.toLowerCase()}/${subType.toLowerCase()}`}
            className="rounded-xl border p-4 hover:shadow-lg transition"
          >
            {subType.replace(/([A-Z])/g, " $1").trim()}
          </Link>
        ))}
      </div>
    </div>
  );
}
