"use client";

import "leaflet/dist/leaflet.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/Separator";

import type Map from "leaflet";
import { BedDouble, MapPin, ShieldCheck, Sparkles, Wifi } from "lucide-react";
import type { ComponentType } from "react";
import { MdOutlineHome } from "react-icons/md";

import { Navigation } from "swiper/modules/navigation";
import { Thumbs } from "swiper/modules/thumbs";
import { Swiper, SwiperSlide } from "swiper/react";

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

  // Build images array (primary first)
  const imagesArr = [
    images.frontElevation && getAppwriteFileUrl(images.frontElevation),
    images.southView && getAppwriteFileUrl(images.southView),
    images.westView && getAppwriteFileUrl(images.westView),
    images.eastView && getAppwriteFileUrl(images.eastView),
    images.floorPlan && getAppwriteFileUrl(images.floorPlan),
  ].filter(Boolean) as string[];

  // Swiper thumbs state (use any to avoid missing Swiper types)
  const [thumbsSwiper, setThumbsSwiper] = useState<any | null>(null);

  // Map refs and lazy init
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<Map | null>(null);
  const mapWrapperRef = useRef<HTMLDivElement | null>(null);
  const [mapVisible, setMapVisible] = useState(false);

  useEffect(() => {
    if (!mapWrapperRef.current) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setMapVisible(true);
            obs.disconnect();
          }
        });
      },
      { root: null, threshold: 0.15 }
    );
    obs.observe(mapWrapperRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!mapVisible) return;
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
      mapInstance.current = L.map(mapContainer.current, {
        scrollWheelZoom: false,
        zoomControl: true,
      }).setView([coordinates[1], coordinates[0]], 13);
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
  }, [mapVisible, coordinates]);

  const frontImageUrl =
    images.frontElevation && getAppwriteFileUrl(images.frontElevation);

  // Swiper options (no explicit SwiperOptions type to avoid TS issues)
  const mainOptions = {
    modules: [Navigation, Thumbs],
    navigation: true,
    spaceBetween: 10,
  };

  return (
    <section className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Hero slider */}
      <div className="rounded-xl overflow-hidden shadow-lg">
        <Swiper
          {...mainOptions}
          thumbs={{ swiper: thumbsSwiper }}
          className="relative h-96 bg-gray-50">
          {imagesArr.length > 0 ? (
            imagesArr.map((src, i) => (
              <SwiperSlide key={i}>
                <div className="relative h-96 w-full">
                  <Image
                    src={src}
                    alt={`${title} image ${i + 1}`}
                    fill
                    className="object-cover"
                    priority={i === 0}
                    sizes="(max-width: 768px) 100vw, 1200px"
                  />
                  {/* subtle overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                  {/* title + price */}
                  <div className="absolute left-6 bottom-6 text-white">
                    <h1 className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
                      {title}
                    </h1>
                    <p className="mt-1 text-lg font-semibold">
                      ${price.toLocaleString()}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide>
              <div className="relative h-96 w-full bg-gray-100 flex items-center justify-center">
                <Image
                  src="/default-property.jpg"
                  alt={`Default property image for ${title}`}
                  width={1200}
                  height={600}
                  className="object-cover"
                />
              </div>
            </SwiperSlide>
          )}
        </Swiper>

        {/* Thumbnails */}
        {imagesArr.length > 1 && (
          <div className="flex gap-3 p-3 bg-base-100 justify-center">
            <Swiper
              onSwiper={(s: any) => setThumbsSwiper(s)}
              spaceBetween={8}
              slidesPerView={Math.min(imagesArr.length, 6)}
              watchSlidesProgress
              className="w-full max-w-4xl">
              {imagesArr.map((src, i) => (
                <SwiperSlide
                  key={i}
                  className="h-20 rounded-md overflow-hidden">
                  <button
                    aria-label={`View image ${i + 1}`}
                    className="w-full h-20 block rounded-md overflow-hidden ring-1 ring-base-300 hover:scale-105 transition-transform">
                    <Image
                      src={src}
                      alt={`thumbnail ${i + 1}`}
                      width={240}
                      height={140}
                      className="object-cover w-full h-full"
                      priority={false}
                    />
                  </button>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>

      {/* Details card: split layout */}
      <Card className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white shadow-md border border-gray-200">
        {/* Left column: meta + amenities + map */}
        <CardContent className="md:col-span-2 space-y-6 p-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
              <p className="text-sm text-gray-500 mt-1">{description}</p>
            </div>
            <div className="text-right">
              <div className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
                ${price.toLocaleString()}
              </div>
              <div className="text-sm text-gray-500 mt-1">{status}</div>
            </div>
          </div>

          <Separator />

          {/* Meta grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm text-gray-700">
            <div>
              <span className="font-medium">Type:</span> {type}
            </div>
            <div>
              <span className="font-medium">Rooms:</span> {rooms}
            </div>
            <div>
              <span className="font-medium">Location:</span> {location}
            </div>
            <div>
              <span className="font-medium">Country:</span> {country}
            </div>
            <div>
              <span className="font-medium">Address:</span> {address}
            </div>
            <div>
              <span className="font-medium">Agent ID:</span> {agentId || "N/A"}
            </div>
          </div>

          {/* Amenities */}
          {amenities.length > 0 && (
            <>
              <h3 className="text-sm font-semibold text-gray-900">Amenities</h3>
              <div className="flex flex-wrap gap-3">
                {amenities.map((item) => {
                  const Icon = iconMap[item];
                  return (
                    <div
                      key={item}
                      className="flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-full px-3 py-1 text-sm text-gray-700"
                      title={item}>
                      <div className="text-green-500">
                        {Icon ? (
                          <Icon className="h-4 w-4" />
                        ) : (
                          <span className="text-xs">{item}</span>
                        )}
                      </div>
                      <span className="hidden sm:inline">{item}</span>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {/* Map (deferred) */}
          {coordinates && (
            <>
              <h3 className="text-sm font-semibold text-gray-900">Location</h3>
              <div
                ref={mapWrapperRef}
                className="rounded-lg overflow-hidden border border-gray-200">
                <div
                  ref={mapContainer}
                  className="h-64 w-full bg-gray-100"
                  aria-hidden={!mapVisible}>
                  {!mapVisible && (
                    <div className="h-64 w-full flex items-center justify-center text-gray-500">
                      Map preview will load when visible
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </CardContent>

        {/* Right column: actions */}
        <CardHeader className="p-6 flex flex-col gap-4 items-stretch">
          <div className="w-full">
            <div className="text-sm text-gray-500">Listed by</div>
            <div className="mt-2 flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-white font-bold">
                {agentId ? agentId.slice(0, 2).toUpperCase() : "TP"}
              </div>
              <div>
                <div className="text-sm font-medium text-gray-900">
                  Treasure Pal Agent
                </div>
                <div className="text-xs text-gray-500">
                  Agent ID: {agentId || "N/A"}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <Button
              type="button"
              className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white hover:from-green-500 hover:to-blue-600">
              Contact Agent
            </Button>
          </div>

          <div className="mt-auto text-sm text-gray-500">
            <div className="flex items-center justify-between">
              <span className="font-medium">Status</span>
              <span className="text-gray-700">{status}</span>
            </div>
            <div className="mt-3">
              <Button variant="ghost" className="w-full text-sm">
                Save Listing
              </Button>
            </div>
          </div>
        </CardHeader>
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
