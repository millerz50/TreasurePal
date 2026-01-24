"use client";

import { PROPERTY_TYPES } from "@/components/amenities/AmenityMap";
import LocationSearch from "@/components/property/LocationSearch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { Dispatch, SetStateAction } from "react";
import React from "react";
import {
  FaBed,
  FaDollarSign,
  FaHome,
  FaMapMarkerAlt,
  FaPercent,
  FaRoad,
} from "react-icons/fa";
import type { PropertyFormValues, Step } from "../AddPropertyWizard";
import CountrySelect from "./CountrySelect";

interface Props {
  formData: PropertyFormValues & { depositOption?: "none" | "required" };
  setFormData: Dispatch<
    SetStateAction<PropertyFormValues & { depositOption?: "none" | "required" }>
  >;
  setStep: Dispatch<SetStateAction<Step>>;
  error: string | null;
  setError: Dispatch<SetStateAction<string | null>>;
}

const BasicInfoStep: React.FC<Props> = ({
  formData,
  setFormData,
  setStep,
  error,
  setError,
}) => {
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value, // 👈 keep EVERYTHING as string in UI
    }));
  };

  const validate = (): string | null => {
    if (!formData.title.trim()) return "Title is required.";
    if (!String(formData.price).trim()) return "Price is required.";
    if (isNaN(Number(formData.price))) return "Price must be a number.";
    if (!formData.location.trim()) return "Location is required.";
    if (!formData.address.trim()) return "Address is required.";

    const rooms = Number(formData.rooms);
    if (!rooms || rooms < 1) return "Rooms must be at least 1.";

    if (!formData.country.trim()) return "Country is required.";

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
          value={formData.title}
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
          value={formData.price}
          onChange={handleChange}
          className="flex-1"
        />
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
          value={formData.address}
          onChange={handleChange}
          className="flex-1"
        />
      </div>

      {/* Country + Rooms */}
      <div className="grid grid-cols-2 gap-6">
        <CountrySelect
          value={formData.country}
          onChange={(val: string) =>
            setFormData((prev) => ({ ...prev, country: val }))
          }
        />

        <div className="flex items-center gap-2">
          <FaBed className="text-primary" />
          <Input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            name="rooms"
            placeholder="Rooms"
            value={formData.rooms || ""}
            onChange={handleChange}
            className="w-24"
          />
          <span className="text-sm text-muted-foreground">rooms available</span>
        </div>
      </div>

      {/* Property type */}
      {/* Property type */}
      <select
        name="type"
        value={formData.type}
        onChange={handleChange}
        className="select select-bordered w-full"
      >
        <option value="">Select property type</option>

        {PROPERTY_TYPES.map((type) => (
          <option key={type} value={type}>
            {type === "BookingHouse" ? "Booking House" : type}
          </option>
        ))}
      </select>

      {/* Description */}
      <Textarea
        name="description"
        placeholder="Property description..."
        value={formData.description}
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
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              name="depositPercentage"
              placeholder="Deposit %"
              value={formData.depositPercentage || ""}
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
