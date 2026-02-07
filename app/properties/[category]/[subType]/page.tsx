import { notFound } from "next/navigation";
import {
  PROPERTY_CATEGORIES,
  PROPERTY_SUBTYPES,
  type PropertyCategory,
} from "@/components/property/PropertyMapping/propertyTypes";
import PropertyCard from "@/components/property/PropertyCard";

export const dynamic = "force-static";

/* ----------------------------------
   TYPE GUARDS (IMPORTANT)
----------------------------------- */
function isValidCategory(value: string): value is PropertyCategory {
  return PROPERTY_CATEGORIES.includes(value as PropertyCategory);
}

function isValidSubType<C extends PropertyCategory>(
  category: C,
  subType: string,
): subType is (typeof PROPERTY_SUBTYPES)[C][number] {
  const subTypes = PROPERTY_SUBTYPES[category] as readonly string[];
  return subTypes.includes(subType);
}

/* ----------------------------------
   SSG PARAMS
----------------------------------- */
export function generateStaticParams() {
  return PROPERTY_CATEGORIES.flatMap((category) =>
    PROPERTY_SUBTYPES[category].map((subType) => ({
      category,
      subType,
    })),
  );
}

/* ----------------------------------
   DATA FETCH (SSG)
----------------------------------- */
async function getProperties(category: PropertyCategory, subType: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URLV1}/api/v1/properties/type/${category}/${subType}`,
    {
      cache: "force-cache",
    },
  );

  if (!res.ok) return [];
  return res.json();
}

/* ----------------------------------
   PAGE
----------------------------------- */
export default async function SubTypePage({
  params,
}: {
  params: { category: string; subType: string };
}) {
  const { category, subType } = params;

  // ✅ SAFE RUNTIME VALIDATION
  if (!isValidCategory(category)) {
    notFound();
  }

  if (!isValidSubType(category, subType)) {
    notFound();
  }

  const properties = await getProperties(category, subType);

  return (
    <div className="container py-8 space-y-6">
      <h1 className="text-xl font-bold">
        {category} / {subType}
      </h1>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {properties.map((p: any) => (
          <PropertyCard key={p.id} property={p} />
        ))}
      </div>
    </div>
  );
}
