// app/property-filter/page.tsx
import PropertyFilterClient from "../PropertyFilterClient";
import { PROPERTY_HIERARCHY } from "@/components/property/PropertyMapping/propertyHierarchy";
import type {
  PropertyCategory,
  PropertySubType,
} from "@/components/property/PropertyMapping/propertyTypes";
import type { Metadata } from "next";

const API_VERSION = (process.env.NEXT_PUBLIC_API_VERSION || "v1").trim();
const API_BASE =
  process.env.NEXT_PUBLIC_API_URLV2?.replace(/\/+$/, "") ??
  process.env.NEXT_PUBLIC_API_URLV1?.replace(/\/+$/, "") ??
  "";

/**
 * Generate dynamic metadata for SEO
 */
export async function generateMetadata(): Promise<Metadata> {
  const categories = Object.keys(PROPERTY_HIERARCHY) as PropertyCategory[];
  const defaultCategory = categories[0];
  const defaultSubType = PROPERTY_HIERARCHY[defaultCategory].subTypes[0];

  return {
    title: `${defaultCategory} - ${defaultSubType} Properties | YourSiteName`,
    description: `Browse the latest ${defaultSubType} properties in the ${defaultCategory} category. Find your perfect property with detailed listings and real-time availability.`,
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: `${defaultCategory} - ${defaultSubType} Properties`,
      description: `Discover ${defaultSubType} properties under the ${defaultCategory} category. Updated listings and property details.`,
      url: "https://www.yoursite.com/property-filter",
      siteName: "YourSiteName",
      type: "website",
    },
  };
}

export default async function PropertyFilterPage() {
  const categories = Object.keys(PROPERTY_HIERARCHY) as PropertyCategory[];
  const defaultCategory = categories[0];
  const defaultSubType = PROPERTY_HIERARCHY[defaultCategory].subTypes[0];

  let properties: any[] = [];
  let error: string | null = null;

  try {
    const res = await fetch(
      `${API_BASE}/api/${API_VERSION}/properties/type/${defaultCategory}/${defaultSubType}`,
      { cache: "no-store" },
    );

    if (!res.ok) throw new Error("Failed to load properties");
    properties = await res.json();
  } catch (err: any) {
    error = err?.message ?? "Something went wrong";
  }

  return (
    <main className="px-4 py-6 max-w-7xl mx-auto">
      {/* Semantic container for SEO */}
      <h1 className="text-3xl font-bold mb-4">
        {defaultCategory} Properties - {defaultSubType}
      </h1>
      <p className="text-gray-600 mb-6">
        Browse the latest {defaultSubType} properties in the {defaultCategory}{" "}
        category.
      </p>

      <PropertyFilterClient
        categories={categories}
        defaultCategory={defaultCategory}
        defaultSubType={defaultSubType}
        initialProperties={properties}
        initialError={error}
      />
    </main>
  );
}
