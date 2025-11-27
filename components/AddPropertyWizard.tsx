"use client";

import { Separator } from "@/components/ui/Separator";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import AmenitiesStep from "./steps/AmenitiesStep";
import BasicInfoStep from "./steps/BasicInfoStep";
import LocationStep from "./steps/LocationStep";
import PropertyImagesStep from "./steps/PropertyImagesStep";

import ReviewStep from "./steps/ReviewStep";

export type Step = 1 | 2 | 3 | 4 | 5;

export interface FormData {
  title: string;
  price: string;
  location: string;
  address: string;
  rooms: number;
  description: string;
  type: string;
  status: string;
  country: string;
  amenities: string[];
  locationLat: number;
  locationLng: number;
  userId: string;
  frontElevation?: File | null;
  southView?: File | null;
  westView?: File | null;
  eastView?: File | null;
  floorPlan?: File | null;
}

export default function AddPropertyWizard() {
  const { user } = useAuth();
  const [step, setStep] = useState<Step>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<FormData>({
    title: "",
    price: "",
    location: "",
    address: "",
    rooms: 0,
    description: "",
    type: "House",
    status: "Available",
    country: "Zimbabwe",
    amenities: [],
    locationLat: -17.9306,
    locationLng: 31.3306,
    userId: "",
  });

  useEffect(() => {
    if (user?.userId) {
      setFormData((prev) => ({ ...prev, userId: user.userId }));
    }
  }, [user]);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      if (user?.role !== "agent") {
        throw new Error("Only agents can add properties.");
      }

      const payload = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value instanceof File) {
          payload.append(key, value);
        } else if (value !== undefined && value !== null) {
          payload.append(key, String(value));
        }
      });

      // ✅ Primary production API
      let res = await fetch(
        "https://www.treasureprops.com/api/properties/add",
        {
          method: "POST",
          body: payload,
        }
      );

      // ✅ Fallback to Zimbabwe domain if global fails
      if (!res.ok) {
        console.error("Primary API failed, trying fallback…");
        res = await fetch(
          "https://www.treasureprops.co.zw/api/properties/add",
          {
            method: "POST",
            body: payload,
          }
        );
      }

      if (!res.ok) throw new Error("Failed to submit property");
      console.log("✅ Property submitted!");
    } catch (err) {
      if (err instanceof Error) setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const renderSteps = () => (
    <ul className="steps steps-horizontal w-full text-sm sm:text-base">
      <li className={`step ${step >= 1 ? "step-primary" : ""}`}>Basic Info</li>
      <li className={`step ${step >= 2 ? "step-primary" : ""}`}>Amenities</li>
      <li className={`step ${step >= 3 ? "step-primary" : ""}`}>Location</li>
      <li className={`step ${step >= 4 ? "step-primary" : ""}`}>Images</li>
      <li className={`step ${step >= 5 ? "step-primary" : ""}`}>Review</li>
    </ul>
  );

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 bg-background rounded-xl shadow-md space-y-6">
      {renderSteps()}
      <Separator />

      {step === 1 && (
        <BasicInfoStep
          formData={formData}
          setFormData={setFormData}
          setStep={setStep}
          error={error}
          setError={setError}
        />
      )}
      {step === 2 && (
        <AmenitiesStep
          formData={formData}
          setFormData={setFormData}
          setStep={setStep}
        />
      )}
      {step === 3 && (
        <LocationStep
          formData={formData}
          setFormData={setFormData}
          setStep={setStep}
        />
      )}
      {step === 4 && (
        <PropertyImagesStep
          formData={formData}
          setFormData={setFormData}
          setStep={setStep}
        />
      )}
      {step === 5 && (
        <ReviewStep
          formData={formData}
          setStep={setStep}
          handleSubmit={handleSubmit}
          loading={loading}
          error={error}
        />
      )}
    </div>
  );
}
