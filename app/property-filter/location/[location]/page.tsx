// app/property-filter/page.tsx
import PropertyFilterClient from "../../../listings/properties/PropertyFilterClient";
import { PROPERTY_HIERARCHY } from "@/components/property/PropertyMapping/propertyHierarchy";
import type {
  PropertyCategory,
  PropertySubType,
} from "@/components/property/PropertyMapping/propertyTypes";
import type { Metadata } from "next";
import type { Property } from "../../../listings/properties/PropertyFilterClient";

const API_VERSION = (process.env.NEXT_PUBLIC_API_VERSION || "v1").trim();
const API_BASE =
  process.env.NEXT_PUBLIC_API_URLV2?.replace(/\/+$/, "") ??
  process.env.NEXT_PUBLIC_API_URLV1?.replace(/\/+$/, "") ??
  "";

/* =========================
   METADATA
========================= */
export async function generateMetadata({
  searchParams,
}: {
  searchParams: { location?: string };
}): Promise<Metadata> {
  const categories = Object.keys(PROPERTY_HIERARCHY) as PropertyCategory[];
  const defaultCategory = categories[0];
  const defaultSubType = PROPERTY_HIERARCHY[defaultCategory].subTypes[0];

  const location = searchParams.location;

  return {
    title: location
      ? `Properties in ${location} | Treasurepal`
      : `${defaultCategory} - ${defaultSubType} Properties | Treasurepal`,
    description: location
      ? `Browse the latest properties in ${location}.`
      : `Browse the latest ${defaultSubType} properties in the ${defaultCategory} category.`,
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: location
        ? `Properties in ${location}`
        : `${defaultCategory} - ${defaultSubType} Properties`,
      description: location
        ? `Discover properties available in ${location}.`
        : `Discover ${defaultSubType} properties under the ${defaultCategory} category.`,
      url: location
        ? `https://www.treasurepal.co.zw/property-filter?location=${encodeURIComponent(
            location,
          )}`
        : "https://www.treasurepal.co.zw/property-filter",
      siteName: "Treasurepal",
      type: "website",
    },
  };
}

/* =========================
   PAGE
========================= */
export default async function PropertyFilterPage({
  searchParams,
}: {
  searchParams: { location?: string };
}) {
  const categories = Object.keys(PROPERTY_HIERARCHY) as PropertyCategory[];
  const defaultCategory = categories[0];
  const defaultSubType = PROPERTY_HIERARCHY[defaultCategory].subTypes[0];

  const location = searchParams.location;

  let properties: Property[] = [];
  let error: string | null = null;

  try {
    const url = location
      ? `${API_BASE}/api/${API_VERSION}/properties/location/${encodeURIComponent(
          location,
        )}`
      : `${API_BASE}/api/${API_VERSION}/properties/type/${defaultCategory}/${defaultSubType}`;

    const res = await fetch(url, { cache: "no-store" });

    if (!res.ok) throw new Error("Failed to load properties");

    const raw = await res.json();

    properties = raw.map(
      (p: any): Property => ({
        id: p.$id,
        title: p.title,
        description: p.description,
        price: p.price,
        type: p.type,
        subType: p.subType ?? defaultSubType,
        location: p.location,
        rooms: p.rooms,
        lat: p.lat ?? 0,
        lng: p.lng ?? 0,
        status: p.property_status ?? "unknown",

        images: {
          frontElevation: p.frontElevation ?? undefined,
          southView: p.southView ?? undefined,
          westView: p.westView ?? undefined,
          eastView: p.eastView ?? undefined,
          floorPlan: p.floorPlan ?? undefined,
        },
      }),
    );
  } catch (err: any) {
    error = err?.message ?? "Something went wrong";
  }

  return (
    <main className="px-4 py-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">
        {location
          ? `Properties in ${location}`
          : `${defaultCategory} Properties – ${defaultSubType}`}
      </h1>

      <p className="text-gray-600 mb-6">
        {location
          ? `Browse the latest properties in ${location}.`
          : `Browse the latest ${defaultSubType} properties in the ${defaultCategory} category.`}
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
