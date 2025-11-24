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
    <div className="space-y-4">
      {AMENITIES[formData.type] &&
        Object.entries(AMENITIES[formData.type]).map(([category, items]) => (
          <div key={category}>
            <h3 className="font-semibold text-primary">{category}</h3>
            <div className="flex flex-wrap gap-3">
              {items.map(({ name, icon: Icon }) => (
                <label
                  key={name}
                  className="flex items-center gap-2 border p-2 rounded cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.amenities.includes(name)}
                    onChange={() => toggleAmenity(name)}
                  />
                  {Icon && <Icon className="w-4 h-4 text-primary" />}
                  {name}
                </label>
              ))}
            </div>
          </div>
        ))}

      <Textarea
        name="description"
        placeholder="Description"
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
