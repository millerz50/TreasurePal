"use client";

import "leaflet/dist/leaflet.css";
import { useEffect, useRef } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/Separator";
import Image from "next/image";

import { BedDouble, MapPin, ShieldCheck, Sparkles, Wifi } from "lucide-react";
import type { ComponentType } from "react";
import { MdOutlineHome } from "react-icons/md";

// ✅ import Leaflet types only (no runtime code)
import type Map from "leaflet";

type PropertyDetailsProps = {
  title: string;
  description: string;
  image: string;
  price: string;
  type: string;
  location: string;
  rooms: number;
  amenities: string[];
  coordinates: [number, number]; // [lng, lat]
};

export default function PropertyDetails({
  title,
  description,
  image,
  price,
  type,
  location,
  rooms,
  amenities,
  coordinates,
}: PropertyDetailsProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<Map | null>(null); // ✅ typed correctly

  useEffect(() => {
    const initMap = async () => {
      if (
        typeof window === "undefined" ||
        !mapContainer.current ||
        mapInstance.current
      )
        return;

      // ✅ dynamic import for Leaflet runtime
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

  return (
    <section className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* Image */}
      <div className="rounded-xl overflow-hidden shadow-md">
        <Image
          src={image}
          alt={`Image of ${title}`}
          width={800}
          height={400}
          className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
          priority
        />
      </div>

      {/* Card */}
      <Card className="bg-base-100 shadow-sm border border-base-300">
        <CardHeader>
          <h2 className="text-2xl font-bold text-primary">{title}</h2>
          <p className="text-sm text-muted-foreground">{description}</p>
        </CardHeader>
        <Separator />
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm text-base-content/80">
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
          {amenities.length > 0 && (
            <div className="pt-2">
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
                          <Icon className="h-4 w-4" aria-hidden="true" />
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
          <div className="pt-4">
            <h3 className="text-sm font-semibold text-primary mb-2">
              Location Map
            </h3>
            <div
              ref={mapContainer}
              className="rounded-lg border border-base-300 h-64 w-full"
            />
          </div>

          {/* CTA */}
          <div className="pt-4 flex justify-end">
            <Button type="button" variant="primary" className="text-sm">
              Contact Agent
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

// ✅ Icon registry
const iconMap: Record<string, ComponentType<{ className?: string }>> = {
  "Wi-Fi": Wifi,
  Kitchen: MdOutlineHome,
  Parking: MapPin,
  "Smart Security": ShieldCheck,
  "Swimming Pool": Sparkles,
  "Room Service": BedDouble,
};
