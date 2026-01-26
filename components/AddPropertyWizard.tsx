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

import { account } from "@/lib/appwrite";
import { hasRole } from "@/lib/auth/role";

/* ----------------------------------
   Step type
----------------------------------- */
export type Step = 1 | 2 | 3 | 4 | 5;

/* ----------------------------------
   Schema
----------------------------------- */
export const PropertySchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  price: z
    .union([z.string(), z.number()])
    .refine((val) => Number(val) > 0, {
      message: "Price must be greater than 0",
    }),
  type: z.string().min(1, "Property type is required"),
  subType: z.string().min(1, "Property subtype is required"),
  status: z.string(),
  country: z.string(),
  location: z.string().min(2, "Location is required"),
  address: z.string().min(5, "Address must be more detailed"),
  rooms: z.number().min(0),
  description: z.string().min(10),
  amenities: z.array(z.string()).optional(),
  locationLat: z.number().nullable().optional(),
  locationLng: z.number().nullable().optional(),
  agentId: z.string().min(1, "Agent ID required"),
  depositAvailable: z.boolean().default(false),
  depositOption: z.enum(["none", "required"]).default("none"),
  depositPercentage: z.union([z.string(), z.number()]).optional(),
  frontElevation: z.instanceof(File).nullable().optional(),
  southView: z.instanceof(File).nullable().optional(),
  westView: z.instanceof(File).nullable().optional(),
  eastView: z.instanceof(File).nullable().optional(),
  floorPlan: z.instanceof(File).nullable().optional(),
});

export type PropertyFormValues = z.infer<typeof PropertySchema>;

/* ----------------------------------
   API env
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
    type: "Residential",
    subType: "House",
    status: "Available",
    country: "Zimbabwe",
    location: "",
    address: "",
    rooms: 0,
    description: "",
    amenities: [],
    locationLat: null,
    locationLng: null,
    agentId: "",
    depositAvailable: false,
    depositOption: "none",
    depositPercentage: "",
  });

  /* ----------------------------------
     Inject agentId
  ----------------------------------- */
  useEffect(() => {
    if (user?.userId) {
      setFormData((prev) => ({ ...prev, agentId: user.userId }));
    }
  }, [user?.userId]);

  /* ----------------------------------
     Submit
  ----------------------------------- */
  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      if (!API_BASE) throw new Error("API base URL is not configured");
      if (!user || !hasRole(user, "agent"))
        throw new Error("Only agents can add properties.");

      const parsed = PropertySchema.safeParse(formData);
      if (!parsed.success) throw new Error(parsed.error.errors[0]?.message);

      const jwt = await account.createJWT();
      const fd = new FormData();

      Object.entries(parsed.data).forEach(([key, value]) => {
        if (value === undefined || value === null) return;
        if (value instanceof File) fd.append(key, value);
        else if (Array.isArray(value))
          value.forEach((v) => fd.append(key, String(v)));
        else fd.append(key, String(value));
      });

      const res = await fetch(`${API_BASE}/api/${API_VERSION}/properties/add`, {
        method: "POST",
        headers: { Authorization: `Bearer ${jwt.jwt}` },
        body: fd,
      });

      if (!res.ok)
        throw new Error((await res.text()) || "Failed to submit property");

      await res.json();

      if (window.confirm("Property created successfully! Add another?")) {
        setStep(1);
        setFormData({
          title: "",
          price: "",
          type: "Residential",
          subType: "House",
          status: "Available",
          country: "Zimbabwe",
          location: "",
          address: "",
          rooms: 0,
          description: "",
          amenities: [],
          locationLat: null,
          locationLng: null,
          agentId: user.userId,
          depositAvailable: false,
          depositOption: "none",
          depositPercentage: "",
        });
      }
    } catch (err: any) {
      setError(err.message || "Unexpected error");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /* ----------------------------------
     Guards
  ----------------------------------- */
  if (authLoading) return <div className="p-6 text-gray-500">Loading...</div>;
  if (!user)
    return (
      <div className="p-6 text-center text-red-500">
        You must be logged in to add a property.
      </div>
    );

  /* ----------------------------------
     Render
  ----------------------------------- */
  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 bg-background rounded-xl shadow-md space-y-6">
      <ul className="steps steps-horizontal w-full text-sm sm:text-base">
        <li className={`step ${step >= 1 ? "step-primary" : ""}`}>
          Basic Info
        </li>
        <li className={`step ${step >= 2 ? "step-primary" : ""}`}>Amenities</li>
        <li className={`step ${step >= 3 ? "step-primary" : ""}`}>Location</li>
        <li className={`step ${step >= 4 ? "step-primary" : ""}`}>Images</li>
        <li className={`step ${step >= 5 ? "step-primary" : ""}`}>Review</li>
      </ul>

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
