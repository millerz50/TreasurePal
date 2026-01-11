"use client";

import React from "react";

interface DOBFieldProps {
  form: { dateOfBirth?: string };
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  onBlur?: (
    e: React.FocusEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
}

export default function DOBField({ form, onChange, onBlur }: DOBFieldProps) {
  return (
    <div className="flex flex-col space-y-2 w-full">
      <label
        htmlFor="dateOfBirth"
        className="text-sm font-semibold text-slate-700">
        Date of Birth
      </label>

      <input
        id="dateOfBirth"
        name="dateOfBirth"
        type="date"
        value={form.dateOfBirth || ""}
        onChange={onChange}
        onBlur={onBlur}
        className="
          w-full rounded-xl border border-slate-300 
          bg-white p-3 text-slate-800 
          shadow-sm placeholder-slate-400
          focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500
          transition-all duration-300 ease-in-out
        "
        required
      />
    </div>
  );
}
