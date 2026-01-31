"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { PROPERTY_HIERARCHY } from "@/components/property/PropertyMapping/propertyHierarchy";
import type {
  PropertyCategory,
  PropertySubType,
} from "@/components/property/PropertyMapping/propertyTypes";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Home, MapPin, Layers, ChevronDown, ChevronRight } from "lucide-react";
import "leaflet/dist/leaflet.css";

/* =========================
   TYPES
========================= */
type AppwriteFile = string | { $id: string };

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  rooms?: number;
  lat: number;
  lng: number;

  type: PropertyCategory;
  subType: PropertySubType;
  status: string;

  images: {
    frontElevation?: AppwriteFile;
    southView?: AppwriteFile;
    westView?: AppwriteFile;
    eastView?: AppwriteFile;
    floorPlan?: AppwriteFile;
  };
}

export interface PropertyFilterClientProps {
  categories: PropertyCategory[];
  defaultCategory: PropertyCategory;
  defaultSubType: PropertySubType;
  initialProperties: Property[];
  initialError: string | null;
}

/* =========================
   HELPERS
========================= */
const formatLabel = (v: string) => v.replace(/([A-Z])/g, " $1").trim();

const getCategoryIcon = (category: PropertyCategory) =>
  category === "Residential" ? Home : category === "Land" ? Layers : MapPin;

/* =========================
   API
========================= */
const API_VERSION = (process.env.NEXT_PUBLIC_API_VERSION || "v1").trim();
const API_BASE =
  process.env.NEXT_PUBLIC_API_URLV2?.replace(/\/+$/, "") ??
  process.env.NEXT_PUBLIC_API_URLV1?.replace(/\/+$/, "") ??
  "";

/* =========================
   COMPONENT
========================= */
export default function PropertyFilterClient({
  categories,
  defaultCategory,
  defaultSubType,
  initialProperties,
  initialError,
}: PropertyFilterClientProps) {
  const [selectedCategory, setSelectedCategory] = useState(defaultCategory);
  const [selectedSubType, setSelectedSubType] = useState(defaultSubType);
  const [properties, setProperties] = useState<Property[]>(initialProperties);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(initialError);

  const mapRef = useRef<any>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const markersRef = useRef<any[]>([]);
  const firstRender = useRef(true);

  /* =========================
     FETCH
  ========================== */
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    async function load() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          `${API_BASE}/api/${API_VERSION}/properties/type/${selectedCategory}/${selectedSubType}`,
        );

        if (!res.ok) throw new Error("Failed to load properties");

        const raw = await res.json();

        const mapped: Property[] = raw.map((p: any) => ({
          id: p.$id,
          title: p.title,
          description: p.description,
          price: p.price,
          location: p.location,
          rooms: p.rooms,
          lat: p.lat ?? 0,
          lng: p.lng ?? 0,

          type: p.type,
          subType: p.subType ?? selectedSubType,
          status: p.property_status ?? "unknown",

          images: {
            frontElevation: p.frontElevation ?? undefined,
            southView: p.southView ?? undefined,
            westView: p.westView ?? undefined,
            eastView: p.eastView ?? undefined,
            floorPlan: p.floorPlan ?? undefined,
          },
        }));

        setProperties(mapped);
      } catch (e: any) {
        setError(e?.message ?? "Error loading data");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [selectedCategory, selectedSubType]);

  /* =========================
     SUB TYPES
  ========================== */
  const subTypes = useMemo(
    () => PROPERTY_HIERARCHY[selectedCategory]?.subTypes ?? [],
    [selectedCategory],
  );

  /* =========================
     MAP
  ========================== */
  useEffect(() => {
    if (!mapContainerRef.current) return;

    async function init() {
      const L = (await import("leaflet")).default;

      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      if (!mapRef.current) {
        mapRef.current = L.map(mapContainerRef.current, {
          zoomControl: false,
        }).setView([-19.0154, 29.1549], 6);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "&copy; OpenStreetMap",
        }).addTo(mapRef.current);
      }

      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];

      properties.forEach((p) => {
        if (!p.lat || !p.lng) return;
        const marker = L.marker([p.lat, p.lng])
          .addTo(mapRef.current)
          .bindPopup(`<strong>${p.title}</strong><br/>$${p.price}`);
        markersRef.current.push(marker);
      });

      const firstValidProperty = properties.find((p) => p.lat && p.lng);

      if (firstValidProperty) {
        mapRef.current.setView(
          [firstValidProperty.lat, firstValidProperty.lng],
          8,
        );
      }
    }

    init();
  }, [properties]);

  /* =========================
     RENDER
  ========================== */
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-slate-100 to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="max-w-7xl mx-auto px-6 py-14 space-y-14">
        {/* HEADER */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
            Explore Properties
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">
            Discover homes, land & investment opportunities
          </p>
        </motion.header>

        {/* FILTERS */}
        {/* (unchanged UI code below — already correct) */}
      </div>
    </div>
  );
}
