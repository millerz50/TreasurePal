"use client";

import { useAuth } from "@/context/AuthContext";
import PropertyFilterClient from "@/app/listings/properties/PropertyFilterClient";
import { PROPERTY_HIERARCHY } from "@/components/property/PropertyMapping/propertyHierarchy";
import type { PropertyCategory } from "@/components/property/PropertyMapping/propertyTypes";
import { useEffect, useState } from "react";

const API_VERSION = (process.env.NEXT_PUBLIC_API_VERSION || "v1").trim();
const API_BASE =
  process.env.NEXT_PUBLIC_API_URLV2?.replace(/\/+$/, "") ??
  process.env.NEXT_PUBLIC_API_URLV1?.replace(/\/+$/, "") ??
  "";

export default function PropertyFilterClientWrapper() {
  const { user, loading } = useAuth();
  const categories = Object.keys(PROPERTY_HIERARCHY) as PropertyCategory[];
  const defaultCategory = categories[0];
  const defaultSubType = PROPERTY_HIERARCHY[defaultCategory].subTypes[0];

  const [properties, setProperties] = useState<Property[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return; // only fetch if logged in

    const fetchProperties = async () => {
      try {
        const res = await fetch(
          `${API_BASE}/api/${API_VERSION}/properties/type/${defaultCategory}/${defaultSubType}`,
          {
            cache: "no-store",
            headers: {
              Authorization: `Bearer ${user.accountid}`, // or JWT from AuthProvider
            },
          },
        );

        if (!res.ok) throw new Error("Failed to load properties");
        const raw = await res.json();
        setProperties(raw);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchProperties();
  }, [user, defaultCategory, defaultSubType]);

  if (loading) return <p>Loading user...</p>;
  if (!user) return <p>Please sign in to view properties.</p>;

  return (
    <PropertyFilterClient
      categories={categories}
      defaultCategory={defaultCategory}
      defaultSubType={defaultSubType}
      initialProperties={properties}
      initialError={error}
    />
  );
}
