"use client";

import type { ComponentType } from "react";
import { iconMap } from "./PropertyDetails";

type PropertyAmenitiesProps = {
  amenities: string[];
};

export default function PropertyAmenities({
  amenities,
}: PropertyAmenitiesProps) {
  return (
    <>
      <h3 className="text-sm font-semibold text-gray-900">Amenities</h3>
      <div className="flex flex-wrap gap-3">
        {amenities.map((item) => {
          const Icon = iconMap[item] as ComponentType<{ className?: string }>;
          return (
            <div
              key={item}
              className="flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-full px-3 py-1 text-sm text-gray-700"
              title={item}
            >
              <div className="text-green-500">
                {Icon && <Icon className="h-4 w-4" />}
              </div>
              <span className="hidden sm:inline">{item}</span>
            </div>
          );
        })}
      </div>
    </>
  );
}
