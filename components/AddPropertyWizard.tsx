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

/* ----------------------------------
   API URL SELECTION
   - Uses env var NEXT_PUBLIC_API_VERSION to pick v1 or v2.
   - If NEXT_PUBLIC_API_VERSION is not set, falls back to V2 then V1.
   - Expected env values for version: "v1" or "v2"
----------------------------------- */
function getApiUrl(): string {
  const v = process.env.NEXT_PUBLIC_API_VERSION;
  const v1 = process.env.NEXT_PUBLIC_API_URLV1;
  const v2 = process.env.NEXT_PUBLIC_API_URLV2;

  if (v === "v2" && v2) return v2;
  if (v === "v1" && v1) return v1;

  if (v2) return v2;
  if (v1) return v1;

  return "";
}

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

  // File fields are optional and nullable
  frontElevation: z.any().optional().nullable(),
  southView: z.any().optional().nullable(),
  westView: z.any().optional().nullable(),
  eastView: z.any().optional().nullable(),
  floorPlan: z.any().optional().nullable(),

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
    // file fields left undefined by default
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

  const API_BASE = getApiUrl();

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
      let token: string | null = null;
      try {
        const jwtResponse = await account.createJWT();
        token = jwtResponse?.jwt ?? null;
      } catch (jwtErr) {
        // If Appwrite JWT creation fails, try to fall back to local token (if any)
        console.warn(
          "Failed to create Appwrite JWT, falling back to local token",
          jwtErr
        );
        token =
          typeof window !== "undefined" ? localStorage.getItem("token") : null;
      }

      // ✅ Build FormData
      const fd = new FormData();
      Object.entries(parsed.data).forEach(([key, value]) => {
        if (value === undefined || value === null) return;

        // If value is a File or Blob, append directly
        if (typeof File !== "undefined" && value instanceof File) {
          fd.append(key, value);
        } else if (value instanceof Blob) {
          fd.append(key, value);
        } else if (Array.isArray(value)) {
          value.forEach((v) => fd.append(key, String(v)));
        } else {
          fd.append(key, String(value));
        }
      });

      // Extra safety: ensure agentId present
      if (!fd.get("agentId") && user?.userId) fd.append("agentId", user.userId);

      // ✅ Submit
      const headers: Record<string, string> = {};
      if (token) headers["Authorization"] = `Bearer ${token}`;

      const res = await fetch(`${API_BASE}/api/properties/add`, {
        method: "POST",
        headers,
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

      // Optionally reset wizard or navigate to newly created property
      setStep(1);
      setFormData((prev) => ({
        ...prev,
        title: "",
        price: "",
        location: "",
        address: "",
        rooms: 0,
        description: "",
        amenities: [],
        frontElevation: null,
        southView: null,
        westView: null,
        eastView: null,
        floorPlan: null,
      }));
    } catch (err: any) {
      setError(err?.message || "An unexpected error occurred");
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
