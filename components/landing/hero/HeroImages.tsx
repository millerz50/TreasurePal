"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Building2, Home, Store } from "lucide-react";
import FloatingBadge from "./FloatingBadge";
import { useEffect, useState } from "react";

/* ----------------------------
   ENV
---------------------------- */
const API_VERSION = (process.env.NEXT_PUBLIC_API_VERSION || "v2").trim();
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URLV2?.replace(/\/+$/, "") ?? "";

const APPWRITE_ENDPOINT =
  process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT?.replace(/\/+$/, "") ?? "";
const APPWRITE_BUCKET_ID = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID ?? "";

/* ----------------------------
   TYPES
---------------------------- */
type Property = {
  $id: string;
  title: string;
  type: string;
  images?: {
    frontElevation?: string;
  };
};

export default function HeroImages() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  /* ----------------------------
     FETCH PROPERTIES
  ---------------------------- */
  useEffect(() => {
    async function fetchProperties() {
      try {
        const res = await fetch(
          `${API_BASE_URL}/api/${API_VERSION}/properties/all?limit=3`,
        );

        if (!res.ok) {
          throw new Error(`Failed to fetch properties (${res.status})`);
        }

        const data: Property[] = await res.json();
        setProperties(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("HeroImages fetch error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchProperties();
  }, []);

  /* ----------------------------
     IMAGE HELPERS
  ---------------------------- */
  const buildImage = (fileId?: string, fallback = "/heroimg.jpg"): string => {
    if (!fileId) return fallback;
    return `${APPWRITE_ENDPOINT}/storage/buckets/${APPWRITE_BUCKET_ID}/files/${fileId}/view`;
  };

  const heroMain: string = buildImage(
    properties[0]?.images?.frontElevation,
    "/heroimg.jpg",
  );

  const heroSecondary: string = buildImage(
    properties[1]?.images?.frontElevation,
    "/heroimg-2.jpg",
  );

  /* ----------------------------
     UI
  ---------------------------- */
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
