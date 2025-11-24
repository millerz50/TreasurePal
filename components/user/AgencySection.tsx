"use client";

import { Button } from "@/components/ui/button";
import type { Agent } from "@/lib/types";
import { StarIcon } from "@heroicons/react/24/solid";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

const locations = [
  "All",
  "Harare",
  "Bulawayo",
  "Bindura",
  "Mutare",
  "Gweru",
  "Mt Darwin",
];

export default function AgencySection() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [isMobile, setIsMobile] = useState(false);

  // ✅ Fetch agents from API
  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const res = await fetch("https://your-api-domain.com/api/agents");
        // replace with your actual API endpoint
        if (!res.ok) throw new Error("Failed to fetch agents");
        const data: Agent[] = await res.json();
        setAgents(data);
      } catch (error) {
        console.error("Error fetching agents:", error);
      }
    };
    fetchAgents();
  }, []);

  // ✅ Handle responsive state
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ Filter agents by location
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

      {/* Location Filter */}
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

      {/* Agents Grid */}
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
              {/* Agent Image */}
              <figure className="relative h-48 w-full overflow-hidden">
                <Image
                  src={agent.image}
                  alt={`${agent.name} ${agent.surname}`}
                  fill
                  className="object-cover"
                />
              </figure>

              {/* Agent Info */}
              <div className="card-body space-y-3">
                <h3 className="text-xl font-semibold text-blue-700">
                  {agent.name} {agent.surname}
                </h3>
                <p className="text-sm text-muted-foreground">{agent.role}</p>
                <p className="text-xs text-gray-500">📍 {agent.location}</p>

                {/* Rating */}
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

                {/* CTA */}
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
