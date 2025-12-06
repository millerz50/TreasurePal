"use client";

import { PROPERTY_TYPES } from "@/components/amenities/AmenityMap";
import LocationSearch from "@/components/property/LocationSearch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { Dispatch, SetStateAction } from "react";
import React from "react";
import type { PropertyFormValues, Step } from "../AddPropertyWizard";

interface Props {
  formData: PropertyFormValues;
  setFormData: Dispatch<SetStateAction<PropertyFormValues>>;
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
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "rooms" ? Number(value) : value,
    }));
  };

  const validate = (): string | null => {
    if (!formData.title.trim()) {
      return "Title is required.";
    }
    if (!String(formData.price).trim()) {
      return "Price is required.";
    }
    if (isNaN(Number(formData.price))) {
      return "Price must be a number.";
    }
    if (!formData.location.trim()) {
      return "Location is required.";
    }
    if (!formData.address.trim()) {
      return "Address is required.";
    }
    return null;
  };

  return (
    <div className="space-y-4">
      <Input
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
      />
      <Input
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
      />

      <LocationSearch
        onSelect={({ name, lat, lng }) =>
          setFormData((prev) => ({
            ...prev,
            location: name,
            address: name,
            locationLat: lat,
            locationLng: lng,
          }))
        }
      />

      <Input
        name="address"
        placeholder="Address"
        value={formData.address}
        onChange={handleChange}
      />
      <Input
        type="number"
        name="rooms"
        placeholder="Rooms"
        value={formData.rooms}
        onChange={handleChange}
      />

      <select
        name="type"
        value={formData.type}
        onChange={handleChange}
        className="select select-bordered w-full">
        {PROPERTY_TYPES.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>

      <Textarea
        name="description"
        placeholder="Property description..."
        value={formData.description}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, description: e.target.value }))
        }
      />

      <div className="flex justify-end">
        <Button
          onClick={() => {
            const err = validate();
            if (err) {
              return setError(err);
            }
            setError(null);
            setStep(2);
          }}>
          Next
        </Button>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default BasicInfoStep;
