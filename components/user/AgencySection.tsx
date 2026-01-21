"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AgentCard from "./AgentCard";

export type Agent = {
  $id: string;
  userId: string;
  fullname: string;
  rating?: number | null;
  verified?: boolean | null;
  message?: string;
  agentId?: string;
  reviewedBy?: string | null;
  reviewedAt?: string | null;
  reviewNotes?: string | null;
  $createdAt: string;
};

export default function AgencySection() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/agents")
      .then((res) => res.json())
      .then((json) => {
        setAgents(json.data ?? []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load agents", err);
        setAgents([]);
        setLoading(false);
      });
  }, []);

  const activeAgents = useMemo(
    () => agents.filter((a) => a.verified === true),
    [agents],
  );

  return (
    <section className="py-20 px-4 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14"
      >
        <h2 className="text-4xl font-bold text-slate-800">
          Meet Our Trusted Agents
        </h2>
        <p className="mt-3 text-sm text-slate-500">
          Verified real estate professionals ready to help you
        </p>
      </motion.div>

      {/* Loading */}
      {loading && (
        <div className="flex justify-center py-16">
          <span className="loading loading-spinner loading-lg text-primary" />
        </div>
      )}

      {/* Empty */}
      {!loading && activeAgents.length === 0 && (
        <div className="text-center py-16 text-slate-500">
          No agents available at the moment.
        </div>
      )}

      {/* Grid */}
      {!loading && activeAgents.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          <AnimatePresence>
            {activeAgents.map((agent, index) => (
              <motion.div
                key={agent.$id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <AgentCard agent={agent} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </section>
  );
}


