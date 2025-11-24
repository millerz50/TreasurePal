"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AMENITIES } from "@/lib/amenities";
import type { Dispatch, SetStateAction } from "react";
import type { FormData, Step } from "../AddPropertyWizard";

interface Props {
  formData: FormData;
  setFormData: Dispatch<SetStateAction<FormData>>;
  setStep: Dispatch<SetStateAction<Step>>;
}

export default function AmenitiesStep({
  formData,
  setFormData,
  setStep,
}: Props) {
  const toggleAmenity = (amenity: string) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  return (
    <div className="space-y-6">
      {AMENITIES[formData.type] &&
        Object.entries(AMENITIES[formData.type]).map(([category, items]) => (
          <div key={category}>
            <h3 className="font-semibold text-primary mb-2">{category}</h3>
            <div className="flex flex-wrap gap-3">
              {items.map(({ name, icon: Icon }) => {
                const selected = formData.amenities.includes(name);
                return (
                  <button
                    type="button"
                    key={name}
                    onClick={() => toggleAmenity(name)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition 
                      ${
                        selected
                          ? "bg-primary text-white border-primary"
                          : "bg-white hover:bg-muted border-gray-300"
                      }
                    `}>
                    {Icon && (
                      <Icon
                        className={`w-5 h-5 ${
                          selected ? "text-white" : "text-primary"
                        }`}
                      />
                    )}
                    <span className="text-sm font-medium">{name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}

      <Textarea
        name="description"
        placeholder="Add a description..."
        value={formData.description}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, description: e.target.value }))
        }
      />

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => setStep(1)}>
          Back
        </Button>
        <Button onClick={() => setStep(3)}>Next</Button>
      </div>
    </div>
  );
}
