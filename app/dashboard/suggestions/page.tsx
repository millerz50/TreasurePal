"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import PropertyCard, { type Property } from "components/property/PropertyCard";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

/* ----------------------------
   Types
---------------------------- */
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

/* ----------------------------
   Component
---------------------------- */
export default function SuggestionsPage() {
  const { user, loading: loadingUser } = useAuth();

  const [properties, setProperties] = useState<Property[]>([]);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState("All");

  const API_VERSION = (process.env.NEXT_PUBLIC_API_VERSION || "v2").trim();
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URLV2?.replace(/\/+$/, "") ?? "";

  // Fetch suggested properties & agents
  useEffect(() => {
    if (!user?.userId) return;

    const fetchSuggestions = async () => {
      setLoading(true);
      setError(null);

      try {
        // Suggested properties
        const propsRes = await fetch(`${API_BASE_URL}/api/${API_VERSION}/properties/all`);
        if (!propsRes.ok) throw new Error("Failed to fetch properties");
        const propsData = await propsRes.json();

        // Suggested agents
        const agentsRes = await fetch(`${API_BASE_URL}/api/${API_VERSION}/agents`);
        if (!agentsRes.ok) throw new Error("Failed to fetch agents");
        const agentsData = await agentsRes.json();

        setProperties(propsData.data ?? []);
        setAgents(agentsData.data ?? []);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Unexpected error");
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestions();
  }, [user?.userId]);

  const uniqueLocations = [
    "All",
    ...Array.from(new Set(agents.map((a) => a.location).filter(Boolean))),
  ];

  const filteredAgents =
    selectedLocation === "All"
      ? agents
      : agents.filter((a) => a.location === selectedLocation);

  if (loadingUser) return <div className="p-6 text-center">Loading user info…</div>;

  return (
    <div className="min-h-screen p-6 space-y-12 bg-base-200">
      <h1 className="text-3xl font-bold text-center text-primary">
        Suggested Properties & Agents
      </h1>

      {loading ? (
        <div className="text-center text-gray-500 py-12">Loading suggestions…</div>
      ) : error ? (
        <div className="text-center text-error py-12">{error}</div>
      ) : (
        <>
          {/* -------------------- Suggested Properties -------------------- */}
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-700">Properties You Might Like</h2>
            {properties.length === 0 ? (
              <p className="text-gray-400">No properties found</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                  {properties.map((property) => (
                    <motion.div
                      key={property.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4 }}
                    >
                      <PropertyCard property={property} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </section>

          {/* -------------------- Suggested Agents -------------------- */}
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-700">Agents You Might Like</h2>

            <div className="flex justify-center mb-6">
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

            {filteredAgents.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                <h3 className="text-lg font-semibold">No agents found</h3>
                <p className="text-sm">Try another location or check back later.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence>
                  {filteredAgents.map((agent, index) => (
                    <motion.div
                      key={agent.$id}
                      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      whileHover={{ scale: 1.03 }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
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

                      <div className="card-body space-y-2 p-4">
                        <h3 className="text-xl font-semibold text-blue-700">
                          {agent.firstName} {agent.surname}
                        </h3>
                        <p className="text-sm text-gray-500">📍 {agent.location ?? "Unknown"}</p>
                        {agent.bio && <p className="text-sm text-gray-600">{agent.bio}</p>}
                        <p className="text-xs text-gray-400">📧 {agent.email}</p>
                        {agent.phone && <p className="text-xs text-gray-400">📞 {agent.phone}</p>}
                        <Button
                          type="button"
                          className="w-full text-sm bg-blue-600 text-white hover:bg-blue-700"
                        >
                          Hire Agent
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
}

