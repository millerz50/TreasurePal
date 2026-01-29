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
  const [selectedSubType, setSelectedSubType] = useState<string>("");
  const [mapVisible, setMapVisible] = useState(false);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const mapWrapperRef = useRef<HTMLDivElement | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<Map | null>(null);

  useEffect(() => {
    async function fetchProperties() {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `${API_BASE}/api/${API_VERSION}/properties/all`,
        );
        if (!res.ok) {
          let message = `Failed to fetch properties (${res.status})`;
          try {
            const json = await res.json();
            message = json?.error || json?.message || message;
          } catch {}
          throw new Error(message);
        }

        const data: Property[] = await res.json();
        setProperties(data);
      } catch (err: any) {
        console.error("Fetch properties error:", err);
        setError(err?.message || "Failed to fetch properties");
      } finally {
        setLoading(false);
      }
    }

    fetchProperties();
  }, []);

  const subTypes = useMemo<PropertySubType[]>(
    () => PROPERTY_HIERARCHY[selectedCategory]?.subTypes || [],
    [selectedCategory],
  );

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
      { threshold: 0.15 },
    );
    obs.observe(mapWrapperRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!mapVisible || filteredProperties.length === 0) return;

    const initMap = async () => {
      if (!mapContainerRef.current || mapInstanceRef.current) return;

      const L: typeof import("leaflet") = await import("leaflet");
      mapInstanceRef.current = L.map(mapContainerRef.current, {
        scrollWheelZoom: true,
        zoomControl: true,
      }).setView(
        [
          filteredProperties[0]?.lat || -17.304,
          filteredProperties[0]?.lng || 31.523,
        ],
        7,
      );

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(mapInstanceRef.current);

      const defaultIcon = L.icon({
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      });

      filteredProperties.forEach((prop) => {
        L.marker([prop.lat, prop.lng], { icon: defaultIcon })
          .addTo(mapInstanceRef.current!)
          .bindPopup(
            `<a href="${prop.url}" class="font-bold text-indigo-600">${prop.title}</a><p>$${prop.price}</p>`,
          );
      });
    };

    initMap();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [mapVisible, filteredProperties]);

  if (loading)
    return (
      <div className="p-6 text-center text-gray-500">Loading properties...</div>
    );
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <motion.h1
        className="text-4xl font-bold mb-8 dark:text-white text-gray-900"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Explore Listings
      </motion.h1>

      <motion.div
        className="flex flex-col sm:flex-row gap-4 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <select
          className="p-3 border rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white transition-all hover:shadow-lg focus:scale-105"
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
          type="text"
          placeholder="Filter subtypes..."
          className="p-3 border rounded-lg shadow-sm flex-1 dark:bg-gray-800 dark:border-gray-700 dark:text-white transition-all hover:shadow-lg focus:scale-105"
          value={selectedSubType}
          onChange={(e) => setSelectedSubType(e.target.value)}
        />
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <AnimatePresence>
          {filteredSubTypes.length > 0 ? (
            filteredSubTypes.map((subType, i) => {
              // ✅ Conditional URL logic
              const href =
                selectedCategory === "Land"
                  ? `/listings/Land/${subType}`
                  : `/listings/properties/buildings/${selectedCategory}/${subType}`;

              return (
                <motion.div
                  key={subType}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={href}
                    className="flex items-center gap-2 p-6 bg-white dark:bg-gray-800 shadow-md rounded-xl hover:shadow-xl transition transform hover:scale-105 border border-gray-100 dark:border-gray-700"
                  >
                    {(() => {
                      const Icon = getCategoryIcon(selectedCategory);
                      return (
                        <Icon className="text-indigo-600 w-6 h-6 flex-shrink-0" />
                      );
                    })()}
                    <div>
                      <h2 className="text-xl font-semibold mb-1 dark:text-white text-gray-900">
                        {formatLabel(subType)}
                      </h2>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">
                        View listings under {formatLabel(subType)}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              );
            })
          ) : (
            <motion.p
              className="col-span-full text-gray-500 dark:text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              No subtypes found.
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <motion.div
        ref={mapWrapperRef}
        className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 h-[500px] w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: mapVisible ? 1 : 0 }}
        transition={{ duration: 1 }}
      >
        <div
          ref={mapContainerRef}
          className="h-full w-full bg-gray-100 dark:bg-gray-900 relative"
        >
          {!mapVisible && (
            <div className="absolute inset-0 flex items-center justify-center text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-900">
              Map preview will load when visible
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
