"use client";

import React, { useState } from "react";

export interface Filters {
  location?: string;
  type?: string;
  minPrice?: number;
  maxPrice?: number;
  rooms?: number;
}

interface PropertyFiltersProps {
  onFilterChange: (filters: Filters) => void;
}

const PropertyFilters: React.FC<PropertyFiltersProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState<Filters>({});

  const handleChange = (key: keyof Filters, value: any) => {
    const updated = { ...filters, [key]: value };
    setFilters(updated);
    onFilterChange(updated);
  };

  return (
    <div className="bg-base-100 py-6 px-4 sm:px-6 lg:px-8 rounded-lg shadow-md mb-8">
      <h3 className="text-lg font-semibold mb-4">Filter Properties</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <input
          type="text"
          placeholder="Location"
          className="input input-bordered w-full"
          onChange={(e) => handleChange("location", e.target.value)}
        />

        <select
          className="select select-bordered w-full"
          onChange={(e) => handleChange("type", e.target.value)}
        >
          <option value="">Property Type</option>
          <option value="house">House</option>
          <option value="apartment">Apartment</option>
          <option value="land">Land</option>
        </select>

        <input
          type="number"
          placeholder="Min Price"
          className="input input-bordered w-full"
          onChange={(e) => handleChange("minPrice", Number(e.target.value))}
        />

        <input
          type="number"
          placeholder="Max Price"
          className="input input-bordered w-full"
          onChange={(e) => handleChange("maxPrice", Number(e.target.value))}
        />

        <select
          className="select select-bordered w-full"
          onChange={(e) => handleChange("rooms", Number(e.target.value))}
        >
          <option value="">Rooms</option>
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>
              {n}+
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default PropertyFilters;
