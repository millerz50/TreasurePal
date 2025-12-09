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

import { domainConfig } from "../landing/Navbar/ssrWrapperNav/domains"; // import domain config

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

  // 🔑 Domain-based branding
  const [brand, setBrand] = useState(domainConfig["default"]);
  useEffect(() => {
    const host = window.location.hostname;
    setBrand(domainConfig[host] || domainConfig["default"]);
  }, []);

  return (
    <section className="bg-base-100 text-base-content px-6 py-16 animate-fadeIn">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left: Search Form */}
        <div className="space-y-8">
          <h1 className="text-5xl font-extrabold leading-tight bg-gradient-to-r from-primary to-accent text-transparent bg-clip-text">
            Find Your {brand.name} Home
          </h1>
          <p className="text-lg font-semibold text-highlight">
            {brand.description} — helping you find your next space.
          </p>

          {/* Search Type Selector */}
          <div className="flex flex-wrap gap-3">
            {searchOptions.map(({ type, label, icon: Icon }) => (
              <Button
                key={type}
                type="button"
                variant={searchType === type ? "primary" : "outline"}
                onClick={() => setSearchType(type)}
                className={`text-sm flex items-center gap-2 transition-all ${
                  searchType === type
                    ? "bg-primary text-white hover:bg-blue-600 dark:hover:bg-blue-700"
                    : "border border-primary text-base-content hover:bg-base-200 dark:hover:bg-gray-800"
                }`}>
                <Icon className="h-4 w-4" aria-hidden="true" />
                {label}
              </Button>
            ))}
          </div>

          {/* Dynamic Filters */}
          <div className="space-y-5">
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-accent" />
              <Input
                type="text"
                aria-label="Location"
                placeholder="Location (e.g. Harare, Bindura)"
                className="input input-bordered pl-12 w-full focus-visible:ring-accent"
              />
            </div>

            <div className="relative">
              <DollarSign className="absolute left-3 top-3 h-5 w-5 text-accent" />
              <Input
                type="text"
                aria-label="Max Price"
                placeholder="Max Price"
                className="input input-bordered pl-12 w-full focus-visible:ring-accent"
              />
            </div>

            {searchType === "room" && (
              <div className="relative">
                <Settings className="absolute left-3 top-3 h-5 w-5 text-accent" />
                <Input
                  type="text"
                  aria-label="Room Type"
                  placeholder="Room Type (e.g. Shared, Studio)"
                  className="input input-bordered pl-12 w-full focus-visible:ring-accent"
                />
              </div>
            )}

            {(searchType === "house" || searchType === "buy") && (
              <>
                <div className="relative">
                  <Home className="absolute left-3 top-3 h-5 w-5 text-accent" />
                  <Input
                    type="text"
                    aria-label="Property Type"
                    placeholder="Property Type (e.g. House, Apartment, Stand)"
                    className="input input-bordered pl-12 w-full focus-visible:ring-accent"
                  />
                </div>
                <div className="relative">
                  <BedDouble className="absolute left-3 top-3 h-5 w-5 text-accent" />
                  <Input
                    type="number"
                    aria-label="Minimum Rooms"
                    placeholder="Minimum Rooms"
                    className="input input-bordered pl-12 w-full focus-visible:ring-accent"
                  />
                </div>
              </>
            )}

            {searchType === "buy" && (
              <div className="relative">
                <Building2 className="absolute left-3 top-3 h-5 w-5 text-accent" />
                <Input
                  type="text"
                  aria-label="Ownership Type"
                  placeholder="Ownership Type (e.g. Freehold, Lease)"
                  className="input input-bordered pl-12 w-full focus-visible:ring-accent"
                />
              </div>
            )}

            {searchType === "booking" && (
              <>
                <Input
                  type="text"
                  aria-label="Booking Type"
                  placeholder="Booking Type (e.g. Lodge, Hotel, Guest House)"
                  className="input input-bordered w-full"
                />
                <Input
                  type="date"
                  aria-label="Check-in Date"
                  className="input input-bordered w-full"
                />
                <Input
                  type="date"
                  aria-label="Check-out Date"
                  className="input input-bordered w-full"
                />
              </>
            )}

            {searchType === "industrial" && (
              <>
                <Input
                  type="text"
                  aria-label="Property Type"
                  placeholder="Property Type (e.g. Warehouse, Factory, Office)"
                  className="input input-bordered w-full"
                />
                <Input
                  type="text"
                  aria-label="Business Use"
                  placeholder="Business Use (e.g. Manufacturing, Retail)"
                  className="input input-bordered w-full"
                />
              </>
            )}

            <Button
              type="button"
              variant="primary"
              className="w-full text-base font-semibold flex items-center justify-center gap-2 hover:scale-[1.03] active:scale-95 transition-transform duration-200 bg-primary text-white hover:bg-blue-600 dark:hover:bg-blue-700"
              aria-label="Search">
              <Search className="h-5 w-5" aria-hidden="true" />
              Search
            </Button>
          </div>
        </div>

        {/* Right: Hero Image with fade-in */}
        <div className="relative w-full h-64 md:h-80 group">
          <Image
            src="/heroimg.jpg"
            alt="Featured Property"
            fill
            className={`rounded-lg shadow-xl border-4 border-accent object-cover transition-opacity duration-500 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            priority
            onLoad={() => setImageLoaded(true)}
          />
          {!imageLoaded && (
            <div className="absolute inset-0 skeleton rounded-lg bg-blue-100 dark:bg-gray-700 animate-pulse" />
          )}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-transparent group-hover:text-white text-xl font-bold transition duration-300">
              Featured Property
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
