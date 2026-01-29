"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { PROPERTY_HIERARCHY } from "@/components/property/PropertyMapping/propertyHierarchy";
import type {
  PropertyCategory,
  PropertySubType,
} from "@/components/property/PropertyMapping/propertyTypes";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Home, MapPin, Layers } from "lucide-react";

/* =========================
   TYPES (MATCH BACKEND)
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

/* =========================
   HELPERS
========================= */
function formatLabel(label: string) {
  const spaced = label.replace(/([A-Z])/g, " $1").trim();
  return spaced.replace(/\b\w/g, (c) => c.toUpperCase());
}

function getCategoryIcon(category: PropertyCategory) {
  switch (category) {
    case "Residential":
      return Home;
    case "Land":
      return Layers;
    default:
      return MapPin;
  }
}

/* =========================
   API CONFIG
========================= */
const API_VERSION = (process.env.NEXT_PUBLIC_API_VERSION || "v1").trim();
const API_BASE =
  process.env.NEXT_PUBLIC_API_URLV2?.replace(/\/+$/, "") ??
  process.env.NEXT_PUBLIC_API_URLV1?.replace(/\/+$/, "") ??
  "";

/* =========================
   COMPONENT
========================= */
export default function PropertyFilterPage() {
  const categories = Object.keys(PROPERTY_HIERARCHY) as PropertyCategory[];

  const [selectedCategory, setSelectedCategory] = useState<PropertyCategory>(
    categories[0],
  );
  const [selectedSubType, setSelectedSubType] = useState<PropertySubType>(
    PROPERTY_HIERARCHY[categories[0]].subTypes[0] ?? "",
  );
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [mapVisible, setMapVisible] = useState(false);
  const mapWrapperRef = useRef<HTMLDivElement | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<any>(null);

  /* =========================
     FETCH PROPERTIES BY CATEGORY + SUBTYPE
  ========================== */
  useEffect(() => {
    if (!selectedSubType) return; // ensure we have a subType

    async function fetchProperties() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          `${API_BASE}/api/${API_VERSION}/properties/type/${selectedCategory}/${selectedSubType}`,
        );

        if (!res.ok) {
          throw new Error(`Failed to fetch (${res.status})`);
        }

        const data: Property[] = await res.json();
        setProperties(data);
      } catch (err: any) {
        setError(err?.message ?? "Failed to fetch properties");
      } finally {
        setLoading(false);
      }
    }

    fetchProperties();
  }, [selectedCategory, selectedSubType]);

  /* =========================
     SUB TYPES
  ========================== */
  const subTypes = useMemo<PropertySubType[]>(() => {
    return PROPERTY_HIERARCHY[selectedCategory]?.subTypes ?? [];
  }, [selectedCategory]);

  /* =========================
     MAP LAZY LOAD
  ========================== */
  useEffect(() => {
    if (!mapWrapperRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMapVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(mapWrapperRef.current);
    return () => observer.disconnect();
  }, []);

  /* =========================
     MAP INIT
  ========================== */
  useEffect(() => {
    if (!mapVisible || !properties.length) return;

    const initMap = async () => {
      if (!mapContainerRef.current || mapInstanceRef.current) return;

      const LModule = await import("leaflet");
      const L = LModule.default;

      mapInstanceRef.current = L.map(mapContainerRef.current).setView(
        [properties[0].lat, properties[0].lng],
        7,
      );

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(mapInstanceRef.current);

      properties.forEach((prop) => {
        L.marker([prop.lat, prop.lng])
          .addTo(mapInstanceRef.current)
          .bindPopup(
            `<a href="/listings/properties/${prop.$id}" class="font-bold text-indigo-600">
              ${prop.title}
            </a>
            <p>$${prop.price}</p>`,
          );
      });
    };

    initMap();

    return () => {
      mapInstanceRef.current?.remove();
      mapInstanceRef.current = null;
    };
  }, [mapVisible, properties]);

  /* =========================
     RENDER STATES
  ========================== */
  if (loading)
    return <div className="p-6 text-center">Loading properties…</div>;
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;

  /* =========================
     RENDER
  ========================== */
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-8">Explore Listings</h1>

      <div className="flex gap-4 mb-8 flex-wrap">
        <select
          className="p-3 border rounded-lg"
          value={selectedCategory}
          onChange={(e) => {
            const newCategory = e.target.value as PropertyCategory;
            setSelectedCategory(newCategory);
            // reset subType to first of new category
            setSelectedSubType(
              PROPERTY_HIERARCHY[newCategory].subTypes[0] ?? "",
            );
          }}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {PROPERTY_HIERARCHY[cat].label}
            </option>
          ))}
        </select>

        <select
          className="p-3 border rounded-lg flex-1 min-w-[200px]"
          value={selectedSubType}
          onChange={(e) =>
            setSelectedSubType(e.target.value as PropertySubType)
          }
        >
          {subTypes.map((st) => (
            <option key={st} value={st}>
              {formatLabel(st)}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AnimatePresence>
          {subTypes.map((subType) => {
            const href = `/listings/properties/buildings/${selectedCategory}/${subType}`;
            const Icon = getCategoryIcon(selectedCategory);

            return (
              <motion.div
                key={subType}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <Link
                  href={href}
                  className="block p-6 rounded-xl border hover:shadow-lg transition"
                >
                  <div className="flex gap-3 items-center">
                    <Icon className="text-indigo-600" />
                    <div>
                      <h2 className="font-semibold">{formatLabel(subType)}</h2>
                      <p className="text-sm text-gray-500">View listings</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <div
        ref={mapWrapperRef}
        className="mt-10 h-[500px] border rounded-lg overflow-hidden"
      >
        <div ref={mapContainerRef} className="h-full w-full" />
      </div>
    </div>
  );
}
