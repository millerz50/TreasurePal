"use client";

import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

type Agent = {
  $id: string;
  firstName: string;
  surname: string;
  email: string;
  phone?: string;
  bio?: string;
  location?: string;
  profileImageId?: string | null;
  status?: string;
};

export default function AgencySection() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/agents")
      .then((res) => res.json())
      .then((data: Agent[]) => {
        setAgents(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setAgents([]);
        setLoading(false);
      });
  }, []);

  const uniqueLocations = [
    "All",
    ...Array.from(new Set(agents.map((a) => a.location).filter(Boolean))),
  ];

  const filteredAgents =
    selectedLocation === "All"
      ? agents
      : agents.filter((a) => a.location === selectedLocation);

  return (
    <section className="py-16 px-4 sm:px-8 max-w-screen-xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-center text-blue-700 mb-2"
      >
        Meet Our Agents
      </motion.h2>
      <p className="text-center text-sm text-gray-500 mb-6">
        Trusted real estate professionals across Zimbabwe
      </p>

      <div className="flex justify-center mb-10">
        <select
          id="location"
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          className="select select-bordered w-full max-w-xs text-sm"
        >
          {uniqueLocations.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <span className="loading loading-spinner text-primary" />
        </div>
      ) : filteredAgents.length === 0 ? (
        <div className="text-center py-12 text-base-content/70">
          <h2 className="text-lg font-semibold">No agents found</h2>
          <p className="text-sm">Try another location or check back later.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          <AnimatePresence>
            {filteredAgents.map((agent, index) => (
              <motion.div
                key={agent.$id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.03 }}
                className="card bg-white shadow-lg border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <figure className="relative h-48 w-full overflow-hidden bg-gray-100">
                  {agent.profileImageId ? (
                    <Image
                      src={`https://cloud.appwrite.io/v1/storage/buckets/${process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID}/files/${agent.profileImageId}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`}
                      alt={`${agent.firstName} ${agent.surname}`}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                      No photo
                    </div>
                  )}
                </figure>

                <div className="card-body space-y-3 p-4">
                  <h3 className="text-xl font-semibold text-blue-700">
                    {agent.firstName} {agent.surname}
                  </h3>
                  <p className="text-sm text-gray-500">
                    📍 {agent.location ?? "Unknown"}
                  </p>
                  <p className="text-sm text-gray-600">{agent.bio}</p>
                  <p className="text-xs text-gray-400">📧 {agent.email}</p>
                  <p className="text-xs text-gray-400">📞 {agent.phone}</p>

                  <div className="pt-4">
                    <Button
                      type="button"
                      className="w-full text-sm bg-blue-600 text-white hover:bg-blue-700"
                    >
                      Hire Agent
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </section>
  );
}

