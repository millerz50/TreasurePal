"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import type { Dispatch, SetStateAction } from "react";
import React, { useState } from "react";
import type { PropertyFormValues, Step } from "../AddPropertyWizard";

interface Props {
  setFormData: Dispatch<SetStateAction<PropertyFormValues>>;
  setStep: Dispatch<SetStateAction<Step>>;
  formData: PropertyFormValues;
}

const imageFields = [
  {
    key: "frontElevation",
    label: "Front Elevation",
    mock: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800",
  },
  {
    key: "southView",
    label: "South View",
    mock: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
  },
  {
    key: "westView",
    label: "West View",
    mock: "https://images.unsplash.com/photo-1599423300746-b62533397364?w=800",
  },
  {
    key: "eastView",
    label: "East View",
    mock: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800",
  },
  {
    key: "floorPlan",
    label: "Floor Plan",
    mock: "https://images.unsplash.com/photo-1581090700227-4c4f7e0e1f2d?w=800",
  },
];

const PropertyImagesStep: React.FC<Props> = ({ setFormData, setStep }) => {
  const [previews, setPreviews] = useState<Record<string, string>>({});

  const handleFileChange = (key: string, file: File | null) => {
    if (!file) return;
    setFormData((prev) => ({ ...prev, [key]: file }));
    setPreviews((prev) => ({ ...prev, [key]: URL.createObjectURL(file) }));
  };

  return (
    <div className="space-y-6">
      <h3 className="font-semibold text-primary">Upload Property Images</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {imageFields.map(({ key, label, mock }) => (
          <div key={key} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              {label}
            </label>
            <div className="relative h-40 w-full border rounded-lg overflow-hidden flex items-center justify-center bg-gray-50">
              {previews[key] ? (
                <Image
                  src={previews[key]}
                  alt={label}
                  fill
                  className="object-cover"
                />
              ) : (
                <Image
                  src={mock}
                  alt={`${label} mock`}
                  fill
                  className="object-contain opacity-50"
                />
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                handleFileChange(key, e.target.files?.[0] ?? null)
              }
              className="block w-full text-sm"
            />
          </div>
        ))}
      </div>
      <div className="flex justify-between">
        <Button variant="outline" onClick={() => setStep(3)}>
          Back
        </Button>
        <Button onClick={() => setStep(5)}>Next</Button>
      </div>
    </div>
  );
};

export default PropertyImagesStep;
