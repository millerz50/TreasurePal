"use client";

import React, { Dispatch, SetStateAction, useMemo, useState } from "react";
import { PROPERTY_HIERARCHY } from "@/components/property/PropertyMapping/propertySetup";
import type {
  PropertyCategory,
  PropertySubType,
} from "@/components/property/PropertyMapping/propertyTypes";
import LocationSearch from "@/components/property/LocationSearch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import CountrySelect from "./CountrySelect";
import {
  FaBed,
  FaDollarSign,
  FaHome,
  FaMapMarkerAlt,
  FaPercent,
  FaRoad,
} from "react-icons/fa";
import type { PropertyFormValues, Step } from "../AddPropertyWizard";

// Props interface
interface Props {
  formData: PropertyFormValues;
  setFormData: Dispatch<SetStateAction<PropertyFormValues>>;
  setStep: Dispatch<SetStateAction<Step>>;
  error: string | null;
  setError: Dispatch<SetStateAction<string | null>>;
}

// Default category
const DEFAULT_CATEGORY: PropertyCategory = "Residential";

// Property status options
const PROPERTY_STATUS_OPTIONS = [
  { label: "For Rent", value: "forRent" },
  { label: "For Sale", value: "forSale" },
];

const BasicInfoStep: React.FC<Props> = ({
  formData,
  setFormData,
  setStep,
  error,
  setError,
}) => {
  const [mainType, setMainType] = useState<PropertyCategory>(
    (formData.type as PropertyCategory) ?? DEFAULT_CATEGORY,
  );

  // Get subtypes from selected category
  const subTypes = useMemo<PropertySubType[]>(
    () => PROPERTY_HIERARCHY[mainType]?.subTypes ?? [],
    [mainType],
  );

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      if (name === "rooms")
        return { ...prev, rooms: value === "" ? 0 : Number(value) };
      if (name === "price" || name === "depositPercentage")
        return { ...prev, [name]: value };
      return { ...prev, [name]: value };
    });
  };

  // Validation
  const validate = (): string | null => {
    if (!formData.title?.trim()) return "Title is required.";
    if (!String(formData.price).trim()) return "Price is required.";
    if (isNaN(Number(formData.price))) return "Price must be a number.";
    if (!formData.location?.trim()) return "Location is required.";
    if (!formData.address?.trim()) return "Address is required.";
    if (!formData.country?.trim()) return "Country is required.";
    if (!formData.type) return "Property category is required.";
    if (!formData.subType) return "Property sub-type is required.";
    if (!formData.status) return "Property status is required.";

    const rooms = Number(formData.rooms);
    if (!rooms || rooms < 1) return "Rooms must be at least 1.";

    if (
      formData.depositOption === "required" &&
      (!String(formData.depositPercentage || "").trim() ||
        isNaN(Number(formData.depositPercentage)) ||
        Number(formData.depositPercentage) <= 0 ||
        Number(formData.depositPercentage) > 100)
    ) {
      return "Deposit percentage must be between 1 and 100.";
    }

    return null;
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex items-center gap-2">
        <FaHome className="text-primary" />
        <Input
          name="title"
          placeholder="Property title"
          value={formData.title || ""}
          onChange={handleChange}
          className="flex-1"
        />
      </div>

      {/* Price */}
      <div className="flex items-center gap-2">
        <FaDollarSign className="text-primary" />
        <Input
          name="price"
          inputMode="numeric"
          placeholder="Price (USD)"
          value={formData.price || ""}
          onChange={handleChange}
          className="flex-1"
        />
      </div>

      {/* Property Status */}
      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">Property Status</label>
        <select
          name="status"
          value={formData.status || ""}
          onChange={handleChange}
          className="select select-bordered w-full"
        >
          <option value="">Select status</option>
          {PROPERTY_STATUS_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Location */}
      <div className="flex items-center gap-2">
        <FaMapMarkerAlt className="text-primary" />
        <LocationSearch
          onSelect={({ name, lat, lng }) =>
            setFormData((prev) => ({
              ...prev,
              location: name,
              locationLat: lat,
              locationLng: lng,
            }))
          }
        />
      </div>

      {/* Address */}
      <div className="flex items-center gap-2">
        <FaRoad className="text-primary" />
        <Input
          name="address"
          placeholder="Street address"
          value={formData.address || ""}
          onChange={handleChange}
          className="flex-1"
        />
      </div>

      {/* Country + Rooms */}
      <div className="grid grid-cols-2 gap-6">
        <CountrySelect
          value={formData.country || ""}
          onChange={(val) => setFormData((prev) => ({ ...prev, country: val }))}
        />
        <div className="flex items-center gap-2">
          <FaBed className="text-primary" />
          <Input
            name="rooms"
            inputMode="numeric"
            placeholder="Rooms"
            value={formData.rooms ?? ""}
            onChange={handleChange}
            className="w-24"
          />
          <span className="text-sm text-muted-foreground">rooms available</span>
        </div>
      </div>

      {/* Property Category */}
      <select
        name="type"
        value={mainType}
        onChange={(e) => {
          const newType = e.target.value as PropertyCategory;
          setMainType(newType);
          setFormData((prev) => ({
            ...prev,
            type: newType,
            subType: subTypes[0] || "",
          }));
        }}
        className="select select-bordered w-full"
      >
        {Object.entries(PROPERTY_HIERARCHY).map(([key, value]) => (
          <option key={key} value={key}>
            {value.label}
          </option>
        ))}
      </select>

      {/* Property Sub-Type */}
      <select
        name="subType"
        value={formData.subType || ""}
        onChange={handleChange}
        className="select select-bordered w-full"
        disabled={subTypes.length === 0}
      >
        <option value="">
          {subTypes.length === 0
            ? "No sub-types available"
            : "Select property sub-type"}
        </option>
        {subTypes.map((subType) => (
          <option key={subType} value={subType}>
            {subType.replace(/([A-Z])/g, " $1").trim()}
          </option>
        ))}
      </select>

      {/* Description */}
      <Textarea
        name="description"
        placeholder="Property description..."
        value={formData.description || ""}
        onChange={handleChange}
        className="w-full"
      />

      {/* Deposit */}
      <div className="space-y-3 border rounded-lg p-3">
        <label className="block text-sm font-medium mb-1">
          Deposit Availability
        </label>
        <select
          name="depositOption"
          value={formData.depositOption || "none"}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              depositOption: e.target.value as "none" | "required",
              depositAvailable: e.target.value === "required",
            }))
          }
          className="select select-bordered w-full"
        >
          <option value="none">No Deposit</option>
          <option value="required">Deposit Required</option>
        </select>

        {formData.depositOption === "required" && (
          <div className="flex items-center gap-2 mt-2">
            <FaPercent className="text-primary" />
            <Input
              name="depositPercentage"
              inputMode="numeric"
              placeholder="Deposit %"
              value={formData.depositPercentage ?? ""}
              onChange={handleChange}
              className="w-32"
            />
            <span className="text-sm text-muted-foreground">
              of property price
            </span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-end">
        <Button
          onClick={() => {
            const err = validate();
            if (err) return setError(err);
            setError(null);
            setStep(2);
          }}
          className="w-full sm:w-auto"
        >
          Next
        </Button>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default BasicInfoStep;
