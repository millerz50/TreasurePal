"use client";

import { useEffect, useRef, useState } from "react";
import type Map from "leaflet";

type PropertyMapProps = {
  coordinates: [number, number];
};

export default function PropertyMap({ coordinates }: PropertyMapProps) {
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
      { root: null, threshold: 0.15 },
    );
    obs.observe(mapWrapperRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!mapVisible) return;
    const initMap = async () => {
      if (!mapContainer.current || mapInstance.current) return;
      const L: typeof import("leaflet") = await import("leaflet");
      mapInstance.current = L.map(mapContainer.current, {
        scrollWheelZoom: false,
        zoomControl: true,
      }).setView([coordinates[1], coordinates[0]], 13);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(mapInstance.current);
      const icon = L.icon({
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      });
      L.marker([coordinates[1], coordinates[0]], { icon }).addTo(
        mapInstance.current,
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

  return (
    <>
      <h3 className="text-sm font-semibold text-gray-900">Location</h3>
      <div
        ref={mapWrapperRef}
        className="rounded-lg overflow-hidden border border-gray-200"
      >
        <div
          ref={mapContainer}
          className="h-64 w-full bg-gray-100"
          aria-hidden={!mapVisible}
        >
          {!mapVisible && (
            <div className="h-64 w-full flex items-center justify-center text-gray-500">
              Map preview will load when visible
            </div>
          )}
        </div>
      </div>
    </>
  );
}
