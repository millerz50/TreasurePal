"use client";

import "leaflet/dist/leaflet.css";
import { ComponentType } from "react";

import PropertyImageSlider from "./PropertyImageSlider";
import PropertyMeta from "./PropertyMeta";
import PropertyAmenities from "./PropertyAmenities";
import PropertyMap from "./PropertyMap";
import PropertyActions from "./PropertyActions";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/Separator";
import type { PropertyType } from "@/components/property/types/property";

/* ------------------- helpers ------------------- */

// Build Appwrite file URL from fileId
export function getAppwriteFileUrl(fileId: string | null) {
  if (!fileId) return "";
  const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!;
  const bucketId = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID!;
  const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!;
  const base = endpoint.endsWith("/v1")
    ? endpoint
    : `${endpoint.replace(/\/$/, "")}/v1`;
  return `${base}/storage/buckets/${bucketId}/files/${fileId}/view?project=${projectId}`;
}

/* ------------------- props ------------------- */

type PropertyDetailsProps = {
  property: PropertyType;
};

/* ------------------- component ------------------- */

export default function PropertyDetails({ property }: PropertyDetailsProps) {
  const imagesArr = [
    property.images.frontElevation,
    property.images.southView,
    property.images.westView,
    property.images.eastView,
    property.images.floorPlan,
  ]
    .filter(Boolean)
    .map((img) => getAppwriteFileUrl(img!)); // string[]

  return (
    <section className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Hero slider */}
      <PropertyImageSlider
        title={property.title}
        price={property.price}
        images={imagesArr}
      />

      {/* Details card */}
      <Card className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white shadow-md border border-gray-200">
        <CardContent className="md:col-span-2 space-y-6 p-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {property.title}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                {property.description}
              </p>
            </div>
            <div className="text-right">
              <div className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
                ${property.price.toLocaleString()}
              </div>
              <div className="text-sm text-gray-500 mt-1">
                {property.status}
              </div>
            </div>
          </div>

          <Separator />

          <PropertyMeta property={property} />
          {property.amenities.length > 0 && (
            <PropertyAmenities amenities={property.amenities} />
          )}
          {property.coordinates && (
            <PropertyMap coordinates={property.coordinates} />
          )}
        </CardContent>

        <CardHeader className="p-6 flex flex-col gap-4 items-stretch">
          <PropertyActions
            agentId={property.agentId}
            status={property.status}
          />
        </CardHeader>
      </Card>
    </section>
  );
}

/* ------------------- amenity icons ------------------- */
export const iconMap: Record<string, ComponentType<{ className?: string }>> = {
  "Wi-Fi": require("lucide-react").Wifi,
  Kitchen: require("react-icons/md").MdOutlineHome,
  Parking: require("lucide-react").MapPin,
  "Smart Security": require("lucide-react").ShieldCheck,
  "Swimming Pool": require("lucide-react").Sparkles,
  "Room Service": require("lucide-react").BedDouble,
};
