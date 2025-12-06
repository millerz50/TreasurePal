"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
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
  const imageUrls = Object.values(property.images)
    .map((img) => img?.previewUrl)
    .filter(Boolean) as string[];

  return (
    <div className="card shadow-md rounded-md overflow-hidden">
      {imageUrls.length > 0 ? (
        <Swiper spaceBetween={10} slidesPerView={1}>
          {imageUrls.map((url, idx) => (
            <SwiperSlide key={idx}>
              <Image
                src={url}
                alt={`${property.title} view ${idx + 1}`}
                width={600}
                height={400}
                className="w-full h-56 object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="w-full h-56 bg-gray-200 flex items-center justify-center">
          <span className="text-gray-500">No images available</span>
        </div>
      )}

      <div className="p-4">
        <h3 className="text-lg font-bold">{property.title}</h3>
        <p className="text-sm text-muted-foreground">{property.location}</p>
        <p className="text-primary font-semibold mt-2">${property.price}</p>
        <p className="text-xs mt-1">{property.rooms} rooms</p>
        <div className="flex flex-wrap gap-1 mt-2">
          {property.amenities.map((amenity, idx) => (
            <span
              key={idx}
              className="text-xs bg-gray-100 px-2 py-1 rounded-md">
              {amenity}
            </span>
          ))}
        </div>
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
          "https://treasurepal-backened.onrender.com/api/properties/all",
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!res.ok) {
          throw new Error(`Failed to fetch properties: HTTP ${res.status}`);
        }

        const data: Property[] = await res.json();
        setProperties(data);
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
          <div className="flex justify-center items-center py-12">
            <span className="loading loading-spinner text-primary" />
          </div>
        ) : properties.length === 0 ? (
          <div className="text-center py-12 text-base-content/70">
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
