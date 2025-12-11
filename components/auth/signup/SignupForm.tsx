"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "../../../components/ui/button";

import { SignupFormData } from "../SignupSchema";
import SocialSignup from "../SocialSignup";

import BioField from "./BioField";
import ContactFields from "./ContactFields";
import CountryLocationFields from "./CountryLocationFields";
import DOBField from "./DOBField";
import NameFields from "./NameFields";
import PasswordField from "./PasswordField";
import RoleAndNationalIdFields from "./RoleAndNationalIdFields";

import usePhoneFormatter from "../../../hooks/usePhoneFormatter";

interface SignupFormProps {
  redirectTo?: string;
}

export default function SignupForm({
  redirectTo = "/auth/verify/verifyOtp",
}: SignupFormProps) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<SignupFormData>({
    accountId: crypto.randomUUID(),
    email: "",
    firstName: "",
    surname: "",
    phone: "",
    country: "",
    location: "",
    role: "user",
    status: "Pending",
    nationalId: "",
    bio: "",
    metadata: [],
    password: "",
    dateOfBirth: "",
  });

  // Country-aware phone handler
  const { phone, setPhone, getE164 } = usePhoneFormatter(form.country);

  const updateField = (name: string, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    if (name === "phone") {
      setPhone(value);
      updateField("phone", value);
      return;
    }

    updateField(name, value);
  };

  const handleBlur = (
    e: React.FocusEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    updateField(name, value.trim());

    if (name === "phone") {
      setPhone(value.trim());
    }
  };

  // Sanitizes all string fields
  const cleanForm = (obj: Record<string, any>) =>
    Object.fromEntries(
      Object.entries(obj).map(([k, v]) => [
        k,
        typeof v === "string" ? v.trim() : v,
      ])
    );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const API_BASE = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(
        /\/$/,
        ""
      );
      if (!API_BASE) throw new Error("API base URL is not configured");

      const payload = {
        ...cleanForm(form),
        phone: getE164() || null,
      };

      const url = API_BASE.includes("/api")
        ? `${API_BASE}/users/signup`
        : `${API_BASE}/api/users/signup`;

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const text = await res.text();
      const data = text ? JSON.parse(text) : {};

      if (!res.ok) {
        throw new Error(
          data.error || data.message || "Unable to create user account"
        );
      }

      console.info("Created user:", data);

      if (!data.userId) {
        throw new Error("Missing userId in API response");
      }

      // Redirect to OTP page
      window.location.href = `${redirectTo}?userId=${data.userId}`;
    } catch (err: any) {
      console.error("Signup failed:", err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="w-full max-w-xl mx-auto p-6 sm:p-8 rounded-2xl shadow-2xl bg-gradient-to-br from-green-500 via-teal-500 to-blue-600"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}>
      <div className="rounded-2xl border border-white/50 bg-white/80 backdrop-blur-md p-6 shadow-lg space-y-6 flex flex-col">
        <NameFields form={form} onChange={handleChange} onBlur={handleBlur} />

        <ContactFields
          form={{ ...form, phone }}
          onChange={handleChange}
          onBlur={handleBlur}
        />

        <CountryLocationFields
          form={form}
          onChange={handleChange}
          onLocationSelect={(loc) =>
            setForm((prev) => ({ ...prev, location: loc.name.trim() }))
          }
        />

        <RoleAndNationalIdFields
          form={form}
          onChange={handleChange}
          onBlur={handleBlur}
        />

        <BioField form={form} onChange={handleChange} />

        <DOBField form={form} onChange={handleChange} onBlur={handleBlur} />

        <PasswordField
          form={form}
          onChange={handleChange}
          onBlur={handleBlur}
        />

        <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full">
          <Button
            type="submit"
            disabled={loading}
            className="btn-primary w-full sm:w-auto">
            {loading ? "Creating..." : "Create Account"}
          </Button>

          <a
            href="/signin"
            className="btn-outline w-full sm:w-auto text-center">
            Already have an account?
          </a>
        </div>

        <SocialSignup />
      </div>
    </motion.form>
  );
}
