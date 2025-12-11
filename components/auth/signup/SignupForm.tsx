// app/(auth)/signup/SignupForm.tsx
"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "../../../components/ui/button";

import usePhoneFormatter from "../../../hooks/usePhoneFormatter";
import { SignupFormData } from "../SignupSchema";
import SocialSignup from "../SocialSignup";
import BioField from "./BioField";
import ContactFields from "./ContactFields";
import CountryLocationFields from "./CountryLocationFields";
import DOBField from "./DOBField";
import NameFields from "./NameFields";
import PasswordField from "./PasswordField";
import RoleAndNationalIdFields from "./RoleAndNationalIdFields";

import { account } from "@/lib/appwrite";

interface SignupFormProps {
  redirectTo?: string;
}

export default function SignupForm({
  redirectTo = "/auth/verify/verifyOtp",
}: SignupFormProps) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<SignupFormData>({
    accountId:
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random()}`,
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

  // phone formatter hook (assumes hook returns { phone, setPhone, getE164 })
  const { phone, setPhone, getE164 } = usePhoneFormatter(form.country);

  const updateField = (name: string, value: string) =>
    setForm((prev) => ({ ...prev, [name]: value }));

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
    const trimmed = value.trim();
    updateField(name, trimmed);
    if (name === "phone") setPhone(trimmed);
  };

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
      const formattedPhone = getE164() || "";

      const payload: SignupFormData = {
        ...(cleanForm(form) as SignupFormData),
        phone: formattedPhone,
      };

      payload.email = payload.email.toLowerCase().trim();

      // 1) Create Appwrite user on client
      const user = await account.create(
        payload.accountId,
        payload.email,
        payload.password,
        `${payload.firstName} ${payload.surname}`
      );

      // 2) Send verification email on client
      await account.createVerification(
        `${window.location.origin}${redirectTo}`
      );

      // 3) Create session on client
      await account.createEmailPasswordSession(payload.email, payload.password);

      // 4) Call server to create profile row (server uses API key)
      //    If you don't have a server endpoint, remove this block.
      try {
        const res = await fetch("/api/signupUser", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          const err = await res.json().catch(() => ({ error: "Server error" }));
          console.warn("Server profile creation failed:", err);
          // continue — user account was created in Appwrite; surface server error if needed
        }
      } catch (serverErr) {
        console.warn("Failed to call /api/signupUser:", serverErr);
      }

      // 5) Redirect with user ID
      window.location.href = `${redirectTo}?userId=${user.$id}`;
    } catch (err: any) {
      console.error("Signup failed:", err);
      alert(err?.message || "Signup failed.");
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
