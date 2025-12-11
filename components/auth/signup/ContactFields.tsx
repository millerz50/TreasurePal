"use client";

import { motion } from "framer-motion";
import React from "react";

interface ContactFieldsProps {
  form: { email: string; phone: string };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ContactFields({ form, onChange }: ContactFieldsProps) {
  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}>
      {/* Email field */}
      <div className="flex flex-col space-y-2">
        <label htmlFor="email" className="text-sm font-semibold text-slate-700">
          Email
        </label>
        <input
          id="email"
          type="email"
          name="email"
          value={form.email || ""}
          onChange={onChange}
          placeholder="you@example.com"
          className="
            w-full rounded-xl border border-slate-300 
            bg-white p-3 
            text-slate-800 placeholder-slate-400 
            shadow-sm
            focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500
            transition-all duration-300 ease-in-out
          "
          required
        />
      </div>

      {/* Phone field */}
      <div className="flex flex-col space-y-2">
        <label htmlFor="phone" className="text-sm font-semibold text-slate-700">
          Phone
        </label>
        <input
          id="phone"
          type="tel"
          name="phone"
          value={form.phone || ""}
          onChange={onChange}
          placeholder="+263771234567"
          className="
            w-full rounded-xl border border-slate-300 
            bg-white p-3 
            text-slate-800 placeholder-slate-400 
            shadow-sm
            focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500
            transition-all duration-300 ease-in-out
          "
          required
        />
      </div>
    </motion.div>
  );
}
