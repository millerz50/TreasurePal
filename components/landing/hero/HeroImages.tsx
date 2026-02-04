"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Building2, Home, Store } from "lucide-react";
import FloatingBadge from "./FloatingBadge"; // Make sure this path is correct
import { useEffect, useState } from "react";

/* ----------------------------
   ENV VARIABLES
---------------------------- */
const API_VERSION = (process.env.NEXT_PUBLIC_API_VERSION || "v2").trim();
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URLV2?.replace(/\/+$/, "") ?? "";
const APPWRITE_ENDPOINT =
  process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT?.replace(/\/+$/, "") ?? "";
const APPWRITE_PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID ?? "";
const APPWRITE_BUCKET_ID = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID ?? "";

/* ----------------------------
   TYPES
---------------------------- */
type AppwriteFile = string | { $id: string };

type Property = {
  id: string;
  title: string;
  type: string;
  images?: {
    frontElevation?: AppwriteFile;
  };
};

/* ----------------------------
   HELPERS
---------------------------- */
function getAppwriteFileUrl(file: AppwriteFile | undefined | null) {
  if (!file) return "/heroimg.jpg"; // fallback image
  if (typeof file === "string") return file;

  if (!APPWRITE_ENDPOINT || !APPWRITE_PROJECT_ID || !APPWRITE_BUCKET_ID)
    return "/heroimg.jpg";

  const base = APPWRITE_ENDPOINT.endsWith("/v1")
    ? APPWRITE_ENDPOINT
    : `${APPWRITE_ENDPOINT}/v1`;

  return `${base}/storage/buckets/${APPWRITE_BUCKET_ID}/files/${file.$id}/view?project=${APPWRITE_PROJECT_ID}`;
}

/* ----------------------------
   COMPONENT
---------------------------- */
export default function HeroImages() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProperties() {
      try {
        const url = `${API_BASE_URL}/api/${API_VERSION}/properties?limit=3`;
        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch properties");

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

  const heroMain = getAppwriteFileUrl(properties[0]?.images?.frontElevation);
  const heroSecondary = getAppwriteFileUrl(
    properties[1]?.images?.frontElevation,
  );

  if (loading) {
    return (
      <div className="relative h-[440px] flex items-center justify-center">
        <span className="text-white">Loading...</span>
      </div>
    );
  }

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
          alt={properties[0]?.title || "Featured property"}
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
          alt={properties[1]?.title || "Secondary property"}
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
