"use client";

import { motion } from "framer-motion";
import React from "react";
import CountrySelect from "../CountrySelect";
import LocationSearch from "../LocationSearch";

interface CountryLocationFieldsProps {
  form: { country: string; location?: string };
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onLocationSelect: (location: {
    name: string;
    lat: number;
    lng: number;
  }) => void;
}

export default function CountryLocationFields({
  form,
  onChange,
  onLocationSelect,
}: CountryLocationFieldsProps) {
  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}>
      {/* Country field */}
      <div className="flex flex-col space-y-2">
        <label
          htmlFor="country"
          className="text-sm font-semibold text-slate-700">
          Country
        </label>

        {/* apply styling to a wrapper instead of passing className to CountrySelect */}
        <div
          className="
            w-full rounded-xl border border-slate-300 
            bg-white p-3 
            text-slate-800 placeholder-slate-400 
            shadow-sm
            focus-within:outline-none focus-within:ring-2 focus-within:ring-teal-500 focus-within:border-teal-500
            transition-all duration-300 ease-in-out
          ">
          <CountrySelect value={form.country || ""} onChange={onChange} />
        </div>
      </div>

      {/* Location field */}
      <div className="flex flex-col space-y-2">
        <label
          htmlFor="locationSearch"
          className="text-sm font-semibold text-slate-700">
          Location
        </label>

        {/* apply styling to a wrapper instead of passing className to LocationSearch */}
        <div
          className="
            w-full rounded-xl border border-slate-300 
            bg-white p-3 
            text-slate-800 placeholder-slate-400 
            shadow-sm
            focus-within:outline-none focus-within:ring-2 focus-within:ring-teal-500 focus-within:border-teal-500
            transition-all duration-300 ease-in-out
          ">
          <LocationSearch
            value={form.location || ""}
            onSelect={onLocationSelect}
          />
        </div>
      </div>
    </motion.div>
  );
}
