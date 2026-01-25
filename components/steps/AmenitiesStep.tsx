// components/steps/AmenitiesStep.tsx
"use client";

import { ICON_MAP } from "@/components/icons/maps/ICON_MAP";
import { AMENITIES } from "@/components/amenities/Amenities";
import { Button } from "@/components/ui/button";
import type { Dispatch, SetStateAction } from "react";
import type { PropertyFormValues, Step } from "../AddPropertyWizard";
import type { PropertySubType } from "@/components/property/PropertyMapping/propertyTypes";
import type { LucideIcon } from "lucide-react";

interface Props {
  formData: PropertyFormValues;
  setFormData: Dispatch<SetStateAction<PropertyFormValues>>;
  setStep: Dispatch<SetStateAction<Step>>;
}

export default function AmenitiesStep({
  formData,
  setFormData,
  setStep,
}: Props) {
  const toggleAmenity = (amenity: string) => {
    setFormData((prev) => {
      const currentAmenities = prev.amenities ?? [];
      const has = currentAmenities.includes(amenity);
      return {
        ...prev,
        amenities: has
          ? currentAmenities.filter((a) => a !== amenity)
          : [...currentAmenities, amenity],
      };
    });
  };

  const selectedCount = (formData.amenities ?? []).length;

  const subType = formData.type as PropertySubType;
  const amenitiesForType = AMENITIES[subType];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-primary">Select Amenities</h2>
        <span className="text-sm text-gray-500">{selectedCount} selected</span>
      </div>

      {amenitiesForType ? (
        Object.entries(amenitiesForType).map(([category, items]) => (
          <section key={category} aria-labelledby={`amenity-${category}`}>
            <h3
              id={`amenity-${category}`}
              className="font-semibold text-primary mb-2"
            >
              {category}
            </h3>

            <div className="flex flex-wrap gap-3">
              {items.map(({ name, icon }) => {
                const selected = (formData.amenities ?? []).includes(name);
                const Icon = ICON_MAP[icon as keyof typeof ICON_MAP] as
                  | LucideIcon
                  | undefined;

                return (
                  <button
                    key={name}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => toggleAmenity(name)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition focus:outline-none focus:ring-2 focus:ring-offset-1 ${
                      selected
                        ? "bg-primary text-white border-primary"
                        : "bg-white hover:bg-muted border-gray-300"
                    }`}
                  >
                    {Icon ? (
                      <Icon
                        className={`w-5 h-5 ${selected ? "text-white" : "text-primary"}`}
                        aria-hidden={true}
                      />
                    ) : null}
                    <span className="text-sm font-medium">{name}</span>
                  </button>
                );
              })}
            </div>
          </section>
        ))
      ) : (
        <p className="text-muted">No amenities defined for {formData.type}</p>
      )}

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => setStep(1)}>
          Back
        </Button>
        <Button onClick={() => setStep(3)}>Next</Button>
      </div>
    </div>
  );
}
