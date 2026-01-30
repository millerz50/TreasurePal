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
interface Property {
  $id: string;
  title: string;
  type: PropertyCategory;
  subType: PropertySubType;
  price: number;
  lat: number;
  lng: number;
  status: string;
}

interface PropertyFilterClientProps {
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
        const res = await fetch(
          `${API_BASE}/api/${API_VERSION}/properties/type/${selectedCategory}/${selectedSubType}`,
        );
        if (!res.ok) throw new Error("Failed to load properties");
        setProperties(await res.json());
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

      // Clear previous markers
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];

      // Add new markers
      properties.forEach((p) => {
        if (typeof p.lat !== "number" || typeof p.lng !== "number") return;

        const marker = L.marker([p.lat, p.lng])
          .addTo(mapRef.current)
          .bindPopup(
            `<strong>${p.title}</strong><br/>$${p.price.toLocaleString()}`,
          );
        markersRef.current.push(marker);
      });

      // Safely center map on first valid property
      const firstValidProperty = properties.find(
        (p) => typeof p.lat === "number" && typeof p.lng === "number",
      );
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid md:grid-cols-2 gap-6"
        >
          {/* CATEGORY SELECT */}
          <div className="relative">
            <label className="block mb-2 text-sm font-semibold text-slate-600 dark:text-slate-300">
              Property Category
            </label>

            <div className="relative rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 transition">
              <select
                value={selectedCategory}
                onChange={(e) => {
                  const v = e.target.value as PropertyCategory;
                  setSelectedCategory(v);
                  setSelectedSubType(PROPERTY_HIERARCHY[v].subTypes[0]);
                }}
                className="
          w-full appearance-none bg-transparent
          px-5 py-4 pr-12
          text-slate-900 dark:text-slate-100
          font-medium
          focus:outline-none
        "
              >
                {categories.map((c) => (
                  <option
                    key={c}
                    value={c}
                    className="bg-white text-slate-900 dark:bg-slate-900 dark:text-slate-100"
                  >
                    {PROPERTY_HIERARCHY[c].label}
                  </option>
                ))}
              </select>

              <ChevronDown
                size={18}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              />
            </div>
          </div>

          {/* SUBTYPE SELECT */}
          <div className="relative">
            <label className="block mb-2 text-sm font-semibold text-slate-600 dark:text-slate-300">
              Property Type
            </label>

            <div className="relative rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 transition">
              <select
                value={selectedSubType}
                onChange={(e) =>
                  setSelectedSubType(e.target.value as PropertySubType)
                }
                className="
          w-full appearance-none bg-transparent
          px-5 py-4 pr-12
          text-slate-900 dark:text-slate-100
          font-medium
          focus:outline-none
        "
              >
                {subTypes.map((s) => (
                  <option
                    key={s}
                    value={s}
                    className="bg-white text-slate-900 dark:bg-slate-900 dark:text-slate-100"
                  >
                    {formatLabel(s)}
                  </option>
                ))}
              </select>

              <ChevronDown
                size={18}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              />
            </div>
          </div>
        </motion.div>

        {/* CARDS */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {subTypes.map((st) => {
              const Icon = getCategoryIcon(selectedCategory);
              return (
                <motion.div
                  key={st}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link
                    href={`/listings/properties/buildings/${selectedCategory}/${st}`}
                    className="group relative bg-white dark:bg-slate-900 rounded-3xl p-7 shadow-xl hover:-translate-y-1 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex gap-4">
                        <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-600">
                          <Icon size={22} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-900 dark:text-white">
                            {formatLabel(st)}
                          </h3>
                          <p className="text-sm text-slate-500">
                            View listings
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="text-slate-400 group-hover:text-indigo-600 transition" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* MAP */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            Property Locations
          </h2>
          <div className="h-[520px] rounded-3xl overflow-hidden shadow-2xl">
            <div ref={mapContainerRef} className="h-full w-full" />
          </div>
        </section>
      </div>
    </div>
  );
}
