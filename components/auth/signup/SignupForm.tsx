"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "../../../components/ui/button";
import { SignupFormData } from "../SignupSchema";

// child components imports...

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
      const payload = { ...form };
      console.log("Submitting form:", payload);

      // TODO: call your signup API here
      window.location.href = redirectTo;
    } catch (error) {
      console.error("Signup failed:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.form onSubmit={handleSubmit}>
      {/* your form fields */}
      <Button type="submit" disabled={loading}>
        {loading ? "Creating..." : "Create Account"}
      </Button>
    </motion.form>
  );
}
