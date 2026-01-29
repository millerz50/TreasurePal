"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { PROPERTY_HIERARCHY } from "@/components/property/PropertyMapping/propertyHierarchy";
import type {
  PropertyCategory,
  PropertySubType,
} from "@/components/property/PropertyMapping/propertyTypes";
import Link from "next/link";
import type Map from "leaflet";
import { motion, AnimatePresence } from "framer-motion";
import { Home, MapPin, Layers } from "lucide-react";

interface Property {
  id: string;
  title: string;
  category: PropertyCategory;
  subType: PropertySubType;
  price: number;
  lat: number;
  lng: number;
  url: string;
  status: string;
  agentId?: string;
}

function formatLabel(label: string) {
  return label.replace(/([A-Z])/g, " $1").trim();
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

const API_VERSION = (process.env.NEXT_PUBLIC_API_VERSION || "v1").trim();
const API_BASE_V1 =
  process.env.NEXT_PUBLIC_API_URLV1?.replace(/\/+$/, "") ?? "";
const API_BASE_V2 =
  process.env.NEXT_PUBLIC_API_URLV2?.replace(/\/+$/, "") ?? "";
const API_BASE =
  API_VERSION === "v2" && API_BASE_V2 ? API_BASE_V2 : API_BASE_V1;

export default function PropertyFilterPage() {
  const categories = Object.keys(PROPERTY_HIERARCHY) as PropertyCategory[];

  const [selectedCategory, setSelectedCategory] = useState<PropertyCategory>(
    categories[0],
  );

  const [selectedSubType, setSelectedSubType] = useState("");
  const [mapVisible, setMapVisible] = useState(false);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const mapWrapperRef = useRef<HTMLDivElement | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<Map | null>(null);

  // Fetch properties
  useEffect(() => {
    async function fetchProperties() {
      try {
        const res = await fetch(
          `${API_BASE}/api/${API_VERSION}/properties/all`,
        );

        if (!res.ok) {
          throw new Error(`Failed to fetch properties (${res.status})`);
        }

        const data: Property[] = await res.json();
        setProperties(data);
      } catch (err: any) {
        console.error(err);
        setError(err?.message ?? "Failed to fetch properties");
      } finally {
        setLoading(false);
      }
    }

    fetchProperties();
  }, []);

  const subTypes = useMemo<PropertySubType[]>(() => {
    return PROPERTY_HIERARCHY[selectedCategory]?.subTypes ?? [];
  }, [selectedCategory]);

  // Case-insensitive filter ONLY for search
  const filteredSubTypes = useMemo(() => {
    if (!selectedSubType) return subTypes;
    return subTypes.filter((st) =>
      st.toLowerCase().includes(selectedSubType.toLowerCase()),
    );
  }, [subTypes, selectedSubType]);

  const filteredProperties = useMemo(() => {
    return properties.filter(
      (prop) =>
        prop.category === selectedCategory &&
        (selectedSubType ? prop.subType === selectedSubType : true),
    );
  }, [properties, selectedCategory, selectedSubType]);

  // Lazy load map
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

  // Init map
  useEffect(() => {
    if (!mapVisible || !filteredProperties.length) return;

    const initMap = async () => {
      if (!mapContainerRef.current || mapInstanceRef.current) return;

      const L = await import("leaflet");

      mapInstanceRef.current = L.map(mapContainerRef.current).setView(
        [filteredProperties[0].lat, filteredProperties[0].lng],
        7,
      );

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(mapInstanceRef.current);

      filteredProperties.forEach((prop) => {
        L.marker([prop.lat, prop.lng])
          .addTo(mapInstanceRef.current!)
          .bindPopup(
            `<a href="${prop.url}" class="font-bold text-indigo-600">${prop.title}</a><p>$${prop.price}</p>`,
          );
      });
    };

    initMap();

    return () => {
      mapInstanceRef.current?.remove();
      mapInstanceRef.current = null;
    };
  }, [mapVisible, filteredProperties]);

  if (loading)
    return <div className="p-6 text-center">Loading properties…</div>;

  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-8">Explore Listings</h1>

      <div className="flex gap-4 mb-8">
        <select
          className="p-3 border rounded-lg"
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value as PropertyCategory);
            setSelectedSubType("");
          }}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {PROPERTY_HIERARCHY[cat].label}
            </option>
          ))}
        </select>

        <input
          className="p-3 border rounded-lg flex-1"
          placeholder="Filter subtypes…"
          value={selectedSubType}
          onChange={(e) => setSelectedSubType(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredSubTypes.map((subType) => {
            const href =
              selectedCategory === "Land"
                ? `/listings/land/${subType}`
                : `/listings/properties/buildings/${selectedCategory}/${subType}`;

            const Icon = getCategoryIcon(selectedCategory);

            return (
              <motion.div key={subType} layout>
                <Link
                  href={href}
                  className="block p-6 rounded-xl border hover:shadow-lg"
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
