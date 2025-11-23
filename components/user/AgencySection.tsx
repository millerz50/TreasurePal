"use client";

import { Button } from "@/components/ui/button";
import type { Agent } from "@/lib/types/types";
import { StarIcon } from "@heroicons/react/24/solid";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image"; // ✅ use Next.js optimized Image
import { useEffect, useRef, useState } from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

const agents: Agent[] = [
  {
    id: 1,
    name: "Tariro",
    surname: "Moyo",
    role: "Senior Agent",
    location: "Harare",
    image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
    rating: 4.8,
    reviews: 32,
    properties: [
      {
        title: "Modern Family Home",
        price: "$85,000",
        type: "House",
        rooms: 3,
        location: "Bindura",
        description: "A cozy 3-bedroom house with garden and garage.",
        image:
          "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg",
      },
      {
        title: "Urban Studio",
        price: "$45,000",
        type: "Apartment",
        rooms: 1,
        location: "Harare",
        description: "Compact studio apartment ideal for professionals.",
        image:
          "https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg",
      },
      {
        title: "City Loft",
        price: "$60,000",
        type: "Loft",
        rooms: 2,
        location: "Harare",
        description: "Stylish loft with rooftop access.",
        image:
          "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg",
      },
    ],
  },
  {
    id: 2,
    name: "Kuda",
    surname: "Chikafu",
    role: "Property Consultant",
    location: "Bulawayo",
    image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg",
    rating: 4.6,
    reviews: 21,
    properties: [
      {
        title: "Stylish Townhouse",
        price: "$120,000",
        type: "Townhouse",
        rooms: 4,
        location: "Bulawayo",
        description: "Elegant townhouse with courtyard.",
        image:
          "https://images.pexels.com/photos/1643385/pexels-photo-1643385.jpeg",
      },
      {
        title: "Suburban Retreat",
        price: "$110,000",
        type: "House",
        rooms: 3,
        location: "Bulawayo",
        description: "Quiet retreat near schools.",
        image:
          "https://images.pexels.com/photos/1643386/pexels-photo-1643386.jpeg",
      },
      {
        title: "Downtown Flat",
        price: "$70,000",
        type: "Apartment",
        rooms: 2,
        location: "Bulawayo",
        description: "Central location with balcony.",
        image:
          "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg",
      },
    ],
  },
  {
    id: 3,
    name: "Nyasha",
    surname: "Gumbo",
    role: "Client Advisor",
    location: "Bindura",
    image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg",
    rating: 4.9,
    reviews: 45,
    properties: [
      {
        title: "Lakeview Cottage",
        price: "$65,000",
        type: "Cottage",
        rooms: 2,
        location: "Bindura",
        description: "Panoramic lake views.",
        image:
          "https://images.pexels.com/photos/1643386/pexels-photo-1643386.jpeg",
      },
      {
        title: "Garden Duplex",
        price: "$95,000",
        type: "Duplex",
        rooms: 3,
        location: "Bindura",
        description: "Private garden and patio.",
        image:
          "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg",
      },
      {
        title: "Hillside Haven",
        price: "$75,000",
        type: "House",
        rooms: 3,
        location: "Bindura",
        description: "Elevated views and quiet living.",
        image:
          "https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg",
      },
    ],
  },
  {
    id: 4,
    name: "Tendai",
    surname: "Mugabe",
    role: "Sales Executive",
    location: "Mutare",
    image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
    rating: 4.7,
    reviews: 28,
    properties: [
      {
        title: "Mountain View Villa",
        price: "$130,000",
        type: "Villa",
        rooms: 4,
        location: "Mutare",
        description: "Luxury villa with scenic views.",
        image:
          "https://images.pexels.com/photos/1643385/pexels-photo-1643385.jpeg",
      },
      {
        title: "Eco Bungalow",
        price: "$80,000",
        type: "Bungalow",
        rooms: 2,
        location: "Mutare",
        description: "Sustainable living in nature.",
        image:
          "https://images.pexels.com/photos/1643386/pexels-photo-1643386.jpeg",
      },
      {
        title: "Forest Cabin",
        price: "$55,000",
        type: "Cabin",
        rooms: 2,
        location: "Mutare",
        description: "Rustic charm in the woods.",
        image:
          "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg",
      },
    ],
  },
  {
    id: 5,
    name: "Rudo",
    surname: "Chirwa",
    role: "Leasing Specialist",
    location: "Gweru",
    image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg",
    rating: 4.5,
    reviews: 19,
    properties: [
      {
        title: "City Center Condo",
        price: "$90,000",
        type: "Condo",
        rooms: 2,
        location: "Gweru",
        description: "Modern condo in the heart of Gweru.",
        image:
          "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg",
      },
      {
        title: "Family Estate",
        price: "$150,000",
        type: "Estate",
        rooms: 5,
        location: "Gweru",
        description: "Spacious estate for large families.",
        image:
          "https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg",
      },
      {
        title: "Studio Pod",
        price: "$40,000",
        type: "Studio",
        rooms: 1,
        location: "Gweru",
        description: "Compact and efficient living.",
        image:
          "https://images.pexels.com/photos/1643386/pexels-photo-1643386.jpeg",
      },
    ],
  },
];

