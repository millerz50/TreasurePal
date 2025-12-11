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
    <div>
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
        className="input w-full"
        required
      />
    </div>
  );
}
