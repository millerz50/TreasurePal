"use client";

import { motion } from "framer-motion";
import React, { useState } from "react";
import { toast } from "sonner";
import { Button } from "../../components/ui/button";
import CountrySelect from "./CountrySelect";
import LocationSearch from "./LocationSearch";
import { SignupFormData, SignupSchema } from "./SignupSchema";
import SocialSignup from "./SocialSignup";

/**
 * Client-side signup form
 * - Normalizes and validates phone to a conservative E.164-ish format before sending
 * - Does not send client-generated accountId to the backend (server creates auth user)
 * - Fixes endpoint typo and surfaces server error messages
 */

export default function SignupForm({
  redirectTo = "/signin",
}: {
  redirectTo?: string;
}) {
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
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  // Conservative client-side normalizer (matches server rules)
  function normalizePhoneClient(phone?: string): string | null {
    if (!phone || typeof phone !== "string") return null;
    const trimmed = phone.trim();
    const cleaned = trimmed.replace(/[\s\-().]/g, "");
    if (!cleaned.startsWith("+")) return null;
    const digits = cleaned.replace(/^\+/, "");
    if (!/^\d{1,15}$/.test(digits)) return null;
    return `+${digits}`;
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
      // Normalize and validate phone on the client
      const normalizedPhone = normalizePhoneClient(parsed.data.phone);
      if (parsed.data.phone && !normalizedPhone) {
        toast.error(
          "Phone must be in international format, e.g. +263771234567"
        );
        toast.dismiss(tId);
        setLoading(false);
        return;
      }

      // Build payload explicitly (do not send client accountId)
      const payload = {
        email: parsed.data.email.toLowerCase(),
        password: parsed.data.password,
        firstName: parsed.data.firstName,
        surname: parsed.data.surname,
        //phone: normalizedPhone, // either +263... or null
        country: parsed.data.country || null,
        location: parsed.data.location || null,
        role: parsed.data.role || "user",
        status: "Active",
        nationalId: parsed.data.nationalId || null,
        bio: parsed.data.bio || null,
        metadata: parsed.data.metadata || [],
        avatarUrl: parsed.data.avatarUrl || null,
        dateOfBirth: parsed.data.dateOfBirth || null,
      };

      // NOTE: ensure this matches your deployed service hostname
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/signup`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const body = await res.json().catch(() => ({}));

      if (!res.ok) {
        toast.error(
          body.error || body.message || `Signup failed (${res.status})`
        );
        console.error("Signup failed:", res.status, body);
        toast.dismiss(tId);
        setLoading(false);
        return;
      }

      toast.success("Account created successfully!", {
        description: "Redirecting you to signin…",
      });

      toast.dismiss(tId);

      setTimeout(() => {
        window.location.href = redirectTo;
      }, 1200);
    } catch (err) {
      console.error("Signup network error:", err);
      toast.error("Network error. Try again.");
      toast.dismiss(tId);
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="w-full sm:max-w-xl mx-auto p-6 sm:p-8 rounded-2xl shadow-2xl 
                 bg-gradient-to-br from-green-500 via-teal-500 to-blue-600"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}>
      <div className="rounded-2xl border border-white/50 bg-white/80 backdrop-blur-md p-6 shadow-lg space-y-6">
        {/* Name */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="firstName"
              className="text-sm font-semibold text-slate-700">
              First Name
            </label>
            <input
              id="firstName"
              name="firstName"
              value={form.firstName}
              onChange={onChange}
              className="input"
              required
            />
          </div>
          <div>
            <label
              htmlFor="surname"
              className="text-sm font-semibold text-slate-700">
              Surname
            </label>
            <input
              id="surname"
              name="surname"
              value={form.surname}
              onChange={onChange}
              className="input"
              required
            />
          </div>
        </div>

        {/* Contact */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="email"
              className="text-sm font-semibold text-slate-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={onChange}
              placeholder="you@example.com"
              className="input"
              required
            />
          </div>
          <div>
            <label
              htmlFor="phone"
              className="text-sm font-semibold text-slate-700">
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={onChange}
              placeholder="+263771234567"
              className="input"
              required
            />
          </div>
        </div>

        {/* Country + Location */}
        <div className="grid grid-cols-2 gap-6">
          <CountrySelect value={form.country} onChange={onChange} />
          <div>
            <label
              htmlFor="location"
              className="text-sm font-semibold text-slate-700">
              Location
            </label>
            <LocationSearch
              onSelect={(loc) =>
                setForm((prev) => ({ ...prev, location: loc.name }))
              }
            />
          </div>
        </div>

        {/* Role + National ID */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="role"
              className="text-sm font-semibold text-slate-700">
              Role
            </label>
            <select
              id="role"
              name="role"
              value={form.role}
              onChange={onChange}
              className="input">
              <option value="user">User</option>
              <option value="agent">Agent</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="nationalId"
              className="text-sm font-semibold text-slate-700">
              National ID
            </label>
            <input
              id="nationalId"
              name="nationalId"
              value={form.nationalId}
              onChange={onChange}
              className="input"
            />
          </div>
        </div>

        {/* Bio */}
        <div>
          <label htmlFor="bio" className="text-sm font-semibold text-slate-700">
            Bio
          </label>
          <textarea
            id="bio"
            name="bio"
            value={form.bio}
            onChange={onChange}
            className="input"
            rows={3}
          />
        </div>

        {/* Avatar URL */}
        <div>
          <label
            htmlFor="avatarUrl"
            className="text-sm font-semibold text-slate-700">
            Avatar URL
          </label>
          <input
            id="avatarUrl"
            name="avatarUrl"
            value={form.avatarUrl}
            onChange={onChange}
            className="input"
            placeholder="https://example.com/avatar.png"
          />
        </div>

        {/* Date of Birth */}
        <div>
          <label
            htmlFor="dateOfBirth"
            className="text-sm font-semibold text-slate-700">
            Date of Birth
          </label>
          <input
            id="dateOfBirth"
            name="dateOfBirth"
            type="date"
            value={form.dateOfBirth}
            onChange={onChange}
            className="input"
          />
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="text-sm font-semibold text-slate-700">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={onChange}
            className="input"
            required
          />
        </div>

        {/* Submit + Links */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
          <Button type="submit" disabled={loading} className="btn-primary">
            {loading ? "Creating..." : "Create Account"}
          </Button>
          <a href="/signin" className="btn-outline">
            Already have an account?
          </a>
        </div>

        {/* Social Signup */}
        <SocialSignup />
      </div>
    </motion.form>
  );
}
