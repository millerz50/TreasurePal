"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { FaBed, FaInfoCircle, FaMapMarkerAlt } from "react-icons/fa";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

type PropertyImage = {
  fileId: string | null;
  previewUrl: string | null;
};

type Property = {
  $id: string;
  title: string;
  description: string;
  price: string;
  type: string;
  location: string;
  rooms: number;
  amenities: string[];
  images: {
    frontElevation?: PropertyImage;
    southView?: PropertyImage;
    westView?: PropertyImage;
    eastView?: PropertyImage;
    floorPlan?: PropertyImage;
  };
};

function PropertyCard({ property }: { property: Property }) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  const imageUrls = Object.values(property.images)
    .map((img) => {
      if (!img?.previewUrl) return null;
      return img.previewUrl.startsWith("http")
        ? img.previewUrl
        : `${baseUrl}${img.previewUrl}`;
    })
    .filter(Boolean) as string[];

  return (
    <div className="group card shadow-md rounded-xl overflow-hidden border border-gray-200 dark:border-slate-700 transition hover:shadow-xl">
      {imageUrls.length > 0 ? (
        <Swiper spaceBetween={10} slidesPerView={1}>
          {imageUrls.map((url, idx) => (
            <SwiperSlide key={idx}>
              <Image
                src={url}
                alt={`${property.title} view ${idx + 1}`}
                width={600}
                height={400}
                className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="w-full h-56 bg-gray-200 flex items-center justify-center">
          <Image
            src="/placeholder-property.jpg"
            alt="Placeholder property"
            width={600}
            height={400}
            className="w-full h-56 object-cover"
          />
        </div>
      )}

      <div className="p-4 space-y-2">
        <h3 className="text-lg font-bold truncate">{property.title}</h3>
        <p className="flex items-center text-sm text-muted-foreground">
          <FaMapMarkerAlt className="mr-1 text-primary" /> {property.location}
        </p>
        <div className="flex items-center justify-between mt-2">
          <span className="text-primary font-semibold text-lg">
            ${property.price}
          </span>
          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
            {property.type}
          </span>
        </div>
        <p className="flex items-center text-xs mt-1">
          <FaBed className="mr-1" /> {property.rooms} rooms
        </p>
        <div className="flex flex-wrap gap-2 mt-2">
          {property.amenities.map((amenity, idx) => (
            <span
              key={idx}
              className="text-xs bg-gray-100 dark:bg-slate-800 px-2 py-1 rounded-md">
              {amenity}
            </span>
          ))}
        </div>
        <button className="mt-3 w-full flex items-center justify-center gap-2 bg-primary text-white py-2 rounded-lg hover:bg-primary/90 transition">
          <FaInfoCircle /> View Details
        </button>
      </div>
    </div>
  );
}

export default function PropertyList() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async (): Promise<void> => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/properties/all`,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        if (!res.ok)
          throw new Error(`Failed to fetch properties: HTTP ${res.status}`);
        const data: Property[] = await res.json();
        setProperties(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("❌ Failed to fetch properties:", err);
        setProperties([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  return (
    <section className="bg-base-100 px-6 py-12 animate-in fade-in duration-700">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-primary">
            Featured Properties
          </h2>
          <p className="text-sm text-muted-foreground">
            Handpicked listings across Zimbabwe’s top cities—from student pods
            to industrial investments
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="animate-pulse bg-gray-200 h-72 rounded-lg"
              />
            ))}
          </div>
        ) : properties.length === 0 ? (
          <div className="text-center py-12 text-base-content/70">
            <Image
              src="/empty-state.svg"
              alt="No properties"
              width={200}
              height={200}
              className="mx-auto mb-4"
            />
            <h2 className="text-lg font-semibold">No properties found</h2>
            <p className="text-sm">
              Try adjusting your filters or check back later.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <PropertyCard key={property.$id} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
