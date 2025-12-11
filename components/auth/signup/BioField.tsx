"use client";

import { motion } from "framer-motion";
import React from "react";

interface BioFieldProps {
  form: { bio?: string };
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
}

export default function BioField({ form, onChange }: BioFieldProps) {
  return (
    <motion.div
      className="flex flex-col space-y-2 w-full"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}>
      <label htmlFor="bio" className="text-sm font-semibold text-slate-700">
        Bio
      </label>

      <textarea
        id="bio"
        name="bio"
        value={form.bio ?? ""}
        onChange={onChange}
        rows={5}
        className="
          w-full rounded-xl border border-slate-300 
          bg-white p-4 
          text-slate-800 placeholder-slate-400 
          shadow-md resize-y
          focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500
          transition-all duration-300 ease-in-out
        "
        placeholder="Tell us a little about yourself..."
      />

      <p className="text-xs text-slate-500">
        Line breaks and spaces will be preserved when displayed.
      </p>
    </motion.div>
  );
}
