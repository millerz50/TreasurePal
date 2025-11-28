"use client";

import MapPicker from "@/components/dashboard/MapPicker";
import { Button } from "@/components/ui/button";
import type { Dispatch, SetStateAction } from "react";
import React from "react";
import type { PropertyFormValues, Step } from "../AddPropertyWizard";

interface Props {
  formData: PropertyFormValues;
  setFormData: Dispatch<SetStateAction<PropertyFormValues>>;
  setStep: Dispatch<SetStateAction<Step>>;
}

const LocationStep: React.FC<Props> = ({ formData, setFormData, setStep }) => {
  return (
    <div className="space-y-4">
      <div className="w-full h-64 rounded-lg border overflow-hidden">
        <MapPicker
          coordinates={[formData.locationLat, formData.locationLng]}
          setCoordinates={(coords) =>
            setFormData((prev) => ({
              ...prev,
              locationLat: coords[0],
              locationLng: coords[1],
            }))
          }
          setAddress={(address) =>
            setFormData((prev) => ({
              ...prev,
              address,
            }))
          }
        />
      </div>
      <div className="flex justify-between">
        <Button variant="outline" onClick={() => setStep(2)}>
          Back
        </Button>
        <Button onClick={() => setStep(4)}>Next</Button>
      </div>
    </div>
  );
};

export default LocationStep;
