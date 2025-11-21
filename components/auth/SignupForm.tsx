"use client";

import { motion } from "framer-motion";
import React, { useState } from "react";
import { toast } from "sonner";
import { v4 as uuid } from "uuid";
import { z } from "zod";
import { Button } from "../../components/ui/button";

import AvatarField from "./user/fields/AvatarField";
import BioField from "./user/fields/BioField";
import EmailField from "./user/fields/EmailField";
import NameField from "./user/fields/NameField";
import NationalIdField from "./user/fields/NationalIdField";
import PasswordField from "./user/fields/PasswordField";
import PhoneField from "./user/fields/PhoneField";
import RoleField from "./user/fields/RoleField";

const SignupSchema = z.object({
  accountId: z.string().min(1, "Account ID required"),
  email: z.string().email("Invalid email"),
  firstName: z.string().min(1, "First name required"),
  surname: z.string().min(1, "Surname required"),
  phone: z.string().max(11).optional(),
  role: z.enum(["user", "agent"]).default("user"),
  status: z
    .enum(["Not Verified", "Pending", "Active", "Suspended"])
    .default("Pending"), // ✅ fixed enum
  nationalId: z.string().optional(),
  bio: z.string().max(300).optional(),
  metadata: z.array(z.string()).optional(),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type SignupFormData = z.infer<typeof SignupSchema>;

export default function SignupForm({
  redirectTo = "/login",
}: {
  redirectTo?: string;
}) {
  const [form, setForm] = useState<SignupFormData>({
    accountId: uuid(),
    email: "",
    firstName: "",
    surname: "",
    phone: "",
    role: "user",
    status: "Pending",
    nationalId: "",
    bio: "",
    metadata: [],
    password: "",
  });

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  function onChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function uploadAvatar(file: File): Promise<string | null> {
    try {
      const fd = new FormData();
      fd.append("file", file);

      const storageRes = await fetch(
        "https://treasurepal-backened.onrender.com/api/storage/upload",
        {
          method: "POST",
          body: fd,
        }
      );

      const body = await storageRes.json();
      if (!storageRes.ok)
        throw new Error(body?.error || "Avatar upload failed");
      return body?.fileId || null;
    } catch (err) {
      console.error("Avatar upload error:", err);
      return null;
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const parsed = SignupSchema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.errors[0].message);
      return;
    }

    setLoading(true);
    const tId = toast.loading("Creating your account…", {
      description: "Please wait while we finalize your details.",
    });

    try {
      let avatarFileId: string | null = null;
      if (avatarFile) {
        avatarFileId = await uploadAvatar(avatarFile);
      }

      const payload = {
        accountId: parsed.data.accountId,
        email: parsed.data.email.toLowerCase(),
        firstName: parsed.data.firstName,
        surname: parsed.data.surname,
        password: parsed.data.password,
        role: parsed.data.role,
        status: "Active",
        phone: parsed.data.phone || null,
        nationalId: parsed.data.nationalId || null,
        bio: parsed.data.bio || null,
        metadata: parsed.data.metadata || [],
        avatarFileId,
      };

      const res = await fetch(
        "https://treasurepal-backened.onrender.com/api/users/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const body = await res.json().catch(() => ({}));

      if (!res.ok) {
        const msg =
          body?.error || body?.message || `Signup failed (${res.status})`;
        toast.error(msg);
        toast.dismiss(tId);
        return;
      }

      toast.success("Account created successfully!", {
        description: "Redirecting you to login…",
      });
      toast.dismiss(tId);

      setTimeout(() => {
        window.location.href = redirectTo;
      }, 1200);
    } catch (err) {
      toast.error("Network error. Try again.");
      toast.dismiss(tId);
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="w-full sm:max-w-xl mx-auto p-4 sm:p-6 rounded-lg shadow-sm"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}>
      <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-6">
        <div className="mb-6 h-1 w-24 rounded-full bg-gradient-to-r from-green-500 to-blue-500" />

        <div className="grid grid-cols-1 gap-4">
          <EmailField value={form.email} onChange={onChange} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <NameField
              firstName={form.firstName}
              surname={form.surname}
              onChange={onChange}
            />
            <PhoneField value={form.phone || ""} onChange={onChange} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <RoleField value={form.role} onChange={onChange} />
            <NationalIdField
              value={form.nationalId || ""}
              onChange={onChange}
            />
          </div>

          <AvatarField onChange={(file) => setAvatarFile(file)} />
          <BioField value={form.bio || ""} onChange={onChange} />
          <PasswordField value={form.password} onChange={onChange} />
        </div>

        <div className="mt-6 flex flex-col sm:flex-row items-center gap-4">
          <Button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto bg-gradient-to-r from-green-600 to-blue-600 text-white hover:from-green-500 hover:to-blue-500 transition-transform duration-200 hover:scale-[1.02]">
            {loading ? "Creating..." : "Create account"}
          </Button>
          <a
            className="w-full sm:w-auto rounded-md border px-4 py-2 text-center text-sm text-gray-700 hover:bg-gray-50"
            href="/login"
            aria-label="Go to login">
            Already have an account?
          </a>
        </div>
      </div>
    </motion.form>
  );
}
