// app/(auth)/layout.tsx
"use client";

import { motion } from "framer-motion";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-green-100 via-white to-blue-100">
      <div className="mx-auto max-w-2xl px-4 py-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}>
          <div className="flex flex-col items-center">
            <div className="mb-6 flex items-center gap-3">
              {/* Optional: replace src with your logo path in public/ */}
              <img
                src="/treasurepal-logo.png"
                alt="TreasurePal logo"
                className="h-10 w-10 rounded-md shadow-sm"
              />
              <div className="leading-tight">
                <h1 className="text-2xl font-bold">
                  <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                    Treasure Pal
                  </span>
                </h1>
                <p className="text-xs uppercase tracking-wider text-green-700">
                  Affordable.Properties
                </p>
              </div>
            </div>

            <div className="w-full rounded-xl bg-white p-6 shadow-xl ring-1 ring-black/5">
              {children}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
