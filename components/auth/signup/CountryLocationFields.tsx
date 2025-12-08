import React from "react";
import CountrySelect from "../CountrySelect";
import LocationSearch from "../LocationSearch";

interface CountryLocationFieldsProps {
  form: { country: string; location?: string };
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onLocationSelect: (location: {
    name: string;
    lat: number;
    lng: number;
  }) => void;
}

export default function CountryLocationFields({
  form,
  onChange,
  onLocationSelect,
}: CountryLocationFieldsProps) {
  return (
    <div className="grid grid-cols-2 gap-6">
      {/* Country field */}
      <CountrySelect value={form.country || ""} onChange={onChange} />

      {/* Location field */}
      <div>
        <label
          htmlFor="locationSearch"
          className="text-sm font-semibold text-slate-700">
          Location
        </label>
        <LocationSearch
          value={form.location || ""}
          onSelect={onLocationSelect}
        />
      </div>
    </div>
  );
}
