import type { Metadata } from "next";
import { PROPERTY_HIERARCHY } from "@/components/property/PropertyMapping/propertyHierarchy";
import type { PropertyCategory } from "@/components/property/PropertyMapping/propertyTypes";
import PropertyFilterClientWrapper from "./PropertyFilterClientWrapper";

/* =========================
   METADATA
========================= */
export async function generateMetadata(): Promise<Metadata> {
  const categories = Object.keys(PROPERTY_HIERARCHY) as PropertyCategory[];
  const defaultCategory = categories[0];
  const defaultSubType = PROPERTY_HIERARCHY[defaultCategory].subTypes[0];

  return {
    title: `${defaultCategory} - ${defaultSubType} Properties | Treasurepal`,
    description: `Browse the latest ${defaultSubType} properties in the ${defaultCategory} category.`,
    robots: { index: true, follow: true },
    openGraph: {
      title: `${defaultCategory} - ${defaultSubType} Properties`,
      description: `Discover ${defaultSubType} properties under the ${defaultCategory} category.`,
      url: "https://www.treasurepal.co.zw/property-filter",
      siteName: "Treasurepal",
      type: "website",
    },
  };
}

/* =========================
   PAGE
========================= */
export default function PropertyFilterPage() {
  return (
    <main className="px-4 py-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Property Filter</h1>
      <PropertyFilterClientWrapper />
    </main>
  );
}
