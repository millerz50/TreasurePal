"use client";

import { Separator } from "@/components/ui/Separator";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { z } from "zod";
import AmenitiesStep from "./steps/AmenitiesStep";
import BasicInfoStep from "./steps/BasicInfoStep";
import LocationStep from "./steps/LocationStep";
import MarketingStep from "./steps/MarketingStep"; // 👈 new import
import PropertyImagesStep from "./steps/PropertyImagesStep";
import ReviewStep from "./steps/ReviewStep";

export type Step = 1 | 2 | 3 | 4 | 5 | 6;

// ✅ Zod schema for validation
export const PropertySchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  price: z.union([z.string(), z.number()]).refine((val) => Number(val) > 0, {
    message: "Price must be greater than 0",
  }),
  location: z.string().min(2, "Location is required"),
  address: z.string().min(5, "Address must be more detailed"),
  rooms: z.number().min(1, "At least 1 room required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  type: z.string(),
  status: z.string(),
  country: z.string(),
  amenities: z.array(z.string()).optional(),
  locationLat: z.number().nullable().optional(),
  locationLng: z.number().nullable().optional(),
  agentId: z.string().min(1, "Agent ID required"),
  depositAvailable: z.boolean().default(false),
  frontElevation: z.instanceof(File).nullable().optional(),
  southView: z.instanceof(File).nullable().optional(),
  westView: z.instanceof(File).nullable().optional(),
  eastView: z.instanceof(File).nullable().optional(),
  floorPlan: z.instanceof(File).nullable().optional(),

  // 👇 Marketing fields
  website: z.string().url().optional(),
  flyers: z.string().optional(),
  hireDesigner: z.boolean().optional(),
  subscriptionPlan: z.string().optional(),
  whatsappGroup: z.string().optional(),
  ads: z.string().optional(),
});

export type PropertyFormValues = z.infer<typeof PropertySchema>;

export default function AddPropertyWizard() {
  const { user } = useAuth();
  const [step, setStep] = useState<Step>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<
    PropertyFormValues & {
      depositOption?: "none" | "required";
      depositPercentage?: string | number;
    }
  >({
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
    locationLat: null,
    locationLng: null,
    agentId: "",
    depositAvailable: false,

    // 👇 new deposit fields
    depositOption: "none",
    depositPercentage: "",

    // marketing defaults
    website: "",
    flyers: "",
    hireDesigner: false,
    subscriptionPlan: "",
    whatsappGroup: "",
    ads: "",
  });

  useEffect(() => {
    if (user?.userId) {
      setFormData((prev) => ({ ...prev, agentId: user.userId }));
    }
  }, [user]);

  const API_BASE = process.env.NEXT_PUBLIC_API_URL;

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      const parsed = PropertySchema.safeParse(formData);
      if (!parsed.success) {
        const firstError =
          parsed.error.errors[0]?.message || "Validation failed";
        throw new Error(firstError);
      }

      if (user?.role !== "agent") {
        throw new Error("Only agents can add properties.");
      }

      const fd = new FormData();
      Object.entries(parsed.data).forEach(([key, value]) => {
        if (value === undefined || value === null) return;

        if (value instanceof File) {
          fd.append(key, value);
          return;
        }

        if (Array.isArray(value)) {
          if (value.length === 0) return;
          value.forEach((v) => fd.append(key, String(v)));
          return;
        }

        fd.append(key, String(value));
      });

      const token = localStorage.getItem("token");
      if (!token || token.split(".").length !== 3) {
        throw new Error("Invalid or missing JWT token");
      }

      const res = await fetch(`${API_BASE}/api/properties/add`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });

      if (!res.ok) {
        let msg = `Failed to submit property (${res.status})`;
        try {
          const json = await res.json();
          msg = json?.error || json?.message || msg;
          console.error("❌ API error response:", json);
        } catch {
          const text = await res.text();
          if (text) msg = text;
          console.error("❌ API error text:", text);
        }
        throw new Error(msg);
      }

      const result = await res.json();
      if (!result || Object.keys(result).length === 0) {
        console.warn("⚠️ API returned empty data");
        return;
      }

      console.warn("✅ Property submitted!", result);
    } catch (err) {
      if (err instanceof Error) {
        console.error("❌ Property submission failed:", err.message);
        setError(err.message);
      } else {
        console.error("❌ Property submission failed (unknown):", err);
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
      console.warn("Submission finished, loading set to false");
    }
  };

  const renderSteps = () => (
    <ul className="steps steps-horizontal w-full text-sm sm:text-base">
      <li className={`step ${step >= 1 ? "step-primary" : ""}`}>Basic Info</li>
      <li className={`step ${step >= 2 ? "step-primary" : ""}`}>Amenities</li>
      <li className={`step ${step >= 3 ? "step-primary" : ""}`}>Location</li>
      <li className={`step ${step >= 4 ? "step-primary" : ""}`}>Images</li>
      <li className={`step ${step >= 5 ? "step-primary" : ""}`}>Marketing</li>
      <li className={`step ${step >= 6 ? "step-primary" : ""}`}>Review</li>
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
        <MarketingStep
          formData={formData}
          setFormData={setFormData}
          setStep={setStep}
        />
      )}
      {step === 6 && (
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
