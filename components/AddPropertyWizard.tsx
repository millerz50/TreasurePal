"use client";

import { Separator } from "@/components/ui/Separator";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { z } from "zod";

import AmenitiesStep from "./steps/AmenitiesStep";
import BasicInfoStep from "./steps/BasicInfoStep";
import LocationStep from "./steps/LocationStep";
import PropertyImagesStep from "./steps/PropertyImagesStep";
import ReviewStep from "./steps/ReviewStep";

import { account } from "@/lib/appwrite"; // Appwrite client
import { hasRole } from "@/lib/auth/role";

// ✅ Step type
export type Step = 1 | 2 | 3 | 4 | 5;

// ✅ Zod schema
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

  // Marketing fields
  website: z.string().url().optional(),
  flyers: z.string().optional(),
  hireDesigner: z.boolean().optional(),
  subscriptionPlan: z.string().optional(),
  whatsappGroup: z.string().optional(),
  ads: z.string().optional(),

  depositOption: z.enum(["none", "required"]).default("none"),
  depositPercentage: z.union([z.string(), z.number()]).optional(),
});

export type PropertyFormValues = z.infer<typeof PropertySchema>;

export default function AddPropertyWizard() {
  const { user, loading: authLoading } = useAuth();

  const [step, setStep] = useState<Step>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<PropertyFormValues>({
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
    depositOption: "none",
    depositPercentage: "",
  });

  // ✅ Always inject agentId from authenticated user
  useEffect(() => {
    if (user?.userId) {
      setFormData((prev) => ({
        ...prev,
        agentId: user.userId,
      }));
    }
  }, [user?.userId]);

  const API_BASE = process.env.NEXT_PUBLIC_API_URL;

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      if (!API_BASE) throw new Error("API base URL is not configured");
      if (!user || !hasRole(user, "agent"))
        throw new Error("Only agents can add properties.");

      // ✅ Validate data
      const parsed = PropertySchema.safeParse(formData);
      if (!parsed.success)
        throw new Error(parsed.error.errors[0]?.message || "Validation failed");

      // ✅ Get fresh JWT from Appwrite (avoid expired token / missing token)
      const jwtResponse = await account.createJWT();
      const token = jwtResponse.jwt;

      // ✅ Build FormData
      const fd = new FormData();
      Object.entries(parsed.data).forEach(([key, value]) => {
        if (value === undefined || value === null) return;

        if (value instanceof File) {
          fd.append(key, value);
        } else if (Array.isArray(value)) {
          value.forEach((v) => fd.append(key, String(v)));
        } else {
          fd.append(key, String(value));
        }
      });

      // Extra safety
      if (!fd.get("agentId")) fd.append("agentId", user.userId);

      // ✅ Submit
      const res = await fetch(`${API_BASE}/api/properties/add`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: fd,
      });

      if (!res.ok) {
        let message = `Failed to submit property (${res.status})`;
        try {
          const json = await res.json();
          message = json?.error || json?.message || message;
        } catch {
          const text = await res.text();
          if (text) message = text;
        }
        throw new Error(message);
      }

      const result = await res.json();
      console.log("✅ Property submitted successfully:", result);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
      console.error(err);
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

  if (authLoading) {
    // ✅ Wait until AuthContext is loaded
    return (
      <div className="flex justify-center items-center p-6 text-gray-500">
        Loading...
      </div>
    );
  }

  if (!user) {
    // ✅ If no user is authenticated
    return (
      <div className="p-6 text-center text-red-500">
        You must be logged in to add a property.
      </div>
    );
  }

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
