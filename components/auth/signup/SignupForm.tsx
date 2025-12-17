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

interface SignupFormProps {
  redirectTo?: string;
}

export default function SignupForm({
  redirectTo = "/auth/signin",
}: SignupFormProps) {
  const [loading, setLoading] = useState(false);

  /* ----------------------------------
     FORM STATE (MATCHES ZOD SCHEMA)
  ----------------------------------- */
  const [form, setForm] = useState<SignupFormData>({
    accountId:
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random()}`,

    email: "",
    firstName: "",
    surname: "",

    phone: undefined,
    country: "",
    location: "",

    role: "user",
    status: "Pending",

    nationalId: undefined,
    bio: undefined,
    metadata: [],

    password: "",

    dateOfBirth: undefined,

    // 🪙 Coins system (important)
    coins: 0,
    lastLoginReward: undefined,
  });

  /* ----------------------------------
     PHONE FORMATTER
  ----------------------------------- */
  const { phone, setPhone, getE164 } = usePhoneFormatter(form.country);

  const updateField = (name: string, value: any) =>
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

    updateField(name, trimmed === "" ? undefined : trimmed);
    if (name === "phone") setPhone(trimmed);
  };

  /* ----------------------------------
     CLEAN PAYLOAD (NO EMPTY STRINGS)
  ----------------------------------- */
  const cleanForm = (obj: Record<string, any>) =>
    Object.fromEntries(
      Object.entries(obj)
        .map(([k, v]) => {
          if (typeof v === "string") {
            const trimmed = v.trim();
            return [k, trimmed === "" ? undefined : trimmed];
          }
          return [k, v];
        })
        .filter(([, v]) => v !== undefined)
    );

  /* ----------------------------------
     SUBMIT
  ----------------------------------- */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = cleanForm(form);

      payload.email = payload.email.toLowerCase();

      // Convert phone → E.164
      const e164 = getE164();
      payload.phone = e164 ?? undefined;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/signup`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        const message =
          body?.message ||
          body?.error ||
          JSON.stringify(body) ||
          "Signup failed";
        throw new Error(message);
      }

      const emailParam = encodeURIComponent(payload.email);
      window.location.href = `${redirectTo}?email=${emailParam}`;
    } catch (err: any) {
      console.error("Signup error:", err);
      alert(err?.message ?? "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /* ----------------------------------
     UI
  ----------------------------------- */
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
            href="/auth/signin"
            className="btn-outline w-full sm:w-auto text-center">
            Already have an account?
          </a>
        </div>

        <SocialSignup />
      </div>
    </motion.form>
  );
}