const locations = ["All", "Harare", "Bulawayo", "Bindura", "Mutare", "Gweru"];

export default function AgencySection() {
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [isMobile, setIsMobile] = useState(false);
  const scrollRefs = useRef<Record<number, HTMLDivElement | null>>({});

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!isMobile) {
      const interval = setInterval(() => {
        Object.values(scrollRefs.current).forEach((el) => {
          if (el) {
            el.scrollLeft += 1;
            if (el.scrollLeft >= el.scrollWidth - el.clientWidth) {
              el.scrollLeft = 0;
            }
          }
        });
      }, 30);

      return () => {
        clearInterval(interval);
      };
    }

    return undefined;
  }, [isMobile]);

  const filteredAgents =
    selectedLocation === "All"
      ? agents
      : agents.filter((agent) => agent.location === selectedLocation);

  return (
    <section className="py-16 px-4 sm:px-8 max-w-screen-xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-center text-blue-700 mb-6">
        Meet Our Agents
      </motion.h2>

      <div className="flex justify-center mb-10">
        <label htmlFor="location" className="sr-only">
          Filter by location
        </label>
        <select
          id="location"
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          className="select select-bordered w-full max-w-xs text-sm">
          {locations.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        <AnimatePresence>
          {filteredAgents.map((agent, index) => (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
              className="card bg-base-100 shadow-lg border border-blue-100 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300">
              <figure className="relative h-48 w-full overflow-hidden">
                <Image
                  src={agent.image}
                  alt={`${agent.name} ${agent.surname}`}
                  fill
                  className="object-cover"
                />
              </figure>

              <div className="card-body space-y-3">
                <h3 className="text-xl font-semibold text-blue-700">
                  {agent.name} {agent.surname}
                </h3>
                <p className="text-sm text-muted-foreground">{agent.role}</p>
                <p className="text-xs text-gray-500">📍 {agent.location}</p>

                {/* Responsive Property Slider */}
                {isMobile ? (
                  <Swiper spaceBetween={12} slidesPerView={1.2}>
                    {agent.properties.map((property) => (
                      <SwiperSlide key={property.title}>
                        <div className="bg-blue-50 p-3 rounded-md text-sm space-y-2 border border-blue-100 shadow-sm hover:shadow-md transition-all">
                          <div className="relative h-32 w-full overflow-hidden rounded-md">
                            <Image
                              src={property.image}
                              alt={property.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <p className="font-semibold text-blue-600">
                            {property.title}
                          </p>
                          <p className="text-xs">{property.description}</p>
                          <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 pt-1">
                            <div>
                              <strong>Price:</strong> {property.price}
                            </div>
                            <div>
                              <strong>Type:</strong> {property.type}
                            </div>
                            <div>
                              <strong>Rooms:</strong> {property.rooms}
                            </div>
                            <div>
                              <strong>Location:</strong> {property.location}
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                ) : (
                  <div
                    ref={(el) => {
                      scrollRefs.current[agent.id] = el;
                    }}
                    className="overflow-x-auto whitespace-nowrap scroll-smooth">
                    <div className="flex gap-4">
                      {agent.properties.map((property, i) => (
                        <motion.div
                          key={`${agent.id}-${property.title}-${i}`}
                          initial={{ opacity: 0, x: 30 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: i * 0.2 }}
                          className="min-w-[250px] bg-blue-50 p-3 rounded-md text-sm space-y-2 border border-blue-100 shadow-sm hover:shadow-md transition-all">
                          <div className="relative h-32 w-full overflow-hidden rounded-md">
                            <Image
                              src={property.image}
                              alt={property.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <p className="font-semibold text-blue-600">
                            {property.title}
                          </p>
                          <p className="text-xs">{property.description}</p>
                          <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 pt-1">
                            <div>
                              <strong>Price:</strong> {property.price}
                            </div>
                            <div>
                              <strong>Type:</strong> {property.type}
                            </div>
                            <div>
                              <strong>Rooms:</strong> {property.rooms}
                            </div>
                            <div>
                              <strong>Location:</strong> {property.location}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-1 text-yellow-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.round(agent.rating)
                          ? "fill-yellow-500"
                          : "fill-gray-300"
                      }`}
                      aria-hidden="true"
                    />
                  ))}
                  <span className="text-xs text-gray-500 ml-2">
                    {agent.rating} ({agent.reviews} reviews)
                  </span>
                </div>

                <div className="pt-4">
                  <Button
                    type="button"
                    className="w-full text-sm bg-blue-600 text-white hover:bg-blue-700">
                    Hire Agent
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
