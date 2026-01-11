"use client";

import { motion } from "framer-motion";
import { Building2, Home, Store } from "lucide-react";
import Image from "next/image";
import FloatingBadge from "./FloatingBadge";

export default function HeroImages() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      className="relative h-[440px]">
      <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl">
        <Image
          src="/heroimg.jpg"
          alt="Modern property"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="absolute -bottom-10 -left-10 w-52 h-36 rounded-2xl overflow-hidden shadow-xl border bg-background">
        <Image
          src="/heroimg-2.jpg"
          alt="Secondary property"
          fill
          className="object-cover"
        />
      </motion.div>

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
