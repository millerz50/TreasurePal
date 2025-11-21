"use client";

import React, { useState } from "react";
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
    .default("Pending"),
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
  const [error, setError] = useState<string | null>(null);

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
      if (!storageRes.ok) {
        throw new Error(body?.error || "Avatar upload failed");
      }
      return body?.fileId || null;
    } catch (err: unknown) {
      console.error("Avatar upload error:", err);
      return null;
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const parsed = SignupSchema.safeParse(form);
    if (!parsed.success) {
      setError(parsed.error.errors[0].message);
      return;
    }

    setLoading(true);
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
        "https://treasurepal-backened.onrender.com/api/signup",
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
        setError(msg);
        return;
      }

      window.location.href = redirectTo;
    } catch {
      setError("Network error. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full sm:max-w-xl mx-auto p-4 sm:p-6 bg-base-100 rounded-lg shadow-sm">
      <EmailField value={form.email} onChange={onChange} />
      <NameField
        firstName={form.firstName}
        surname={form.surname}
        onChange={onChange}
      />
      <PhoneField value={form.phone || ""} onChange={onChange} />
      <RoleField value={form.role} onChange={onChange} />
      <NationalIdField value={form.nationalId || ""} onChange={onChange} />
      <AvatarField onChange={(file) => setAvatarFile(file)} />
      <BioField value={form.bio || ""} onChange={onChange} />
      <PasswordField value={form.password} onChange={onChange} />

      {error && (
        <div role="alert" className="mb-4 text-sm text-error">
          {error}
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
        <Button type="submit" disabled={loading} className="w-full sm:w-auto">
          {loading ? "Creating..." : "Create account"}
        </Button>
        <a className="btn btn-ghost w-full sm:w-auto" href="/login">
          Already have an account?
        </a>
      </div>
    </form>
  );
}
