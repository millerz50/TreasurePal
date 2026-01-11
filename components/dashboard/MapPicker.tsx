"use client";

import type {
  default as LatLngExpression,
  default as LeafletMouseEvent,
} from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef, useState } from "react";

type Props = {
  coordinates: [number, number];
  setCoordinates: (coords: [number, number]) => void;
  setAddress?: (address: string) => void;
};

export default function MapPicker({
  coordinates,
  setCoordinates,
  setAddress,
}: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const popupRef = useRef<L.Popup | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Initialize map only once
  useEffect(() => {
    const initMap = async () => {
      if (!mapRef.current) return;

      // ✅ Clear any existing Leaflet instance on this container
      if ((mapRef.current as any)._leaflet_id) {
        (mapRef.current as any)._leaflet_id = null;
      }

      const L = await import("leaflet");

      const map = L.map(mapRef.current).setView(
        coordinates as LatLngExpression,
        13
      );
      mapInstance.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(map);

      const marker = L.marker(coordinates as LatLngExpression, {
        draggable: true,
        icon: L.icon({
          iconUrl:
            "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
          shadowUrl:
            "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
          iconSize: [25, 41],
          iconAnchor: [12, 41],
        }),
      }).addTo(map);
      markerRef.current = marker;

      popupRef.current = L.popup().setContent("Selected location");

      const fetchAddress = async (lat: number, lng: number) => {
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
          );
          if (!res.ok)
            throw new Error("Reverse geocoding HTTP error " + res.status);
          const data: { display_name: string } = await res.json();
          const address = data.display_name;
          if (setAddress) setAddress(address);
          popupRef.current
            ?.setLatLng([lat, lng])
            .setContent(address)
            .openOn(map);
        } catch (err) {
          console.error("❌ Reverse geocoding failed:", err);
        }
      };

      map.on("click", (e: LeafletMouseEvent) => {
        const { lat, lng } = e.latlng;
        setCoordinates([lat, lng]);
        marker.setLatLng([lat, lng]);
        fetchAddress(lat, lng);
      });

      marker.on("dragend", () => {
        const pos = marker.getLatLng();
        const { lat, lng } = pos;
        setCoordinates([lat, lng]);
        fetchAddress(lat, lng);
      });

      // initial call
      fetchAddress(coordinates[0], coordinates[1]);
    };

    initMap();

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []); // 👈 run only once

  // Update marker/view when coordinates change
  useEffect(() => {
    if (mapInstance.current && markerRef.current) {
      mapInstance.current.setView(coordinates as LatLngExpression, 13);
      markerRef.current.setLatLng(coordinates as LatLngExpression);
    }
  }, [coordinates]);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          searchQuery
        )}`
      );
      if (!res.ok) throw new Error("Search HTTP error " + res.status);
      const results: Array<{ lat: string; lon: string; display_name: string }> =
        await res.json();

      if (results.length > 0) {
        const { lat, lon, display_name } = results[0];
        const coords: [number, number] = [parseFloat(lat), parseFloat(lon)];
        setCoordinates(coords);
        if (setAddress) setAddress(display_name);
        mapInstance.current?.setView(coords as LatLngExpression, 13);
        markerRef.current?.setLatLng(coords as LatLngExpression);
        popupRef.current
          ?.setLatLng(coords as LatLngExpression)
          .setContent(display_name)
          .openOn(mapInstance.current!);
      }
    } catch (err) {
      console.error("❌ Search failed:", err);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <input
          type="text"
          value={searchQuery}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchQuery(e.target.value)
          }
          placeholder="Search for a place (e.g. Harare)"
          className="input input-bordered w-full"
        />
        <button onClick={handleSearch} className="btn btn-primary">
          Search
        </button>
      </div>
      <div
        ref={mapRef}
        className="rounded-lg border border-base-300 h-64 w-full"
      />
    </div>
  );
}
