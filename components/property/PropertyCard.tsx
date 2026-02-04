"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Building2, Home, Store } from "lucide-react";
import FloatingBadge from "./FloatingBadge";
import { useEffect, useState, useMemo } from "react";

/* ----------------------------
   ENV
---------------------------- */
const API_VERSION = (process.env.NEXT_PUBLIC_API_VERSION || "v2").trim();
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URLV2?.replace(/\/+$/, "") ?? "";

const APPWRITE_ENDPOINT =
  process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT?.replace(/\/+$/, "") ?? "";
const APPWRITE_BUCKET_ID = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID ?? "";
const APPWRITE_PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID ?? "";

/* ----------------------------
   TYPES
---------------------------- */
type Property = {
  $id: string;
  title: string;
  images?: {
    frontElevation?: string;
  };
};

/* ----------------------------
   HELPERS (MATCH PROPERTY CARD)
---------------------------- */
function getAppwriteFileUrl(fileId?: string, fallback = "/heroimg.jpg") {
  if (!fileId) return fallback;
  if (!APPWRITE_ENDPOINT || !APPWRITE_BUCKET_ID || !APPWRITE_PROJECT_ID)
    return fallback;

  const base = APPWRITE_ENDPOINT.endsWith("/v1")
    ? APPWRITE_ENDPOINT
    : `${APPWRITE_ENDPOINT}/v1`;

  return `${base}/storage/buckets/${APPWRITE_BUCKET_ID}/files/${fileId}/view?project=${APPWRITE_PROJECT_ID}`;
}

/* ----------------------------
   COMPONENT
---------------------------- */
export default function HeroImages() {
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    async function fetchProperties() {
      try {
        const res = await fetch(
          `${API_BASE_URL}/api/${API_VERSION}/properties/all?limit=3`,
        );
        if (!res.ok) throw new Error("Failed to fetch properties");

        const data = await res.json();
        setProperties(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("HeroImages fetch error:", err);
      }
    }

    fetchProperties();
  }, []);

  const heroMain = useMemo(
    () =>
      getAppwriteFileUrl(properties[0]?.images?.frontElevation, "/heroimg.jpg"),
    [properties],
  );

  const heroSecondary = useMemo(
    () =>
      getAppwriteFileUrl(
        properties[1]?.images?.frontElevation,
        "/heroimg-2.jpg",
      ),
    [properties],
  );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      className="relative h-[440px]"
    >
      {/* Main Hero */}
      <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl">
        <Image
          src={heroMain}
          alt={properties[0]?.title ?? "Featured property"}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
      </div>

      {/* Secondary Hero */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="absolute -bottom-10 -left-10 w-52 h-36 rounded-2xl overflow-hidden shadow-xl border bg-background"
      >
        <Image
          src={heroSecondary}
          alt={properties[1]?.title ?? "Secondary property"}
          fill
          className="object-cover"
        />
      </motion.div>

      {/* Floating badges */}
      <FloatingBadge icon={Home} text="Rentals" className="top-6 left-6" />
      <FloatingBadge
        icon={Building2}
        text="Buy"
        className="bottom-12 left-14"
      />
      <FloatingBadge
        icon={Store}
        text="Marketplace"
        className="top-1/2 right-6"
      />
    </motion.div>
  );
}
