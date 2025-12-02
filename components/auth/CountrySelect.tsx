"use client";

import React from "react";

const countries = [
  "Zimbabwe",
  "South Africa",
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "India",
  "China",
  "Brazil",
  "Germany",
  "France",
  "Japan",
  "Nigeria",
  "Kenya",
  "Botswana",
  "Namibia",
  "Mozambique",
  "Zambia",
  "Malawi",
  "Tanzania",
  // ... extend with full ISO list
];

type Props = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

export default function CountrySelect({ value, onChange }: Props) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor="country" className="text-sm font-medium text-slate-700">
        Country
      </label>
      <select
        id="country"
        name="country"
        value={value}
        onChange={onChange}
        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
        required>
        <option value="">Select Country</option>
        {countries.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
    </div>
  );
}
