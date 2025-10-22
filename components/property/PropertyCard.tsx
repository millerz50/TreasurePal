"use client";

import { Button } from "@/components/ui/button";
import { HeartIcon as OutlineHeart } from "@heroicons/react/24/outline";
import { HeartIcon as SolidHeart } from "@heroicons/react/24/solid";
import {
  BedDouble,
  Building2,
  Car,
  Factory,
  Home,
  Hotel,
  Key,
  MapPin,
  ShieldCheck,
  Sparkles,
  Tv,
  Users,
  Wifi,
  Wrench,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ComponentType } from "react";
import { useState } from "react";
import { MdFireplace, MdOutlineHome, MdPalette } from "react-icons/md";

type Property = {
  title: string;
  description: string;
  image: string;
  price: string;
  type: string;
  location: string;
  rooms: number;
};

const amenitiesByType: Record<string, string[]> = {
  House: ["Garden", "Garage", "Kitchen", "Wi-Fi", "Laundry", "Parking"],
  Mansion: [
    "Swimming Pool",
    "Home Theater",
    "Gym",
    "Wine Cellar",
    "Library",
    "Smart Security",
    "Tennis Court",
  ],
  Apartment: ["Balcony", "Elevator", "Wi-Fi", "Laundry", "Parking"],
  Studio: ["Wi-Fi", "Bed", "Desk", "Wardrobe", "Shared Kitchen"],
  Loft: ["Rooftop Access", "Open Plan", "Wi-Fi", "Laundry"],
  Townhouse: ["Courtyard", "Garage", "Wi-Fi", "Laundry"],
  Bungalow: ["Garden", "Veranda", "Wi-Fi", "Parking"],
  Condo: ["Gym", "Pool", "Wi-Fi", "Elevator", "Security"],
  Cabin: ["Fireplace", "Wood Interior", "Nature Views"],
  Estate: ["Acreage", "Guest House", "Private Drive", "Security"],
  Duplex: ["Private Garden", "Separate Entrance", "Wi-Fi"],
  Hotel: ["Reception", "Wi-Fi", "Room Service", "Pool"],
  Lodge: ["Fireplace", "Wi-Fi", "Nature Views", "Private Area"],
  GuestHouse: ["Wi-Fi", "Shared Kitchen", "Laundry", "Parking"],
  Warehouse: ["Loading Dock", "Security", "Power Supply", "Parking"],
  Factory: ["Production Floor", "Power Supply", "Security", "Parking"],
  Stand: ["Serviced", "Title Deed", "Water Access", "Electricity"],
};

const iconMap: Record<string, ComponentType<{ className?: string }>> = {
  "Wi-Fi": Wifi,
  Kitchen: MdOutlineHome,
  Garage: Car,
  Laundry: Wrench,
  Parking: Key,
  "Swimming Pool": Sparkles,
  "Home Theater": Tv,
  "Smart Security": ShieldCheck,
  Fireplace: MdFireplace,
  Balcony: Building2,
  Gym: Users,
  Library: MdPalette,
  Reception: Hotel,
  "Room Service": BedDouble,
  "Nature Views": Building2,
  "Private Area": Home,
  "Shared Kitchen": MdOutlineHome,
  "Loading Dock": Factory,
  "Power Supply": Wrench,
  Security: ShieldCheck,
  "Production Floor": Factory,
  Serviced: Wrench,
  "Title Deed": Key,
  "Water Access": MapPin,
  Electricity: Sparkles,
};

export default function PropertyCard({
  title,
  description,
  image,
  price,
  type,
  location,
  rooms,
}: Property) {
  const [liked, setLiked] = useState(false);
  const amenities = amenitiesByType[type]?.slice(0, 4) || [];

  return (
    <div className="card bg-base-100 text-base-content rounded-xl shadow-sm border border-base-300 transition-all hover:shadow-lg animate-in fade-in duration-500">
      {/* Image + Like Button */}
      <figure className="relative aspect-video overflow-hidden rounded-t-xl">
        <Image
          src={image}
          alt={`Image of ${title}`}
          width={800}
          height={450}
          className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
          priority
        />
        <button
          type="button"
          onClick={() => setLiked(!liked)}
          className={`btn btn-sm btn-circle absolute top-3 right-3 ${
            liked
              ? "bg-red-500 text-white"
              : "bg-white text-red-500 hover:bg-red-100"
          }`}
          aria-label="Like property">
          {liked ? (
            <SolidHeart className="h-5 w-5 transition-transform duration-200 hover:scale-110" />
          ) : (
            <OutlineHeart className="h-5 w-5 transition-transform duration-200 hover:scale-110" />
          )}
        </button>
      </figure>

      {/* Card Content */}
      <div className="card-body space-y-3">
        <h2 className="card-title text-base font-semibold text-primary">
          {title}
        </h2>
        <p className="text-xs text-base-content/70 line-clamp-2">
          {description}
        </p>

        <div className="grid grid-cols-2 gap-2 text-xs text-base-content/80">
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

        {/* Amenities Icons */}
        {amenities.length > 0 && (
          <div className="pt-2 flex flex-wrap gap-3 items-center">
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
        )}

        <div className="card-actions justify-end pt-2">
          <Link href={`/property/${title.toLowerCase().replace(/\s+/g, "-")}`}>
            <Button
              type="button"
              variant="primary"
              className="text-xs px-3 py-1 hover:scale-[1.02] active:scale-95 transition-transform">
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
