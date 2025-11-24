"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import type { FormData, Step } from "../AddPropertyWizard";

interface Props {
  formData: FormData;
  setFormData: Dispatch<SetStateAction<FormData>>;
  setStep: Dispatch<SetStateAction<Step>>;
}

const imageFields = [
  { key: "frontElevation", label: "Front Elevation", mock: "/mock/front.png" },
  { key: "southView", label: "South View", mock: "/mock/south.png" },
  { key: "westView", label: "West View", mock: "/mock/west.png" },
  { key: "eastView", label: "East View", mock: "/mock/east.png" },
  { key: "floorPlan", label: "Floor Plan", mock: "/mock/floor.png" },
];

export default function PropertyImagesStep({ setFormData, setStep }: Props) {
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
}
