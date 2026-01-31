"use client";

import type { ComponentType } from "react";
import { useMemo, useState, useEffect } from "react";
import Link from "next/link";

import { AMENITIES } from "@/components/amenities/AMENITIES";
import type {
  AmenityItem,
  PropertySubType,
} from "@/components/property/PropertyMapping/propertyTypes";
import { Button } from "@/components/ui/button";
import { HeartIcon as OutlineHeart } from "@heroicons/react/24/outline";
import { HeartIcon as SolidHeart } from "@heroicons/react/24/solid";

/* ------------------------------------------------------------------
 Helpers
-------------------------------------------------------------------*/
function resolveFileId(
  file: string | { $id: string } | null | undefined,
): string | null {
  if (!file) return null;
  if (typeof file === "string") return file;
  if (typeof file === "object" && "$id" in file) return file.$id;
  return null;
}

function getAppwriteFileUrl(fileId: string | null) {
  if (!fileId) return "/default-property.jpg";

  const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
  const bucketId = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID;
  const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;

  if (!endpoint || !bucketId || !projectId) return "/default-property.jpg";

  const base = endpoint.endsWith("/v1")
    ? endpoint
    : `${endpoint.replace(/\/$/, "")}/v1`;

  return `${base}/storage/buckets/${bucketId}/files/${fileId}/view?project=${projectId}`;
}

function normalizePropertyType(type: string): PropertySubType {
  const map: Record<string, PropertySubType> = {
    industrial: "Industrial",
    commercial: "BusinessBuilding",
    residential: "FullHouse",
    land: "ResidentialStand",
    hospitality: "Hotel",
    recreational: "RecreationalFacility",
    agricultural: "AgriculturalLand",
  };

  return map[type.toLowerCase()] ?? (type as PropertySubType);
}

/* ------------------------------------------------------------------
 Types
-------------------------------------------------------------------*/
export type Property = {
  id: string; // MUST be the Appwrite $id when passed in
  title: string;
  description: string;
  price: number;
  type: string;
  location: string;
  rooms: number;
  amenities: string[];
  images: {
    frontElevation?: string;
    southView?: string;
    westView?: string;
    eastView?: string;
    floorPlan?: string;
  };
  lat: number;
  lng: number;
};

/* ------------------------------------------------------------------
 Component
-------------------------------------------------------------------*/
export default function PropertyCard({ property }: { property: Property }) {
  const [liked, setLiked] = useState(false);

  const {
    id,
    title,
    description,
    price,
    type,
    location,
    rooms,
    amenities = [],
    images,
  } = property;

  // ------------------ DEBUG LOGS ------------------
  useEffect(() => {
    console.log("[PropertyCard] property object:", property);
    console.log("[PropertyCard] id value:", id);
    console.log(
      "[PropertyCard] $id value (if exists):",
      (property as any)?.$id,
    );
  }, [property, id]);
  // ------------------------------------------------

  const imageUrl = useMemo(() => {
    const fileId = resolveFileId(images?.frontElevation);
    return getAppwriteFileUrl(fileId);
  }, [images?.frontElevation]);

  const normalizedType = normalizePropertyType(type);

  const amenityIcons = useMemo(() => {
    const out: Record<string, ComponentType<{ className?: string }>> = {};
    const categories = AMENITIES[normalizedType];

    if (!categories) return out;

    Object.values(categories).forEach((items) => {
      items.forEach((item: AmenityItem) => {
        if (typeof item.icon === "function") {
          out[item.name.toLowerCase()] = item.icon;
        }
      });
    });

    return out;
  }, [normalizedType]);

  const visibleAmenities = amenities.slice(0, 4);

  return (
    <div className="group relative rounded-xl bg-card text-card-foreground shadow-md hover:shadow-xl transition-transform duration-300 hover:-translate-y-1 w-full sm:max-w-sm md:max-w-xs lg:max-w-sm">
      {/* Image */}
      <div className="relative aspect-video rounded-t-xl overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => (e.currentTarget.src = "/default-property.jpg")}
        />

        <button
          type="button"
          onClick={() => setLiked((v) => !v)}
          aria-label="Like property"
          className="absolute right-2 top-2 rounded-full bg-white/90 p-1 shadow hover:scale-110 transition"
        >
          {liked ? (
            <SolidHeart className="h-4 w-4 text-red-500" />
          ) : (
            <OutlineHeart className="h-4 w-4 text-gray-500" />
          )}
        </button>
      </div>

      {/* Content */}
      <div className="p-3 space-y-2">
        <h3 className="text-sm font-semibold line-clamp-1">{title}</h3>

        <p className="text-xs text-gray-500 line-clamp-2 group-hover:line-clamp-none">
          {description}
        </p>

        <div className="grid grid-cols-2 gap-1 text-xs text-gray-700 mt-1">
          <div>
            <b>Price:</b> ${price.toLocaleString()}
          </div>
          <div>
            <b>Type:</b> {type}
          </div>
          <div>
            <b>Location:</b> {location}
          </div>
          <div>
            <b>Rooms:</b> {rooms}
          </div>
        </div>

        {/* CORRECT INTERNAL LINK */}
        <Link
          href={`/app/listings/properties/buildings/property/${id}`}
          className="block mt-2"
        >
          <Button className="w-full py-1">View Details</Button>
        </Link>
      </div>
    </div>
  );
}
