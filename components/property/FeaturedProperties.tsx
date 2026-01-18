"use client";

import React, { useRef } from "react";
import PropertyCard, { Property } from "../property/PropertyCard";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface FeaturedPropertiesProps {
  properties: Property[];
  title?: string;
}

const FeaturedProperties: React.FC<FeaturedPropertiesProps> = ({
  properties,
  title = "Featured Properties",
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  if (!properties || properties.length === 0) return null;

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const { clientWidth } = scrollRef.current;
    const scrollAmount = direction === "left" ? -clientWidth / 2 : clientWidth / 2;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  return (
    <section className="bg-base-100 py-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-gray-900">
          {title}
        </h2>

        {/* Carousel Container */}
        <div className="relative">
          {/* Scroll Buttons */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition"
          >
            <ChevronRight size={24} />
          </button>

          {/* Scrollable Cards */}
          <motion.div
            ref={scrollRef}
            className="flex space-x-6 overflow-x-auto snap-x snap-mandatory scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
            whileTap={{ cursor: "grabbing" }}
          >
            {properties.map((property, index) => (
              <motion.div
                key={property.id}
                className="flex-shrink-0 w-80 snap-start"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <PropertyCard property={property} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
