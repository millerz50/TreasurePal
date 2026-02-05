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
    PROPERTY_HIERARCHY[categories[0]]?.subTypes[0] ?? "",
  );
  const [location, setLocation] = useState<string>("");

  const subTypes = useMemo(
    () => PROPERTY_HIERARCHY[category]?.subTypes ?? [],
    [category],
  );

  useEffect(() => {
    setSubType(PROPERTY_HIERARCHY[category]?.subTypes[0] ?? "");
  }, [category]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterChange({
      search: search.trim() || undefined,
      category: category || undefined,
      subType: subType || undefined,
      location: location.trim() || undefined,
    });
  };

  return (
    <section className="bg-white dark:bg-slate-800 rounded-lg shadow p-6 transition-colors duration-300">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Search */}
        <div className="flex items-center gap-3">
          <input
            className="flex-1 border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors"
            placeholder="Search properties (e.g. Bulawayo North)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-600 dark:bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
          >
            Search
          </button>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Category
            </label>
            <select
              className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors"
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
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              SubType
            </label>
            <select
              className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors"
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
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Location
            </label>
            <input
              className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors"
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
