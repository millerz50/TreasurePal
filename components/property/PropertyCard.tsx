"use client";

import type { LucideIcon } from "@/components/amenities/AmenityIcons";
import { AMENITIES } from "@/components/amenities/AmenityMap";
import { Button } from "@/components/ui/button";
import { HeartIcon as OutlineHeart } from "@heroicons/react/24/outline";
import { HeartIcon as SolidHeart } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

// Safe resolver for fileId (handles string or { $id })
function resolveFileId(
  file: string | { $id: string } | null | undefined
): string | null {
  if (!file) return null;
  if (typeof file === "string") return file;
  if (typeof file === "object" && "$id" in file) return file.$id;
  return null;
}

// Helper to generate Appwrite public URL from fileId, with defensive checks and logs
function getAppwriteFileUrl(fileId: string | null) {
  if (!fileId) {
    console.warn("[Appwrite] No fileId provided to getAppwriteFileUrl");
    return "";
  }

  const rawEndpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
  const bucketId = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID;
  const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;

  console.debug("[Appwrite] Raw env vars:", {
    NEXT_PUBLIC_APPWRITE_ENDPOINT: rawEndpoint,
    NEXT_PUBLIC_APPWRITE_BUCKET_ID: bucketId,
    NEXT_PUBLIC_APPWRITE_PROJECT_ID: projectId,
  });

  if (!rawEndpoint || !bucketId || !projectId) {
    console.error("[Appwrite] Missing env vars for file URL", {
      rawEndpoint,
      bucketId,
      projectId,
    });
    return "";
  }

  // Ensure endpoint ends with /v1
  const endpoint = rawEndpoint.endsWith("/v1")
    ? rawEndpoint
    : `${rawEndpoint.replace(/\/$/, "")}/v1`;

  const url = `${endpoint}/storage/buckets/${bucketId}/files/${fileId}/view?project=${projectId}`;
  console.debug("[Appwrite] Constructed file URL:", { fileId, endpoint, url });

  return url;
}

// Quick probe to test URL reachability (runs in browser)
async function probeImageUrl(url: string) {
  if (!url) return { ok: false, status: 0, message: "Empty URL" };
  try {
    const res = await fetch(url, { method: "GET" });
    const ct = res.headers.get("content-type");
    console.debug("[Probe] Response", { status: res.status, contentType: ct });
    return { ok: res.ok, status: res.status, contentType: ct ?? undefined };
  } catch (err) {
    console.error("[Probe] Network error while fetching image URL", err);
    return { ok: false, status: 0, message: String(err) };
  }
}

// Property type
export type Property = {
  id: string; // mapped from $id
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
  const [imgStatus, setImgStatus] = useState<
    "idle" | "loading" | "ok" | "error"
  >("idle");

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

  // Resolve frontElevation once
  const mainImageId = useMemo(
    () => resolveFileId(images.frontElevation),
    [images.frontElevation]
  );

  // Build URL once
  const imageUrl = useMemo(() => {
    const url = mainImageId ? getAppwriteFileUrl(mainImageId) : "";
    return url || "/default-property.jpg"; // fallback in public/
  }, [mainImageId]);

  // Probing: validate URL from browser
  useEffect(() => {
    let mounted = true;
    (async () => {
      if (!mainImageId) {
        console.warn(
          "[PropertyCard] No mainImageId. Using fallback:",
          imageUrl
        );
        setImgStatus("error");
        return;
      }
      setImgStatus("loading");
      console.debug("[PropertyCard] Probing imageUrl:", imageUrl);
      const res = await probeImageUrl(imageUrl);
      if (!mounted) return;
      if (
        res.ok &&
        res.status === 200 &&
        res.contentType?.startsWith("image/")
      ) {
        console.debug("[PropertyCard] Probe OK: image content detected");
        setImgStatus("ok");
      } else {
        console.warn("[PropertyCard] Probe failed", res);
        setImgStatus("error");
      }
    })();
    return () => {
      mounted = false;
    };
  }, [imageUrl, mainImageId]);

  // Amenity icons
  const amenityIcons: Record<string, LucideIcon> = useMemo(() => {
    const out: Record<string, LucideIcon> = {};
    const categories = AMENITIES[type];
    if (categories) {
      Object.values(categories).forEach((items) => {
        items.forEach(({ name, icon }) => {
          out[name] = icon;
        });
      });
    }
    return out;
  }, [type]);

  const visibleAmenities = Array.isArray(amenities)
    ? amenities.slice(0, 4)
    : [];

  return (
    <div className="card bg-base-100 text-base-content rounded-xl shadow-sm border border-base-300 transition-all hover:shadow-lg animate-in fade-in duration-500">
      {/* Image + Like Button */}
      <figure className="relative aspect-video overflow-hidden rounded-t-xl">
        <img
          src={imageUrl}
          alt={`Front view of ${title}`}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          onLoad={() => {
            console.debug("[IMG] onLoad fired:", imageUrl);
            setImgStatus("ok");
          }}
          onError={(e) => {
            console.error("[IMG] onError fired. Falling back.", {
              imageUrl,
              mainImageId,
              env: {
                NEXT_PUBLIC_APPWRITE_ENDPOINT:
                  process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT,
                NEXT_PUBLIC_APPWRITE_BUCKET_ID:
                  process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID,
                NEXT_PUBLIC_APPWRITE_PROJECT_ID:
                  process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID,
              },
            });
            // Force fallback
            (e.currentTarget as HTMLImageElement).src = "/default-property.jpg";
            setImgStatus("error");
          }}
        />

        <div className="absolute left-3 top-3">
          <span className="badge badge-outline text-xs">
            {imgStatus === "ok"
              ? "image-ok"
              : imgStatus === "loading"
              ? "image-loading"
              : "image-fallback"}
          </span>
        </div>

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
