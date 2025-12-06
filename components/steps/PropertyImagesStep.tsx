"use client";

import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
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
  // previews now hold arrays of URLs
  const [previews, setPreviews] = useState<Record<string, string[]>>({});

  const handleFileChange = (key: string, files: FileList | null) => {
    if (!files || files.length === 0) return;

    const fileArray = Array.from(files);
    setFormData((prev) => ({ ...prev, [key]: fileArray }));

    const urls = fileArray.map((file) => URL.createObjectURL(file));
    setPreviews((prev) => ({ ...prev, [key]: urls }));
  };

  return (
    <div className="space-y-6">
      <h3 className="font-semibold text-lg text-primary">
        Upload Property Images
      </h3>

      {/* Exterior fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {imageFields.map(({ key, label, mock }) => (
          <div key={key} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              {label}
            </label>
            <div className="relative aspect-video w-full border rounded-lg overflow-hidden bg-gray-100 group">
              {previews[key] && previews[key].length > 0 ? (
                <div className="grid grid-cols-2 gap-1 w-full h-full">
                  {previews[key].map((src, idx) => (
                    <div key={idx} className="relative w-full h-32">
                      <Image
                        src={src}
                        alt={`${label} ${idx + 1}`}
                        fill
                        sizes="100%"
                        className="object-cover rounded"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <Image
                  src={mock}
                  alt={`${label} mock`}
                  fill
                  sizes="100%"
                  className="object-cover opacity-60"
                />
              )}
              {!previews[key] && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-600 group-hover:text-primary transition">
                  <Upload className="w-8 h-8 mb-1" />
                  <span className="text-xs">Upload {label}</span>
                </div>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => handleFileChange(key, e.target.files)}
              className="block w-full text-sm file:mr-4 file:py-2 file:px-4
                         file:rounded-md file:border-0
                         file:text-sm file:font-semibold
                         file:bg-primary file:text-white
                         hover:file:bg-primary/80"
            />
          </div>
        ))}
      </div>

      {/* Inside section */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Inside Views (up to 3)
        </label>
        <div className="relative aspect-video w-full border rounded-lg overflow-hidden bg-gray-100 group">
          {previews["inside"] && previews["inside"].length > 0 ? (
            <div className="grid grid-cols-3 gap-1 w-full h-full">
              {previews["inside"].map((src, idx) => (
                <div key={idx} className="relative w-full h-32">
                  <Image
                    src={src}
                    alt={`Inside ${idx + 1}`}
                    fill
                    sizes="100%"
                    className="object-cover rounded"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-600 group-hover:text-primary transition">
              <Upload className="w-8 h-8 mb-1" />
              <span className="text-xs">Upload Inside Views</span>
            </div>
          )}
        </div>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => {
            const files = e.target.files;
            if (!files) return;
            // limit to 3 files
            const fileArray = Array.from(files).slice(0, 3);
            setFormData((prev) => ({ ...prev, inside: fileArray }));
            const urls = fileArray.map((file) => URL.createObjectURL(file));
            setPreviews((prev) => ({ ...prev, inside: urls }));
          }}
          className="block w-full text-sm file:mr-4 file:py-2 file:px-4
                     file:rounded-md file:border-0
                     file:text-sm file:font-semibold
                     file:bg-primary file:text-white
                     hover:file:bg-primary/80"
        />
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={() => setStep(3)}>
          Back
        </Button>
        <Button onClick={() => setStep(5)}>Next</Button>
      </div>
    </div>
  );
};

export default PropertyImagesStep;
