"use client";

import "leaflet/dist/leaflet.css";
import Image from "next/image";
import { useEffect, useRef } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/Separator";

import type Map from "leaflet";
import { BedDouble, MapPin, ShieldCheck, Sparkles, Wifi } from "lucide-react";
import type { ComponentType } from "react";
import { MdOutlineHome } from "react-icons/md";

/* ------------------- helpers ------------------- */

// Build Appwrite file URL from fileId
function getAppwriteFileUrl(fileId: string | null) {
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
  property: {
    id: string;
    title: string;
    description: string;
    type: string;
    status: string;
    price: number;
    location: string;
    address: string;
    rooms: number;
    country: string;
    agentId: string | null;
    amenities: string[];
    coordinates?: [number, number]; // [lng, lat]
    images: {
      frontElevation?: string | null;
      southView?: string | null;
      westView?: string | null;
      eastView?: string | null;
      floorPlan?: string | null;
    };
  };
};

/* ------------------- component ------------------- */

export default function PropertyDetails({ property }: PropertyDetailsProps) {
  const {
    title,
    description,
    type,
    status,
    price,
    location,
    address,
    rooms,
    country,
    agentId,
    amenities,
    coordinates,
    images,
  } = property;

  const mapContainer = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<Map | null>(null);

  useEffect(() => {
    const initMap = async () => {
      if (
        typeof window === "undefined" ||
        !mapContainer.current ||
        mapInstance.current ||
        !coordinates
      ) {
        return;
      }
      const L: typeof import("leaflet") = await import("leaflet");
      mapInstance.current = L.map(mapContainer.current).setView(
        [coordinates[1], coordinates[0]], // [lat, lng]
        13
      );
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(mapInstance.current);
      const customIcon = L.icon({
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      });
      L.marker([coordinates[1], coordinates[0]], { icon: customIcon }).addTo(
        mapInstance.current
      );
    };
    initMap();
    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, [coordinates]);

  const frontImageUrl =
    images.frontElevation && getAppwriteFileUrl(images.frontElevation);

  return (
    <section className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* Hero image */}
      <div className="rounded-xl overflow-hidden shadow-lg">
        <Image
          src={frontImageUrl || "/default-property.jpg"}
          alt={`Front elevation of ${title}`}
          width={1200}
          height={600}
          className="w-full h-96 object-cover transition-transform duration-500 hover:scale-105"
          priority
        />
      </div>

      {/* Details card */}
      <Card className="bg-base-100 shadow-md border border-base-300">
        <CardHeader>
          <h2 className="text-3xl font-bold text-primary">{title}</h2>
          <p className="text-sm text-muted-foreground">{description}</p>
        </CardHeader>
        <Separator />
        <CardContent className="space-y-6">
          {/* Meta info */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-base-content/80">
            <div>
              <span className="font-medium">Price:</span> ${price}
            </div>
            <div>
              <span className="font-medium">Type:</span> {type}
            </div>
            <div>
              <span className="font-medium">Status:</span> {status}
            </div>
            <div>
              <span className="font-medium">Location:</span> {location}
            </div>
            <div>
              <span className="font-medium">Address:</span> {address}
            </div>
            <div>
              <span className="font-medium">Rooms:</span> {rooms}
            </div>
            <div>
              <span className="font-medium">Country:</span> {country}
            </div>
            <div>
              <span className="font-medium">Agent ID:</span> {agentId || "N/A"}
            </div>
          </div>

          {/* Amenities */}
          {amenities.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-primary mb-2">
                Amenities
              </h3>
              <div className="flex flex-wrap gap-3">
                {amenities.map((item) => {
                  const Icon = iconMap[item];
                  return (
                    <div
                      key={item}
                      className="tooltip tooltip-bottom"
                      data-tip={item}>
                      <div className="bg-base-200 rounded-full p-2 text-primary hover:bg-base-300 transition">
                        {Icon ? (
                          <Icon className="h-5 w-5" aria-hidden="true" />
                        ) : (
                          <span className="text-xs font-medium">{item}</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Map */}
          {coordinates && (
            <div>
              <h3 className="text-sm font-semibold text-primary mb-2">
                Location Map
              </h3>
              <div
                ref={mapContainer}
                className="rounded-lg border border-base-300 h-64 w-full"
              />
            </div>
          )}

          {/* Contact */}
          <div className="flex justify-end">
            <Button type="button" variant="primary" className="text-sm">
              Contact Agent
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

/* ------------------- amenity icons ------------------- */
const iconMap: Record<string, ComponentType<{ className?: string }>> = {
  "Wi-Fi": Wifi,
  Kitchen: MdOutlineHome,
  Parking: MapPin,
  "Smart Security": ShieldCheck,
  "Swimming Pool": Sparkles,
  "Room Service": BedDouble,
};
