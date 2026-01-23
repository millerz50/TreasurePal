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

/* ----------------------------------
   Step type and schema
----------------------------------- */
export type Step = 1 | 2 | 3 | 4 | 5;

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

  depositOption: z.enum(["none", "required"]).default("none"),
  depositPercentage: z.union([z.string(), z.number()]).optional(),
});

export type PropertyFormValues = z.infer<typeof PropertySchema>;

/* ----------------------------------
   API versioning env
----------------------------------- */
const API_VERSION = (process.env.NEXT_PUBLIC_API_VERSION || "v1").trim();
const API_BASE_V1 =
  process.env.NEXT_PUBLIC_API_URLV1?.replace(/\/+$/, "") ?? "";
const API_BASE_V2 =
  process.env.NEXT_PUBLIC_API_URLV2?.replace(/\/+$/, "") ?? "";
const API_BASE =
  API_VERSION === "v2" && API_BASE_V2 ? API_BASE_V2 : API_BASE_V1;

/* ----------------------------------
   Component
----------------------------------- */
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

  // Inject agentId from authenticated user
  useEffect(() => {
    if (user?.userId) {
      setFormData((prev) => ({
        ...prev,
        agentId: user.userId,
      }));
    }
  }, [user?.userId]);

  // Debug info (non-production)
  if (process.env.NODE_ENV !== "production") {
    console.debug("AddPropertyWizard env", { API_VERSION, API_BASE });
  }

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      if (!API_BASE) throw new Error("API base URL is not configured");
      if (!user || !hasRole(user, "agent"))
        throw new Error("Only agents can add properties.");

      // Validate data
      const parsed = PropertySchema.safeParse(formData);
      if (!parsed.success)
        throw new Error(parsed.error.errors[0]?.message || "Validation failed");

      // Get fresh JWT from Appwrite
      let token: string | null = null;
      try {
        const jwtResponse = await account.createJWT();
        token = jwtResponse?.jwt ?? null;
      } catch (err) {
        console.warn("Failed to create JWT from Appwrite", err);
        token = null;
      }

      if (!token)
        throw new Error(
          "Authentication token unavailable. Please sign in again.",
        );

      // Build FormData
      const fd = new FormData();

      const appendValue = (key: string, value: any) => {
        if (value === undefined || value === null) return;
        if (typeof File !== "undefined" && value instanceof File) {
          fd.append(key, value);
          return;
        }
        if (Array.isArray(value)) {
          value.forEach((v) => fd.append(key, String(v)));
          return;
        }
        if (typeof value === "boolean" || typeof value === "number") {
          fd.append(key, String(value));
          return;
        }
        fd.append(key, String(value));
      };

      Object.entries(parsed.data).forEach(([key, value]) => {
        appendValue(key, value);
      });

      if (!fd.get("agentId") && user?.userId) fd.append("agentId", user.userId);

      const endpoint = `${API_BASE}/api/${API_VERSION}/properties/add`;

      const res = await fetch(endpoint, {
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

      // Show confirmation dialog
      if (
        window.confirm("Property created successfully! Add another property?")
      ) {
        // Reset form and stay on step 1
        setStep(1);
        setFormData({
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
          agentId: user?.userId || "",
          depositAvailable: false,
          depositOption: "none",
          depositPercentage: "",
        });
      } else {
        // Optional: redirect or close wizard
        console.log("User chose not to add another property.");
      }
    } catch (err: any) {
      setError(err?.message || "An unexpected error occurred");
      console.error("AddPropertyWizard submit error:", err);
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
    return (
      <div className="flex justify-center items-center p-6 text-gray-500">
        Loading...
      </div>
    );
  }

  if (!user) {
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
