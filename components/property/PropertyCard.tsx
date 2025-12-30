"use client";

import type { LucideIcon } from "@/components/amenities/AmenityIcons";
import { AMENITIES } from "@/components/amenities/AmenityMap";
import { Button } from "@/components/ui/button";
import { HeartIcon as OutlineHeart } from "@heroicons/react/24/outline";
import { HeartIcon as SolidHeart } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useState } from "react";

// Safe resolver for fileId (handles string or { $id })
function resolveFileId(
  file: string | { $id: string } | null | undefined
): string | null {
  if (!file) return null;
  if (typeof file === "string") return file;
  if (typeof file === "object" && "$id" in file) return file.$id;
  return null;
}

// Helper to generate Appwrite public URL from fileId
function getAppwriteFileUrl(fileId: string | null) {
  if (!fileId) return "";
  const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!; // should be https://nyc.cloud.appwrite.io
  const bucketId = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID!;
  const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!;
  return `${endpoint}/v1/storage/buckets/${bucketId}/files/${fileId}/view?project=${projectId}`;
}

// Property type
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
    amenities,
    images,
  } = property;

  // Only use frontElevation
  const mainImageId = resolveFileId(images.frontElevation);

  // Debug log (remove in production)
  if (mainImageId) {
    console.log("Resolved image URL:", getAppwriteFileUrl(mainImageId));
  }

  // Build amenity icon lookup
  const amenityIcons: Record<string, LucideIcon> = {};
  const categories = AMENITIES[type];
  if (categories) {
    Object.values(categories).forEach((items) => {
      items.forEach(({ name, icon }) => {
        amenityIcons[name] = icon;
      });
    });
  }

  const visibleAmenities = Array.isArray(amenities)
    ? amenities.slice(0, 4)
    : [];

  return (
    <div className="card bg-base-100 text-base-content rounded-xl shadow-sm border border-base-300 transition-all hover:shadow-lg animate-in fade-in duration-500">
      {/* Image + Like Button */}
      <figure className="relative aspect-video overflow-hidden rounded-t-xl">
        {mainImageId ? (
          <img
            src={getAppwriteFileUrl(mainImageId)}
            alt={`Front view of ${title}`}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        ) : (
          <div className="bg-base-200 flex items-center justify-center w-full h-full">
            <span className="text-sm text-base-content/50">No image</span>
          </div>
        )}

        <button
          type="button"
          onClick={() => setLiked(!liked)}
          className={`btn btn-sm btn-circle absolute top-3 right-3 ${
            liked
              ? "bg-red-500 text-white"
              : "bg-white text-red-500 hover:bg-red-100"
          }`}
          aria-label="Like property">
          {liked ? (
            <SolidHeart className="h-5 w-5 transition-transform duration-200 hover:scale-110" />
          ) : (
            <OutlineHeart className="h-5 w-5 transition-transform duration-200 hover:scale-110" />
          )}
        </button>
      </figure>

      {/* Card Content */}
      <div className="card-body space-y-3">
        <h2 className="card-title text-base font-semibold text-primary">
          {title}
        </h2>

        <p className="text-xs text-base-content/70 line-clamp-2">
          {description}
        </p>

        <div className="grid grid-cols-2 gap-2 text-xs text-base-content/80">
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
          <div className="pt-2 flex flex-wrap gap-3 items-center">
            {visibleAmenities.map((item) => {
              const Icon = amenityIcons[item];
              return (
                <div
                  key={item}
                  className="tooltip tooltip-bottom"
                  data-tip={item}>
                  <div className="bg-base-200 rounded-full p-2 text-primary hover:bg-base-300 transition">
                    {Icon ? (
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    ) : (
                      <span className="text-xs font-medium">{item}</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="card-actions justify-end pt-2">
          <Link href={`/property/${id}`}>
            <Button
              type="button"
              variant="primary"
              className="text-xs px-3 py-1 hover:scale-[1.02] active:scale-95 transition-transform">
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
