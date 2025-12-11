"use client";

import React from "react";

interface ContactFieldsProps {
  form: {
    email?: string;
    phone?: string;
    [key: string]: any;
  };
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  /**
   * Optional onBlur handler forwarded from parent.
   * Accepts focus events from inputs/selects/textarea.
   */
  onBlur?: (
    e: React.FocusEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
}

export default function ContactFields({
  form,
  onChange,
  onBlur,
}: ContactFieldsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
      {/* Email */}
      <div className="flex flex-col space-y-2">
        <label htmlFor="email" className="text-sm font-semibold text-slate-700">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={form.email ?? ""}
          onChange={onChange}
          onBlur={onBlur}
          className="w-full rounded-xl border border-slate-300 bg-white p-3 text-slate-800 placeholder-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300 ease-in-out"
          placeholder="you@example.com"
        />
      </div>

      {/* Phone */}
      <div className="flex flex-col space-y-2">
        <label htmlFor="phone" className="text-sm font-semibold text-slate-700">
          Phone
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          value={form.phone ?? ""}
          onChange={onChange}
          onBlur={onBlur}
          className="w-full rounded-xl border border-slate-300 bg-white p-3 text-slate-800 placeholder-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300 ease-in-out"
          placeholder="+1 555 555 5555"
        />
      </div>
    </div>
  );
}
