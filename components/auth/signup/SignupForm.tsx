"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "../../../components/ui/button";

import { SignupFormData } from "../SignupSchema";
import SocialSignup from "../SocialSignup";

// Child components
import AvatarField from "./AvatarField";
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
    avatarUrl: "",
    dateOfBirth: "",
  });

  const [loading, setLoading] = useState(false);

  // ⭐ Use phone hook, dynamically responds to selected country
  const { phone, setPhone, getE164 } = usePhoneFormatter(form.country);

  function onChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    const { name, value } = e.target;

    if (name === "phone") {
      setPhone(value);
      return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
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

      // ✅ Use hook to ensure valid E.164 or undefined
      const payload = { ...form, phone: getE164() };

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
      className="w-full sm:max-w-xl mx-auto p-6 sm:p-8 rounded-2xl shadow-2xl bg-gradient-to-br from-green-500 via-teal-500 to-blue-600"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}>
      <div className="rounded-2xl border border-white/50 bg-white/80 backdrop-blur-md p-6 shadow-lg space-y-6">
        <NameFields form={form} onChange={onChange} />

        {/* ⭐ Pass phone from hook */}
        <ContactFields form={{ ...form, phone }} onChange={onChange} />

        <CountryLocationFields
          form={form}
          onChange={onChange}
          onLocationSelect={(loc) =>
            setForm((prev) => ({ ...prev, location: loc.name }))
          }
        />

        <RoleAndNationalIdFields form={form} onChange={onChange} />
        <BioField form={form} onChange={onChange} />
        <AvatarField form={form} onChange={onChange} />
        <DOBField form={form} onChange={onChange} />
        <PasswordField form={form} onChange={onChange} />

        <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
          <Button type="submit" disabled={loading} className="btn-primary">
            {loading ? "Creating..." : "Create Account"}
          </Button>
          <a href="/signin" className="btn-outline">
            Already have an account?
          </a>
        </div>

        <SocialSignup />
      </div>
    </motion.form>
  );
}
