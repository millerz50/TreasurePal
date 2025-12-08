// components/auth/signup/SignupForm.tsx
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

// ✅ Declare props type
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

  function onChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    try {
      const API_BASE = process.env.NEXT_PUBLIC_API_URL;
      const payload = { ...form };

      const res = await fetch(`${API_BASE}/api/users/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Signup failed");
      }

      const user = await res.json();
      console.info("Created user:", user);

      // ✅ Redirect only after success
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
      className="w-full sm:max-w-xl mx-auto p-6 sm:p-8 rounded-2xl 
                 shadow-2xl bg-gradient-to-br from-green-500 via-teal-500 to-blue-600"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}>
      <div className="rounded-2xl border border-white/50 bg-white/80 backdrop-blur-md p-6 shadow-lg space-y-6">
        <NameFields form={form} onChange={onChange} />
        <ContactFields form={form} onChange={onChange} />
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

        {/* Submit */}
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
