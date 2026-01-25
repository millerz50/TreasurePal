"use client";

import type { ComponentType } from "react";
import { useMemo, useState } from "react";
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

// Resolve Appwrite file id safely
function resolveFileId(
  file: string | { $id: string } | null | undefined,
): string | null {
  if (!file) return null;
  if (typeof file === "string") return file;
  if (typeof file === "object" && "$id" in file) return file.$id;
  return null;
}

// Build Appwrite public image URL
function getAppwriteFileUrl(fileId: string | null) {
  if (!fileId) return "/default-property.jpg";

  const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
  const bucketId = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID;
  const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;

  if (!endpoint || !bucketId || !projectId) {
    return "/default-property.jpg";
  }

  const base = endpoint.endsWith("/v1")
    ? endpoint
    : `${endpoint.replace(/\/$/, "")}/v1`;

  return `${base}/storage/buckets/${bucketId}/files/${fileId}/view?project=${projectId}`;
}

// Normalize property type → PropertySubType key
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
------------------------------------------------------------------- */

export type Property = {
  id: string;
  title: string;
  description: string;
  price: string | number;
  type: string;
  location: string;
  rooms: number;
  amenities: string[];
  images: {
    frontElevation?: string | { $id: string } | null;
  };
};

/* ------------------------------------------------------------------
  Component
------------------------------------------------------------------- */

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

  /* ---------------- Image ---------------- */

  const imageUrl = useMemo(() => {
    const fileId = resolveFileId(images?.frontElevation);
    return getAppwriteFileUrl(fileId);
  }, [images?.frontElevation]);

  /* ---------------- Amenities ---------------- */

  const normalizedType = normalizePropertyType(type);

  const amenityIcons = useMemo(() => {
    const out: Record<string, ComponentType<{ className?: string }>> = {};
    const categories = AMENITIES[normalizedType];

    if (!categories) return out;

    Object.values(categories).forEach((items) => {
      items.forEach((item: AmenityItem) => {
        if (typeof item.icon === "function") {
          out[item.name] = item.icon;
        }
      });
    });

    return out;
  }, [normalizedType]);

  const visibleAmenities = amenities.slice(0, 4);

  /* ------------------------------------------------------------------ */

  return (
    <div className="group rounded-xl border bg-card text-card-foreground shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Image */}
      <div className="relative aspect-video overflow-hidden rounded-t-xl">
        <img
          src={imageUrl}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.src = "/default-property.jpg";
          }}
        />

        {/* Like button */}
        <button
          type="button"
          onClick={() => setLiked((v) => !v)}
          aria-label="Like property"
          className="absolute right-3 top-3 rounded-full bg-background/90 p-2 shadow backdrop-blur transition hover:scale-110"
        >
          {liked ? (
            <SolidHeart className="h-5 w-5 text-red-500" />
          ) : (
            <OutlineHeart className="h-5 w-5 text-muted-foreground" />
          )}
        </button>
      </div>

      {/* Content */}
      <div className="space-y-3 p-4">
        <h3 className="line-clamp-1 text-base font-semibold">{title}</h3>

        <p className="line-clamp-2 text-xs text-muted-foreground">
          {description}
        </p>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>
            <span className="font-medium">Price:</span> {price}
          </div>
          <div>
            <span className="font-medium">Type:</span> {type}
          </div>
          <div>
            <span className="font-medium">Location:</span> {location}
          </div>
          <div>
            <span className="font-medium">Rooms:</span> {rooms}
          </div>
        </div>

        {/* Amenities */}
        {visibleAmenities.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {visibleAmenities.map((item) => {
              const Icon = amenityIcons[item];
              return (
                <div
                  key={item}
                  className="flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground"
                >
                  {Icon && <Icon className="h-3.5 w-3.5" />}
                  <span>{item}</span>
                </div>
              );
            })}
          </div>
        )}

        {/* CTA */}
        <Link href={`/property/${id}`} className="block pt-2">
          <Button className="w-full transition hover:bg-primary/90">
            View Details
          </Button>
        </Link>
      </div>
    </div>
  );
}
