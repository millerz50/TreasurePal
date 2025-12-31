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

interface SignupFormProps {
  redirectTo?: string;
}

export default function SignupForm({
  redirectTo = "/auth/signin",
}: SignupFormProps) {
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState<File | null>(null);

  const [form, setForm] = useState<SignupFormData>({
    accountid: crypto.randomUUID(),
    email: "",
    firstName: "",
    surname: "",
    phone: undefined,
    country: "",
    location: "",
    roles: ["user"], // 🔒 FIXED
    status: "Pending",
    bio: undefined,
    password: "",
    dateOfBirth: undefined,
  });

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

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image");
      return;
    }
    setAvatar(file);
  };

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = cleanForm(form);
      payload.email = payload.email.toLowerCase();
      payload.phone = getE164() ?? undefined;

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
        throw new Error(body?.message || "Signup failed");
      }

      if (avatar) {
        const avatarForm = new FormData();
        avatarForm.append("file", avatar);
        avatarForm.append("accountid", payload.accountid);

        const uploadRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/storage/upload`,
          {
            method: "POST",
            body: avatarForm,
          }
        );
        if (!uploadRes.ok) {
          console.warn("Avatar upload failed");
        }
      }

      window.location.href = `${redirectTo}?email=${encodeURIComponent(
        payload.email
      )}`;
    } catch (err: any) {
      console.error("Signup error:", err);
      alert(err?.message ?? "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      noValidate
      autoComplete="off"
      className="w-full max-w-xl mx-auto p-6 sm:p-8 rounded-2xl shadow-2xl
                 bg-gradient-to-br from-green-500 via-teal-500 to-blue-600"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}>
      <div
        className="rounded-2xl border border-white/50 bg-white/80 backdrop-blur-md
                      p-6 shadow-lg space-y-6 flex flex-col">
        <div className="flex flex-col items-center gap-3">
          <label className="font-medium text-sm">Profile Photo</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="text-sm"
          />
        </div>

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
