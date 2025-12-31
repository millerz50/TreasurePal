"use client";

import React from "react";

interface NameFieldsProps {
  form: { firstName: string; surname: string };
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

export default function NameFields({
  form,
  onChange,
  onBlur,
}: NameFieldsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
      {/* First Name */}
      <div className="flex flex-col space-y-2">
        <label
          htmlFor="firstName"
          className="text-sm font-semibold text-slate-700">
          First Name
        </label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={form.firstName || ""}
          onChange={onChange}
          onBlur={onBlur}
          placeholder="Enter your first name"
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

      {/* Surname */}
      <div className="flex flex-col space-y-2">
        <label
          htmlFor="surname"
          className="text-sm font-semibold text-slate-700">
          Surname
        </label>
        <input
          type="text"
          id="surname"
          name="surname"
          value={form.surname || ""}
          onChange={onChange}
          onBlur={onBlur}
          placeholder="Enter your surname"
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
    </div>
  );
}
