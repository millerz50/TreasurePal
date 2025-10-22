"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  BedDouble,
  Building2,
  DollarSign,
  Factory,
  Home,
  Hotel,
  MapPin,
  Search,
  Settings,
  type LucideIcon,
} from "lucide-react";

type SearchType = "room" | "house" | "buy" | "booking" | "industrial";

const searchOptions: { type: SearchType; label: string; icon: LucideIcon }[] = [
  { type: "room", label: "Room Rent", icon: BedDouble },
  { type: "house", label: "Full House Rent", icon: Home },
  { type: "booking", label: "Lodges & Hotels", icon: Hotel },
  { type: "industrial", label: "Industrial & Commercial", icon: Factory },
  { type: "buy", label: "Buy Property", icon: DollarSign },
];

export default function Hero() {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [searchType, setSearchType] = useState<SearchType>("room");

  useEffect(() => {
    const img = new window.Image();
    img.src = "/heroimg.jpg";
    img.onload = () => setImageLoaded(true);
  }, []);

  return (
    <section className="bg-base-100 text-base-content px-6 py-12 animate-in fade-in duration-700">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left: Search Form */}
        <div className="space-y-6">
          <h1 className="text-4xl font-bold leading-tight text-primary">
            Find Your Treasure Home
          </h1>
          <p className="text-sm text-highlight font-medium">
            From student rooms to industrial buildings—TreasurePal helps you
            find your next space across Zimbabwe.
          </p>

          {/* Search Type Selector */}
          <div className="flex flex-wrap gap-2">
            {searchOptions.map(({ type, label, icon: Icon }) => (
              <Button
                key={type}
                type="button"
                variant={searchType === type ? "primary" : "outline"}
                onClick={() => setSearchType(type)}
                className="text-sm flex items-center gap-2">
                <Icon className="h-4 w-4" aria-hidden="true" />
                {label}
              </Button>
            ))}
          </div>

          {/* Dynamic Filters */}
          <div className="space-y-4">
            {/* Location */}
            <div className="relative">
              <MapPin
                className="absolute left-3 top-3 h-4 w-4 text-accent"
                aria-hidden="true"
              />
              <Input
                type="text"
                placeholder="Location (e.g. Harare, Bindura)"
                className="input input-bordered pl-10 w-full focus-visible:ring-accent"
              />
            </div>

            {/* Max Price */}
            <div className="relative">
              <DollarSign
                className="absolute left-3 top-3 h-4 w-4 text-accent"
                aria-hidden="true"
              />
              <Input
                type="text"
                placeholder="Max Price"
                className="input input-bordered pl-10 w-full focus-visible:ring-accent"
              />
            </div>

            {/* Room Rent Specific */}
            {searchType === "room" && (
              <div className="relative">
                <Settings
                  className="absolute left-3 top-3 h-4 w-4 text-accent"
                  aria-hidden="true"
                />
                <Input
                  type="text"
                  placeholder="Room Type (e.g. Shared, Studio)"
                  className="input input-bordered pl-10 w-full focus-visible:ring-accent"
                />
              </div>
            )}

            {/* Full House Rent & Buy Specific */}
            {(searchType === "house" || searchType === "buy") && (
              <>
                <div className="relative">
                  <Home
                    className="absolute left-3 top-3 h-4 w-4 text-accent"
                    aria-hidden="true"
                  />
                  <Input
                    type="text"
                    placeholder="Property Type (e.g. House, Apartment, Stand)"
                    className="input input-bordered pl-10 w-full focus-visible:ring-accent"
                  />
                </div>
                <div className="relative">
                  <BedDouble
                    className="absolute left-3 top-3 h-4 w-4 text-accent"
                    aria-hidden="true"
                  />
                  <Input
                    type="number"
                    placeholder="Minimum Rooms"
                    className="input input-bordered pl-10 w-full focus-visible:ring-accent"
                  />
                </div>
              </>
            )}

            {/* Buy Specific */}
            {searchType === "buy" && (
              <div className="relative">
                <Building2
                  className="absolute left-3 top-3 h-4 w-4 text-accent"
                  aria-hidden="true"
                />
                <Input
                  type="text"
                  placeholder="Ownership Type (e.g. Freehold, Lease)"
                  className="input input-bordered pl-10 w-full focus-visible:ring-accent"
                />
              </div>
            )}

            {/* Booking Specific */}
            {searchType === "booking" && (
              <>
                <Input
                  type="text"
                  placeholder="Booking Type (e.g. Lodge, Hotel, Guest House)"
                  className="input input-bordered w-full"
                />
                <Input
                  type="date"
                  placeholder="Check-in Date"
                  className="input input-bordered w-full"
                />
                <Input
                  type="date"
                  placeholder="Check-out Date"
                  className="input input-bordered w-full"
                />
              </>
            )}

            {/* Industrial Specific */}
            {searchType === "industrial" && (
              <>
                <Input
                  type="text"
                  placeholder="Property Type (e.g. Warehouse, Factory, Office)"
                  className="input input-bordered w-full"
                />
                <Input
                  type="text"
                  placeholder="Business Use (e.g. Manufacturing, Retail)"
                  className="input input-bordered w-full"
                />
              </>
            )}

            {/* Search Button */}
            <Button
              type="button"
              variant="primary"
              className="w-full text-sm flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-transform duration-200"
              aria-label="Search">
              <Search className="h-4 w-4" aria-hidden="true" />
              Search
            </Button>
          </div>
        </div>

        {/* Right: Hero Image with Skeleton */}
        <div className="w-full h-full">
          {!imageLoaded ? (
            <div className="skeleton w-full h-64 md:h-80 rounded-lg bg-base-200 animate-pulse" />
          ) : (
            <Image
              src="/heroimg.jpg"
              alt="Featured Property"
              width={1200}
              height={600}
              className="rounded-lg shadow-lg border border-accent object-cover w-full h-64 md:h-80 transition-opacity duration-500"
              priority
            />
          )}
        </div>
      </div>
    </section>
  );
}
