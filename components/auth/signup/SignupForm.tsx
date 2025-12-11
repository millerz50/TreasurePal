"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "../../../components/ui/button";

import { SignupFormData } from "../SignupSchema";
import SocialSignup from "../SocialSignup";

// Child components
import BioField from "./BioField";
import ContactFields from "./ContactFields";
import CountryLocationFields from "./CountryLocationFields";
import DOBField from "./DOBField";
import NameFields from "./NameFields";
import PasswordField from "./PasswordField";
import RoleAndNationalIdFields from "./RoleAndNationalIdFields";

// NEW: phone formatting hook
import usePhoneFormatter from "../../../hooks/usePhoneFormatter";

interface SignupFormProps {
  redirectTo?: string;
}

export default function SignupForm({
  redirectTo = "/signin",
}: SignupFormProps) {
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

  const [loading, setLoading] = useState(false);
  const { phone, setPhone, getE164 } = usePhoneFormatter(form.country);

  /**
   * Keep raw input while typing. Do NOT trim here.
   */
  function onChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    const { name, value } = e.target;

    if (name === "phone") {
      // keep phone formatting hook in sync (do not trim)
      setPhone(value);
      // also keep form.phone in sync if you want
      setForm((prev) => ({ ...prev, phone: value }));
      return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  }

  /**
   * Optional: trim a single field on blur (so users can still type spaces,
   * but we remove accidental leading/trailing whitespace when they leave the field).
   */
  function onFieldBlur(
    e: React.FocusEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    const { name, value } = e.target;
    // only trim strings
    setForm((prev) => ({
      ...prev,
      [name]: typeof value === "string" ? value.trim() : value,
    }));
    if (name === "phone") {
      // keep phone hook in sync with trimmed phone if desired
      setPhone(value.trim());
    }
  }

  function trimAll(obj: Record<string, any>) {
    return Object.fromEntries(
      Object.entries(obj).map(([key, val]) => [
        key,
        typeof val === "string" ? val.trim() : val,
      ])
    );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    try {
      const API_BASE = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(
        /\/$/,
        ""
      );
      if (!API_BASE) throw new Error("API base URL is not configured");

      // Trim everything once before sending
      const cleanedForm = trimAll(form);
      const payload = { ...cleanedForm, phone: getE164()?.trim() || null };

      const url = API_BASE.endsWith("/api")
        ? `${API_BASE}/users/signup`
        : `${API_BASE}/api/users/signup`;

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const text = await res.text();
      if (!res.ok) {
        let message = text;
        try {
          const json = JSON.parse(text);
          message = json.error ?? json.message ?? JSON.stringify(json);
        } catch {}
        throw new Error(message || "Signup failed");
      }

      const user = JSON.parse(text);
      console.info("Created user:", user);
      window.location.href = redirectTo;
    } catch (error) {
      console.error("Signup failed:", error);
      alert("Signup failed: " + (error as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="w-full max-w-xl mx-auto p-6 sm:p-8 rounded-2xl shadow-2xl bg-gradient-to-br from-green-500 via-teal-500 to-blue-600"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}>
      <div className="rounded-2xl border border-white/50 bg-white/80 backdrop-blur-md p-6 shadow-lg space-y-6 flex flex-col">
        <NameFields form={form} onChange={onChange} onBlur={onFieldBlur} />
        <ContactFields
          form={{ ...form, phone }}
          onChange={onChange}
          onBlur={onFieldBlur}
        />
        <CountryLocationFields
          form={form}
          onChange={onChange}
          onLocationSelect={(loc) =>
            setForm((prev) => ({ ...prev, location: loc.name.trim() }))
          }
        />
        <RoleAndNationalIdFields
          form={form}
          onChange={onChange}
          onBlur={onFieldBlur}
        />
        {/* BioField receives the same onChange signature and will preserve spaces */}
        <BioField form={form} onChange={onChange} />
        <DOBField form={form} onChange={onChange} onBlur={onFieldBlur} />
        <PasswordField form={form} onChange={onChange} onBlur={onFieldBlur} />

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
