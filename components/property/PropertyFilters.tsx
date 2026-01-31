"use client";

import React, { useEffect, useMemo, useState } from "react";
import { PROPERTY_HIERARCHY } from "@/components/property/PropertyMapping/propertyHierarchy";
import type {
  PropertyCategory,
  PropertySubType,
} from "@/components/property/PropertyMapping/propertyTypes";

export type Filters = {
  search?: string;
  category?: PropertyCategory;
  subType?: PropertySubType;
  location?: string;

  // additional filters used elsewhere
  type?: string;
  minPrice?: number;
  maxPrice?: number;
  rooms?: number;
};

type Props = {
  onFilterChange: (filters: Filters) => void;
};

export default function PropertyFilters({ onFilterChange }: Props) {
  const categories = useMemo(
    () => Object.keys(PROPERTY_HIERARCHY) as PropertyCategory[],
    [],
  );

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<PropertyCategory>(categories[0]);
  const [subType, setSubType] = useState<PropertySubType>(
    PROPERTY_HIERARCHY[categories[0]].subTypes[0],
  );
  const [location, setLocation] = useState<string>("");

  const subTypes = useMemo(() => {
    return PROPERTY_HIERARCHY[category]?.subTypes ?? [];
  }, [category]);

  useEffect(() => {
    // Update subType when category changes
    setSubType(PROPERTY_HIERARCHY[category]?.subTypes[0] ?? "");
  }, [category]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onFilterChange({
      search: search.trim() || undefined,
      category,
      subType,
      location: location.trim() || undefined,
    });
  };

  return (
    <section className="bg-white rounded-lg shadow p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Search */}
        <div className="flex items-center gap-3">
          <input
            className="flex-1 border rounded px-3 py-2"
            placeholder="Search properties (e.g. Bulawayo North)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Search
          </button>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              className="w-full border rounded px-3 py-2"
              value={category}
              onChange={(e) => setCategory(e.target.value as PropertyCategory)}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* SubType */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              SubType
            </label>
            <select
              className="w-full border rounded px-3 py-2"
              value={subType}
              onChange={(e) => setSubType(e.target.value as PropertySubType)}
            >
              {subTypes.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              className="w-full border rounded px-3 py-2"
              placeholder="Bulawayo North"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
        </div>
      </form>
    </section>
  );
}
