// src/app/signup/SignupForm.tsx
"use client";

import { account } from "@/lib/appwrite";
import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "../../../components/ui/button";

import usePhoneFormatter from "../../../hooks/usePhoneFormatter";
import { SignupFormData } from "../SignupSchema";

export default function SignupForm({ redirectTo = "/auth/verify/verifyOtp" }) {
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

  const { phone, setPhone, getE164 } = usePhoneFormatter(form.country);

  const updateField = (name: string, value: string) =>
    setForm((f) => ({ ...f, [name]: value }));

  const cleanForm = (obj: Record<string, any>) =>
    Object.fromEntries(
      Object.entries(obj).map(([k, v]) => [
        k,
        typeof v === "string" ? v.trim() : v,
      ])
    );

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formattedPhone = getE164() || "";

      const payload: SignupFormData = {
        ...(cleanForm(form) as SignupFormData),
        phone: formattedPhone,
      };

      // 1️⃣ Create Appwrite user
      const user = await account.create(
        payload.accountId,
        payload.email,
        payload.password,
        `${payload.firstName} ${payload.surname}`
      );

      // 2️⃣ Send email verification
      await account.createVerification(
        `${window.location.origin}${redirectTo}`
      );

      // 3️⃣ Auto-login
      await account.createEmailPasswordSession(payload.email, payload.password);

      // 4️⃣ Create profile in backend
      await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      // 5️⃣ Redirect
      window.location.href = `${redirectTo}?userId=${user.$id}`;
    } catch (err: any) {
      alert(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="w-full max-w-xl mx-auto p-6">
      {/* your fields... */}
      <Button disabled={loading}>
        {loading ? "Creating..." : "Create Account"}
      </Button>
    </motion.form>
  );
}
